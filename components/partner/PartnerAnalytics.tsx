import React from 'react';
import { StarIcon } from '../icons/Icons'; // Assuming StarIcon is available
import { useLanguage } from '../../context/LanguageContext';
import { formatCurrency } from '../../utils/formatters';

// Mock data for analytics
const kpiData = {
  totalBookings: 132,
  totalRevenue: 32510000,
  averageRating: 4.8,
};

const monthlyBookings = [
  { month: 'Apr', bookings: 20 },
  { month: 'May', bookings: 35 },
  { month: 'Jun', bookings: 45 },
  { month: 'Jul', bookings: 28 },
  { month: 'Aug', bookings: 4 },
];

const tourPopularity = [
  { type: 'Walking', value: 35, color: '#3B82F6' },
  { type: 'Hiking', value: 25, color: '#10B981' },
  { type: 'Adventure', value: 20, color: '#F59E0B' },
  { type: 'Kayaking', value: 15, color: '#6366F1' },
  { type: 'Food', value: 5, color: '#EC4899' },
];

const BarChart: React.FC<{ data: { month: string, bookings: number }[] }> = ({ data }) => {
  const maxBookings = Math.max(...data.map(d => d.bookings));
  return (
    <div className="flex justify-around items-end h-64 bg-gray-50 p-4 rounded-lg">
      {data.map(item => (
        <div key={item.month} className="flex flex-col items-center w-12">
          <div 
            className="w-full bg-blue-500 rounded-t-md hover:bg-blue-600 transition-colors" 
            style={{ height: `${(item.bookings / maxBookings) * 100}%` }}
            title={`${item.bookings} bookings`}
          />
          <span className="text-xs font-medium text-gray-600 mt-2">{item.month}</span>
        </div>
      ))}
    </div>
  );
};

const PieChart: React.FC<{ data: { type: string, value: number, color: string }[] }> = ({ data }) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    let cumulative = 0;

    return (
        <div className="flex items-center gap-6">
            <svg viewBox="0 0 100 100" className="w-48 h-48 transform -rotate-90">
                {data.map(item => {
                    const percentage = item.value / total;
                    const dashArray = `${percentage * 314} 314`;
                    const dashOffset = -cumulative * 314;
                    cumulative += percentage;
                    return (
                        <circle
                            key={item.type}
                            cx="50" cy="50" r="50"
                            fill="transparent"
                            stroke={item.color}
                            strokeWidth="32"
                            strokeDasharray={dashArray}
                            strokeDashoffset={dashOffset}
                        />
                    );
                })}
            </svg>
            <div className="space-y-2">
                {data.map(item => (
                    <div key={item.type} className="flex items-center text-sm">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                        <span className="font-medium text-gray-700">{item.type}</span>
                        <span className="ml-auto text-gray-500">{((item.value / total) * 100).toFixed(0)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const PartnerAnalytics: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{kpiData.totalBookings}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(kpiData.totalRevenue, t)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
          <div className="flex items-baseline mt-2">
              <p className="text-3xl font-bold text-gray-900">{kpiData.averageRating.toFixed(1)}</p>
              <StarIcon className="h-5 w-5 text-yellow-400 ml-1 mb-1"/>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Bookings per Month</h3>
            <BarChart data={monthlyBookings} />
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tour Popularity</h3>
            <PieChart data={tourPopularity} />
        </div>
      </div>
    </div>
  );
};

export default PartnerAnalytics;