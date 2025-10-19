import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { TourProvider } from './context/TourContext';
import { PartnerProvider } from './context/PartnerContext';
import { WishlistProvider } from './context/WishlistContext';
import { LanguageProvider } from './context/LanguageContext';
import ClientView from './pages/ClientView';
import PartnerView from './pages/PartnerView';
import TourDetailView from './pages/TourDetailView';
import ProfileView from './pages/ProfileView';
import AdminView from './pages/AdminView';

const AppContent: React.FC = () => {
  return (
    <div className="w-full max-w-sm sm:max-w-5xl bg-gray-50 flex flex-col min-h-screen shadow-lg">
      <main className="flex-grow overflow-y-auto">
        <ReactRouterDOM.Routes>
          <ReactRouterDOM.Route path="/" element={<ClientView />} />
          <ReactRouterDOM.Route path="/tour/:id" element={<TourDetailView />} />
          <ReactRouterDOM.Route path="/partner" element={<PartnerView />} />
          <ReactRouterDOM.Route path="/profile" element={<ProfileView />} />
          <ReactRouterDOM.Route path="/admin" element={<AdminView />} />
        </ReactRouterDOM.Routes>
      </main>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <TourProvider>
        <WishlistProvider>
          <PartnerProvider>
            <ReactRouterDOM.HashRouter>
              <div className="min-h-screen bg-gray-100 flex justify-center p-0 sm:p-4">
                <AppContent />
              </div>
            </ReactRouterDOM.HashRouter>
          </PartnerProvider>
        </WishlistProvider>
      </TourProvider>
    </LanguageProvider>
  );
};

export default App;

