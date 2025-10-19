import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/Icons';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
}

const Accordion: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="space-y-2">{children}</div>;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen = false }) => {
  const [isContentOpen, setContentOpen] = useState(isOpen);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 focus:outline-none"
        onClick={() => setContentOpen(!isContentOpen)}
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
            isContentOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isContentOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="p-4 border-t border-gray-200 text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
