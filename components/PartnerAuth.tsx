import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BuildingStorefrontIcon, UserIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon, ChevronDownIcon } from './icons/Icons';

interface PartnerAuthProps {
  onLoginSuccess: (user: { name: string; email: string; phone: string }) => void;
}

interface Country {
  name: string;
  code: string;
  dial_code: string;
  phone_length: number;
}

const selectableCountries: Country[] = [
  { name: 'Uzbekistan', code: 'UZ', dial_code: '+998', phone_length: 9 },
  { name: 'Kazakhstan', code: 'KZ', dial_code: '+7', phone_length: 10 },
  { name: 'Kyrgyzstan', code: 'KG', dial_code: '+996', phone_length: 9 },
  { name: 'Tajikistan', code: 'TJ', dial_code: '+992', phone_length: 9 },
  { name: 'Turkmenistan', code: 'TM', dial_code: '+993', phone_length: 8 },
  { name: 'Russia', code: 'RU', dial_code: '+7', phone_length: 10 },
];

const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const PartnerAuth: React.FC<PartnerAuthProps> = ({ onLoginSuccess }) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    identifier: '', // For login
  });

  const defaultCountry = selectableCountries[0];
  const [selectedCountry, setSelectedCountry] = useState<Country>(defaultCountry);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [error, setError] = useState('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = e.target.value.replace(/\D/g, '');
    const maxLength = selectedCountry.phone_length;
    if (formattedNumber.length <= maxLength) {
        setPhoneNumber(formattedNumber);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!formData.identifier || !formData.password) {
        setError('Please enter your credentials.');
        return;
      }
      const isEmail = formData.identifier.includes('@');
      onLoginSuccess({
        name: 'Partner',
        email: isEmail ? formData.identifier : 'partner@example.com',
        phone: !isEmail ? formData.identifier : '+123456789'
      });
    } else { // Register
      if (!formData.name || !formData.email || !formData.password || !phoneNumber) {
        setError('Please fill in all fields.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      const justDigits = phoneNumber.replace(/\D/g, '');
      if (justDigits.length !== selectedCountry.phone_length) {
          setError(`Phone number for ${selectedCountry.name} must have ${selectedCountry.phone_length} digits.`);
          return;
      }
      const fullPhoneNumber = `${selectedCountry.dial_code}${justDigits}`;
      onLoginSuccess({ name: formData.name, email: formData.email, phone: fullPhoneNumber });
    }
  };

  const toggleMode = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '', identifier: '' });
    setPhoneNumber('');
    setSelectedCountry(defaultCountry);
    setMode(prev => (prev === 'login' ? 'register' : 'login'));
    setError('');
  };

  const inputClasses = "block w-full rounded-lg border border-gray-300 py-3 px-4 pl-11 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm";

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <BuildingStorefrontIcon className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {mode === 'login' ? 'Partner Login' : 'Create Partner Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'login' ? 'Welcome back! Please sign in.' : 'Get started by creating a new account.'}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="relative">
              <label htmlFor="name" className="sr-only">Full Name</label>
              <UserIcon className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400" />
              <input id="name" name="name" type="text" required className={inputClasses} placeholder="Full Name" value={formData.name} onChange={handleChange} />
            </div>
          )}

          {mode === 'login' && (
             <div className="relative">
              <label htmlFor="identifier" className="sr-only">Email or Phone Number</label>
              <EnvelopeIcon className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400" />
              <input id="identifier" name="identifier" type="text" required className={inputClasses} placeholder="Email or Phone Number" value={formData.identifier} onChange={handleChange} />
            </div>
          )}
          
          {mode === 'register' && (
            <div className="relative">
              <label htmlFor="email" className="sr-only">Email address</label>
              <EnvelopeIcon className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400" />
              <input id="email" name="email" type="email" autoComplete="email" required className={inputClasses} placeholder="Email address" value={formData.email} onChange={handleChange} />
            </div>
          )}
          
          {mode === 'register' && (
            <div className="relative">
              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <div className="flex items-center rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
                <div className="relative" ref={dropdownRef}>
                  <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center justify-center space-x-1.5 h-full w-24 px-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <span className="text-xl">{getFlagEmoji(selectedCountry.code)}</span>
                    <span className="font-medium text-gray-700">{selectedCountry.code}</span>
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-64 bg-white shadow-lg rounded-md border max-h-60 overflow-y-auto">
                      <ul>
                        {selectableCountries.map(c => (
                          <li key={c.code} onClick={() => { setSelectedCountry(c); setIsDropdownOpen(false); setPhoneNumber(''); }} className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-sm">
                            <span className="text-xl mr-3">{getFlagEmoji(c.code)}</span>
                            <span className="flex-grow">{c.name}</span>
                            <span className="ml-auto text-gray-500">{c.dial_code}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="relative flex-grow">
                  <PhoneIcon className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                  <input id="phone" name="phone" type="tel" autoComplete="tel" required
                    className="block w-full border-0 bg-transparent py-3 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Phone Number" value={phoneNumber} onChange={handlePhoneNumberChange}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <LockClosedIcon className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400" />
            <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClasses} placeholder="Password" value={formData.password} onChange={handleChange} />
          </div>

          {mode === 'register' && (
            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <LockClosedIcon className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-400" />
              <input id="confirmPassword" name="confirmPassword" type="password" required className={inputClasses} placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            </div>
          )}

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button type="submit" className="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          {mode === 'login' ? "Don't have an account?" : 'Already a partner?'}{' '}
          <button onClick={toggleMode} className="font-semibold text-blue-600 hover:text-blue-500">
            {mode === 'login' ? 'Register now' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default PartnerAuth;
