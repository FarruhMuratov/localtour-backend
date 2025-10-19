import React, { useState, useEffect } from 'react';
import { Tour } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { formatCurrency } from '../utils/formatters';
import {
  XMarkIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ClickIcon,
  PaymeIcon,
  PaynetIcon,
  UzumIcon
} from './icons/Icons';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: Tour;
  showCurrencySymbol?: boolean;
}

type Step = 'confirmation' | 'payment' | 'success';

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, tour, showCurrencySymbol = true }) => {
  // FIX: Destructure language to get the current language for translations.
  const { t, language } = useLanguage();
  const [step, setStep] = useState<Step>('confirmation');

  useEffect(() => {
    // Reset to confirmation step when modal is reopened
    if (isOpen) {
      setStep('confirmation');
    }

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

  const handleClose = () => {
    onClose();
  };
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setStep('success');
  };

  if (!isOpen) return null;

  const titles: Record<Step, string> = {
    confirmation: t('bookingModal.title.confirm'),
    payment: t('bookingModal.title.payment'),
    success: t('bookingModal.title.success'),
  };

  const renderConfirmation = () => (
    <>
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">{t('bookingModal.tourSummary')}</h3>
        <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
          {/* FIX: Use the localized title for the alt text. */}
          <img src={tour.imageUrl} alt={tour.title[language]} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
          <div className="flex-grow">
            {/* FIX: Use the localized title for the display text. */}
            <p className="font-bold text-gray-900">{tour.title[language]}</p>
            <p className="text-sm text-gray-500">{tour.location}</p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
          <span className="text-md font-medium text-gray-600">{t('bookingModal.price')}</span>
          <span className="text-2xl font-bold text-blue-600">{formatCurrency(tour.price, t, showCurrencySymbol)}</span>
        </div>
      </div>
      <footer className="p-4 bg-gray-50 border-t border-gray-200">
        <button
          onClick={() => setStep('payment')}
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('bookingModal.confirmAndPay')}
        </button>
      </footer>
    </>
  );

  const renderPayment = () => (
    <form onSubmit={handlePayment}>
        <div className="p-6 space-y-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
                <h4 className="font-semibold text-gray-800">{t('bookingModal.payWithCard')}</h4>
                <div className="relative">
                    <label htmlFor="cardNumber" className="sr-only">{t('bookingModal.cardNumber')}</label>
                    <input type="text" id="cardNumber" placeholder={t('bookingModal.cardNumber')} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                    <CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                         <label htmlFor="expiryDate" className="sr-only">{t('bookingModal.expiryDate')}</label>
                         <input type="text" id="expiryDate" placeholder={t('bookingModal.expiryDate')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="cvc" className="sr-only">{t('bookingModal.cvc')}</label>
                        <input type="text" id="cvc" placeholder={t('bookingModal.cvc')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                </div>
            </div>

            <div className="flex items-center text-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-sm text-gray-500">{t('bookingModal.orPayWith')}</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {[ClickIcon, PaymeIcon, PaynetIcon, UzumIcon].map((Icon, index) => (
                <button key={index} type="button" onClick={() => setStep('success')} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex justify-center items-center">
                    <Icon className="h-10 w-auto" />
                </button>
              ))}
            </div>
        </div>
         <footer className="p-4 bg-gray-50 border-t border-gray-200">
            <button
              type="submit"
              className="w-full flex justify-center items-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>{t('bookingModal.payNow')}</span>
              <span className="ml-2 font-semibold">{formatCurrency(tour.price, t, showCurrencySymbol)}</span>
            </button>
        </footer>
    </form>
  );

  const renderSuccess = () => (
      <>
        <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
            <CheckCircleIcon className="h-20 w-20 text-green-500"/>
            <h3 className="text-2xl font-bold text-gray-800">{t('bookingModal.paymentSuccess')}</h3>
            <p className="text-gray-600">{t('bookingModal.paymentSuccessMessage')}</p>
        </div>
         <footer className="p-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={handleClose}
              className="w-full bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {t('bookingModal.done')}
            </button>
        </footer>
      </>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-end sm:items-center" onClick={handleClose} role="dialog" aria-modal="true">
      <div
        className="bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-sm max-h-[90vh] flex flex-col transform transition-transform duration-300 translate-y-full sm:translate-y-0 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          {step === 'payment' ? (
              <button onClick={() => setStep('confirmation')} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 transition-colors" aria-label={t('bookingModal.back')}>
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
          ) : <div className="w-8"></div> }
          
          <h2 className="text-xl font-bold text-gray-800">{titles[step]}</h2>
          
          <button onClick={handleClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 transition-colors" aria-label="Close">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </header>
        
        <div className="overflow-y-auto">
            {step === 'confirmation' && renderConfirmation()}
            {step === 'payment' && renderPayment()}
            {step === 'success' && renderSuccess()}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;