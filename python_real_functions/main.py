import os
import json
import google.generativeai as genai
from firebase_functions import firestore_fn, options, https_fn, scheduler_fn
from firebase_admin import initialize_app, firestore

# Initialize Firebase Admin SDK - ONCE AT THE TOP
initialize_app()

# Configure the Gemini API key
# Make sure to set GEMINI_API_KEY in your function's environment variables
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-pro')

@firestore_fn.on_document_created(document="users/{userId}")
def on_user_created(event: firestore_fn.Event[firestore_fn.Change]) -> None:
    """
    Triggered when a new user document is created.
    If the user has the 'partner' role, creates a corresponding partner profile.
    """
    user_data = event.data.to_dict()
    user_id = event.params["userId"]
    
    roles = user_data.get("roles", [])
    if "partner" in roles:
        db = firestore.client()
        partner_ref = db.collection("partners").document(user_id)
        if not partner_ref.get().exists:
            partner_data = {
                "userId": user_id, "status": "pending", "createdAt": firestore.SERVER_TIMESTAMP,
                "updatedAt": firestore.SERVER_TIMESTAMP, "averageRating": 0, "ratingCount": 0
            }
            partner_ref.set(partner_data)
            print(f"Partner profile created for user: {user_id}")

@https_fn.on_call()
def createTourWithAI(req: https_fn.Request) -> https_fn.Response:
    """
    Callable function for partners to create a tour draft with AI assistance.
    """
    if req.auth is None:
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.UNAUTHENTICATED, message="Authentication required.")
    
    partner_id = req.auth.uid
    data = req.data
    
    if not all(k in data for k in ['title', 'description', 'city']):
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.INVALID_ARGUMENT, message="Missing required fields: title, description, city.")

    try:
        prompt = f"""
        You are an expert tour guide copywriter for a platform called 'localtour'.
        Your task is to generate a compelling tour profile based on the partner's input.
        The output must be a valid JSON object with three keys: "description", "tags", and "itinerary".
        - 'description': An engaging, well-structured description of the tour (2-3 paragraphs).
        - 'tags': An array of 5-7 relevant string tags.
        - 'itinerary': A brief array of objects, each with 'time' and 'action' keys.

        Partner's input:
        - Title: {data['title']}
        - Description: {data['description']}
        - City: {data['city']}
        """
        
        response = model.generate_content(prompt)
        ai_generated_data = json.loads(response.text)

        db = firestore.client()
        tours_ref = db.collection("tours")
        
        new_tour_doc = {
            "partnerId": partner_id, "status": "draft", "title": data['title'],
            "partnerContent": {"description": data['description'], "media": data.get('media', [])},
            "aiDraft": ai_generated_data, "route": { "city": data['city'] },
            "createdAt": firestore.SERVER_TIMESTAMP, "updatedAt": firestore.SERVER_TIMESTAMP
        }

        if 'pricing' in data: new_tour_doc['pricing'] = data['pricing']
        if 'rules' in data: new_tour_doc['rules'] = data['rules']
        
        new_tour_ref = tours_ref.add(new_tour_doc)
        return https_fn.Response(data={"status": "success", "tourId": new_tour_ref[1].id})

    except Exception as e:
        print(f"Error creating tour with AI: {e}")
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.INTERNAL, message=f"An error occurred: {e}")

@firestore_fn.on_document_updated(document="tours/{tourId}")
def onTourUpdate(event: firestore_fn.Event[firestore_fn.Change]) -> None:
    """
    If status changes to 'pending_moderation', it uses AI to moderate the content.
    """
    before_data = event.data.before.to_dict()
    after_data = event.data.after.to_dict()
    
    if before_data.get('status') != 'pending_moderation' and after_data.get('status') == 'pending_moderation':
        tour_id = event.params["tourId"]
        try:
            content_to_moderate = after_data.get('partnerContent', {}).get('description', '')
            prompt = f"You are a content moderator. Analyze the following tour description. Respond with a single word: 'approved' or 'rejected'. Description: \"{content_to_moderate}\""
            response = model.generate_content(prompt)
            moderation_result = response.text.strip().lower()
            db = firestore.client()
            tour_ref = db.collection('tours').document(tour_id)
            if 'approved' in moderation_result:
                tour_ref.update({"status": "approved", "updatedAt": firestore.SERVER_TIMESTAMP})
                print(f"Tour {tour_id} auto-approved by AI.")
            else:
                tour_ref.update({"status": "rejected", "moderationFeedback": "Content rejected by AI moderator.", "updatedAt": firestore.SERVER_TIMESTAMP})
                print(f"Tour {tour_id} auto-rejected by AI.")
        except Exception as e:
            print(f"Error during AI moderation for tour {tour_id}: {e}")
            db.collection('tours').document(tour_id).update({"status": "needs_manual_review"})

@https_fn.on_call()
def createBooking(req: https_fn.Request) -> https_fn.Response:
    """
    Callable function for clients to book a tour.
    """
    if req.auth is None:
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.UNAUTHENTICATED, message="Authentication required.")
    client_id = req.auth.uid
    data = req.data
    if not all(k in data for k in ['tourId', 'numberOfGuests', 'bookingDate', 'priceTier']):
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.INVALID_ARGUMENT, message="Missing required fields.")
    try:
        db = firestore.client()
        tour_ref = db.collection('tours').document(data['tourId'])
        tour = tour_ref.get()
        if not tour.exists:
            raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.NOT_FOUND, message="Tour not found.")
        tour_data = tour.to_dict()
        if tour_data['status'] != 'approved':
            raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.FAILED_PRECONDITION, message="This tour is not available for booking.")
        price_per_guest = tour_data.get('pricing', {}).get(data['priceTier'])
        if price_per_guest is None:
            raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.INVALID_ARGUMENT, message="Invalid price tier selected.")
        total_price = price_per_guest * data['numberOfGuests']
        commission = total_price * 0.15
        partner_payout = total_price - commission
        new_booking = {
            "tourId": data['tourId'], "clientId": client_id, "partnerId": tour_data['partnerId'],
            "bookingDate": data['bookingDate'], "numberOfGuests": data['numberOfGuests'], "status": "requested",
            "priceTier": data['priceTier'], "totalPrice": total_price, "platformCommission": commission,
            "partnerPayout": partner_payout, "paymentStatus": "pending",
            "createdAt": firestore.SERVER_TIMESTAMP, "updatedAt": firestore.SERVER_TIMESTAMP
        }
        booking_ref = db.collection('bookings').add(new_booking)
        return https_fn.Response(data={"status": "success", "bookingId": booking_ref[1].id})
    except Exception as e:
        print(f"Error creating booking: {e}")
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.INTERNAL, message=f"An error occurred: {e}")

@https_fn.on_call()
def leaveRating(req: https_fn.Request) -> https_fn.Response:
    """
    Callable function for users or partners to leave a rating after a tour.
    """
    if req.auth is None:
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.UNAUTHENTICATED, message="Authentication required.")
    author_id = req.auth.uid
    data = req.data
    if not all(k in data for k in ['bookingId', 'rating', 'comment', 'recipientId']):
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.INVALID_ARGUMENT, message="Missing required fields.")
    try:
        db = firestore.client()
        booking_ref = db.collection('bookings').document(data['bookingId'])
        booking = booking_ref.get()
        if not booking.exists or booking.to_dict().get('status') != 'completed':
            raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.FAILED_PRECONDITION, message="You can only rate completed bookings.")
        booking_data = booking.to_dict()
        author_is_client = author_id == booking_data['clientId']
        author_is_partner = author_id == booking_data['partnerId']
        if not (author_is_client or author_is_partner):
             raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.PERMISSION_DENIED, message="You are not a participant of this booking.")
        author_role = 'client' if author_is_client else 'partner'
        recipient_role = 'partner' if author_is_client else 'client'
        new_rating = {
            "bookingId": data['bookingId'], "tourId": booking_data['tourId'], "authorId": author_id,
            "recipientId": data['recipientId'], "rating": data['rating'], "comment": data['comment'],
            "authorRole": author_role, "recipientRole": recipient_role, "createdAt": firestore.SERVER_TIMESTAMP,
        }
        db.collection('ratings').add(new_rating)
        return https_fn.Response(data={"status": "success"})
    except Exception as e:
        print(f"Error leaving rating: {e}")
        raise https_fn.HttpsError(code=https_fn.FunctionsErrorCode.INTERNAL, message=f"An error occurred: {e}")

@firestore_fn.on_document_created(document="ratings/{ratingId}")
def onRatingCreated(event: firestore_fn.Event[firestore_fn.Change]) -> None:
    """
    Recalculates the average rating for the recipient partner.
    """
    rating_data = event.data.to_dict()
    if rating_data.get('recipientRole') == 'partner':
        partner_id = rating_data['recipientId']
        db = firestore.client()
        partner_ref = db.collection('partners').document(partner_id)
        @firestore.transactional
        def update_in_transaction(transaction, partner_ref):
            snapshot = partner_ref.get(transaction=transaction)
            new_rating = rating_data['rating']
            old_rating_count = snapshot.get('ratingCount') or 0
            old_avg_rating = snapshot.get('averageRating') or 0
            new_rating_count = old_rating_count + 1
            new_avg_rating = ((old_avg_rating * old_rating_count) + new_rating) / new_rating_count
            transaction.update(partner_ref, {
                'ratingCount': new_rating_count,
                'averageRating': round(new_avg_rating, 2)
            })
        update_in_transaction(firestore.client().transaction(), partner_ref)
        print(f"Updated average rating for partner {partner_id}.")

@scheduler_fn.on_schedule(schedule="every 1 hours")
def generateUserFeeds(event: scheduler_fn.ScheduledEvent) -> None:
    """
    Scheduled function that runs every hour to generate personalized feeds for users.
    """
    print("Starting personalized feed generation job.")
    db = firestore.client()
    try:
        users = db.collection('users').stream()
        for user in users:
            user_id = user.id
            actions_query = db.collection('userActions').where('userId', '==', user_id).limit(50)
            actions = actions_query.stream()
            action_list = list(actions)
            if not action_list:
                print(f"No recent actions for user {user_id}. Skipping.")
                continue
            tag_interests, city_interests = {}, {}
            for action in action_list:
                action_data = action.to_dict()
                if 'metadata' in action_data:
                    for tag in action_data['metadata'].get('tourTags', []):
                        tag_interests[tag] = tag_interests.get(tag, 0) + 1
                    city = action_data['metadata'].get('tourCity')
                    if city: city_interests[city] = city_interests.get(city, 0) + 1
            if not tag_interests and not city_interests: continue
            preferred_tags = sorted(tag_interests, key=tag_interests.get, reverse=True)[:3]
            preferred_city = sorted(city_interests, key=city_interests.get, reverse=True)[0] if city_interests else None
            tours_query = db.collection('tours').where('status', '==', 'approved')
            if preferred_city: tours_query = tours_query.where('route.city', '==', preferred_city)
            if preferred_tags: tours_query = tours_query.where('aiDraft.tags', 'array_contains_any', preferred_tags)
            recommended_tours = tours_query.limit(20).stream()
            recommended_tour_ids = [tour.id for tour in recommended_tours]
            if recommended_tour_ids:
                feed_doc = {
                    "userId": user_id, "tourIds": recommended_tour_ids,
                    "generatedAt": firestore.SERVER_TIMESTAMP
                }
                db.collection('userFeeds').document(user_id).set(feed_doc)
                print(f"Generated feed for user {user_id} with {len(recommended_tour_ids)} tours.")
    except Exception as e:
        print(f"Error during feed generation job: {e}")