import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Tour } from '../types';
import { MapPinIcon, ClockIcon, StarIcon, HeartIcon, HeartIconSolid, PhotoIcon } from './icons/Icons';
import { useLanguage } from '../context/LanguageContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/formatters';

interface TourCardProps {
  tour: Tour;
  showCurrencySymbol?: boolean;
}

const TourCard: React.FC<TourCardProps> = ({ tour, showCurrencySymbol = true }) => {
  const { t, language } = useLanguage();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  const isWishlisted = isInWishlist(tour.id);

  const handleWishlistToggle = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isWishlisted) {
      removeFromWishlist(tour.id);
    } else {
      addToWishlist(tour.id);
    }
  };

  const handleDoubleClick = () => {
    if (!isWishlisted) {
      addToWishlist(tour.id);
    }
    setShowHeartAnimation(true);
    setTimeout(() => {
      setShowHeartAnimation(false);
    }, 1000);
  };

  // Adjust padding based on language to make button widths more visually consistent
  const bookButtonPadding = language === 'ru' ? 'px-4' : 'px-5';

  return (
    <ReactRouterDOM.Link to={`/tour/${tour.id}`} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60">
      <div className="relative aspect-square" onDoubleClick={handleDoubleClick}>
        {imageError ? (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <PhotoIcon className="w-12 h-12 text-gray-400" />
            </div>
        ) : (
            <img className="w-full h-full object-cover" src={tour.imageUrl} alt={tour.title[language]} onError={() => setImageError(true)} />
        )}
        
        {showHeartAnimation && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                <HeartIconSolid className="h-16 w-16 text-white drop-shadow-lg animate-ping" style={{ animationIterationCount: 1 }}/>
            </div>
        )}

        <button 
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full transition-colors ${ isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`} 
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
        >
          { isWishlisted 
            ? <HeartIconSolid className="h-5 w-5" /> 
            : <HeartIcon className="h-5 w-5" /> }
        </button>
        
        <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm pl-1 pr-1.5 py-1 rounded-full flex items-center gap-0.5">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {(Number(tour.rating) || 0).toFixed(1)}
            </span>
        </div>

        {tour.isFeatured && (
          <span className="absolute bottom-2 right-2 bg-yellow-300 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-md">
              {t('tourCard.featured')}
          </span>
        )}
        
      </div>

      <div className="px-3 pt-2 pb-2 flex-grow flex flex-col">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 h-10 mb-1">
            {tour.title[language]}
        </h3>
        
        <div className="flex items-center text-xs text-gray-500 mt-auto space-x-2">
            <div className="flex items-center min-w-0">
                <MapPinIcon className="h-3 w-3 mr-1 text-gray-400 flex-shrink-0"/>
                <span className="truncate">{tour.location}</span>
            </div>
            <div className="flex items-center flex-shrink-0">
                <ClockIcon className="h-3 w-3 mr-1 text-gray-400"/>
                <span>{tour.durationDays} {t('tourCard.days')}</span>
            </div>
        </div>

        <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-100">
          <div className="leading-tight">
            <span className="text-base font-bold text-blue-600">
              {formatCurrency(tour.price, t, showCurrencySymbol)}
            </span>
            <span className="block text-xs font-normal text-gray-500 -mt-1.5">{t('tourCard.perPerson')}</span>
          </div>
          <div className={`bg-blue-600 text-white font-semibold py-1 ${bookButtonPadding} text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center`}>
            {t('tourCard.book')}
          </div>
        </div>
      </div>
       <style>{`
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
       `}</style>
    </ReactRouterDOM.Link>
  );
};

export default TourCard;