import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { GlobeAltIcon, BuildingStorefrontIcon, ShieldCheckIcon } from './icons/Icons';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import SettingsPanel from './SettingsPanel';


const Header: React.FC = () => {
  const activeLinkClass = "bg-blue-600 text-white";
  const inactiveLinkClass = "text-gray-700 hover:bg-blue-100 hover:text-blue-700";
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <GlobeAltIcon className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">LocalRoam</span>
          </div>
          <div className="flex items-center space-x-2">
            <nav className="flex items-center bg-gray-100 rounded-lg p-1">
              <ReactRouterDOM.NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive ? activeLinkClass : inactiveLinkClass
                  }`
                }
              >
                  <GlobeAltIcon className="h-5 w-5 mr-2" />
                  {t('header.clientView')}
              </ReactRouterDOM.NavLink>
              <ReactRouterDOM.NavLink
                to="/partner"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive ? activeLinkClass : inactiveLinkClass
                  }`
                }
              >
                  <BuildingStorefrontIcon className="h-5 w-5 mr-2" />
                  {t('header.partnerView')}
              </ReactRouterDOM.NavLink>
               <ReactRouterDOM.NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive ? activeLinkClass : inactiveLinkClass
                  }`
                }
              >
                  <ShieldCheckIcon className="h-5 w-5 mr-2" />
                  {t('header.adminView')}
              </ReactRouterDOM.NavLink>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;