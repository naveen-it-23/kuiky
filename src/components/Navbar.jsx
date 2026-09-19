import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { locationsList } from '../data/kuikyData';
import { MapPin, User, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const { 
    lang, 
    toggleLanguage, 
    currentLocation, 
    setCurrentLocation, 
    setActiveModal, 
    currentPage, 
    navigateTo 
  } = useLanguage();
  const [showLocDropdown, setShowLocDropdown] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #f1f5f9',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#0066ff',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: '0 4px 10px rgba(0, 102, 255, 0.25)'
          }}>
            <MapPin size={22} fill="#ffffff" color="#0066ff" strokeWidth={1} />
            <div style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#0066ff',
              top: '12px'
            }} />
          </div>
          <div>
            <div style={{
              fontSize: '1.55rem',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1,
              letterSpacing: '-0.02em'
            }}>
              Kuiky
            </div>
  
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }} className="desktop-nav">
          {/* Home with active blue indicator line */}
          <div style={{ position: 'relative', paddingBottom: '4px' }}>
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
              style={{
                fontWeight: currentPage === 'home' ? 700 : 600,
                color: currentPage === 'home' ? '#0066ff' : '#1e293b',
                fontSize: '0.92rem'
              }}
            >
              Home
            </a>
            {currentPage === 'home' && (
              <div style={{
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                right: 0,
                height: '2.5px',
                borderRadius: '9999px',
                backgroundColor: '#0066ff'
              }} />
            )}
          </div>

          {/* All Services with active indicator line */}
          <div style={{ position: 'relative', paddingBottom: '4px' }}>
            <button
              onClick={() => navigateTo('services')}
              style={{
                background: 'none',
                fontWeight: currentPage === 'services' ? 700 : 600,
                color: currentPage === 'services' ? '#0066ff' : '#1e293b',
                fontSize: '0.92rem',
                padding: 0,
                cursor: 'pointer'
              }}
            >
              All Services
            </button>
            {currentPage === 'services' && (
              <div style={{
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                right: 0,
                height: '2.5px',
                borderRadius: '9999px',
                backgroundColor: '#0066ff'
              }} />
            )}
          </div>

          <button
            onClick={() => setActiveModal('auto')}
            style={{
              background: 'none',
              fontWeight: 600,
              color: '#1e293b',
              fontSize: '0.92rem',
              padding: 0
            }}
          >
            Book Auto
          </button>

          <button
            onClick={() => setActiveModal('ambulance')}
            style={{
              background: 'none',
              fontWeight: 600,
              color: '#1e293b',
              fontSize: '0.92rem',
              padding: 0
            }}
          >
            Ambulance
          </button>

          <button
            onClick={() => setActiveModal('puncture')}
            style={{
              background: 'none',
              fontWeight: 600,
              color: '#1e293b',
              fontSize: '0.92rem',
              padding: 0
            }}
          >
            Puncture Shops
          </button>

          <a href="#about" style={{
            fontWeight: 600,
            color: '#1e293b',
            fontSize: '0.92rem'
          }}>
            About
          </a>

          <a href="#contact" style={{
            fontWeight: 600,
            color: '#1e293b',
            fontSize: '0.92rem'
          }}>
            Contact
          </a>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Location Selector Pill */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLocDropdown(!showLocDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#334155',
                backgroundColor: '#ffffff',
                padding: '0.45rem 0.85rem',
                borderRadius: '9999px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            >
              <MapPin size={15} color="#0066ff" />
              <span>{lang === 'ta' ? currentLocation.nameTa : currentLocation.name}</span>
              <ChevronDown size={14} color="#64748b" />
            </button>

            {showLocDropdown && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                minWidth: '200px',
                overflow: 'hidden',
                zIndex: 50
              }}>
                <div style={{ padding: '0.5rem 0.75rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>SELECT LOCATION</span>
                  <button
                    onClick={toggleLanguage}
                    style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0066ff', background: 'none' }}
                  >
                    {lang === 'en' ? 'தமிழ்' : 'English'}
                  </button>
                </div>
                {locationsList.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setCurrentLocation(loc);
                      setShowLocDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      textAlign: 'left',
                      fontSize: '0.88rem',
                      backgroundColor: currentLocation.id === loc.id ? '#eff6ff' : 'transparent',
                      color: currentLocation.id === loc.id ? '#0066ff' : '#334155',
                      fontWeight: currentLocation.id === loc.id ? 700 : 500,
                      borderBottom: '1px solid #f8fafc'
                    }}
                  >
                    {lang === 'ta' ? loc.nameTa : loc.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Login / Sign Up Pill Button */}
          <button
            onClick={() => setActiveModal('auth')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#0066ff',
              color: '#ffffff',
              padding: '0.55rem 1.25rem',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(0, 102, 255, 0.35)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0052cc'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0066ff'}
          >
            <User size={15} />
            <span>Login / Sign Up</span>
          </button>
        </div>
      </div>
    </header>
  );
};
