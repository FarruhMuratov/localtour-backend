import React, { useState } from 'react';
import UserPrompts from './UserPrompts';
import TourCard from '../components/TourCard';
import TrendingTourCard from '../components/TrendingTourCard';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { 
  MountainIcon, WalkingIcon, FoodIcon, AdventureIcon, KayakingIcon, 
  FamilyIcon, JeepIcon, RelaxIcon, WeekendIcon, HistoryIcon, CityIcon, 
  LakeIcon, ForestIcon, RiverIcon, FishingIcon, DesertIcon,
  MagnifyingGlassIcon, HomeIcon, Squares2X2Icon, HeartIcon, SparklesIcon, UserCircleIcon
} from '../components/icons/Icons';
import './Dashboard.css';
import { storage, auth } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

function Dashboard({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState(user.photoURL || '');
  const [uploading, setUploading] = useState(false);
  const { t } = useLanguage();

  // Categories matching localtour-2
  const categories = [
    { nameKey: 'categories.hiking', icon: MountainIcon, type: 'Hiking' },
    { nameKey: 'categories.walking', icon: WalkingIcon, type: 'Walking' },
    { nameKey: 'categories.food', icon: FoodIcon, type: 'Food' },
    { nameKey: 'categories.adventure', icon: AdventureIcon, type: 'Adventure' },
    { nameKey: 'categories.kayaking', icon: KayakingIcon, type: 'Kayaking' },
    { nameKey: 'categories.family', icon: FamilyIcon, type: 'Family' },
    { nameKey: 'categories.jeep', icon: JeepIcon, type: 'Jeep' },
    { nameKey: 'categories.relax', icon: RelaxIcon, type: 'Relax' },
    { nameKey: 'categories.weekend', icon: WeekendIcon, type: 'Weekend' },
    { nameKey: 'categories.history', icon: HistoryIcon, type: 'History' },
    { nameKey: 'categories.city', icon: CityIcon, type: 'City' },
    { nameKey: 'categories.lake', icon: LakeIcon, type: 'Lake' },
    { nameKey: 'categories.forest', icon: ForestIcon, type: 'Forest' },
    { nameKey: 'categories.river', icon: RiverIcon, type: 'River' },
    { nameKey: 'categories.fishing', icon: FishingIcon, type: 'Fishing' },
    { nameKey: 'categories.desert', icon: DesertIcon, type: 'Desert' },
  ];

  // Bottom navigation items
  const navItems = [
    { id: 'home', nameKey: 'clientNav.home', icon: HomeIcon },
    { id: 'catalog', nameKey: 'clientNav.catalog', icon: Squares2X2Icon },
    { id: 'wishlist', nameKey: 'clientNav.wishlist', icon: HeartIcon },
    { id: 'aiAgent', nameKey: 'clientNav.aiAgent', icon: SparklesIcon },
    { id: 'profile', nameKey: 'clientNav.profile', icon: UserCircleIcon },
  ];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image (webp, jpeg, jpg, png)');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      
      // Create storage reference
      const storageRef = ref(storage, `UserPhotos/${user.uid}/${file.name}`);
      
      // Upload file
      await uploadBytes(storageRef, file);
      
      // Get download URL
      const url = await getDownloadURL(storageRef);
      
      // Update user profile
      await updateProfile(auth.currentUser, {
        photoURL: url
      });
      
      setPhotoURL(url);
      alert('Profile image updated!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  // Mock tour data for testing
  const mockTours = [
    {
      id: '1',
      title: { en: 'Charvak Lake Adventure', ru: 'Приключение на озере Чарвак' },
      location: 'Charvak',
      price: 350000,
      durationDays: 1,
      imageUrl: '',
      rating: 4.8,
      isFeatured: true
    },
    {
      id: '2',
      title: { en: 'Sunrise Mountain Hike', ru: 'Горный поход на рассвете' },
      location: 'Mount Veridian',
      price: 1200000,
      durationDays: 2,
      imageUrl: '',
      rating: 4.9,
      isFeatured: true
    },
    {
      id: '3',
      title: { en: 'Gourmet Food & Wine', ru: 'Гастрономия и вино' },
      location: 'Vine Valley',
      price: 1900000,
      durationDays: 1,
      imageUrl: '',
      rating: 4.7,
      isFeatured: true
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <div className="pb-20">{/* Padding for fixed bottom nav */}
      {/* Header with Language Switcher - matching localtour-2 */}
      <header className="px-4 pt-2 pb-4 bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="w-1/3"></div>
            <div className="text-center text-sm text-gray-500 w-1/3">{t('clientView.location')}</div>
            <div className="w-1/3 flex justify-end"><LanguageSwitcher /></div>
          </div>
          
          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder={t('clientView.searchPlaceholder')} 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 transition-shadow" 
                aria-label="Search tours"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container - max-width for desktop */}
      <div className="max-w-7xl mx-auto">
        {/* Horizontal Scrolling Categories - matching localtour-2 */}
        <div className="mt-4">
          <div className="flex space-x-3 overflow-x-auto pb-2 px-4 whitespace-nowrap" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map(category => (
              <div
                key={category.nameKey}
                className="inline-flex flex-col items-center space-y-1.5 flex-shrink-0 w-14 text-center group cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={t(category.nameKey)}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  <category.icon className="h-7 w-7"/>
                </div>
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors whitespace-normal">
                  {t(category.nameKey)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Now Section - matching localtour-2 */}
        <div className="mt-2 px-4">
          <div className="bg-violet-100 rounded-2xl p-3 overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-gray-800">{t('clientView.trendingNow')}</h2>
            </div>
            <div className="flex space-x-3 overflow-x-auto -mx-3 px-3 -mb-4 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[...mockTours, ...mockTours].map((tour, idx) => (
                <div key={`${tour.id}-${idx}`} className="flex-shrink-0 w-36">
                  <TrendingTourCard tour={tour} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Available Tours Section */}
        <div className="px-4 pb-4 mt-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{t('clientView.availableTours')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...mockTours, ...mockTours].map((tour, idx) => (
              <TourCard key={`${tour.id}-${idx}`} tour={tour} showCurrencySymbol={false} />
            ))}
          </div>
        </div>
      </div>
      </div>{/* End pb-20 wrapper */}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm sm:max-w-5xl h-16 bg-white border-t border-gray-200 flex justify-around items-center shadow-t-md z-20">
        {navItems.map(({ id, nameKey, icon: Icon }) => {
          const isActive = id === 'home'; // For now, home is always active
          return (
            <button
              key={id}
              onClick={() => {
                if (id === 'profile') {
                  setIsProfileModalOpen(true);
                } else if (id === 'aiAgent') {
                  setIsAIModalOpen(true);
                } else if (id === 'catalog') {
                  alert('Catalog view coming soon!');
                } else if (id === 'wishlist') {
                  alert('Wishlist view coming soon!');
                }
              }}
              className={`flex flex-col items-center justify-center w-full h-full text-xs transition-colors duration-200 ${
                isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span>{t(nameKey)}</span>
            </button>
          );
        })}
      </nav>
    </div>

    {/* AI Agent Modal */}
    {isAIModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsAIModalOpen(false)}>
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">AI Assistant</h2>
            <button onClick={() => setIsAIModalOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
          </div>
          <UserPrompts />
        </div>
      </div>
    )}

    {/* Profile Modal */}
    {isProfileModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsProfileModalOpen(false)}>
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Profile</h2>
            <button onClick={() => setIsProfileModalOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
          </div>
          
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <div className="profile-image-container mb-4">
              {photoURL ? (
                <img src={photoURL} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-placeholder">
                  {(user.displayName || user.email || user.phoneNumber || 'U')[0].toUpperCase()}
                </div>
              )}
              <label htmlFor="image-upload" className="upload-label">
                {uploading ? '⏳' : '📷'}
              </label>
              <input
                id="image-upload"
                type="file"
                accept=".webp,.jpeg,.jpg,.png"
                onChange={handleImageUpload}
                disabled={uploading}
                style={{ display: 'none' }}
              />
            </div>

            {/* User Info */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {user.displayName || 'User'}
              </h3>
              <p className="text-gray-600 mb-4">
                {user.email || user.phoneNumber || 'No contact info'}
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">User ID:</span>
                  <span className="text-gray-800 font-mono text-sm">{user.uid.substring(0, 8)}...</span>
                </div>
                {user.email && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-gray-800 text-sm">{user.email}</span>
                  </div>
                )}
                {user.phoneNumber && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="text-gray-800 text-sm">{user.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default Dashboard;