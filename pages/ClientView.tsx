import React, { useState, useMemo, FC } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTours } from '../context/TourContext';
import { usePartners } from '../context/PartnerContext';
import { useLanguage, TranslationKey } from '../context/LanguageContext';
import { useWishlist } from '../context/WishlistContext';
import TourCard from '../components/TourCard';
import LanguageSwitcher from '../components/LanguageSwitcher';
import AIAgentModal from '../components/AIAgentModal';
import {
  MagnifyingGlassIcon,
  HeartIcon,
  SparklesIcon,
  HomeIcon,
  Squares2X2Icon,
  UserCircleIcon,
  ArrowLeftIcon,
  // New colored icons
  MountainIcon,
  WalkingIcon,
  FoodIcon,
  AdventureIcon,
  KayakingIcon,
  FamilyIcon,
  JeepIcon,
  RelaxIcon,
  WeekendIcon,
  HistoryIcon,
  CityIcon,
  LakeIcon,
  ForestIcon,
  RiverIcon,
  FishingIcon,
  DesertIcon,
  AuthenticIcon,
  ExpressIcon,
  AbroadIcon,
  UniqueIcon,
  LadiesIcon,
  IslamIcon,
  MenIcon
} from '../components/icons/Icons';
import { Tour, TourType } from '../types';
import TrendingTourCard from '../components/TrendingTourCard';

// --- Types ---
type SortOrder = 'rating-desc' | 'price-asc' | 'price-desc' | 'duration-asc';
type ClientViewMode = 'home' | 'catalog' | 'category' | 'wishlist';

interface ClientNavigationState {
  view: ClientViewMode;
  category: TourType | null;
}

// --- Category Data ---
const categories: { nameKey: TranslationKey; icon: FC<React.SVGProps<SVGSVGElement>>; type: TourType }[] = [
    { nameKey: 'categories.hiking', icon: MountainIcon, type: 'Hiking' },
    { nameKey: 'categories.walking', icon: WalkingIcon, type: 'Walking' },
    { nameKey: 'categories.food', icon: FoodIcon, type: 'Food' },
    { nameKey: 'categories.adventure', icon: AdventureIcon, type: 'Adventure' },
    { nameKey: 'categories.kayaking', icon: KayakingIcon, type: 'Kayaking' },
    { nameKey: 'categories.family', icon: FamilyIcon, type: 'Family' },
    { nameKey: 'categories.jeep', icon: JeepIcon, type: 'Jeep' },
    { nameKey: 'categories.relax', icon: RelaxIcon, type: 'Relax' },
    { nameKey: 'categories.weekend', icon: WeekendIcon, type: 'Weekend' },
    { nameKey: 'categories.history', icon: HistoryIcon, type: 'History' },
    { nameKey: 'categories.city', icon: CityIcon, type: 'City' },
    { nameKey: 'categories.lake', icon: LakeIcon, type: 'Lake' },
    { nameKey: 'categories.forest', icon: ForestIcon, type: 'Forest' },
    { nameKey: 'categories.river', icon: RiverIcon, type: 'River' },
    { nameKey: 'categories.fishing', icon: FishingIcon, type: 'Fishing' },
    { nameKey: 'categories.desert', icon: DesertIcon, type: 'Desert' },
    { nameKey: 'categories.authentic', icon: AuthenticIcon, type: 'Authentic' },
    { nameKey: 'categories.express', icon: ExpressIcon, type: 'Express' },
    { nameKey: 'categories.abroad', icon: AbroadIcon, type: 'Abroad' },
    { nameKey: 'categories.unique', icon: UniqueIcon, type: 'Unique' },
    { nameKey: 'categories.ladies', icon: LadiesIcon, type: 'Ladies' },
    { nameKey: 'categories.islam', icon: IslamIcon, type: 'Islam' },
    { nameKey: 'categories.men', icon: MenIcon, type: 'Men' },
];

// --- Main ClientView Component ---
const ClientView: React.FC = () => {
  const { tours } = useTours();
  const { partners } = usePartners();
  const { wishlist } = useWishlist();
  const { t } = useLanguage();
  const navigate = ReactRouterDOM.useNavigate();
  const [navState, setNavState] = useState<ClientNavigationState>({ view: 'home', category: null });
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);

  const activePartners = useMemo(() => 
    new Set(partners.filter(p => p.status === 'Active').map(p => p.id)), 
    [partners]
  );
  
  const availableTours = useMemo(() => tours.filter(tour => activePartners.has(tour.partnerId)), [tours, activePartners]);
  
  const wishlistedTours = useMemo(() => 
    availableTours.filter(tour => wishlist.includes(tour.id)), 
    [availableTours, wishlist]
  );

  const navItems = [
    { id: 'home', nameKey: 'clientNav.home', icon: HomeIcon },
    { id: 'catalog', nameKey: 'clientNav.catalog', icon: Squares2X2Icon },
    { id: 'wishlist', nameKey: 'clientNav.wishlist', icon: HeartIcon },
    { id: 'aiAgent', nameKey: 'clientNav.aiAgent', icon: SparklesIcon },
    { id: 'profile', nameKey: 'clientNav.profile', icon: UserCircleIcon },
  ] as const;
  
  const handleNavClick = (view: ClientViewMode) => {
    if (view === navState.view && view !== 'home') return; // Do nothing if already on the same view (except for home)
    setNavState({ view, category: null });
  };
  
  const handleSelectCategory = (category: TourType) => {
    setNavState({ view: 'category', category });
  };
  
  const renderContent = () => {
    switch (navState.view) {
      case 'catalog':
        return <CatalogContent onSelectCategory={handleSelectCategory} />;
      case 'category':
        return <CategoryToursContent category={navState.category!} onBack={() => setNavState({ view: 'catalog', category: null })} tours={availableTours} />;
      case 'wishlist':
        return <WishlistContent tours={wishlistedTours} />;
      case 'home':
      default:
        return <HomeContent tours={availableTours} onSelectCategory={handleSelectCategory} />;
    }
  };

  return (
    <>
    <div className="relative min-h-full bg-gray-50">
      <div className="pb-20"> {/* Padding for the fixed footer */}
        {renderContent()}
      </div>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm sm:max-w-5xl h-16 bg-white border-t border-gray-200 flex justify-around items-center shadow-t-md z-20">
        {navItems.map(({ id, nameKey, icon: Icon }) => {
          const isActive = navState.view === id;
          return (
            <button
              key={id}
              onClick={() => {
                if (id === 'profile') navigate('/profile');
                else if (id === 'aiAgent') setIsAgentModalOpen(true);
                else handleNavClick(id as ClientViewMode);
              }}
              className={`flex flex-col items-center justify-center w-full h-full text-xs transition-colors duration-200 ${
                isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span>{t(nameKey)}</span>
            </button>
          );
        })}
      </nav>
    </div>
    <AIAgentModal isOpen={isAgentModalOpen} tours={availableTours} onClose={() => setIsAgentModalOpen(false)} />
    </>
  );
};

// --- Sub-Components for ClientView ---

const HomeContent: React.FC<{ tours: Tour[]; onSelectCategory: (category: TourType) => void; }> = ({ tours, onSelectCategory }) => {
    const { t, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<TourType | 'All'>('All');
    const [sortOrder, setSortOrder] = useState<SortOrder>('rating-desc');

    const sortOptions: { value: SortOrder, labelKey: TranslationKey }[] = [
        { value: 'rating-desc', labelKey: 'clientView.sortOptions.ratingDesc' },
        { value: 'price-asc', labelKey: 'clientView.sortOptions.priceAsc' },
        { value: 'price-desc', labelKey: 'clientView.sortOptions.priceDesc' },
        { value: 'duration-asc', labelKey: 'clientView.sortOptions.durationAsc' },
    ];
    
    const trendingTours = useMemo(() => [...tours].sort((a, b) => b.rating - a.rating).slice(0, 6), [tours]);
    
    const displayedTours = useMemo(() => {
        const filtered = tours.filter(tour => {
            const matchesSearch = searchTerm ?
                tour.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                tour.location.toLowerCase().includes(searchTerm.toLowerCase())
                : true;
            const matchesCategory = selectedCategory === 'All' || tour.type === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        return [...filtered].sort((a, b) => {
            // Prioritize featured tours
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;

            // Then apply the user-selected sort order
            switch (sortOrder) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'duration-asc': return a.durationDays - b.durationDays;
                case 'rating-desc': default: return b.rating - a.rating;
            }
        });
    }, [tours, searchTerm, selectedCategory, sortOrder, language]);
    
    return <>
        <header className="px-4 pt-2 pb-4 space-y-2 bg-white shadow-sm sticky top-0 z-10">
            <div className="flex items-center justify-between">
                <div className="w-1/3"></div>
                <div className="text-center text-sm text-gray-500 w-1/3">{t('clientView.location')}</div>
                <div className="w-1/3 flex justify-end"><LanguageSwitcher /></div>
            </div>
            <div className="flex items-center gap-2">
                <div className="relative flex-grow">
                    <input type="text" placeholder={t('clientView.searchPlaceholder')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 transition-shadow" aria-label="Search tours"/>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MagnifyingGlassIcon className="h-5 w-5 text-gray-400" /></div>
                </div>
            </div>
        </header>
        
        <div className="mt-4">
             <div className="flex space-x-3 overflow-x-auto pb-2 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {categories.map(category => (
                     <div
                        key={category.nameKey}
                        onClick={() => onSelectCategory(category.type)}
                        className="flex flex-col items-center space-y-1.5 flex-shrink-0 w-14 text-center group cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectCategory(category.type); }}
                        aria-label={t(category.nameKey)}
                    >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm group-hover:shadow-md transition-shadow duration-200">
                          <category.icon className="h-7 w-7"/>
                        </div>
                        <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{t(category.nameKey)}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="mt-2 px-4">
            <div className="bg-violet-100 rounded-2xl p-3 overflow-hidden">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-gray-800">{t('clientView.trendingNow')}</h2>
                </div>
                <div className="flex space-x-3 overflow-x-auto -mx-3 px-3 -mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {trendingTours.map(tour => (
                        <div key={tour.id} className="flex-shrink-0 w-36 pb-4"><TrendingTourCard tour={tour} /></div>
                    ))}
                </div>
            </div>
        </div>

        <div className="px-4 mt-4">
            <div className="flex justify-between items-end">
                <h2 className="text-xl font-bold text-gray-800">{t('clientView.availableTours')}</h2>
                <select id="sort-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as SortOrder)} className="text-sm bg-gray-50 border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 pl-3 pr-8 py-1" aria-label={t('clientView.sortBy')}>
                    {sortOptions.map(option => <option key={option.value} value={option.value}>{t(option.labelKey)}</option>)}
                </select>
            </div>
        </div>

        <div className="px-4 pb-4 mt-2">
            {displayedTours.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {displayedTours.map(tour => <TourCard key={tour.id} tour={tour} showCurrencySymbol={false} />)}
                </div>
            ) : (
                <div className="text-center py-16"><h3 className="text-xl font-semibold text-gray-700">{t('clientView.noTours.title')}</h3></div>
            )}
        </div>
    </>;
};

const CatalogContent: React.FC<{ onSelectCategory: (category: TourType) => void; }> = ({ onSelectCategory }) => {
    const { t } = useLanguage();
    return <>
        <header className="px-4 pt-4 pb-4 bg-white shadow-sm sticky top-0 z-10 text-center">
            <h1 className="text-xl font-bold text-gray-800">{t('catalog.title')}</h1>
        </header>
        <div className="p-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {categories.map(category => (
                <div
                    key={category.nameKey}
                    onClick={() => onSelectCategory(category.type)}
                    className="flex flex-col items-center space-y-2 text-center group cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectCategory(category.type); }}
                    aria-label={t(category.nameKey)}
                >
                    <div className="w-full aspect-square rounded-2xl flex items-center justify-center bg-white shadow-sm group-hover:shadow-md transition-shadow duration-200">
                      <category.icon className="h-8 w-8"/>
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{t(category.nameKey)}</span>
                </div>
            ))}
        </div>
    </>;
};

const CategoryToursContent: React.FC<{ category: TourType; onBack: () => void; tours: Tour[]; }> = ({ category, onBack, tours }) => {
    const { t } = useLanguage();
    const categoryTours = useMemo(() => tours.filter(tour => tour.type === category), [tours, category]);
    const categoryName = t(`categories.${category.toLowerCase()}` as any);

    return <>
        <header className="px-4 py-3 bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10 flex items-center">
             <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 -ml-2" aria-label={t('common.back')}>
                <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-800 text-center flex-grow -mr-6">{t('tours.category.title', { category: categoryName })}</h1>
        </header>
        <div className="px-4 pb-4 mt-4">
          {categoryTours.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categoryTours.map(tour => <TourCard key={tour.id} tour={tour} showCurrencySymbol={false} />)}
            </div>
          ) : (
             <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-700">{t('clientView.noTours.title')}</h3>
                <p className="text-gray-500 mt-2">{t('clientView.noTours.description')}</p>
            </div>
          )}
        </div>
    </>;
};

const WishlistContent: React.FC<{ tours: Tour[] }> = ({ tours }) => {
    const { t } = useLanguage();
    return <>
        <header className="px-4 pt-4 pb-4 bg-white shadow-sm sticky top-0 z-10 text-center">
            <h1 className="text-xl font-bold text-gray-800">{t('wishlist.title')}</h1>
        </header>
        <div className="px-4 pb-4 mt-4">
          {tours.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {tours.map(tour => <TourCard key={tour.id} tour={tour} showCurrencySymbol={false} />)}
            </div>
          ) : (
             <div className="text-center py-24 flex flex-col items-center">
                <HeartIcon className="h-16 w-16 text-gray-300 mb-4"/>
                <h3 className="text-xl font-semibold text-gray-700">{t('wishlist.empty.title')}</h3>
                <p className="text-gray-500 mt-2 max-w-xs">{t('wishlist.empty.description')}</p>
            </div>
          )}
        </div>
    </>;
};

export default ClientView;