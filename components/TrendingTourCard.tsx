import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Tour } from '../types';
import { PhotoIcon } from './icons/Icons';
import { useLanguage } from '../context/LanguageContext';
import { formatCurrency } from '../utils/formatters';

interface TrendingTourCardProps {
  tour: Tour;
}

const TrendingTourCard: React.FC<TrendingTourCardProps> = ({ tour }) => {
  const [imageError, setImageError] = useState(false);
  const { language, t } = useLanguage();

  return (
    <ReactRouterDOM.Link 
      to={`/tour/${tour.id}`} 
      className="relative block w-full aspect-[4/3] rounded-t-xl overflow-hidden shadow-lg transform hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60"
    >
      {imageError ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <PhotoIcon className="w-10 h-10 text-gray-400" />
          </div>
      ) : (
          <img className="w-full h-full object-cover" src={tour.imageUrl} alt={tour.title[language]} onError={() => setImageError(true)} />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      <div className="absolute bottom-0 right-0 bg-white/90 backdrop-blur-sm shadow-md rounded-tl-lg">
        <p className="text-gray-900 font-bold text-xs px-2 py-1">
            {formatCurrency(tour.price, t, false)}
        </p>
      </div>
    </ReactRouterDOM.Link>
  );
};

export default TrendingTourCard;