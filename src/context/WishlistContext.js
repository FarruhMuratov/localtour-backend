import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext(undefined);

const WISHLIST_STORAGE_KEY = 'localroam_wishlist';

const loadWishlistFromStorage = () => {
  try {
    const item = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    console.error('Error loading wishlist from storage', e);
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(loadWishlistFromStorage);

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error('Failed to save wishlist to localStorage', error);
    }
  }, [wishlist]);

  const addToWishlist = (tourId) => {
    setWishlist(current => {
      if (current.includes(tourId)) return current;
      return [...current, tourId];
    });
  };

  const removeFromWishlist = (tourId) => {
    setWishlist(current => current.filter(id => id !== tourId));
  };
  
  const isInWishlist = (tourId) => {
    return wishlist.includes(tourId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

