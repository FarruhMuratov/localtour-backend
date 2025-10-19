import React, { useState, useEffect, useRef, useMemo } from 'react';
import { GoogleGenAI, Chat, Tool, Part } from "@google/genai";
import { useLanguage } from '../context/LanguageContext';
import { Tour } from '../types';
import { KittenIcon, XMarkIcon, PaperAirplaneIcon } from './icons/Icons';

interface AIAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tours: Tour[];
  onBookTour: (tourId: string) => void; // New prop for handling booking
}

interface Message {
  role: 'user' | 'model';
  content: string | Part; // Can now be a string or a rich Part
}

// Define the available tool
const bookTourTool: Tool = {
  functionDeclarations: [
    {
      name: "bookTour",
      description: "Opens the booking modal for a specific tour.",
      parameters: {
        type: "OBJECT",
        properties: {
          tourId: {
            type: "STRING",
            description: "The unique identifier of the tour to be booked.",
          },
        },
        required: ["tourId"],
      },
    },
  ],
};


const AIAgentModal: React.FC<AIAgentModalProps> = ({ isOpen, onClose, tours, onBookTour }) => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null); // Ref for the form

  const tourContext = useMemo(() => {
    return tours
      .map(t => `ID: ${t.id}, Title: ${t.title[language]}, Type: ${t.type}, Price: ${t.price} UZS, Duration: ${t.durationDays} days, Location: ${t.location}, Description: ${t.description[language].substring(0, 150)}...`)
      .join('\n\n');
  }, [tours, language]);

  useEffect(() => {
    const initializeChat = () => {
        try {
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY as string });
            const systemInstruction = `You are a friendly and helpful tour guide for a company called LocalRoam. Your name is Leo. Your goal is to help users find the perfect tour from the provided list and assist with booking.
When a user expresses clear intent to book a specific tour (e.g., "book it", "I want this one", "забронируй его"), you MUST use the 'bookTour' tool. To use the tool, you need the tour's ID. If the user provides the name of a tour, first find its ID from the list below, then call the tool. Do not ask for the ID if the name is provided.
For all other questions, be concise, friendly, and conversational. Base your answers ONLY on the following tour information. The user is browsing in ${language === 'en' ? 'English' : 'Russian'}. Here is the list of available tours:\n\n${tourContext}`;
            
            const chatInstance = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: { systemInstruction },
                tools: [bookTourTool],
            });
            setChat(chatInstance);
            setMessages([{ role: 'model', content: t('aiAgent.greeting') }]);
        } catch (e) {
            console.error("Failed to initialize AI Agent:", e);
            setError("Could not connect to the AI Agent. Please check the API key.");
        }
    };

    if (isOpen) {
        initializeChat();
    }
    
  }, [isOpen, tourContext, t, language]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading || !chat) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const result = await chat.sendMessage({ message: input });

      // Check for a valid response and candidates array
      if (!result || !result.candidates || result.candidates.length === 0) {
        console.error("Invalid response structure from AI:", result);
        setError("Received an invalid response from the AI. Please try again.");
        setIsLoading(false);
        return;
      }
      
      const candidate = result.candidates[0];
      const parts = candidate.content?.parts || [];
      let toolCallFound = false;

      // Manually parse parts to find a function call
      for (const part of parts) {
        if (part.functionCall) {
          const { name, args } = part.functionCall;
          if (name === 'bookTour' && args && args.tourId) {
            toolCallFound = true;
            onBookTour(args.tourId as string);
            onClose();
            break; // Exit loop once the tool call is handled
          }
        }
      }

      // If a tool was called, the process is finished for this message
      if (toolCallFound) {
        setIsLoading(false);
        return;
      }
      
      // If no tool was called, aggregate text parts for the response
      const textResponse = parts.map(part => part.text).filter(Boolean).join(' ');
      
      if (textResponse) {
        const modelMessage: Message = { role: 'model', content: textResponse };
        setMessages(prev => [...prev, modelMessage]);
      } else if (!toolCallFound) {
         setError("The AI responded, but I couldn't understand it. Please try rephrasing.");
      }

    } catch (err) {
      console.error(err);
      setError("Sorry, I'm having trouble responding right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (query: string) => {
    setInput(query);
    // Use a timeout to allow the state to update before submitting the form
    setTimeout(() => {
        formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 0);
  };

  if (!isOpen) return null;

  const renderContent = (content: string | Part) => {
    if (typeof content === 'string') {
        return <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{content}</p>;
    }
    // You can add more complex rendering for different Part types if needed
    if ('text' in content) {
        return <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{content.text}</p>;
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-end sm:items-center p-0" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full max-w-lg h-[85vh] flex flex-col transform transition-transform duration-300 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <KittenIcon className="h-10 w-10 text-gray-700 animate-kitten-float" />
            <div>
                <h2 className="text-lg font-bold text-gray-800">{t('aiAgent.title')}</h2>
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-400"></span>
                    <span className="text-xs text-gray-500">{t('aiAgent.statusOnline')}</span>
                </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 transition-colors" aria-label="Close chat">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </header>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 animate-bubble-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && <KittenIcon className="h-8 w-8 text-gray-500 flex-shrink-0" />}
              <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-gray-100 text-gray-800 rounded-bl-lg'}`}>
                {renderContent(msg.content)}
              </div>
            </div>
          ))}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 animate-bubble-in">
                <SuggestionChip onClick={() => handleSuggestionClick("Popular tours")}>✨ {t('aiAgent.suggestions.popular')}</SuggestionChip>
                <SuggestionChip onClick={() => handleSuggestionClick("Tours for the weekend")}>📅 {t('aiAgent.suggestions.weekend')}</SuggestionChip>
                <SuggestionChip onClick={() => handleSuggestionClick("Inexpensive tours")}>💸 {t('aiAgent.suggestions.budget')}</SuggestionChip>
            </div>
          )}
          {isLoading && (
             <div className="flex gap-3 justify-start animate-bubble-in">
              <KittenIcon className="h-8 w-8 text-gray-500 flex-shrink-0" />
              <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-gray-100 text-gray-800 rounded-bl-lg flex items-center gap-2">
                 <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                 <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                 <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
           {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <footer className="p-4 border-t border-gray-200 bg-white">
          <form ref={formRef} onSubmit={handleSendMessage} className="flex items-center gap-3">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('aiAgent.placeholder')}
              className="w-full pl-4 pr-4 py-3 bg-gray-100 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 transition-shadow"
              disabled={isLoading}
              aria-label="Your message"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="h-6 w-6" />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

const SuggestionChip: React.FC<{onClick: () => void, children: React.ReactNode}> = ({ onClick, children }) => (
    <button
        onClick={onClick}
        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
    >
        {children}
    </button>
);

export default AIAgentModal;