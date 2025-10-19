import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeftOnRectangleIcon, BuildingStorefrontIcon, ChartBarIcon, CurrencyDollarIcon, CalendarDaysIcon, Squares2X2Icon, SparklesIcon } from '../components/icons/Icons';
import PartnerAuth from '../components/PartnerAuth';
import PartnerDashboard from '../components/partner/PartnerDashboard';
import PartnerBookings from '../components/partner/PartnerBookings';
import PartnerFinance from '../components/partner/PartnerFinance';
import PartnerAnalytics from '../components/partner/PartnerAnalytics';
import ImageEditor from './ImageEditor';
import { TranslationKey } from '../translations';

interface PartnerUser {
    name: string;
    email: string;
    phone: string;
}

type ActiveTab = 'dashboard' | 'bookings' | 'finance' | 'analytics' | 'aiEditor';

const PartnerView: React.FC = () => {
  const { t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<PartnerUser | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  useEffect(() => {
    // Check for logged-in user in localStorage on component mount
    const storedUser = localStorage.getItem('localroam_partner_user');
    if (storedUser) {
        try {
            setCurrentUser(JSON.parse(storedUser));
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            localStorage.removeItem('localroam_partner_user');
        }
    }
  }, []);

  const handleLoginSuccess = (user: PartnerUser) => {
    setCurrentUser(user);
    localStorage.setItem('localroam_partner_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('localroam_partner_user');
  };
  
  const navItems: {id: ActiveTab, labelKey: TranslationKey, icon: React.FC<React.SVGProps<SVGSVGElement>>}[] = [
    { id: 'dashboard', labelKey: 'partnerView.tabs.dashboard', icon: Squares2X2Icon },
    { id: 'bookings', labelKey: 'partnerView.tabs.bookings', icon: CalendarDaysIcon },
    { id: 'finance', labelKey: 'partnerView.tabs.finance', icon: CurrencyDollarIcon },
    { id: 'analytics', labelKey: 'partnerView.tabs.analytics', icon: ChartBarIcon },
    { id: 'aiEditor', labelKey: 'partnerView.tabs.aiEditor', icon: SparklesIcon },
  ];

  if (!currentUser) {
    return <PartnerAuth onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                  <BuildingStorefrontIcon className="h-8 w-8 text-blue-600"/>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 tracking-tight">{t('partnerView.title')}</h1>
                <p className="mt-1 text-lg text-gray-600">Welcome, <span className="font-semibold">{currentUser.name}!</span></p>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              title="Log Out"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1"/>
              Logout
            </button>
        </div>
        
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`${
                            activeTab === item.id
                                ? 'border-blue-600 text-blue-700'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } group inline-flex items-center py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        <item.icon className="-ml-0.5 mr-2 h-5 w-5" />
                        <span>{t(item.labelKey)}</span>
                    </button>
                ))}
            </nav>
        </div>

        <div className="mt-6">
            {activeTab === 'dashboard' && <PartnerDashboard />}
            {activeTab === 'bookings' && <PartnerBookings />}
            {activeTab === 'finance' && <PartnerFinance />}
            {activeTab === 'analytics' && <PartnerAnalytics />}
            {activeTab === 'aiEditor' && <ImageEditor />}
        </div>
    </div>
  );
};

export default PartnerView;