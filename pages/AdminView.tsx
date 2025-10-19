import React, { useState, useMemo } from 'react';
import { useLanguage, TranslationKey } from '../context/LanguageContext';
import { usePartners } from '../context/PartnerContext';
import { useTours } from '../context/TourContext';
import { Partner, Tour, TourType, PartnerStatus } from '../types';
import { formatCurrency } from '../utils/formatters';
import { 
    ShieldCheckIcon, 
    UserGroupIcon, 
    EyeIcon, 
    MapPinIcon,
    TicketIcon,
    CurrencyDollarIcon,
    Squares2X2Icon,
    ChartBarIcon,
    ArchiveBoxIcon,
    StarIcon
} from '../components/icons/Icons';

// Mock data for analytics, as real booking data isn't tracked yet
const mockBookings = [
  { id: 'B001', tourName: 'Historic Downtown Walking Tour', partnerName: 'City Adventures Inc.', customer: 'Alice Johnson', date: '2024-08-15', guests: 2, status: 'Confirmed', total: 1140000 },
  { id: 'B002', tourName: 'Sunrise Mountain Hike', partnerName: 'Mountain Treks', customer: 'Bob Williams', date: '2024-08-12', guests: 1, status: 'Completed', total: 1200000 },
  { id: 'B003', tourName: 'Coastal Kayaking Adventure', partnerName: 'Coastal Explorers', customer: 'Charlie Brown', date: '2024-08-10', guests: 4, status: 'Completed', total: 4050000 },
  { id: 'B004', tourName: 'Historic Downtown Walking Tour', partnerName: 'City Adventures Inc.', customer: 'Diana Miller', date: '2024-08-18', guests: 2, status: 'Confirmed', total: 1140000 },
  { id: 'B005', tourName: 'Gourmet Food & Wine Experience', partnerName: 'Taste of the Town', customer: 'Eve Davis', date: '2024-07-25', guests: 3, status: 'Cancelled', total: 5690000 },
  { id: 'B006', tourName: 'Extreme Ziplining', partnerName: 'Adrenaline Junkies', customer: 'Frank White', date: '2024-08-20', guests: 2, status: 'Confirmed', total: 3040000 },
  { id: 'B007', tourName: 'Sunrise Mountain Hike', partnerName: 'Mountain Treks', customer: 'Grace Lee', date: '2024-07-15', guests: 2, status: 'Completed', total: 2400000 },
  { id: 'B008', tourName: 'City Park Picnic & Games', partnerName: 'Fun Times Co.', customer: 'Heidi Turner', date: '2024-07-22', guests: 5, status: 'Completed', total: 4740000 },
  { id: 'B009', tourName: 'Coastal Kayaking Adventure', partnerName: 'Coastal Explorers', customer: 'Ivan Wong', date: '2024-06-11', guests: 2, status: 'Completed', total: 2020000 },
  { id: 'B010', tourName: 'Historic Downtown Walking Tour', partnerName: 'City Adventures Inc.', customer: 'Judy Smith', date: '2024-06-30', guests: 3, status: 'Completed', total: 1710000 },
  { id: 'B011', tourName: 'Sunrise Mountain Hike', partnerName: 'Mountain Treks', customer: 'Kyle Broflovski', date: '2024-05-05', guests: 1, status: 'Completed', total: 1200000 },
  { id: 'B012', tourName: 'Gourmet Food & Wine Experience', partnerName: 'Taste of the Town', customer: 'Leo King', date: '2024-05-19', guests: 2, status: 'Completed', total: 3800000 },
  { id: 'B013', tourName: 'Extreme Ziplining', partnerName: 'Adrenaline Junkies', customer: 'Mia Clark', date: '2024-04-02', guests: 4, status: 'Completed', total: 6070000 },
];

// Reusable Switch component
const CustomSwitch: React.FC<{
  isChecked: boolean;
  onToggle: () => void;
  ariaLabel: string;
}> = ({ isChecked, onToggle, ariaLabel }) => (
    <button
      role="switch"
      aria-checked={isChecked}
      aria-label={ariaLabel}
      onClick={onToggle}
      className={`${
        isChecked ? 'bg-blue-600' : 'bg-gray-300'
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
    >
      <span
        aria-hidden="true"
        className={`${
          isChecked ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
);

const AnalyticsContent: React.FC = () => {
    const { t } = useLanguage();
    const { partners } = usePartners();
    const { tours } = useTours();

    const totalTours = tours.length;
    const activePartnersCount = partners.filter(p => p.status === 'Active').length;
    const totalRevenue = useMemo(() => mockBookings
        .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
        .reduce((sum, b) => sum + b.total, 0), []);
    const totalBookings = mockBookings.length;

    const kpiData: { titleKey: TranslationKey; value: string | number; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
        { titleKey: 'adminView.analytics.totalTours', value: totalTours, icon: Squares2X2Icon },
        { titleKey: 'adminView.analytics.activePartners', value: activePartnersCount, icon: UserGroupIcon },
        { titleKey: 'adminView.analytics.totalRevenue', value: formatCurrency(totalRevenue, t), icon: CurrencyDollarIcon },
        { titleKey: 'adminView.analytics.totalBookings', value: totalBookings, icon: TicketIcon },
    ];

    const monthlyBookingsData = useMemo(() => {
        const monthCounts = Array(12).fill(0).reduce((acc, _, i) => { acc[i] = 0; return acc; }, {} as Record<number, number>);
        mockBookings.forEach(booking => {
            const month = new Date(booking.date).getMonth();
            monthCounts[month]++;
        });
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const currentMonthIndex = new Date().getMonth();
        return Array.from({ length: 6 }, (_, i) => {
            const monthIndex = (currentMonthIndex - 5 + i + 12) % 12;
            return { month: monthNames[monthIndex], bookings: monthCounts[monthIndex] };
        });
    }, []);

    const tourPopularityData = useMemo(() => {
        const typeCounts = new Map<TourType, number>();
        tours.forEach(tour => {
            typeCounts.set(tour.type, (typeCounts.get(tour.type) || 0) + 1);
        });
        const colors: { [key in TourType]?: string } = {
            'Walking': '#3B82F6', 'Hiking': '#10B981', 'Adventure': '#F59E0B',
            'Kayaking': '#6366F1', 'Food': '#EC4899', 'Family': '#8B5CF6'
        };
        return Array.from(typeCounts.entries()).map(([type, count]) => ({
            type, value: count, color: colors[type] || '#6B7280'
        })).sort((a,b) => b.value - a.value);
    }, [tours]);

    const recentBookings = [...mockBookings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{t('adminView.analytics.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(item => (
                    <div key={item.titleKey} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <item.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">{t(item.titleKey)}</h3>
                            <p className="mt-1 text-2xl font-bold text-gray-900">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-gray-50/70 p-4 rounded-lg border">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('adminView.analytics.monthlyBookings')}</h3>
                    <BarChart data={monthlyBookingsData} />
                </div>
                <div className="lg:col-span-2 bg-gray-50/70 p-4 rounded-lg border">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('adminView.analytics.tourPopularity')}</h3>
                    <PieChart data={tourPopularityData} />
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('adminView.analytics.recentBookings')}</h3>
                <div className="overflow-x-auto bg-white rounded-lg border">
                     <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                             <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentBookings.map(booking => (
                                <tr key={booking.id}>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{booking.tourName}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{booking.partnerName}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{booking.customer}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-semibold text-gray-800">{formatCurrency(booking.total, t)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const PartnerManagementContent: React.FC = () => {
    const { t, language } = useLanguage();
    const { partners, updatePartnerStatus } = usePartners();
    const { tours, toggleFeaturedStatus, archiveTour } = useTours();
    const [expandedPartnerId, setExpandedPartnerId] = useState<string | null>(null);

    const partnerTourCounts = useMemo(() => {
        const counts = new Map<string, number>();
        tours.forEach(tour => {
            counts.set(tour.partnerId, (counts.get(tour.partnerId) || 0) + 1);
        });
        return counts;
    }, [tours]);

    const statusBadgeClass = (status: 'Active' | 'Blocked') => status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    
    return (
         <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('adminView.partnerManagement')}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('adminView.partner')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('adminView.status')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('adminView.tours')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('adminView.actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {partners.map(partner => (
                            <React.Fragment key={partner.id}>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{partner.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadgeClass(partner.status)}`}>{t(`partnerStatus.${partner.status}`)}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{partnerTourCounts.get(partner.id) || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4 flex items-center">
                                       <CustomSwitch isChecked={partner.status === 'Active'} onToggle={() => updatePartnerStatus(partner.id, partner.status === 'Active' ? 'Blocked' : 'Active')} ariaLabel={`Toggle status for ${partner.name}`} />
                                       <button 
                                            onClick={() => setExpandedPartnerId(id => id === partner.id ? null : partner.id)}
                                            className="flex items-center text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={(partnerTourCounts.get(partner.id) || 0) === 0} >
                                            <EyeIcon className="h-5 w-5 mr-1"/>
                                            {expandedPartnerId === partner.id ? t('adminView.hideTours') : t('adminView.viewTours')}
                                       </button>
                                    </td>
                                </tr>
                                {expandedPartnerId === partner.id && (
                                    <tr>
                                        <td colSpan={4} className="p-0">
                                            <div className="bg-blue-50/50 p-4 space-y-3">
                                                {tours.filter(t => t.partnerId === partner.id).map(tour => (
                                                    <div key={tour.id} className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-4">
                                                         <img src={tour.imageUrl} alt={tour.title[language]} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                                                         <div className="flex-grow">
                                                            <p className="font-semibold text-gray-800">{tour.title[language]}</p>
                                                            <p className="text-xs text-gray-500 mt-1">{language === 'en' ? tour.title.ru : tour.title.en}</p>
                                                         </div>
                                                         <div className="flex items-center gap-4">
                                                            <div className="flex items-center gap-2">
                                                                <label htmlFor={`featured-${tour.id}`} className="text-sm font-medium text-gray-600">{t('adminView.featured')}</label>
                                                                <CustomSwitch isChecked={!!tour.isFeatured} onToggle={() => toggleFeaturedStatus(tour.id)} ariaLabel={`Mark ${tour.title[language]} as featured`} />
                                                            </div>
                                                            <button onClick={() => archiveTour(tour.id)} title={t('adminView.archiveTour')} className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors">
                                                                <ArchiveBoxIcon className="h-5 w-5"/>
                                                            </button>
                                                         </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AdminView: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'analytics' | 'partners'>('analytics');
  
  const navItems = [
    { id: 'analytics', labelKey: 'adminView.tabs.analytics', icon: ChartBarIcon },
    { id: 'partners', labelKey: 'adminView.tabs.partners', icon: UserGroupIcon },
  ] as const;

  return (
    <div className="space-y-6">
       <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg"><ShieldCheckIcon className="h-8 w-8 text-blue-600"/></div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">{t('adminView.title')}</h1>
            <p className="mt-1 text-lg text-gray-600">{t('adminView.description')}</p>
          </div>
        </div>
        
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {navItems.map(item => (
                    <button key={item.id} onClick={() => setActiveTab(item.id)}
                        className={`${ activeTab === item.id ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' } group inline-flex items-center py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        <item.icon className="-ml-0.5 mr-2 h-5 w-5" />
                        <span>{t(item.labelKey)}</span>
                    </button>
                ))}
            </nav>
        </div>
        
        <div className="mt-6">
            {activeTab === 'analytics' && <AnalyticsContent />}
            {activeTab === 'partners' && <PartnerManagementContent />}
        </div>
    </div>
  );
};

// --- Chart Components (as they are simple and specific to this view) ---
const BarChart: React.FC<{ data: { month: string, bookings: number }[] }> = ({ data }) => {
  const maxBookings = Math.max(...data.map(d => d.bookings), 1);
  return (
    <div className="flex justify-around items-end h-64 bg-white p-4 rounded-lg border">
      {data.map(item => (
        <div key={item.month} className="flex flex-col items-center w-12">
          <div className="w-full bg-blue-500 rounded-t-md hover:bg-blue-600 transition-colors" style={{ height: `${(item.bookings / maxBookings) * 100}%` }} title={`${item.bookings} bookings`}/>
          <span className="text-xs font-medium text-gray-600 mt-2">{item.month}</span>
        </div>
      ))}
    </div>
  );
};

const PieChart: React.FC<{ data: { type: string, value: number, color: string }[] }> = ({ data }) => {
    const { t } = useLanguage();
    const total = data.reduce((acc, item) => acc + item.value, 0);
    if (total === 0) return <div className="flex items-center justify-center h-full text-gray-500">No tour data</div>;
    let cumulative = 0;
    return (
        <div className="flex items-center gap-6 h-full">
            <svg viewBox="0 0 100 100" className="w-40 h-40 transform -rotate-90">
                {data.map(item => {
                    const percentage = item.value / total;
                    const dashArray = `${percentage * 283} 283`; // Circumference of a circle with r=45
                    const dashOffset = -cumulative * 283;
                    cumulative += percentage;
                    return (
                        <circle key={item.type} cx="50" cy="50" r="45" fill="transparent" stroke={item.color} strokeWidth="10" strokeDasharray={dashArray} strokeDashoffset={dashOffset}/>
                    );
                })}
            </svg>
            <div className="space-y-2 flex-grow">
                {data.map(item => (
                    <div key={item.type} className="flex items-center text-sm">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                        <span className="font-medium text-gray-700">{t(`categories.${item.type.toLowerCase()}` as any)}</span>
                        <span className="ml-auto text-gray-500">{((item.value / total) * 100).toFixed(0)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default AdminView;