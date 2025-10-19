import React from 'react';
import { ClipboardDocumentListIcon } from '../icons/Icons';
import { useLanguage } from '../../context/LanguageContext';
import { formatCurrency } from '../../utils/formatters';

// Mock data for bookings, updated to UZS
const mockBookings = [
  { id: 'B001', tourName: 'Historic Downtown Walking Tour', customer: 'Alice Johnson', date: '2024-08-15', guests: 2, status: 'Confirmed', total: 1140000 },
  { id: 'B002', tourName: 'Sunrise Mountain Hike', customer: 'Bob Williams', date: '2024-08-12', guests: 1, status: 'Completed', total: 1200000 },
  { id: 'B003', tourName: 'Coastal Kayaking Adventure', customer: 'Charlie Brown', date: '2024-08-10', guests: 4, status: 'Completed', total: 4040000 },
  { id: 'B004', tourName: 'Historic Downtown Walking Tour', customer: 'Diana Miller', date: '2024-08-18', guests: 2, status: 'Confirmed', total: 1140000 },
  { id: 'B005', tourName: 'Gourmet Food & Wine Experience', customer: 'Eve Davis', date: '2024-07-25', guests: 3, status: 'Cancelled', total: 5700000 },
  { id: 'B006', tourName: 'Extreme Ziplining', customer: 'Frank White', date: '2024-08-20', guests: 2, status: 'Confirmed', total: 3040000 },
];

const statusColors: { [key: string]: string } = {
  Confirmed: 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

const PartnerBookings: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Bookings</h2>
      
      {mockBookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.tourName}</div>
                    <div className="text-sm text-gray-500">{booking.guests} guest(s)</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">{formatCurrency(booking.total, t)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16 flex flex-col items-center">
            <ClipboardDocumentListIcon className="h-12 w-12 text-gray-300 mb-2"/>
            <h3 className="text-lg font-semibold text-gray-700">No Bookings Yet</h3>
            <p className="text-gray-500 mt-1">New bookings will appear here as they come in.</p>
        </div>
      )}
    </div>
  );
};

export default PartnerBookings;