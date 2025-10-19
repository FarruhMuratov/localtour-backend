import React from 'react';
import { CurrencyDollarIcon, ArrowDownTrayIcon } from '../icons/Icons';
import { useLanguage } from '../../context/LanguageContext';
import { formatCurrency } from '../../utils/formatters';

// Mock data for finance
const financeSummary = {
  totalRevenue: 32510000,
  pendingPayout: 5380000,
  lastPayout: 30000000,
};

const mockTransactions = [
  { id: 'T001', date: '2024-08-12', description: 'Payout', amount: -30000000, type: 'payout' },
  { id: 'T002', date: '2024-08-12', description: 'Booking: Sunrise Mountain Hike', amount: 1200000, type: 'sale' },
  { id: 'T003', date: '2024-08-10', description: 'Booking: Coastal Kayaking Adventure', amount: 4050000, type: 'sale' },
  { id: 'T004', date: '2024-08-08', description: 'Booking: Gourmet Food & Wine Experience', amount: 5690000, type: 'sale' },
  { id: 'T005', date: '2024-08-05', description: 'Platform Fee - July 2024', amount: -1800000, type: 'fee' },
  { id: 'T006', date: '2024-08-01', description: 'Payout', amount: -35000000, type: 'payout' },
];

const PartnerFinance: React.FC = () => {
    const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(financeSummary.totalRevenue, t)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Pending Payout</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">{formatCurrency(financeSummary.pendingPayout, t)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Last Payout Amount</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(financeSummary.lastPayout, t)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Financials</h2>
            <button 
              onClick={() => alert('Withdrawal Initiated!')}
              className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Withdraw Funds
            </button>
        </div>
        
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {mockTransactions.map((transaction, transactionIdx) => (
              <li key={transaction.id}>
                <div className="relative pb-8">
                  {transactionIdx !== mockTransactions.length - 1 ? (
                    <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex space-x-3 items-center">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                        <CurrencyDollarIcon className={`h-5 w-5 ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`} aria-hidden="true" />
                      </span>
                    </div>
                    <div className="flex-grow flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-700">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                      <p className={`text-sm font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-800'}`}>
                        {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount, t)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PartnerFinance;