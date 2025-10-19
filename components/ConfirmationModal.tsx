import React, { useEffect } from 'react';
import { XMarkIcon } from './icons/Icons';
import { useLanguage } from '../context/LanguageContext';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  confirmVariant?: 'primary' | 'danger';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmVariant = 'primary'
}) => {
  const { t } = useLanguage();

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
  
  const confirmButtonClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white',
      danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white'
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="confirmation-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-transform duration-300 scale-95 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ animationName: 'scale-in', animationDuration: '0.2s', animationTimingFunction: 'ease-out', animationFillMode: 'forwards' }}
      >
        <div className="p-6">
            <h2 id="confirmation-title" className="text-lg font-semibold text-gray-900">{title}</h2>
            <div className="mt-2">
                {children}
            </div>
        </div>
        <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={onClose}
            type="button"
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t('confirmationModal.cancel')}
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${confirmButtonClasses[confirmVariant]}`}
          >
            {t('confirmationModal.confirm')}
          </button>
        </div>
      </div>
       <style>{`
        @keyframes scale-in {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
       `}</style>
    </div>
  );
};

export default ConfirmationModal;
