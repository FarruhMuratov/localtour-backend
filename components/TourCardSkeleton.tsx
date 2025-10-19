import React from 'react';

const TourCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <div className="relative aspect-square bg-gray-200 animate-pulse"></div>
      <div className="px-3 pt-2 pb-2 flex-grow flex flex-col">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
        
        <div className="flex items-center text-xs text-gray-500 mt-auto space-x-2">
            <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          <div className="leading-tight w-1/2">
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-1 animate-pulse"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded-lg w-1/3 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default TourCardSkeleton;

