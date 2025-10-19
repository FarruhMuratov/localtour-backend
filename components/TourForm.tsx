import React, { useState } from 'react';
import { useTours } from '../context/TourContext';
import { useLanguage } from '../context/LanguageContext';
import { Tour, TourDifficulty, TourType } from '../types';
import { usePartners } from '../context/PartnerContext';

const DIFFICULTY_LEVELS: TourDifficulty[] = ['Easy', 'Moderate', 'Challenging'];
const TOUR_TYPES: TourType[] = ['Walking', 'Hiking', 'Food', 'Kayaking', 'Adventure', 'Family', 'Jeep', 'Relax', 'Weekend', 'History', 'City', 'Lake', 'Forest', 'River', 'Fishing', 'Desert', 'Authentic', 'Express', 'Abroad', 'Unique', 'Ladies', 'Islam', 'Men'];

interface TourFormProps {
  onSuccess?: () => void;
}

const TourForm: React.FC<TourFormProps> = ({ onSuccess }) => {
  const { addTour } = useTours();
  const { t, language } = useLanguage();
  const { partners } = usePartners();
  const activePartners = partners.filter(p => p.status === 'Active');
  
  const initialFormData = {
    partnerId: '',
    title: '',
    description: '',
    location: '',
    price: 0,
    durationDays: 0,
    difficulty: 'Moderate' as TourDifficulty,
    type: 'Adventure' as TourType,
    imageUrl: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inputClasses = "mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm";
  const labelClasses = "block text-sm font-medium text-gray-700";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'durationDays' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.price <= 0 || formData.durationDays <= 0 || !formData.title || !formData.partnerId || !formData.location || !formData.imageUrl) {
        alert("Please fill out all fields with valid values.");
        return;
    }
    
    const partner = partners.find(p => p.id === formData.partnerId);
    if (!partner) {
        alert("Please select a valid partner.");
        return;
    }

    setIsSubmitting(true);
    await addTour({
        ...formData,
        partnerName: partner.name,
    }, language);
    setIsSubmitting(false);
    
    setFormData(initialFormData);
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      if (onSuccess) {
        onSuccess();
      }
    }, 2500);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="partnerId" className={labelClasses}>{t('tourForm.partnerName')}</label>
          <select name="partnerId" id="partnerId" value={formData.partnerId} onChange={handleChange} required className={inputClasses}>
            <option value="" disabled>{t('tourForm.partnerSelect')}</option>
            {activePartners.map(partner => (
              <option key={partner.id} value={partner.id}>{partner.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="title" className={labelClasses}>{t('tourForm.tourTitle')}</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className={inputClasses}/>
        </div>
        <div>
          <label htmlFor="description" className={labelClasses}>{t('tourForm.description')}</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} required className={inputClasses}></textarea>
        </div>
        <div>
          <label htmlFor="imageUrl" className={labelClasses}>{t('tourForm.imageUrl')}</label>
          <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required placeholder={t('tourForm.imageUrl.placeholder')} className={inputClasses}/>
        </div>
         <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="difficulty" className={labelClasses}>{t('tourForm.difficulty')}</label>
              <select name="difficulty" id="difficulty" value={formData.difficulty} onChange={handleChange} className={inputClasses}>
                {DIFFICULTY_LEVELS.map(level => <option key={level} value={level}>{t(`difficulty.${level}`)}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="type" className={labelClasses}>{t('tourForm.tourType')}</label>
              <select name="type" id="type" value={formData.type} onChange={handleChange} className={inputClasses}>
                {TOUR_TYPES.map(type => <option key={type} value={type}>{t(`categories.${type.toLowerCase()}` as any)}</option>)}
              </select>
            </div>
        </div>
        <div>
          <label htmlFor="location" className={labelClasses}>{t('tourForm.location')}</label>
          <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required className={inputClasses}/>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className={labelClasses}>{t('tourForm.price')}</label>
            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} min="0" step="1000" required className={inputClasses}/>
          </div>
          <div>
            <label htmlFor="durationDays" className={labelClasses}>{t('tourForm.duration')}</label>
            <input type="number" name="durationDays" id="durationDays" value={formData.durationDays} onChange={handleChange} min="0" step="1" required className={inputClasses}/>
          </div>
        </div>
        <div>
            <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-gray-400">
                {isSubmitting ? t('tourForm.button.translating') : t('tourForm.button.add')}
            </button>
        </div>
        {isSubmitted && (
            <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
                {t('tourForm.success')}
            </div>
        )}
      </form>
    </div>
  );
};

export default TourForm;