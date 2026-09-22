import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { locationsList } from '../data/kuikyData';
import { MapPin, User, ChevronDown, Menu, X, LogOut } from 'lucide-react';

import KuikyLogo from './KuikyLogo';

export const Navbar = () => {
  const { 
    lang, 
    toggleLanguage, 
    currentLocation, 
    setCurrentLocation, 
    setActiveModal, 
    currentPage, 
    navigateTo,
    navigateToAnchor,
    currentUser,
    logout
  } = useLanguage();

  const [showLocDropdown, setShowLocDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleDocClick = () => {
      setShowLocDropdown(false);
      setShowUserDropdown(false);
      setMobileMenuOpen(false);
    };
    document.addEventListener('click', handleDocClick);
    return () => document.removeEventListener('click', handleDocClick);
  }, []);

  const shortLocName = (loc) => {
    const full = lang === 'ta' ? loc.nameTa : loc.name;
    return full.split(',')[0].trim();
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #f1f5f9',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
      width: '100%'
    }}>
      <div className="container nav-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
        width: '100%'
      }}>
        
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); navigateTo('home'); setMobileMenuOpen(false); }}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            textDecoration: 'none',
            flexShrink: 0
          }}
        >
          <KuikyLogo height={30} showSubtitle={true} />
        </a>

        {/* Desktop Nav Links - Exact Reference Match */}
        <nav 
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.85rem',
            height: '72px'
          }}
        >
          {/* Home */}
          <div style={{ 
            position: 'relative', 
            height: '100%', 
            display: 'inline-flex', 
            alignItems: 'center' 
          }}>
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
              style={{
                fontWeight: currentPage === 'home' ? 700 : 600,
                color: currentPage === 'home' ? '#04784b' : '#1e293b',
                fontSize: '0.92rem',
                transition: 'color 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => { if (currentPage !== 'home') e.currentTarget.style.color = '#04784b'; }}
              onMouseOut={(e) => { if (currentPage !== 'home') e.currentTarget.style.color = '#1e293b'; }}
            >
              Home
            </a>
            {currentPage === 'home' && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                borderRadius: '9999px',
                backgroundColor: '#04784b'
              }} />
            )}
          </div>

          {/* Services */}
          <div style={{ 
            position: 'relative', 
            height: '100%', 
            display: 'inline-flex', 
            alignItems: 'center' 
          }}>
            <button
              onClick={() => navigateTo('services', 'auto')}
              style={{
                background: 'none',
                border: 'none',
                fontWeight: currentPage === 'services' ? 700 : 600,
                color: currentPage === 'services' ? '#04784b' : '#1e293b',
                fontSize: '0.92rem',
                padding: 0,
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => { if (currentPage !== 'services') e.currentTarget.style.color = '#04784b'; }}
              onMouseOut={(e) => { if (currentPage !== 'services') e.currentTarget.style.color = '#1e293b'; }}
            >
              Services
            </button>
            {currentPage === 'services' && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                borderRadius: '9999px',
                backgroundColor: '#04784b'
              }} />
            )}
          </div>

          {/* About */}
          <div style={{ position: 'relative', height: '100%', display: 'inline-flex', alignItems: 'center' }}>
            <button 
              onClick={() => navigateTo('about')}
              style={{
                background: 'none',
                border: 'none',
                fontWeight: currentPage === 'about' ? 700 : 600,
                color: currentPage === 'about' ? '#04784b' : '#1e293b',
                fontSize: '0.92rem',
                display: 'inline-flex',
                alignItems: 'center',
                height: '100%',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
                padding: 0
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#04784b'}
              onMouseOut={(e) => { if (currentPage !== 'about') e.currentTarget.style.color = '#1e293b'; }}
            >
              About
            </button>
            {currentPage === 'about' && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                borderRadius: '9999px',
                backgroundColor: '#04784b'
              }} />
            )}
          </div>

          {/* How It Works */}
          <button 
            onClick={() => navigateToAnchor('how-it-works', 'How It Works')}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: 600,
              color: '#1e293b',
              fontSize: '0.92rem',
              display: 'inline-flex',
              alignItems: 'center',
              height: '100%',
              transition: 'color 0.2s ease',
              cursor: 'pointer',
              padding: 0
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#04784b'}
            onMouseOut={(e) => e.currentTarget.style.color = '#1e293b'}
          >
            How It Works
          </button>

          {/* Contact */}
          <div style={{ position: 'relative', height: '100%', display: 'inline-flex', alignItems: 'center' }}>
            <button 
              onClick={() => navigateTo('contact')}
              style={{
                background: 'none',
                border: 'none',
                fontWeight: currentPage === 'contact' ? 700 : 600,
                color: currentPage === 'contact' ? '#04784b' : '#1e293b',
                fontSize: '0.92rem',
                display: 'inline-flex',
                alignItems: 'center',
                height: '100%',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
                padding: 0
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#04784b'}
              onMouseOut={(e) => { if (currentPage !== 'contact') e.currentTarget.style.color = '#1e293b'; }}
            >
              Contact
            </button>
            {currentPage === 'contact' && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                borderRadius: '9999px',
                backgroundColor: '#04784b'
              }} />
            )}
          </div>
        </nav>

        {/* Right Actions */}
        <div 
          className="nav-right-actions"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            flexShrink: 0 
          }}
        >
          
          {/* Location Selector Pill */}
          <div 
            style={{ position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setShowLocDropdown(!showLocDropdown); setShowUserDropdown(false); }}
              className="nav-loc-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: '#334155',
                backgroundColor: '#ffffff',
                padding: '0.4rem 0.7rem',
                borderRadius: '9999px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              <MapPin size={14} color="#04784b" />
              <span className="nav-loc-text-desktop">{lang === 'ta' ? currentLocation.nameTa : currentLocation.name}</span>
              <span className="nav-loc-text-mobile">{shortLocName(currentLocation)}</span>
              <ChevronDown size={12} color="#64748b" style={{ transform: showLocDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
            </button>

            {showLocDropdown && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                minWidth: '210px',
                overflow: 'hidden',
                zIndex: 150,
                animation: 'slideUp 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
                <div style={{ 
                  padding: '0.55rem 0.85rem', 
                  backgroundColor: '#f8fafc', 
                  borderBottom: '1px solid #f1f5f9', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.04em' }}>SELECT LOCATION</span>
                  <button
                    onClick={toggleLanguage}
                    style={{ fontSize: '0.74rem', fontWeight: 700, color: '#04784b', background: 'none', border: 'none', cursor: 'pointer' }}
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
                      fontSize: '0.86rem',
                      backgroundColor: currentLocation.id === loc.id ? '#f0fdf4' : 'transparent',
                      color: currentLocation.id === loc.id ? '#04784b' : '#334155',
                      fontWeight: currentLocation.id === loc.id ? 700 : 500,
                      border: 'none',
                      borderBottom: '1px solid #f8fafc',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => { if (currentLocation.id !== loc.id) e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                    onMouseOut={(e) => { if (currentLocation.id !== loc.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    {lang === 'ta' ? loc.nameTa : loc.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Logged-in Button OR Sign In Pill Button */}
          {currentUser ? (
            <div 
              style={{ position: 'relative' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setShowUserDropdown(!showUserDropdown); setShowLocDropdown(false); }}
                className="nav-user-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: '#e6f4ea',
                  color: '#04784b',
                  border: '1.5px solid #a7f3d0',
                  padding: '0.38rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#04784b',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  flexShrink: 0
                }}>
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="nav-user-name-desktop">{currentUser.name.split(' ')[0]}</span>
                <ChevronDown size={12} style={{ transform: showUserDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>

              {showUserDropdown && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                  border: '1px solid #e2e8f0',
                  minWidth: '200px',
                  padding: '0.5rem',
                  zIndex: 150,
                  animation: 'slideUp 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                  {/* User Profile Card Header */}
                  <div 
                    onClick={() => {
                      navigateTo('profile');
                      setShowUserDropdown(false);
                    }}
                    style={{ 
                      padding: '0.65rem 0.75rem', 
                      borderBottom: '1px solid #f1f5f9', 
                      marginBottom: '0.35rem',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0fdf4'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>{currentUser.name}</div>
                      <span style={{ 
                        fontSize: '0.66rem', 
                        backgroundColor: '#e6f4ea', 
                        color: '#04784b', 
                        fontWeight: 700, 
                        padding: '1px 6px', 
                        borderRadius: '4px' 
                      }}>
                        {lang === 'ta' ? 'சுயவிவரம் →' : 'Profile →'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#04784b', fontWeight: 600 }}>{currentUser.role}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '1px' }}>{currentUser.phone}</div>
                  </div>

                  <button
                    onClick={() => {
                      navigateTo('profile');
                      setShowUserDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.5rem 0.65rem',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                      color: '#1e293b',
                      fontWeight: 600,
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      marginBottom: '0.2rem'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <User size={15} color="#04784b" />
                    <span>{lang === 'ta' ? 'எனது சுயவிவரம்' : 'My Profile'}</span>
                  </button>

                  <button
                    onClick={() => { logout(); setShowUserDropdown(false); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.5rem 0.65rem',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                      color: '#ef4444',
                      fontWeight: 600,
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <LogOut size={15} />
                    <span>{lang === 'ta' ? 'வெளியேறு' : 'Sign Out'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setActiveModal('auth')}
              className="nav-login-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#04784b',
                color: '#ffffff',
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: 700,
                boxShadow: '0 2px 6px rgba(4, 120, 75, 0.25)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                border: 'none',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#035c39'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#04784b'; }}
            >
              <span className="login-btn-text-full">Login / Sign Up</span>
              <span className="login-btn-text-short">Login</span>
            </button>
          )}

          {/* Mobile Menu Hamburger Toggle — Far Right */}
          <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button
              className="mobile-menu-btn"
              onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setShowLocDropdown(false); setShowUserDropdown(false); }}
              aria-label="Toggle Navigation Menu"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: mobileMenuOpen ? '#e6f4ea' : '#f8fafc',
                color: mobileMenuOpen ? '#04784b' : '#0f172a',
                border: '1.5px solid ' + (mobileMenuOpen ? '#a7f3d0' : '#e2e8f0'),
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
            </button>

            {/* Right-side floating dropdown panel for mobile nav tabs */}
            {mobileMenuOpen && (
              <>
                {/* Backdrop to catch clicks outside dropdown */}
                <div 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.25)',
                    backdropFilter: 'blur(2px)',
                    zIndex: 140
                  }}
                />

                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 10px)',
                  right: 0,
                  width: 'min(280px, calc(100vw - 1.5rem))',
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  boxShadow: '0 20px 50px -10px rgba(11, 27, 61, 0.25), 0 0 0 1px rgba(226, 232, 240, 0.95)',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  zIndex: 200,
                  animation: 'slideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>

                  {/* User profile strip at top */}
                  {currentUser ? (
                    <div
                      onClick={() => { navigateTo('profile'); setMobileMenuOpen(false); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        padding: '0.85rem 1rem',
                        backgroundColor: '#f0fdf4',
                        borderBottom: '1px solid #d1fae5',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        backgroundColor: '#04784b', color: '#ffffff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.95rem', fontWeight: 800, flexShrink: 0
                      }}>
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ overflow: 'hidden', flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.name}</div>
                        <div style={{ fontSize: '0.74rem', color: '#04784b', fontWeight: 600 }}>{currentUser.phone} • Profile →</div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setActiveModal('auth'); setMobileMenuOpen(false); }}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        backgroundColor: '#04784b',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        borderBottom: '1px solid rgba(255,255,255,0.15)'
                      }}
                    >
                      <User size={16} />
                      <span>Sign In / Register</span>
                    </button>
                  )}

                  {/* Section Label: NAVIGATION */}
                  <div style={{
                    padding: '0.65rem 1rem 0.25rem',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>
                    NAVIGATION TABS
                  </div>

                  {/* Nav tabs links */}
                  <div style={{ padding: '0.25rem 0.5rem' }}>
                    {[
                      { label: '🏠 Home', action: () => { navigateTo('home'); setMobileMenuOpen(false); }, active: currentPage === 'home' },
                      { label: '⚡ Services', action: () => { navigateTo('services', 'auto'); setMobileMenuOpen(false); }, active: currentPage === 'services' },
                      { label: 'ℹ️ About', action: () => { navigateTo('about'); setMobileMenuOpen(false); }, active: currentPage === 'about' },
                      { label: '🔄 How It Works', action: () => { navigateToAnchor('how-it-works', 'How It Works'); setMobileMenuOpen(false); }, active: false },
                      { label: '📞 Contact', action: () => { navigateTo('contact'); setMobileMenuOpen(false); }, active: currentPage === 'contact' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        style={{
                          width: '100%',
                          padding: '0.7rem 0.9rem',
                          borderRadius: '10px',
                          textAlign: 'left',
                          fontWeight: item.active ? 800 : 600,
                          color: item.active ? '#04784b' : '#1e293b',
                          backgroundColor: item.active ? '#f0fdf4' : 'transparent',
                          fontSize: '0.92rem',
                          cursor: 'pointer',
                          border: 'none',
                          display: 'block',
                          transition: 'background-color 0.15s ease',
                          marginBottom: '2px'
                        }}
                        onMouseOver={(e) => { if (!item.active) e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                        onMouseOut={(e) => { if (!item.active) e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Quick Booking Row */}
                  <div style={{
                    borderTop: '1px solid #f1f5f9',
                    padding: '0.65rem 0.75rem',
                    backgroundColor: '#fafbfc'
                  }}>
                    <div style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '0.4rem',
                      paddingLeft: '0.25rem'
                    }}>
                      QUICK BOOKING
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.35rem' }}>
                      <button
                        onClick={() => { setActiveModal('ambulance'); setMobileMenuOpen(false); }}
                        style={{
                          padding: '0.5rem 0.25rem',
                          borderRadius: '8px',
                          border: '1px solid #fecaca',
                          backgroundColor: '#fef2f2',
                          color: '#dc2626',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        🚑 Amb
                      </button>
                      <button
                        onClick={() => { setActiveModal('auto'); setMobileMenuOpen(false); }}
                        style={{
                          padding: '0.5rem 0.25rem',
                          borderRadius: '8px',
                          border: '1px solid #fde68a',
                          backgroundColor: '#fffbeb',
                          color: '#b45309',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        🛺 Auto
                      </button>
                      <button
                        onClick={() => { setActiveModal('puncture'); setMobileMenuOpen(false); }}
                        style={{
                          padding: '0.5rem 0.25rem',
                          borderRadius: '8px',
                          border: '1px solid #bbf7d0',
                          backgroundColor: '#f0fdf4',
                          color: '#04784b',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        🔧 Tyre
                      </button>
                    </div>
                  </div>

                  {/* Language switcher & Location footer */}
                  <div style={{
                    borderTop: '1px solid #f1f5f9',
                    padding: '0.65rem 1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#ffffff'
                  }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                      📍 {shortLocName(currentLocation)}
                    </span>
                    <button
                      onClick={toggleLanguage}
                      style={{
                        backgroundColor: '#eff6ff',
                        color: '#0066ff',
                        fontWeight: 700,
                        fontSize: '0.76rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        border: '1px solid #bfdbfe',
                        cursor: 'pointer'
                      }}
                    >
                      {lang === 'en' ? 'தமிழ்' : 'English'}
                    </button>
                  </div>

                  {/* Sign Out link if logged in */}
                  {currentUser && (
                    <button
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      style={{
                        width: '100%',
                        padding: '0.65rem 1rem',
                        border: 'none',
                        borderTop: '1px solid #f1f5f9',
                        backgroundColor: '#fff5f5',
                        color: '#ef4444',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <LogOut size={14} />
                      <span>{lang === 'ta' ? 'வெளியேறு' : 'Sign Out'}</span>
                    </button>
                  )}

                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
