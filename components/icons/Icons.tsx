import React from 'react';

// Using a single file for icons to keep it simple for this project size.
// In a larger app, these could be individual files.

export const GlobeAltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

export const BuildingStorefrontIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" />
  </svg>
);

export const MagnifyingGlassIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

export const MapPinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);

export const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const InformationCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
);

export const XCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

export const AdjustmentsHorizontalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
);

export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
);

export const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);

export const HeartIconSolid: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M11.645 20.91a.75.75 0 0 1-1.29 0C8.631 16.64 3 12.28 3 8.25 3 5.765 5.099 3.75 7.688 3.75c1.935 0 3.597 1.126 4.312 2.733C12.715 4.876 14.377 3.75 16.313 3.75 18.9 3.75 21 5.765 21 8.25c0 4.03-5.631 8.39-7.355 12.66Z" />
    </svg>
);

export const PhotoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);


export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.898 20.575 16.5 21.75l-.398-1.175a3.375 3.375 0 0 0-2.31-2.31L12 18l1.175-.398a3.375 3.375 0 0 0 2.31-2.31L16.5 14.25l.398 1.175a3.375 3.375 0 0 0 2.31 2.31L20.25 18l-1.175.398a3.375 3.375 0 0 0-2.31 2.31Z" />
  </svg>
);

export const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008h-.008v-.008Z" />
  </svg>
);

export const Squares2X2Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
);

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
);

export const UserCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

export const ArrowLeftOnRectangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
  </svg>
);

export const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

export const CurrencyDollarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const CalendarDaysIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M-4.5 12h22.5" />
  </svg>
);

export const TicketIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.5a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm13.5-1.5a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm0 0c-1.125 0-2.25.5-3 1.125A3.375 3.375 0 0 1 10.5 18c0-1.125.5-2.25 1.125-3A3.375 3.375 0 0 1 13.5 15c1.125 0 2.25.5 3 1.125c.75-.625 1.875-1.125 3-1.125a3.375 3.375 0 0 1 3 3.375c0 .625-.188 1.25-.5 1.875a3.375 3.375 0 0 1-5.5 0Z" />
  </svg>
);
export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);
export const Cog6ToothIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.003 1.11-1.226.554-.223 1.196-.028 1.624.362l1.01 1.01c.237.236.574.362.92.362.347 0 .684-.126.92-.362l1.01-1.01a1.125 1.125 0 0 1 1.624-.362c.55.223 1.02.684 1.11 1.226.09.542-.028 1.196-.362 1.624l-1.01 1.01c-.236.237-.362.574-.362.92 0 .347.126.684.362.92l1.01 1.01c.334.428.452 1.082.362 1.624-.09.542-.56 1.003-1.11 1.226-.554.223-1.196.028-1.624-.362l-1.01-1.01c-.237-.236-.574-.362-.92-.362s-.684.126-.92.362l-1.01 1.01a1.125 1.125 0 0 1-1.624.362c-.55-.223-1.02-.684-1.11-1.226-.09-.542.028-1.196.362-1.624l1.01-1.01c.236-.237.362-.574.362-.92s-.126-.684-.362-.92l-1.01-1.01a1.125 1.125 0 0 1-.362-1.624ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
  </svg>
);
export const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);
export const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 0 1-2.25 2.25H5.99a2.25 2.25 0 0 1-2.25-2.25v-4.07a2.25 2.25 0 0 1 2.25-2.25h1.5a2.25 2.25 0 0 1 2.25 2.25v.75A2.25 2.25 0 0 0 12 15h0a2.25 2.25 0 0 0 2.25-2.25v-.75a2.25 2.25 0 0 1 2.25-2.25h1.5A2.25 2.25 0 0 1 20.25 14.15Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75v-.75Zm-4.5-.75a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 .75.75h.01a.75.75 0 0 0 .75-.75v-.75a.75.75 0 0 0-.75-.75h-.01ZM15.75 9.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75v-.75Zm-4.5-.75a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 .75.75h.01a.75.75 0 0 0 .75-.75v-.75a.75.75 0 0 0-.75-.75h-.01Z" />
  </svg>
);
export const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.219 2.219 0 0 1 5.22 8.05l-2.433 2.433a2.25 2.25 0 0 0 0 3.182l2.433 2.433c.627.627 1.732.627 2.359 0l5.413-5.413a.25.25 0 0 0 0-.354l-5.413-5.413a2.219 2.219 0 0 1-1.593-2.656Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.175a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25H9A2.25 2.25 0 0 1 6.75 18v-7.5a2.25 2.25 0 0 1 2.25-2.25h7.5Z" />
  </svg>
);
export const CreditCardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
    </svg>
);
export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);
export const KittenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g>
      <path d="M50,90 C80,90 85,65 85,50 C85,30 70,20 50,20 C30,20 15,30 15,50 C15,65 20,90 50,90 Z" fill="#E0E0E0" />
      <path d="M40,65 Q50,75 60,65" stroke="black" strokeWidth="2" fill="none" />
      <circle cx="40" cy="50" r="4" fill="black" />
      <circle cx="60" cy="50" r="4" fill="black" />
      <path d="M30,35 Q20,20 40,25" fill="#E0E0E0" stroke="black" strokeWidth="2" />
      <path d="M70,35 Q80,20 60,25" fill="#E0E0E0" stroke="black" strokeWidth="2" />
      <path d="M30,35 Q35,40 40,35" fill="pink" />
      <path d="M70,35 Q65,40 60,35" fill="pink" />
    </g>
  </svg>
);
export const PaperAirplaneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
);
export const ClickIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="243" height="71" viewBox="0 0 243 71" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M121.203 70.8145C118.892 70.8145 117.203 70.1802 116.136 68.9115L103.551 53.6067C103.018 52.9559 102.836 52.1751 103.018 51.2642C103.2 50.3533 103.734 49.729 104.618 49.3917C105.503 49.0544 106.451 49.0544 107.462 49.3917L115.118 52.3387L115.403 52.4418V21.1633L104.603 24.6322C103.718 24.9529 102.959 24.8115 102.324 24.208C101.69 23.6045 101.373 22.8028 101.373 21.8028V4.8976C101.373 3.4476 101.83 2.30469 102.741 1.46875C103.652 0.632812 104.892 0.214844 106.459 0.214844H135.53C137.098 0.214844 138.337 0.632812 139.248 1.46875C140.159 2.30469 140.615 3.4476 140.615 4.8976V21.8028C140.615 22.8028 140.298 23.6045 139.663 24.208C139.029 24.8115 138.27 24.9529 137.385 24.6322L126.585 21.1633V63.5656L135.351 58.0772C136.218 57.5101 137.136 57.3616 138.106 57.6316C139.076 57.9015 139.776 58.4851 140.206 59.3822C140.636 60.2793 140.684 61.2181 140.35 62.1985L127.385 70.1802C126.318 70.5802 125.124 70.8145 123.803 70.8145H121.203Z" fill="#242424"></path>
    <path d="M222.036 69.5C216.548 69.5 211.964 67.962 208.286 64.886C204.609 61.81 202.77 57.9015 202.77 53.1606C202.77 48.3364 204.609 44.4278 208.286 41.435C211.964 38.4422 216.548 36.9456 222.036 36.9456C227.523 36.9456 232.106 38.4422 235.783 41.435C239.461 44.4278 241.299 48.3364 241.299 53.1606C241.299 57.9015 239.461 61.81 235.783 64.886C232.106 67.962 227.523 69.5 222.036 69.5ZM222.036 64.08C225.424 64.08 228.169 63.08 230.27 61.08C232.372 59.08 233.422 56.4956 233.422 53.328C233.422 50.1606 232.372 47.5761 230.27 45.5761C228.169 43.5761 225.424 42.5761 222.036 42.5761C218.648 42.5761 215.903 43.5761 213.799 45.5761C211.697 47.5761 210.645 50.1606 210.645 53.328C210.645 56.4956 211.697 59.08 213.799 61.08C215.903 63.08 218.648 64.08 222.036 64.08Z" fill="#242424"></path>
    <path d="M158.07 37.5H166.07V69H158.07V37.5Z" fill="#00A6ED"></path>
    <path d="M185.086 69.5C181.868 69.5 179.053 68.799 176.642 67.397C174.231 65.995 172.486 64.0956 171.409 61.6985C170.332 59.3015 169.794 56.5906 169.794 53.5656C169.794 50.624 170.332 47.9851 171.409 45.648C172.486 43.3109 174.231 41.4551 176.642 40.0822C179.053 38.7094 181.868 37.9456 185.086 37.9456C188.424 37.9456 191.206 38.6802 193.433 40.147C195.66 41.6138 197.312 43.5249 198.389 45.8786C199.466 48.2322 200.004 50.8995 200.004 53.882C200.004 54.3476 199.986 54.7793 199.948 55.178H177.586C177.815 57.2616 178.536 58.9138 179.748 60.1345C180.961 61.3551 182.529 61.9656 184.453 61.9656C185.756 61.9656 186.959 61.631 188.062 60.961C189.166 60.291 189.986 59.4385 190.523 58.4045L197.351 61.532C195.992 64.062 193.973 66.0449 191.296 67.48C188.618 68.915 185.086 69.5 185.086 69.5ZM184.242 44.06C182.259 44.06 180.645 44.627 179.398 45.761C178.15 46.895 177.379 48.378 177.086 50.21H192.48C192.218 48.241 191.483 46.6875 190.276 45.55C189.068 44.4125 187.018 44.06 184.242 44.06Z" fill="#00A6ED"></path>
    <path d="M37.07 1H2V33H37.07V1Z" fill="#242424"></path>
    <path d="M72.07 1H37.07V33H72.07V1Z" fill="#00A6ED"></path>
    <path d="M49.57 17C49.57 20.866 46.436 24 42.57 24C38.704 24 35.57 20.866 35.57 17C35.57 13.134 38.704 10 42.57 10C46.436 10 49.57 13.134 49.57 17Z" fill="#00A6ED"></path>
  </svg>
)
export const PaymeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="225" height="71" viewBox="0 0 225 71" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M129.23 48.2251V23.575H138.03V29.0251H138.33C139.755 26.5751 142.23 23.5751 146.43 23.5751C152.055 23.5751 155.655 27.6251 155.655 35.0251V48.2251H147.03V36.0251C147.03 31.0251 144.855 28.7251 141.63 28.7251C139.03 28.7251 136.605 30.2251 135.63 32.2751C135.255 32.9251 135.105 33.5251 135.105 34.3251V48.2251H129.23Z" fill="#242424"></path>
    <path d="M182.726 48.2251V23.575H188.601V48.2251H182.726Z" fill="#242424"></path>
    <path d="M165.705 48.2251V23.575H171.58V48.2251H165.705Z" fill="#242424"></path>
    <path d="M217.132 48.2251L209.607 36.6251L209.382 36.2751V48.2251H203.507V23.575H209.382V34.9751L216.582 23.575H223.557L213.957 35.5251L224.157 48.2251H217.132Z" fill="#242424"></path>
    <path d="M47.7812 0.8125H36.3312C35.9112 0.8125 35.5312 0.9625 35.2312 1.2625C34.9312 1.5625 34.7812 1.9425 34.7812 2.3625V13.8125H49.3312V2.3625C49.3312 1.9425 49.1812 1.5625 48.8812 1.2625C48.5812 0.9625 48.2012 0.8125 47.7812 0.8125Z" fill="#00C851"></path>
    <path d="M68.7312 19.3125V51.7125C68.7312 62.1125 60.1812 70.6625 49.7812 70.6625H34.3312C23.9312 70.6625 15.3812 62.1125 15.3812 51.7125V19.3125H68.7312Z" fill="#00C851"></path>
    <path d="M99.8812 23.5751V48.2251H94.0062V23.5751H99.8812Z" fill="#242424"></path>
    <path d="M84.1088 48.2251L72.2338 23.5751H78.8338L87.5338 43.1251L87.8338 43.7251L96.1088 23.5751H102.709L91.0838 48.2251H84.1088Z" fill="#242424"></path>
    <path d="M107.051 48.2251V23.575H121.076C125.901 23.575 128.951 25.125 128.951 29.575C128.951 32.325 127.751 33.775 125.801 34.625L129.551 48.2251H122.951L119.726 35.6251H112.926V48.2251H107.051ZM112.926 30.5251H119.276C121.226 30.5251 122.876 30.0251 122.876 28.5251C122.876 26.8251 121.376 26.5251 119.576 26.5251H112.926V30.5251Z" fill="#242424"></path>
  </svg>
)
export const PaynetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="223" height="71" viewBox="0 0 223 71" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M36.1914 45.0344C31.5714 45.0344 27.2414 43.5144 23.2014 40.4744C19.1614 37.4344 17.1414 33.2544 17.1414 27.9344C17.1414 22.6144 19.1614 18.4544 23.2014 15.4544C27.2414 12.4544 31.5714 10.9544 36.1914 10.9544C40.8114 10.9544 45.1414 12.4544 49.1814 15.4544C53.2214 18.4544 55.2414 22.6144 55.2414 27.9344C55.2414 33.2544 53.2214 37.4344 49.1814 40.4744C45.1414 43.5144 40.8114 45.0344 36.1914 45.0344ZM36.1914 38.3544C38.7114 38.3544 40.8114 37.5544 42.4914 35.9544C44.1714 34.3544 45.0114 32.0544 45.0114 29.0544V26.8944C45.0114 23.8944 44.1714 21.5944 42.4914 19.9944C40.8114 18.3944 38.7114 17.5944 36.1914 17.5944C33.6714 17.5944 31.5714 18.3944 29.8914 19.9944C28.2114 21.5944 27.3714 23.8944 27.3714 26.8944V29.0544C27.3714 32.0544 28.2114 34.3544 29.8914 35.9544C31.5714 37.5544 33.6714 38.3544 36.1914 38.3544Z" fill="#A50F81"></path>
    <path d="M106.671 23.5156L100.951 40.4156H93.9913L99.7113 23.5156H106.671Z" fill="#A50F81"></path>
    <path d="M124.965 23.5156H130.685L120.365 48.1556H113.885L124.965 23.5156Z" fill="#A50F81"></path>
    <path d="M153.242 48.1556H146.762L157.842 23.5156H163.562L153.242 48.1556Z" fill="#A50F81"></path>
    <path d="M171.536 48.1556L177.256 31.2556L182.976 48.1556H190.176L180.336 23.5156H174.156L164.316 48.1556H171.536Z" fill="#A50F81"></path>
    <path d="M216.712 48.1556H222.152V23.5156H207.512V29.2356H216.712V48.1556Z" fill="#A50F81"></path>
    <path d="M36.1914 59.0444C25.5714 59.0444 17.1414 50.4444 17.1414 39.5844V38.1644H55.2414V39.5844C55.2414 50.4444 46.8114 59.0444 36.1914 59.0444Z" fill="#F4811F"></path>
    <path d="M78.6713 11.5944H73.2313V48.1544H78.6713V11.5944Z" fill="#A50F81"></path>
  </svg>
)
export const UzumIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="223" height="71" viewBox="0 0 223 71" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M35.5 70.5C16.14 70.5 0.5 54.86 0.5 35.5C0.5 16.14 16.14 0.5 35.5 0.5C54.86 0.5 70.5 16.14 70.5 35.5C70.5 54.86 54.86 70.5 35.5 70.5Z" fill="#7000FF"></path>
    <path d="M35.5 56C25.854 56 18 48.146 18 38.5C18 28.854 25.854 21 35.5 21C45.146 21 53 28.854 53 38.5C53 44.912 49.37 50.418 43.83 53.644" stroke="white" strokeWidth="8"></path>
    <path d="M141.59 23.63V48.2H135.74V23.63H141.59Z" fill="#242424"></path>
    <path d="M125.814 48.2L113.934 23.63H120.534L129.234 43.19L129.534 43.79L137.814 23.63H144.414L132.784 48.2H125.814Z" fill="#242424"></path>
    <path d="M152.022 48.2V23.63H166.042C170.872 23.63 173.922 25.18 173.922 29.63C173.922 32.38 172.722 33.83 170.772 34.68L174.522 48.2H167.922L164.692 35.68H157.892V48.2H152.022ZM157.892 30.58H164.242C166.192 30.58 167.842 30.08 167.842 28.58C167.842 26.88 166.342 26.58 164.542 26.58H157.892V30.58Z" fill="#242424"></path>
    <path d="M85.7617 48.2V23.63H91.6117V48.2H85.7617Z" fill="#242424"></path>
    <path d="M102.774 48.2H96.9238L106.824 23.63H112.524L102.774 48.2Z" fill="#242424"></path>
    <path d="M192.651 48.2V23.63H198.501V48.2H192.651Z" fill="#242424"></path>
    <path d="M217.473 48.2H211.623L221.523 23.63H227.223L217.473 48.2Z" fill="#242424"></path>
    <path d="M184.223 48.2V23.63H178.373V48.2H184.223Z" fill="#242424"></path>
  </svg>
)
// --- NEW COLORED CATEGORY ICONS ---
export const MountainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs><linearGradient id="a" x1="32" x2="32" y1="62" y2="17.49" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2cb47f"/><stop offset="1" stopColor="#53cba3"/></linearGradient><linearGradient id="b" x1="43.5" x2="43.5" y1="62" y2="28" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#239c6b"/><stop offset="1" stopColor="#2cb47f"/></linearGradient></defs>
    <circle cx="32" cy="32" r="30" fill="#d2eaf8"/>
    <path d="M32 17.49L2 62h60L32 17.49z" fill="url(#a)"/>
    <path d="M43.5 28L20 62h47L43.5 28z" fill="url(#b)"/>
    <path d="M32 17.49L22 34l-5-4 15-12.51zM43.5 28L36.2 38l-4.2-3 11.5-7z" fill="#fff" opacity=".5"/>
    <path d="M26.25 45.31L13 62h26.5L26.25 45.31z" fill="#38584b" opacity=".2"/>
  </svg>
);
export const WalkingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#D2EAF8"/>
    <path d="M34.8 54h-5.6a1 1 0 01-1-1v-8.2l-3-1.2a1 1 0 01-.6-1.5l2.4-5.2a1 1 0 011.5-.6l3.9 1.6V26a1 1 0 011-1h6a1 1 0 011 1v11.4l2.5-3.8a1 1 0 011.6-.3l3.6 4.3a1 1 0 01-.3 1.6l-5.4 3V53a1 1 0 01-1 1z" fill="#F4B459"/>
    <circle cx="33" cy="18" r="4" fill="#F4B459"/>
    <path d="M32 62a30.1 30.1 0 0022.6-9.9L32 30 9.4 52.1A30.1 30.1 0 0032 62z" fill="#53CBA3"/>
    <path d="M54.6 52.1L32 30 9.4 52.1a1 1 0 00.8 1.6h43.6a1 1 0 00.8-1.6z" fill="#2CB47F"/>
  </svg>
);
export const FoodIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#D2EAF8"/>
    <path d="M48 57H16a3 3 0 01-3-3V31.4A22.6 22.6 0 0135.6 9h2.8A22.6 22.6 0 0161 31.4V54a3 3 0 01-3 3z" fill="#FF784A"/>
    <path d="M51 31.4A19.5 19.5 0 0032.4 12h-0.8A19.5 19.5 0 0013 31.4V54a3 3 0 003 3h32a3 3 0 003-3V31.4z" fill="#FF9A6A"/>
    <path d="M23 48a2 2 0 01-2-2V36a2 2 0 012-2h4a2 2 0 012 2v10a2 2 0 01-2 2zM37 48a2 2 0 01-2-2V36a2 2 0 012-2h4a2 2 0 012 2v10a2 2 0 01-2 2z" fill="#D25330"/>
    <path d="M45 23a3 3 0 01-3 3H22a3 3 0 010-6h20a3 3 0 013 3z" fill="#FFF"/>
  </svg>
);
export const AdventureIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#F4B459"/>
    <path d="M32 2C15.4 2 2 15.4 2 32h60C62 15.4 48.6 2 32 2z" fill="#FFD15D"/>
    <path d="M14 46h36v10H14z" fill="#38584B"/>
    <path d="M21 34h22l-11-22L21 34z" fill="#D2EAF8"/>
    <path d="M32 12l5 9.5h-10L32 12z" fill="#FFF"/>
    <path d="M28 34h8l-4-10-4 10z" fill="#B0D9F3"/>
    <path d="M43 46H21l4 6h14l4-6z" fill="#53CBA3"/>
  </svg>
);
export const KayakingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#59B4D9"/>
    <path d="M32 2c-3.2 0-6.3.6-9.2 1.6A29.9 29.9 0 0132 62a29.9 29.9 0 0122.6-9.9c2-1.6 3.8-3.5 5.3-5.6A30 30 0 0032 2z" fill="#75C6E5"/>
    <path d="M5 40l54-12-3 8-53 12 2-8z" fill="#FF784A"/>
    <path d="M53 35a4 4 0 11-8 0 4 4 0 018 0z" fill="#F4B459"/>
    <path d="M12 28l40 9" stroke="#38584B" strokeWidth="4" strokeLinecap="round" strokeMiterlimit="10"/>
  </svg>
);
export const FamilyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#d2eaf8"/>
    <path d="M32 62a30 30 0 0024.5-45.1L32 62z" fill="#53cba3"/>
    <path fill="#f4b459" d="M25 46.5v-13a3 3 0 013-3h2v19h-2a3 3 0 01-3-3zM28.5 24a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"/>
    <path fill="#59b4d9" d="M39 52.5v-18a3 3 0 013-3h2v24h-2a3 3 0 01-3-3zM42.5 22a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"/>
    <path d="M29 37.8c-.8 2-3.5 2.8-3.5 5.2v2.5h8v-2.5c0-2.4-2.7-3.2-3.5-5.2-.5-1.2-1-2.8-1-2.8s-.5 1.6-1 2.8z" fill="#ff784a"/>
    <circle cx="29.5" cy="32" r="2.5" fill="#ff784a"/>
  </svg>
);
export const JeepIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#f4b459"/>
    <path d="M32 62c16.6 0 30-13.4 30-30H2C2 48.6 15.4 62 32 62z" fill="#2cb47f"/>
    <path d="M56 42H8a1 1 0 01-1-1v-8h2v7h46v-7h2v8a1 1 0 01-1 1z" fill="#38584b"/>
    <path d="M52 40H12V24h32l8 8v8z" fill="#ff784a"/>
    <path d="M12 24h32v-4a4 4 0 00-4-4H16a4 4 0 00-4 4v4z" fill="#e8683c"/>
    <circle cx="18" cy="40" r="6" fill="#38584b"/><circle cx="18" cy="40" r="3" fill="#d2eaf8"/>
    <circle cx="46" cy="40" r="6" fill="#38584b"/><circle cx="46" cy="40" r="3" fill="#d2eaf8"/>
    <path d="M22 24h-4v-2a2 2 0 012-2h2v4zM28 24h-4v-4h2a2 2 0 012 2v2zM34 24h-4v-4h2a2 2 0 012 2v2zM40 24h-4v-4h2a2 2 0 012 2v2z" fill="#ffd15d"/>
  </svg>
);
export const RelaxIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#59b4d9"/>
    <path d="M60.7 43.2a30 30 0 01-57.4-8.4L32 62l28.7-18.8z" fill="#75c6e5"/>
    <path d="M14 47h36v6H14z" fill="#f4b459"/><path d="M48 47H16l1-6h30l1 6z" fill="#ffd15d"/>
    <path d="M24 35l-2-8h4l2 8zM44 35l-2-8h4l2 8z" fill="#38584b"/>
    <path d="M20 53v-6" stroke="#e8683c" strokeWidth="4" strokeLinecap="round"/><path d="M44 53v-6" stroke="#e8683c" strokeWidth="4" strokeLinecap="round"/>
    <path d="M12 27c8-8 24-8 32 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none"/>
  </svg>
);
export const WeekendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#ff784a"/>
    <path d="M54.6 11.1A30 30 0 0011.1 54.6L54.6 11.1z" fill="#e8683c"/>
    <path d="M52 52H12a2 2 0 01-2-2V20a2 2 0 012-2h40a2 2 0 012 2v30a2 2 0 01-2 2z" fill="#d2eaf8"/>
    <path d="M52 24H12v-4a2 2 0 012-2h36a2 2 0 012 2v4z" fill="#b0d9f3"/>
    <circle cx="18" cy="21" r="2" fill="#fff"/><circle cx="26" cy="21" r="2" fill="#fff"/>
    <path d="M32.5 30l-6 16h5l1-3h6l1 3h5l-6-16h-6zm-1 8l2.5-6 2.5 6h-5z" fill="#59b4d9"/>
  </svg>
);
export const HistoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#f4b459"/>
    <path d="M32 2C15.4 2 2 15.4 2 32h60C62 15.4 48.6 2 32 2z" fill="#ffd15d"/>
    <path d="M49 57H15a1 1 0 01-1-1V21h36v35a1 1 0 01-1 1z" fill="#d25330"/>
    <path d="M53 21H11a1 1 0 01-1-1V14a1 1 0 011-1h42a1 1 0 011 1v6a1 1 0 01-1 1z" fill="#b54324"/>
    <path d="M44 21v36M20 21v36M32 21v36" stroke="#b54324" strokeWidth="4" strokeMiterlimit="10"/>
    <path d="M45 13l-13-7-13 7" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
export const CityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#75c6e5"/>
    <path d="M32 62a30 30 0 0030-30H2a30 30 0 0030 30z" fill="#53cba3"/>
    <path d="M22 62V36h-8v26M40 62V28h-8v34M52 62V40h-6v22" fill="#38584b"/>
    <path d="M18 36h-4V22a2 2 0 012-2h0a2 2 0 012 2v14z" fill="#ff784a"/>
    <path d="M36 28h-4V16a2 2 0 012-2h0a2 2 0 012 2v12z" fill="#f4b459"/>
    <path d="M49 40h-3V24a1.5 1.5 0 011.5-1.5h0A1.5 1.5 0 0149 24v16z" fill="#ff9a6a"/>
  </svg>
);
export const LakeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#d2eaf8"/>
    <path d="M32 2A30 30 0 009.4 52.1L32 30 62 32A30 30 0 0032 2z" fill="#f4b459"/>
    <path d="M2 32c0 10.3 5.2 19.3 13 24.5V32H2z" fill="#53cba3"/>
    <path d="M52.3 49.3c-5.8 4.5-12.9 7.2-20.3 7.2-11.2 0-20.9-6-26.3-14.5 10.2-2 20.2.6 30.1-5.3 5.3-3.2 10-7.8 13.1-13.3 2.1 5.3 1.8 11.2-1.6 16.1z" fill="#59b4d9"/>
    <path d="M47 32.1c-1.3-4.5-4.4-8.3-8.6-10.9-7-4.2-15.6-3.8-22.3 1C24.4 15.3 35 15.6 42.6 21c4.5 3.2 7.7 7.9 8.9 13.2-1.5-.7-3-1.1-4.5-2.1z" fill="#75c6e5"/>
  </svg>
);
export const ForestIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#d2eaf8"/>
    <path d="M32 62c16.6 0 30-13.4 30-30H2C2 48.6 15.4 62 32 62z" fill="#2cb47f"/>
    <path d="M22 52V34h-4v18" fill="#a47551"/>
    <path d="M20 18c-7.2 0-13 5.8-13 13s5.8 13 13 13h0c7.2 0 13-5.8 13-13s-5.8-13-13-13z" fill="#53cba3"/>
    <path d="M44 56V38h-4v18" fill="#a47551"/>
    <path d="M42 22c-7.2 0-13 5.8-13 13s5.8 13 13 13h0c7.2 0 13-5.8 13-13s-5.8-13-13-13z" fill="#53cba3"/>
    <path d="M32 20c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9z" fill="#239c6b"/>
  </svg>
);
export const RiverIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#2cb47f"/>
    <path d="M32 2C15.4 2 2 15.4 2 32c0 8 .3 9.4 10.3 17.5 5.5-5.2 12.8-8.8 20.8-9.8C30.4 35.2 27.5 30.2 32 24c4.3 6 1.8 11.2-1 15.4 10.8 1.4 20.8 6.7 26.5 13.5C61.3 43.1 62 37.7 62 32c0-16.6-13.4-30-30-30z" fill="#ffd15d"/>
    <path d="M32 62c-8.8 0-16.8-3.8-22.4-9.8C19.3 43.5 29.8 41 32 39c2.2 2 12.7 4.5 22.4 13.2C48.8 58.2 40.8 62 32 62z" fill="#53cba3"/>
    <path d="M46.7 39.8c-1.8-1-3.6-2.1-5.6-3-7-3.4-14.7-3.4-21.8 0-2 .9-3.9 2-5.6 3.1-4.8 3-7.7 7.4-7.7 12.4 5.3-6.4 12.9-10.4 21.1-10.4s15.8 4 21.1 10.4c0-5-2.9-9.4-7.5-12.5z" fill="#75c6e5"/>
  </svg>
);
export const FishingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#59b4d9"/>
    <path d="M32 62a30 30 0 0030-30H2a30 30 0 0030 30z" fill="#75c6e5"/>
    <path d="M54 22c-7.4-4-16-2-22 4s-8 15-4 22c.8 1.3 3.6-1.5 2-4-2.2-3.4-1.3-8.8 3-12s10.3-2.5 13 2c2.2 3.8-.3 8.1-2 11-2 3.5.7 5.1 2 4 .7-.5 6-6 5-11z" fill="#ff784a"/>
    <path d="M52 24.5a.5.5 0 100-1 .5.5 0 000 1z" fill="#fff"/>
    <path d="M54 12L12 40" stroke="#d2eaf8" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 40v12l-6-3v-6l6-3z" fill="#a47551"/>
    <path d="M12 50.5l-2 1.5" stroke="#a47551" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
export const DesertIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#f4b459"/>
    <path d="M32 2C15.4 2 2 15.4 2 32h60C62 15.4 48.6 2 32 2z" fill="#ffd15d"/>
    <path d="M2 32c0 10.1 5 18.9 12.4 24.3C26.5 46.2 37.9 39 51.2 39c4.2 0 8.2 1 11.9 2.8.2-1.8.4-3.6.4-5.5v-4.3H2z" fill="#d19a47"/>
    <path d="M51.2 62c-15.1 0-27.9-9.3-33.8-22C28.8 45.3 40.5 50 51.2 50c4.5 0 8.7-1 12.3-2.8.1 1.5.3 3 .5 4.5C59.2 57.5 55.4 62 51.2 62z" fill="#b8843c"/>
    <path d="M20 40V24h-4v16M20 30h6M36 44V28h-4v16M36 34h6M48 38V22h-4v16M48 28h6" fill="#2cb47f"/>
  </svg>
);
export const AuthenticIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#d25330"/>
    <path d="M32 2a30 30 0 00-24.5 45.1L56.4 7.6A30 30 0 0032 2z" fill="#b54324"/>
    <path d="M47.2 49.3a1.5 1.5 0 01-1.1-.4L32 34.8 17.9 48.9a1.5 1.5 0 01-2.1-2.1L29.9 32 15.8 17.9a1.5 1.5 0 112.1-2.1L32 29.9 46.1 15.8a1.5 1.5 0 012.1 2.1L34.1 32l14.1 14.1a1.5 1.5 0 01-1 2.2z" fill="#ffd15d"/>
    <path d="M32 46.2l-6-6-6 6 6-6-6-6 6 6 6-6-6 6 6 6-6-6 6-6 6 6-6-6 6 6-6 6 6-6-6z" fill="#f4b459" opacity=".5"/>
  </svg>
);
export const ExpressIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#b0d9f3"/>
    <path d="M32 2c16.6 0 30 13.4 30 30h-60C2 15.4 15.4 2 32 2z" fill="#d2eaf8"/>
    <path d="M46 22h-2.1c-1-3.2-3-5-6.9-5-4.5 0-8 2.5-8 7s3.5 7 8 7c3.9 0 5.9-1.8 6.9-5H46v-4z" fill="#59b4d9"/>
    <circle cx="37" cy="24" r="3" fill="#fff"/>
    <path d="M18 42h2.1c1-3.2 3-5 6.9-5 4.5 0 8 2.5 8 7s-3.5 7-8 7c-3.9 0-5.9-1.8-6.9-5H18v-4z" fill="#ff784a"/>
    <circle cx="27" cy="44" r="3" fill="#fff"/>
    <path d="M12 32h40" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8"/>
  </svg>
);
export const AbroadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#59b4d9"/>
    <path d="M41 12H23c-2.2 0-4 1.8-4 4v32c0 2.2 1.8 4 4 4h18c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z" fill="#38584b"/>
    <path d="M41 48H23V20h18v28z" fill="#d2eaf8"/>
    <circle cx="32" cy="34" r="10" fill="#75c6e5"/>
    <path d="M32 24c5.5 0 10 9 10 10s-4.5 10-10 10-10-9-10-10 4.5-10 10-10z" fill="#53cba3" opacity=".5"/>
    <path d="M22 34h20M32 24v20" stroke="#b0d9f3" strokeWidth="2" strokeLinecap="round"/>
    <path d="M42 9l-4 3-4-3M26 55l4-3 4 3" stroke="#ffd15d" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);
export const UniqueIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#a47551"/>
    <path d="M32 2C15.4 2 2 15.4 2 32h60C62 15.4 48.6 2 32 2z" fill="#bf8e6e"/>
    <path d="M42 22a10 10 0 00-20 0l-3 22h26l-3-22z" fill="#ffd15d"/>
    <path d="M22 22c0-5.5 4.5-10 10-10v20c-5.5 0-10-4.5-10-10z" fill="#f4b459"/>
    <path d="M32 32v20c-6 0-10-6-10-10s4-10 10-10z" fill="#53cba3"/>
    <path d="M32 32v20c6 0 10-6 10-10s-4-10-10-10z" fill="#2cb47f"/>
    <path d="M32 12v20" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".5"/>
  </svg>
);
export const LadiesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#ff9a6a"/>
    <path d="M32 2C15.4 2 2 15.4 2 32h60C62 15.4 48.6 2 32 2z" fill="#ff784a"/>
    <path d="M48 54H16L24 24h16l8 30z" fill="#f4b459"/>
    <path d="M24 24h16v-8a8 8 0 00-16 0v8z" fill="#d2eaf8"/>
    <path d="M32 16v8h8c0-4.4-3.6-8-8-8z" fill="#b0d9f3"/>
    <path d="M42 28a2 2 0 01-2 2H24a2 2 0 01-2-2v-4h20v4z" fill="#ffd15d"/>
  </svg>
);
export const IslamIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#38584b"/>
    <path d="M32 2a30 30 0 00-15 4.7V2a30 30 0 0130 0v4.7A30 30 0 0032 2z" fill="#53cba3"/>
    <path d="M52 32c0-11-8.5-20-19-20-8 0-14.8 5-18 12 4.4-2.2 9.5-3.5 15-3.5 11.6 0 21 8.5 21 19 0 3.7-1.1 7.2-3.1 10.2A20 20 0 0052 32z" fill="#ffd15d"/>
    <path d="M34 29.5l3.5-2-1.3 4 3.5 2-4.2.3-1.5 4-1.5-4-4.2-.3 3.5-2-1.3-4 3.5 2z" fill="#f4b459"/>
  </svg>
);
export const MenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" fill="#75c6e5"/>
    <path d="M32 2C15.4 2 2 15.4 2 32h60C62 15.4 48.6 2 32 2z" fill="#59b4d9"/>
    <path d="M48 52H16v-6l4-4h24l4 4v6z" fill="#38584b"/>
    <path d="M44 42H20V22h24v20z" fill="#d2eaf8"/>
    <path d="M44 22H20l4-6h16l4 6z" fill="#b0d9f3"/>
    <path d="M36 28h-8v8l4 4 4-4v-8z" fill="#38584b"/>
  </svg>
);
// START: Added missing icons
export const EnvelopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

export const LockClosedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

export const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.211-.99-.554-1.34L18.06 15.11a2.25 2.25 0 0 0-3.181 0l-1.35 1.35a11.192 11.192 0 0 1-6.183-6.183l1.35-1.35a2.25 2.25 0 0 0 0-3.181L8.98 2.804A2.25 2.25 0 0 0 7.636 2.25H6.264A2.25 2.25 0 0 0 4 4.5v2.25Z" />
  </svg>
);

export const ArchiveBoxIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
  </svg>
);

export const ArrowPathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-4.991-2.691v4.992h-4.992m0 0-3.182-3.182a8.25 8.25 0 0 1 11.667 0l3.181 3.182" />
  </svg>
);

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09a2.09 2.09 0 0 0-2.09 2.134v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

export const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
);

export const ClipboardDocumentListIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 5.25 6.108V18a2.25 2.25 0 0 0 2.25 2.25H15M12 9h3.75M12 12h3.75" />
  </svg>
);

export const ArrowDownTrayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const UserGroupIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962c.566-.183 1.156-.347 1.772-.482m-4.283 4.962a4.5 4.5 0 0 1-1.423-.23l-3.114-1.557a4.5 4.5 0 0 1-1.153-6.62M4.5 12V9a2.25 2.25 0 0 1 2.25-2.25h3.75M7.5 15v-7.5A2.25 2.25 0 0 1 9.75 5.25h3.75a2.25 2.25 0 0 1 2.25 2.25v4.135m-7.5 0a4.5 4.5 0 0 0-4.5 4.5v.75m11.25-7.5a4.5 4.5 0 0 1 4.5 4.5v.75m-11.25 0a4.5 4.5 0 0 1-4.5 4.5v.75M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);
// END: Added missing icons