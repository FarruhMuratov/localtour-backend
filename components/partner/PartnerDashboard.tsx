import React, { useState } from 'react';
import { useTours } from '../../context/TourContext';
import { useLanguage } from '../../context/LanguageContext';
import TourForm from '../TourForm';
import { InformationCircleIcon, MapPinIcon, ArchiveBoxIcon, ArrowPathIcon, TrashIcon, PencilIcon, PlusIcon } from '../icons/Icons';
import ConfirmationModal from '../ConfirmationModal';
import { Tour } from '../../types';
import Modal from '../Modal';
import { formatCurrency } from '../../utils/formatters';

type ModalAction = 'archive' | 'restore' | 'delete';

const PartnerDashboard: React.FC = () => {
  const { tours, archivedTours, archiveTour, restoreTour, deleteTour } = useTours();
  const { t, language } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    action: ModalAction | null;
    tour: Tour | null;
  }>({ isOpen: false, action: null, tour: null });


  const openConfirmationModal = (tour: Tour, action: ModalAction) => {
    setModalState({ isOpen: true, tour, action });
  };

  const handleConfirm = () => {
    if (modalState.action && modalState.tour) {
      switch (modalState.action) {
        case 'archive':
          archiveTour(modalState.tour.id);
          break;
        case 'restore':
          restoreTour(modalState.tour.id);
          break;
        case 'delete':
          deleteTour(modalState.tour.id);
          break;
      }
    }
    handleClose();
  };
  
  const handleClose = () => {
    setModalState({ isOpen: false, tour: null, action: null });
  };

  const getModalContent = () => {
    if (!modalState.tour || !modalState.action) return { title: '', message: '', confirmVariant: 'primary' as const };
    
    const tourTitle = modalState.tour.title[language];
    switch (modalState.action) {
        case 'archive':
            return {
                title: t('modal.archive.title'),
                message: t('modal.archive.message', { title: tourTitle }),
                confirmVariant: 'primary' as const
            };
        case 'restore':
            return {
                title: t('modal.restore.title'),
                message: t('modal.restore.message', { title: tourTitle }),
                confirmVariant: 'primary' as const
            };
        case 'delete':
            return {
                title: t('modal.delete.title'),
                message: t('modal.delete.message', { title: tourTitle }),
                confirmVariant: 'danger' as const
            };
    }
  };


  return (
    <>
      <div className="space-y-8">
        <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{t('partnerView.currentListings')}</h2>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                {t('partnerView.addTour')}
              </button>
            </div>
            <div className="mt-4">
              {tours.length > 0 ? (
                  <ul className="space-y-4">
                      {tours.map(tour => (
                          <li key={tour.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row items-start md:items-center gap-4 transition-shadow hover:shadow-md">
                              <img src={tour.imageUrl} alt={tour.title[language]} className="w-full md:w-32 h-32 md:h-20 object-cover rounded-md flex-shrink-0" />
                              <div className="flex-grow">
                                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">{tour.title[language]}</h3>
                                  <p className="text-sm text-gray-500 mt-1">{language === 'en' ? tour.title.ru : tour.title.en}</p>
                              </div>
                              <div className="flex-shrink-0 w-full md:w-auto flex flex-row md:flex-col items-baseline md:items-end justify-between md:justify-center pt-2 md:pt-0 mt-2 md:mt-0 border-t md:border-none border-gray-100">
                                  <p className="text-lg font-bold text-blue-600">{formatCurrency(tour.price, t)}</p>
                                  <p className="text-sm text-gray-500">{tour.durationDays} {t('tourCard.days')}</p>
                              </div>
                              <div className="flex-shrink-0 flex items-center gap-1 self-start md:self-center">
                                  <button title={t('partnerView.editTour')} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                      <PencilIcon className="h-5 w-5"/>
                                  </button>
                                  <button onClick={() => openConfirmationModal(tour, 'archive')} title={t('partnerView.archiveTour')} className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors">
                                      <ArchiveBoxIcon className="h-5 w-5"/>
                                  </button>
                              </div>
                          </li>
                      ))}
                  </ul>
              ) : (
                    <div className="text-center py-12 flex flex-col items-center bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <InformationCircleIcon className="h-12 w-12 text-gray-300 mb-2"/>
                        <h3 className="text-lg font-semibold text-gray-700">{t('partnerView.noListings.title')}</h3>
                        <p className="text-gray-500 mt-1">{t('partnerView.noListings.description')}</p>
                    </div>
              )}
            </div>
        </div>

        {archivedTours.length > 0 && (
            <div>
                <h2 className="text-2xl font-bold text-gray-800">{t('partnerView.archivedTours')}</h2>
                <div className="mt-4">
                    <ul className="space-y-4">
                        {archivedTours.map(tour => (
                            <li key={tour.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row items-start md:items-center gap-4 opacity-80 hover:opacity-100 transition-opacity">
                                <img src={tour.imageUrl} alt={tour.title[language]} className="w-full md:w-32 h-32 md:h-20 object-cover rounded-md flex-shrink-0" />
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-600">{tour.title[language]}</h3>
                                    <p className="text-sm text-gray-500 flex items-center">
                                        <MapPinIcon className="h-4 w-4 mr-1.5"/> {tour.location}
                                    </p>
                                </div>
                                <div className="flex-shrink-0 w-full md:w-auto flex flex-row md:flex-col items-baseline md:items-end justify-between md:justify-center pt-2 md:pt-0 mt-2 md:mt-0 border-t md:border-none border-gray-100">
                                    <p className="text-lg font-bold text-gray-500">{formatCurrency(tour.price, t)}</p>
                                    <p className="text-sm text-gray-500">{tour.durationDays} {t('tourCard.days')}</p>
                                </div>
                                <div className="flex-shrink-0 flex items-center gap-1 self-start md:self-center">
                                  <button onClick={() => openConfirmationModal(tour, 'restore')} title={t('partnerView.restoreTour')} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                                      <ArrowPathIcon className="h-5 w-5"/>
                                  </button>
                                  <button onClick={() => openConfirmationModal(tour, 'delete')} title={t('partnerView.deleteTour')} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                                      <TrashIcon className="h-5 w-5"/>
                                  </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )}

      </div>
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={t('tourForm.title')}>
        <TourForm onSuccess={() => setIsFormOpen(false)} />
      </Modal>
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={getModalContent().title}
        confirmVariant={getModalContent().confirmVariant}
      >
        <p className="text-sm text-gray-500">{getModalContent().message}</p>
      </ConfirmationModal>
    </>
  );
};

export default PartnerDashboard;