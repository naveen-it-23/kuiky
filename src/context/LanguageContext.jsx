import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, locationsList } from '../data/kuikyData';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [currentLocation, setCurrentLocation] = useState(locationsList[0]);
  const [activeModal, setActiveModal] = useState(null); // 'auto' | 'ambulance' | 'puncture' | 'auth' | null

  const parseHash = () => {
    if (typeof window === 'undefined') return { page: 'home', category: 'all' };
    const h = window.location.hash;
    if (h.startsWith('#services/')) {
      const cat = h.replace('#services/', '');
      return { page: 'services', category: cat || 'all' };
    }
    if (h === '#all-services') {
      return { page: 'services', category: 'all' };
    }
    return { page: 'home', category: 'all' };
  };

  const initial = parseHash();
  const [currentPage, setCurrentPage] = useState(initial.page);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState(initial.category);

  useEffect(() => {
    const handleHashChange = () => {
      const { page, category } = parseHash();
      setCurrentPage(page);
      setSelectedServiceCategory(category);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page, category = 'all') => {
    setCurrentPage(page);
    setSelectedServiceCategory(category);
    if (page === 'services') {
      if (category && category !== 'all') {
        window.location.hash = `#services/${category}`;
      } else {
        window.location.hash = '#all-services';
      }
    } else {
      window.location.hash = '#home';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ta' : 'en'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLanguage,
        currentLocation,
        setCurrentLocation,
        activeModal,
        setActiveModal,
        currentPage,
        setCurrentPage,
        selectedServiceCategory,
        setSelectedServiceCategory,
        navigateTo,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
