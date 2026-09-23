import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, locationsList } from '../data/kuikyData';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [currentLocation, setCurrentLocation] = useState(locationsList[0]);
  const [activeModal, setActiveModal] = useState(null); // 'auto' | 'ambulance' | 'puncture' | 'auth' | null
  
  // Persistent user state with fallback to the active session user from the screenshot
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const loggedOut = localStorage.getItem('kuiky_logged_out');
      if (loggedOut === 'true') return null;
      const saved = localStorage.getItem('kuiky_user');
      if (saved) return JSON.parse(saved);
      return {
        name: 'Sri Raj',
        phone: '98765 43210',
        role: 'Verified User',
        email: 'sriraj@example.com',
        city: 'Erode, Tamil Nadu',
        joinedDate: 'September 2026'
      };
    } catch (e) {
      return null;
    }
  });

  const [pendingAction, setPendingAction] = useState(null); // { type: 'modal'|'navigate'|'anchor', modal?, page?, category?, anchor?, title? } | null

  const parseHash = () => {
    if (typeof window === 'undefined') return { page: 'home', category: 'auto' };
    const h = window.location.hash;
    if (h.startsWith('#services/')) {
      const cat = h.replace('#services/', '');
      const valid = ['auto', 'ambulance', 'puncture'];
      return { page: 'services', category: valid.includes(cat) ? cat : 'auto' };
    }
    if (h === '#all-services' || h === '#services') {
      return { page: 'services', category: 'auto' };
    }
    if (h === '#profile') {
      return { page: 'profile', category: 'auto' };
    }
    if (h === '#about') {
      return { page: 'about', category: 'auto' };
    }
    if (h === '#contact') {
      return { page: 'contact', category: 'auto' };
    }
    if (h === '#how-it-works' || h === '#howitworks') {
      return { page: 'how-it-works', category: 'auto' };
    }
    return { page: 'home', category: 'auto' };
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

  // Intercept modal opening: if user is not signed in, redirect to auth first!
  const handleSetActiveModal = (modalName, meta = {}) => {
    if (!modalName) {
      setActiveModal(null);
      return;
    }
    if (modalName === 'auth') {
      setActiveModal('auth');
      return;
    }
    if (modalName === 'profile') {
      navigateTo('profile');
      return;
    }
    // Emergency Ambulance must NEVER require authentication - instant 24/7 free access!
    if (modalName === 'ambulance') {
      setActiveModal('ambulance');
      return;
    }

    // Protected service modals require authentication
    if (!currentUser) {
      const titles = {
        auto: 'Book Auto',
        ambulance: 'Emergency Ambulance',
        puncture: 'Puncture Shops'
      };
      setPendingAction({
        type: 'modal',
        modal: modalName,
        title: meta.title || titles[modalName] || modalName
      });
      setActiveModal('auth');
      return;
    }
    setActiveModal(modalName);
  };

  // Intercept navigation: if user is not signed in, redirect to auth first!
  const navigateTo = (page, category = 'auto') => {
    const valid = ['auto', 'ambulance', 'puncture'];
    const resolvedCategory = (category && valid.includes(category)) ? category : 'auto';

    // Emergency ambulance must NEVER require login or authentication!
    if (resolvedCategory === 'ambulance') {
      setCurrentPage('services');
      setSelectedServiceCategory('ambulance');
      window.location.hash = '#services/ambulance';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if ((page === 'services' || page === 'profile') && !currentUser) {
      setPendingAction({
        type: 'navigate',
        page,
        category: resolvedCategory,
        title: page === 'profile' ? 'Profile' : 'Services'
      });
      setActiveModal('auth');
      return;
    }
    setCurrentPage(page);
    setSelectedServiceCategory(resolvedCategory);
    if (page === 'services') {
      window.location.hash = `#services/${resolvedCategory}`;
    } else if (page === 'profile') {
      window.location.hash = '#profile';
    } else if (page === 'about') {
      window.location.hash = '#about';
    } else if (page === 'contact') {
      window.location.hash = '#contact';
    } else if (page === 'how-it-works' || page === 'howItWorks') {
      window.location.hash = '#how-it-works';
    } else {
      window.location.hash = '#home';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Anchor navigation (Home, Services, About, How It Works, Contact)
  const navigateToAnchor = (anchorId, title) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.location.hash = '#home';
    }
    const scrollToTarget = () => {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return true;
      }
      return false;
    };
    if (!scrollToTarget()) {
      setTimeout(scrollToTarget, 60);
      setTimeout(scrollToTarget, 200);
    }
  };

  // Called upon successful OTP verification in AuthModal
  const completeLogin = (userData) => {
    setCurrentUser(userData);
    try {
      localStorage.setItem('kuiky_user', JSON.stringify(userData));
      localStorage.removeItem('kuiky_logged_out');
    } catch (e) {}

    if (pendingAction) {
      const action = pendingAction;
      setPendingAction(null);
      if (action.type === 'modal') {
        setActiveModal(action.modal);
      } else if (action.type === 'navigate') {
        setCurrentPage(action.page);
        setSelectedServiceCategory(action.category || 'all');
        if (action.page === 'services') {
          window.location.hash = action.category && action.category !== 'all'
            ? `#services/${action.category}`
            : '#all-services';
        } else if (action.page === 'profile') {
          window.location.hash = '#profile';
        } else {
          window.location.hash = '#home';
        }
        setActiveModal(null);
      } else if (action.type === 'anchor') {
        if (currentPage !== 'home') {
          setCurrentPage('home');
          window.location.hash = '#home';
        }
        setActiveModal(null);
        setTimeout(() => {
          const el = document.getElementById(action.anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      setActiveModal(null);
    }
  };

  const updateUserProfile = (updatedFields) => {
    setCurrentUser((prev) => {
      const updated = { ...(prev || {}), ...updatedFields };
      try {
        localStorage.setItem('kuiky_user', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setPendingAction(null);
    try {
      localStorage.removeItem('kuiky_user');
      localStorage.setItem('kuiky_logged_out', 'true');
    } catch (e) {}
    if (currentPage === 'profile') {
      setCurrentPage('home');
      window.location.hash = '#home';
    }
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
        setActiveModal: handleSetActiveModal,
        rawSetActiveModal: setActiveModal,
        currentPage,
        setCurrentPage,
        selectedServiceCategory,
        setSelectedServiceCategory,
        navigateTo,
        navigateToAnchor,
        pendingAction,
        setPendingAction,
        currentUser,
        setCurrentUser,
        updateUserProfile,
        completeLogin,
        logout,
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
