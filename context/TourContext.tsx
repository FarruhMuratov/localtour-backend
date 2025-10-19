import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Tour, LocalizedString } from '../types';
import { INITIAL_TOURS } from '../constants';
import { Language, useLanguage } from './LanguageContext';

type TourCreationData = Omit<Tour, 'id' | 'availableDates' | 'rating' | 'title' | 'description'> & {
    title: string;
    description: string;
};

interface TourContextType {
  tours: Tour[];
  archivedTours: Tour[];
  isLoading: boolean; // Add loading state
  addTour: (tour: TourCreationData, sourceLanguage: Language) => Promise<void>;
  archiveTour: (id: string) => void;
  restoreTour: (id: string) => void;
  deleteTour: (id: string) => void;
  toggleFeaturedStatus: (id: string) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

const TOURS_STORAGE_KEY = 'localroam_tours';
const ARCHIVED_TOURS_STORAGE_KEY = 'localroam_archived_tours';

const loadFromStorage = (key: string, defaultData: Tour[] = [], persistDefault = false): Tour[] => {
    try {
        const item = window.localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        }
        if (persistDefault) {
            window.localStorage.setItem(key, JSON.stringify(defaultData));
        }
        return defaultData;
    } catch (e) {
        console.error(`Error loading from storage for key ${key}`, e);
        return defaultData;
    }
}

export const TourProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [archivedTours, setArchivedTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Start in loading state

  useEffect(() => {
    // Simulate loading from an API
    const timer = setTimeout(() => {
      const loadedTours = loadFromStorage(TOURS_STORAGE_KEY, INITIAL_TOURS, true);
      
      const migratedTours = loadedTours
        .map(tour => {
          // Migration for old data structure
          if (typeof (tour as any).title === 'string') {
            const oldTour = tour as any;
            const initialTour = INITIAL_TOURS.find(it => it.id === oldTour.id);
            // If it's a default tour, use the proper translations from constants
            if (initialTour) return initialTour;
            // Otherwise, duplicate the English text for user-added tours
            return {
              ...oldTour,
              title: { en: oldTour.title, ru: oldTour.title },
              description: { en: oldTour.description, ru: oldTour.description },
            } as Tour;
          }
          return tour as Tour;
        })
         .map(tour => ({ // Migration from durationHours to durationDays
          ...tour,
          durationDays: (tour as any).durationDays || (tour as any).durationHours || 1,
          durationHours: undefined,
         }))
        .filter(tour => tour && tour.id && tour.title && typeof tour.title === 'object' && tour.description && typeof tour.description === 'object')
        .map(tour => ({ // Final sanitization
          ...tour,
          price: Number(tour.price) || 0,
          rating: Number(tour.rating) || 0,
          isFeatured: !!tour.isFeatured,
        }));

      setTours(migratedTours);
      setArchivedTours(loadFromStorage(ARCHIVED_TOURS_STORAGE_KEY, []));
      setIsLoading(false); // End loading state
    }, 1500); // Simulate a 1.5 second network request

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
        try {
            if (event.key === TOURS_STORAGE_KEY) {
                setTours(event.newValue ? JSON.parse(event.newValue) : INITIAL_TOURS);
            }
            if (event.key === ARCHIVED_TOURS_STORAGE_KEY) {
                setArchivedTours(event.newValue ? JSON.parse(event.newValue) : []);
            }
        } catch (e) {
            console.error("Error parsing storage update:", e);
        }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addTour = async (tourData: TourCreationData, sourceLanguage: Language) => {
    const targetLanguage = sourceLanguage === 'en' ? 'ru' : 'en';
    const targetLanguageFullName = targetLanguage === 'ru' ? 'Russian' : 'English';

    const textToTranslate = JSON.stringify({
        title: tourData.title,
        description: tourData.description,
    });
    
    let translatedTitle = `(Translation pending) ${tourData.title}`;
    let translatedDescription = `(Translation pending) ${tourData.description}`;

    try {
        const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY as string });
        const schema = {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: 'Translated title' },
                description: { type: Type.STRING, description: 'Translated description' },
            },
            required: ['title', 'description']
        };
        const prompt = `Translate the following JSON object's values to ${targetLanguageFullName}. Provide ONLY the translated JSON object in your response, with no extra text or markdown.\n\n${textToTranslate}`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });
        
        const jsonResponse = JSON.parse(response.text);
        translatedTitle = jsonResponse.title;
        translatedDescription = jsonResponse.description;
    } catch (e) {
        console.error("Gemini translation failed:", e);
    }
    
    const newTour: Tour = {
        ...tourData,
        id: new Date().getTime().toString(),
        // FIX: Cast to unknown first to satisfy TypeScript when using computed property names for specific types.
        title: {
            [sourceLanguage]: tourData.title,
            [targetLanguage]: translatedTitle,
        } as unknown as LocalizedString,
        // FIX: Cast to unknown first to satisfy TypeScript when using computed property names for specific types.
        description: {
            [sourceLanguage]: tourData.description,
            [targetLanguage]: translatedDescription,
        } as unknown as LocalizedString,
        availableDates: [],
        rating: 0,
        isFeatured: false,
    };
    
    setTours(currentTours => {
      const updatedTours = [newTour, ...currentTours];
      try {
        window.localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(updatedTours));
      } catch (error) {
        console.error("Failed to save tours to localStorage", error);
      }
      return updatedTours;
    });
  };

  const archiveTour = (id: string) => {
    const tourToArchive = tours.find(tour => tour.id === id);
    if (!tourToArchive) return;

    setTours(current => {
      const updatedTours = current.filter(tour => tour.id !== id);
      window.localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(updatedTours));
      return updatedTours;
    });

    setArchivedTours(current => {
      const updatedArchived = [tourToArchive, ...current];
      window.localStorage.setItem(ARCHIVED_TOURS_STORAGE_KEY, JSON.stringify(updatedArchived));
      return updatedArchived;
    });
  };

  const restoreTour = (id: string) => {
    const tourToRestore = archivedTours.find(tour => tour.id === id);
    if (!tourToRestore) {
        console.error("Tour to restore not found in archive");
        return;
    }

    setArchivedTours(current => {
        const updated = current.filter(t => t.id !== id);
        window.localStorage.setItem(ARCHIVED_TOURS_STORAGE_KEY, JSON.stringify(updated));
        return updated;
    });

    setTours(current => {
        const updated = [tourToRestore, ...current];
        window.localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(updated));
        return updated;
    });
  };

  const deleteTour = (id: string) => {
    setArchivedTours(current => {
      const updated = current.filter(tour => tour.id !== id);
      window.localStorage.setItem(ARCHIVED_TOURS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFeaturedStatus = (id: string) => {
    setTours(currentTours => {
        const updatedTours = currentTours.map(tour =>
            tour.id === id ? { ...tour, isFeatured: !tour.isFeatured } : tour
        );
        window.localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(updatedTours));
        return updatedTours;
    });
  };


  return (
    <TourContext.Provider value={{ tours, archivedTours, isLoading, addTour, archiveTour, restoreTour, deleteTour, toggleFeaturedStatus }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTours = (): TourContextType => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTours must be used within a TourProvider');
  }
  return context;
};