import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface WishlistContextType {
  wishlist: string[]; // Array of tour IDs
  addToWishlist: (tourId: string) => void;
  removeFromWishlist: (tourId: string) => void;
  isInWishlist: (tourId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'localroam_wishlist';

const loadWishlistFromStorage = (): string[] => {
    try {
        const item = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
        return item ? JSON.parse(item) : [];
    } catch (e) {
        console.error('Error loading wishlist from storage', e);
        return [];
    }
}

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<string[]>(loadWishlistFromStorage);

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage", error);
    }
  }, [wishlist]);

  const addToWishlist = (tourId: string) => {
    setWishlist(current => {
      if (current.includes(tourId)) return current;
      return [...current, tourId];
    });
  };

  const removeFromWishlist = (tourId: string) => {
    setWishlist(current => current.filter(id => id !== tourId));
  };
  
  const isInWishlist = (tourId: string): boolean => {
      return wishlist.includes(tourId);
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};