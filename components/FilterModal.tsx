import React, { useEffect } from 'react';
import { TourDifficulty, TourType } from '../types';
import { XMarkIcon } from './icons/Icons';

const DIFFICULTY_LEVELS: TourDifficulty[] = ['Easy', 'Moderate', 'Challenging'];
const TOUR_TYPES: TourType[] = ['Walking', 'Hiking', 'Food', 'Kayaking', 'Adventure'];
const MAX_PRICE = 200;
const MAX_DURATION = 14;

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    price: number;
    duration: number;
    difficulty: string;
    type: string;
    date: string;
  };
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onReset: () => void;
  activeFilterCount: number;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, filters, onFilterChange, onReset, activeFilterCount }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-end sm:items-center" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col transform transition-transform duration-300 translate-y-full sm:translate-y-0 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 transition-colors" aria-label="Close filters">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </header>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="space-y-2">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Max Price: <span className="font-bold text-blue-600">${filters.price}</span></label>
            <input type="range" id="price" name="price" min="0" max={MAX_PRICE} value={filters.price} onChange={onFilterChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
          </div>

          <div className="space-y-2">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Max Duration: <span className="font-bold text-blue-600">{filters.duration} days</span></label>
            <input type="range" id="duration" name="duration" min="1" max={MAX_DURATION} value={filters.duration} onChange={onFilterChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
          </div>

          <div className="space-y-2">
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select id="difficulty" name="difficulty" value={filters.difficulty} onChange={onFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>All</option>
              {DIFFICULTY_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tour Type</label>
            <select id="type" name="type" value={filters.type} onChange={onFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option>All</option>
              {TOUR_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          
          <div className="space-y-2">
             <label htmlFor="date" className="block text-sm font-medium text-gray-700">Available on</label>
            <input type="date" id="date" name="date" value={filters.date} onChange={onFilterChange} className="mt-1 block w-full pl-3 pr-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"/>
          </div>
        </div>
        
        <footer className="flex items-center justify-between p-4 border-t border-gray-200 sticky bottom-0 bg-white">
          <button 
            onClick={onReset} 
            className="text-sm font-medium text-gray-700 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-700 transition-colors"
            disabled={activeFilterCount === 0}
          >
            Clear all
          </button>
          <button 
            onClick={onClose} 
            className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Show Tours
          </button>
        </footer>
      </div>
    </div>
  );
};

export default FilterModal;