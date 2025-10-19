import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Partner, PartnerStatus } from '../types';
import { INITIAL_PARTNERS } from '../constants';

interface PartnerContextType {
  partners: Partner[];
  updatePartnerStatus: (partnerId: string, status: PartnerStatus) => void;
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

const PARTNERS_STORAGE_KEY = 'localroam_partners';

const loadPartnersFromStorage = (): Partner[] => {
    try {
        const item = window.localStorage.getItem(PARTNERS_STORAGE_KEY);
        if (item) {
            return JSON.parse(item);
        }
        // If nothing in storage, initialize with default and save it.
        window.localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(INITIAL_PARTNERS));
        return INITIAL_PARTNERS;
    } catch (e) {
        console.error('Error loading partners from storage', e);
        return INITIAL_PARTNERS;
    }
}

export const PartnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [partners, setPartners] = useState<Partner[]>(loadPartnersFromStorage);

  useEffect(() => {
    try {
      window.localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(partners));
    } catch (error) {
      console.error("Failed to save partners to localStorage", error);
    }
  }, [partners]);

  const updatePartnerStatus = (partnerId: string, status: PartnerStatus) => {
    setPartners(currentPartners =>
      currentPartners.map(p =>
        p.id === partnerId ? { ...p, status } : p
      )
    );
  };

  return (
    <PartnerContext.Provider value={{ partners, updatePartnerStatus }}>
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartners = (): PartnerContextType => {
  const context = useContext(PartnerContext);
  if (!context) {
    throw new Error('usePartners must be used within a PartnerProvider');
  }
  return context;
};
