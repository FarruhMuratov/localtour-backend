import React, { useState, useEffect, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useLanguage, Language, TranslationKey } from '../context/LanguageContext';
import { useWishlist } from '../context/WishlistContext';
import { useTours } from '../context/TourContext';
import { INITIAL_BOOKINGS } from '../constants';
import { Booking, Tour } from '../types';
import TourCard from '../components/TourCard';
import Modal from '../components/Modal';
import {
  ArrowLeftIcon, TicketIcon, HeartIcon, UserIcon, Cog6ToothIcon, ChevronRightIcon,
  BriefcaseIcon, ArrowLeftOnRectangleIcon, UserCircleIcon, CameraIcon, GlobeAltIcon, StarIcon, PhotoIcon, PlusIcon
} from '../components/icons/Icons';

// --- Custom Hook for localStorage ---
const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// --- Helper & Sub-components ---

const StarRating: React.FC<{ rating: number; setRating?: (rating: number) => void; }> = ({ rating, setRating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating?.(star)}
          className={`text-3xl transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} ${setRating ? 'hover:text-yellow-300' : ''}`}
          disabled={!setRating}
          aria-label={`Rate ${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const ReviewModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  tour: Tour;
  booking: Booking;
  onSave: (reviewData: Booking['review']) => void;
}> = ({ isOpen, onClose, tour, booking, onSave }) => {
  const { t, language } = useLanguage();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    if (booking) {
      setRating(booking.review?.rating || 0);
      setText(booking.review?.text || '');
      setPhotos(booking.review?.photos || []);
    }
  }, [booking]);

  // FIX: Refactored to use Promise.all to handle multiple async file reads robustly,
  // preventing race conditions and ensuring all photos are added correctly. This also
  // helps resolve the complex type inference issue reported by TypeScript.
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const readPromises = files.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readPromises)
        .then(newBase64Photos => {
          setPhotos(prevPhotos => [...prevPhotos, ...newBase64Photos]);
        })
        .catch(error => {
          console.error("Error reading photo files:", error);
        });
    }
  };

  const handleSave = () => {
    onSave({ rating, text, photos });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('profile.reviewModal.title', { tourTitle: tour.title[language] })}>
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('profile.reviewModal.ratingLabel')}</label>
          <StarRating rating={rating} setRating={setRating} />
        </div>
        <div>
          <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">{t('profile.reviewModal.reviewLabel')}</label>
          <textarea id="reviewText" value={text} onChange={e => setText(e.target.value)} rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t('profile.reviewModal.placeholder')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('profile.reviewModal.photosLabel')}</label>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {photos.map((photo, index) => (
              <img key={index} src={photo} className="w-16 h-16 object-cover rounded-md" alt={`Review photo ${index+1}`} />
            ))}
            <label className="w-16 h-16 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
              <PlusIcon className="w-6 h-6 text-gray-400" />
              <input type="file" multiple accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <button onClick={handleSave} className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            {t('profile.reviewModal.saveButton')}
          </button>
        </div>
      </div>
    </Modal>
  );
};


type ProfileViewMode = 'main' | 'bookings' | 'favorites' | 'personal_info' | 'language';

// --- Main Component ---
const ProfileView: React.FC = () => {
  const navigate = ReactRouterDOM.useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const { wishlist } = useWishlist();
  const { tours } = useTours();
  
  const [activeView, setActiveView] = useState<ProfileViewMode>('main');
  const [userInfo, setUserInfo] = useLocalStorage('localroam_user_info', {
    name: 'Alex Doe',
    phone: '+998 90 123 45 67',
    profilePic: null as string | null,
  });
  const [bookings, setBookings] = useLocalStorage('localroam_bookings', INITIAL_BOOKINGS);
  
  const [reviewModal, setReviewModal] = useState<{ isOpen: boolean; booking: Booking | null }>({ isOpen: false, booking: null });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo(prev => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveReview = (reviewData: Booking['review']) => {
    if(reviewModal.booking) {
      setBookings(currentBookings => 
        currentBookings.map(b => b.id === reviewModal.booking!.id ? {...b, review: reviewData} : b)
      );
    }
  };

  const renderContent = () => {
    const headerTitleKey: Record<ProfileViewMode, TranslationKey> = {
        main: 'profile.title',
        bookings: 'profile.menu.bookings',
        favorites: 'profile.menu.favorites',
        personal_info: 'profile.menu.personalInfo',
        language: 'profile.language.title',
    };
    const headerTitle = t(headerTitleKey[activeView]);

    if (activeView === 'main') {
      const menuItems = [
        { icon: TicketIcon, textKey: "profile.menu.bookings", action: () => setActiveView('bookings') },
        { icon: HeartIcon, textKey: "profile.menu.favorites", action: () => setActiveView('favorites') },
        { icon: UserIcon, textKey: "profile.menu.personalInfo", action: () => setActiveView('personal_info') },
        { icon: GlobeAltIcon, textKey: "profile.menu.language", action: () => setActiveView('language') }
      ] as const;
      return <>
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 p-4 flex items-center border-b border-gray-200">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 -ml-2" aria-label={t('common.back')}>
            <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 text-center flex-grow -mr-6">{t('profile.title')}</h1>
        </header>

        <main className="flex-grow p-4">
          <div className="flex flex-col items-center pt-4 pb-8">
            <div className="relative w-24 h-24">
              {userInfo.profilePic ? (
                <img src={userInfo.profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <UserCircleIcon className="w-24 h-24 text-gray-400" />
              )}
              <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow-md hover:bg-blue-700">
                <CameraIcon className="w-4 h-4" />
              </button>
              <input type="file" ref={fileInputRef} onChange={handleProfilePicUpload} className="hidden" accept="image/*" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">{userInfo.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{userInfo.phone}</p>
          </div>
          <div className="space-y-2 bg-gray-50 rounded-xl p-2">
            {menuItems.map(({ icon: Icon, textKey, action }) => (
              <button key={textKey} onClick={action} className="w-full flex items-center p-3 text-left bg-white rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Icon className="h-6 w-6 text-gray-500" />
                <span className="ml-4 font-medium text-gray-700">{t(textKey)}</span>
                <ChevronRightIcon className="h-5 w-5 text-gray-400 ml-auto" />
              </button>
            ))}
          </div>
          <div className="mt-6">
            <ReactRouterDOM.Link to="/partner" className="w-full flex items-center p-4 text-left bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <BriefcaseIcon className="h-6 w-6 text-blue-600" />
              <span className="ml-4 font-semibold text-blue-800">{t('profile.forTourAgents')}</span>
              <ChevronRightIcon className="h-5 w-5 text-blue-500 ml-auto" />
            </ReactRouterDOM.Link>
          </div>
        </main>
        <footer className="p-4 mt-auto">
          <button className="w-full flex items-center justify-center p-3 text-left bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <ArrowLeftOnRectangleIcon className="h-6 w-6 text-gray-600" />
            <span className="ml-3 font-medium text-gray-700">{t('profile.logout')}</span>
          </button>
        </footer>
      </>;
    }

    const SubViewWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
      <>
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 p-4 flex items-center border-b border-gray-200">
          <button onClick={() => setActiveView('main')} className="p-2 rounded-full hover:bg-gray-100" aria-label={t('common.back')}>
            <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 text-center flex-grow -ml-8">{title}</h1>
        </header>
        <main className="flex-grow p-4">{children}</main>
      </>
    );

    switch (activeView) {
      case 'bookings': {
        const upcoming = bookings.filter(b => b.status === 'Upcoming');
        const completed = bookings.filter(b => b.status === 'Completed');
        return (
          <SubViewWrapper title={headerTitle}>
            <div className="space-y-6">
              {upcoming.length > 0 && <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-700">{t('profile.bookings.upcoming')}</h2>
                <div className="space-y-3">{upcoming.map(b => <BookingCard key={b.id} booking={b} onReviewClick={() => {}} />)}</div>
              </div>}
              {completed.length > 0 && <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-700">{t('profile.bookings.completed')}</h2>
                <div className="space-y-3">{completed.map(b => <BookingCard key={b.id} booking={b} onReviewClick={() => setReviewModal({ isOpen: true, booking: b})} />)}</div>
              </div>}
            </div>
          </SubViewWrapper>
        );
      }
      case 'favorites': {
        const favoriteTours = tours.filter(t => wishlist.includes(t.id));
        return (
          <SubViewWrapper title={headerTitle}>
            {favoriteTours.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {favoriteTours.map(tour => <TourCard key={tour.id} tour={tour} showCurrencySymbol={false} />)}
                </div>
            ) : (
                <div className="text-center py-24 flex flex-col items-center">
                    <HeartIcon className="h-16 w-16 text-gray-300 mb-4"/>
                    <h3 className="text-xl font-semibold text-gray-700">{t('profile.favorites.empty.title')}</h3>
                    <p className="text-gray-500 mt-2 max-w-xs">{t('profile.favorites.empty.description')}</p>
                </div>
            )}
          </SubViewWrapper>
        );
      }
      case 'personal_info': {
        return (
          <SubViewWrapper title={headerTitle}>
            <PersonalInfoForm user={userInfo} onSave={setUserInfo} onBack={() => setActiveView('main')} />
          </SubViewWrapper>
        );
      }
       case 'language': {
        return (
          <SubViewWrapper title={headerTitle}>
            <div className="space-y-2">
              {(['en', 'ru'] as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`w-full text-left p-4 rounded-lg font-medium ${language === lang ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {t(lang === 'en' ? 'profile.language.english' : 'profile.language.russian')}
                </button>
              ))}
            </div>
          </SubViewWrapper>
        );
      }
      default: return null;
    }
  };

  const BookingCard: React.FC<{booking: Booking, onReviewClick: () => void}> = ({ booking, onReviewClick }) => {
    const tour = tours.find(t => t.id === booking.tourId);
    if (!tour) return null;
    return (
      <div className="bg-white p-3 rounded-lg shadow-sm border flex gap-3">
        <img src={tour.imageUrl} alt={tour.title[language]} className="w-20 h-20 object-cover rounded-md" />
        <div className="flex-grow flex flex-col">
          <p className="font-semibold text-gray-800 line-clamp-2">{tour.title[language]}</p>
          <p className="text-xs text-gray-500 mt-1">{t('profile.bookings.bookedFor')}: {booking.bookingDate}</p>
          {booking.status === 'Completed' && (
            <div className="mt-auto pt-1 flex items-center justify-between">
              {booking.review ? <StarRating rating={booking.review.rating}/> : <div/>}
              <button onClick={onReviewClick} className="text-xs font-semibold text-blue-600 hover:underline">
                {booking.review ? t('profile.review.edit') : t('profile.review.leave')}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  };

  const PersonalInfoForm: React.FC<{ user: typeof userInfo, onSave: (info: typeof userInfo) => void, onBack: () => void }> = ({ user, onSave, onBack }) => {
    const { t } = useLanguage();
    const [formState, setFormState] = useState(user);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({...formState, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formState);
      onBack();
    }
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('profile.personalInfo.name')}</label>
          <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('profile.personalInfo.phone')}</label>
          <input type="tel" name="phone" id="phone" value={formState.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div className="pt-2">
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            {t('profile.personalInfo.save')}
          </button>
        </div>
      </form>
    );
  };
  
  const tourForReview = reviewModal.booking ? tours.find(t => t.id === reviewModal.booking!.id) : null;

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      {renderContent()}
      {reviewModal.isOpen && reviewModal.booking && tourForReview && (
        <ReviewModal 
          isOpen={reviewModal.isOpen}
          onClose={() => setReviewModal({ isOpen: false, booking: null })}
          tour={tourForReview}
          booking={reviewModal.booking}
          onSave={handleSaveReview}
        />
      )}
    </div>
  );
};

export default ProfileView;