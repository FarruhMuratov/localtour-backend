import os
import click
import firebase_admin
from firebase_admin import credentials, firestore, storage, auth
from dotenv import load_dotenv

def initialize_firebase():
    """
    Initializes the Firebase Admin SDK.
    """
    load_dotenv()
    cred_path = os.path.join(os.path.dirname(__file__), 'serviceAccountKey.json')
    
    if not os.path.exists(cred_path):
        click.echo(click.style("ERROR: serviceAccountKey.json not found.", fg='red'))
        click.echo("Please download it from your Firebase project settings and place it in the 'admin_scripts' directory.")
        return None

    database_url = os.getenv('DATABASE_URL')
    storage_bucket = os.getenv('STORAGE_BUCKET')

    if not database_url or not storage_bucket:
        click.echo(click.style("ERROR: DATABASE_URL or STORAGE_BUCKET not set in .env file.", fg='red'))
        return None

    cred = credentials.Certificate(cred_path)
    try:
        firebase_admin.get_app()
    except ValueError:
        firebase_admin.initialize_app(cred, {
            'databaseURL': database_url,
            'storageBucket': storage_bucket
        })
    
    return firestore.client()

@click.group()
def cli():
    """A CLI tool to manage the localtour-backend project."""
    pass

@cli.command()
def update_user_schema():
    """
    Updates all user documents in Firestore to include missing schema fields.
    
    Adds 'displayName', 'createdAt', and 'roles' with default values if they are missing.
    """
    db = initialize_firebase()
    if not db:
        return

    users_ref = db.collection('users')
    users = users_ref.stream()
    
    updated_count = 0
    
    click.echo("Starting user schema update...")

    for user in users:
        user_data = user.to_dict()
        update_payload = {}

        # 1. Check for displayName
        if 'displayName' not in user_data:
            # Try to create a displayName from the email
            email = user_data.get('email', '')
            default_name = email.split('@')[0] if '@' in email else 'New User'
            update_payload['displayName'] = default_name
            click.echo(f"  - User {user.id}: Missing 'displayName'. Setting to '{default_name}'.")

        # 2. Check for createdAt
        if 'createdAt' not in user_data:
            # Use Firestore server timestamp
            update_payload['createdAt'] = firestore.SERVER_TIMESTAMP
            click.echo(f"  - User {user.id}: Missing 'createdAt'. Setting to server timestamp.")
            
        # 3. Check for roles
        if 'roles' not in user_data:
            # Default role is 'client'
            update_payload['roles'] = ['client']
            click.echo(f"  - User {user.id}: Missing 'roles'. Setting to ['client'].")

        if update_payload:
            users_ref.document(user.id).update(update_payload)
            updated_count += 1

    if updated_count > 0:
        success_message = f"\nSuccessfully updated {updated_count} user(s)."
        click.echo(click.style(success_message, fg='green'))
    else:
        click.echo(click.style("\nAll user schemas are already up-to-date.", fg='yellow'))

@cli.command()
@click.option('--phone', required=True, help='The user\'s phone number in E.164 format (e.g., +998901234567).')
@click.option('--role', default='client', type=click.Choice(['client', 'partner', 'admin'], case_sensitive=False), help='The role to assign to the user.')
def create_user(phone, role):
    """Creates a new user in Firebase Auth and a corresponding document in Firestore."""
    db = initialize_firebase()
    if not db:
        return

    try:
        # 1. Create user in Firebase Authentication
        auth_user = auth.create_user(phone_number=phone)
        click.echo(click.style(f"Successfully created user in Firebase Auth with UID: {auth_user.uid}", fg='green'))

        # 2. Create user document in Firestore
        users_ref = db.collection('users')
        user_doc = {
            'phone': phone,
            'roles': [role],
            'createdAt': firestore.SERVER_TIMESTAMP,
            'updatedAt': firestore.SERVER_TIMESTAMP,
            'isBlocked': False,
            'displayName': phone, # Default displayName to phone, user can change it later
            'preferences': {
                'language': 'ru',
                'notifications': True
            }
        }
        users_ref.document(auth_user.uid).set(user_doc)
        click.echo(click.style(f"Successfully created user document in Firestore for UID: {auth_user.uid}", fg='green'))

    except Exception as e:
        error_message = f"Failed to create user. Error: {e}"
        click.echo(click.style(error_message, fg='red'))


@cli.command()
@click.option('--tour-id', required=True, help='The ID of the tour to create a media folder for.')
def create_tour_media_folder(tour_id):
    """Creates a dedicated media folder for a tour in Firebase Storage."""
    db = initialize_firebase()
    if not db:
        return

    bucket = storage.bucket()
    folder_name = f"tours/{tour_id}/media"
    placeholder_path = f"{folder_name}/.placeholder"
    
    blob = bucket.blob(placeholder_path)
    
    if blob.exists():
        click.echo(click.style(f"Media folder for tour '{tour_id}' already exists.", fg='yellow'))
        return
        
    try:
        blob.upload_from_string('', content_type='text/plain')
        success_message = f"Successfully created media folder for tour '{tour_id}'."
        click.echo(click.style(success_message, fg='green'))
    except Exception as e:
        error_message = f"Failed to create folder. Error: {e}"
        click.echo(click.style(error_message, fg='red'))


@cli.command()
@click.option('--folder-name', required=True, help='The name of the folder to create in Firebase Storage.')
def create_storage_folder(folder_name):
    """Creates a folder in Firebase Storage by uploading a placeholder file."""
    # We need to initialize here again to make sure the storage bucket is configured
    # This is a small redundancy for the sake of clear separation of concerns
    db = initialize_firebase()
    if not db:
        return

    bucket = storage.bucket()
    folder_name = folder_name.strip('/') # Remove leading/trailing slashes
    placeholder_path = f"{folder_name}/.placeholder"
    
    blob = bucket.blob(placeholder_path)
    
    if blob.exists():
        click.echo(click.style(f"Folder '{folder_name}' already exists.", fg='yellow'))
        return
        
    try:
        blob.upload_from_string('', content_type='text/plain')
        success_message = f"Successfully created folder '{folder_name}' in Firebase Storage."
        click.echo(click.style(success_message, fg='green'))
    except Exception as e:
        error_message = f"Failed to create folder. Error: {e}"
        click.echo(click.style(error_message, fg='red'))


if __name__ == '__main__':
    cli()
