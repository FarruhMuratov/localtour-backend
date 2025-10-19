import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTours } from '../context/TourContext';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeftIcon, ClockIcon, MapPinIcon, PhotoIcon, StarIcon } from '../components/icons/Icons';
import BookingModal from '../components/BookingModal';
import { formatCurrency } from '../utils/formatters';
import { Swiper, SwiperSlide } from 'swiper/react';
import Accordion, { AccordionItem } from '../components/Accordion';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const TourDetailView: React.FC = () => {
  const { id } = ReactRouterDOM.useParams<{ id: string }>();
  const { tours } = useTours();
  const navigate = ReactRouterDOM.useNavigate();
  const { t, language } = useLanguage();
  const [imageError, setImageError] = React.useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false);

  const tour = tours.find(t => t.id === id);

  if (!tour) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white">
        <h2 className="text-2xl font-bold text-gray-800">{t('tourDetail.notFound.title')}</h2>
        <p className="text-gray-500 mt-2">{t('tourDetail.notFound.description')}</p>
        <button onClick={() => navigate('/')} className="mt-6 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
          {t('tourDetail.notFound.button')}
        </button>
      </div>
    );
  }

  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Moderate: 'bg-yellow-100 text-yellow-800',
    Challenging: 'bg-red-100 text-red-800',
  };

  return (
    <>
        <div className="relative min-h-full bg-white">
            <div className="pb-24"> {/* Padding for the fixed footer */}
                <header className="relative h-64 md:h-80 bg-gray-200">
                    <Swiper 
                        modules={[Pagination]} 
                        pagination={{ clickable: true }} 
                        className="w-full h-full"
                    >
                        <SwiperSlide>
                            <img src={tour.imageUrl} alt={tour.title[language]} className="w-full h-full object-cover" onError={() => setImageError(true)} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://via.placeholder.com/800x600/cccccc/808080?Text=Tour+Image+2" alt="Placeholder image 2" className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://via.placeholder.com/800x600/cccccc/808080?Text=Tour+Image+3" alt="Placeholder image 3" className="w-full h-full object-cover" />
                        </SwiperSlide>
                    </Swiper>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none"></div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:bg-gray-200 transition-colors z-20"
                        aria-label={t('common.back')}
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                </header>

                <main className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                        <h1 className="text-3xl font-bold text-gray-900 leading-tight">{tour.title[language]}</h1>
                        <div className="flex-shrink-0 flex items-center gap-1 bg-gray-100 px-2.5 py-1.5 rounded-full">
                            <StarIcon className="h-5 w-5 text-yellow-500" />
                            <span className="text-sm font-bold text-gray-700">{(Number(tour.rating) || 0).toFixed(1)}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${difficultyColor[tour.difficulty]}`}>
                            {t(`difficulty.${tour.difficulty}`)}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                            {t(`categories.${tour.type.toLowerCase()}` as any)}
                        </span>
                    </div>

                    <div className="text-gray-600 space-y-2 border-t border-b border-gray-100 py-4">
                        <div className="flex items-center">
                            <MapPinIcon className="h-5 w-5 mr-2 text-gray-400"/>
                            <span>{tour.location}</span>
                        </div>
                        <div className="flex items-center">
                            <ClockIcon className="h-5 w-5 mr-2 text-gray-400"/>
                            <span>{tour.durationDays} {t('tourCard.days')}</span>
                        </div>
                    </div>

                    <Accordion>
                        <AccordionItem title={t('tourDetail.about')} isOpen={true}>
                            <p className="leading-relaxed">{tour.description[language]}</p>
                        </AccordionItem>
                        <AccordionItem title={t('tourDetail.itinerary')}>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Day 1: Arrival in Tashkent, transfer to hotel.</li>
                                <li>Day 2: Full day city tour of Samarkand.</li>
                                <li>Day 3: Departure.</li>
                            </ul>
                        </AccordionItem>
                        <AccordionItem title={t('tourDetail.included')}>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Accommodation in a 3-star hotel.</li>
                                <li>Breakfast every day.</li>
                                <li>All transfers.</li>
                                <li>A professional guide.</li>
                            </ul>
                        </AccordionItem>
                    </Accordion>
                </main>
            </div>

            <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 flex justify-between items-center p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] animate-slide-up-footer">
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-blue-600">{formatCurrency(tour.price, t, false)}</span>
                    <p className="text-sm text-gray-500">{t('tourCard.perPerson')}</p>
                </div>
                <button 
                    onClick={() => setIsBookingModalOpen(true)}
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform hover:scale-105"
                >
                    {t('tourDetail.bookNow')}
                </button>
            </footer>
        </div>
        <BookingModal 
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
            tour={tour}
            showCurrencySymbol={false}
        />
    </>
  );
};

export default TourDetailView;