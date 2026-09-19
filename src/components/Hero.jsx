import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Search, ArrowRight, Wrench, ChevronLeft, ChevronRight } from 'lucide-react';
import heroAutoBanner from '../assets/hero_auto_banner.jpg';
import heroAmbBanner from '../assets/hero_ambulance_banner.jpg';
import heroPuncBanner from '../assets/hero_banner_exact.jpg';

const HERO_SLIDES = [
  {
    id: 'auto',
    badge: '🛺  Auto Booking',
    badgeBg: '#fef3c7',
    badgeColor: '#b45309',
    badgeBorder: '#fde68a',
    titleLine1: 'Book an Auto.',
    titleHighlight: 'Ride in Minutes.',
    subtitle: 'Reliable local auto rides and verified drivers right at your doorstep.',
    bgImg: heroAutoBanner,
    actionModal: 'auto',
    highlightColor: '#f59e0b',
  },
  {
    id: 'ambulance',
    badge: '🚑  24/7 Emergency',
    badgeBg: '#fee2e2',
    badgeColor: '#dc2626',
    badgeBorder: '#fecaca',
    titleLine1: 'Emergency Ambulance.',
    titleHighlight: 'Help When You Need It.',
    subtitle: 'Instant 24/7 hospital network connection & toll-free 108 emergency response.',
    bgImg: heroAmbBanner,
    actionModal: 'ambulance',
    highlightColor: '#ef4444',
  },
  {
    id: 'puncture',
    badge: '🔧  Tyre & Breakdown SOS',
    badgeBg: '#dcfce7',
    badgeColor: '#059669',
    badgeBorder: '#bbf7d0',
    titleLine1: 'Puncture & Tyre SOS.',
    titleHighlight: 'Help is One Tap Away.',
    subtitle: 'Nearby puncture shops and doorstep mobile mechanic breakdown repair.',
    bgImg: heroPuncBanner,
    actionModal: 'puncture',
    highlightColor: '#10b981',
  },
];

export const Hero = () => {
  const { setActiveModal, navigateTo } = useLanguage();
  const [searchVal, setSearchVal] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  // Moves automatically every 3.8 seconds continuously
  useEffect(() => {
    if (isInputFocused) return; // Only pause while actively typing a search location
    const interval = setInterval(() => {
      handleNext();
    }, 3800);
    return () => clearInterval(interval);
  }, [isInputFocused, handleNext]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const v = searchVal.toLowerCase();
    if (v.includes('amb') || v.includes('108')) setActiveModal('ambulance');
    else if (v.includes('punc') || v.includes('tire') || v.includes('tyre')) setActiveModal('puncture');
    else setActiveModal('auto');
  };

  const current = HERO_SLIDES[currentSlide];

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '580px',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        padding: '2.5rem 0 3.25rem',
        borderBottom: '1px solid #f1f5f9',
        overflow: 'hidden',
      }}
    >
      {/* 3 Background Image Layers (crossfade transition) */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(to right, #ffffff 0%, #ffffff 32%, rgba(255,255,255,0.94) 44%, rgba(255,255,255,0.5) 58%, rgba(255,255,255,0) 72%), url(${slide.bgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
            opacity: currentSlide === idx ? 1 : 0,
            transition: 'opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Clickable Banner Area on the right side: redirects directly to current service page */}
      <div
        onClick={() => navigateTo('services', current.id)}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '44%',
          cursor: 'pointer',
          zIndex: 2,
        }}
        title={`Click to view ${current.badge} services`}
      />

      {/* Navigation Arrow Previous */}
      <button
        type="button"
        onClick={handlePrev}
        className="hero-slider-arrow hero-slider-arrow-prev"
        aria-label="Previous service slide"
      >
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>

      {/* Navigation Arrow Next */}
      <button
        type="button"
        onClick={handleNext}
        className="hero-slider-arrow hero-slider-arrow-next"
        aria-label="Next service slide"
      >
        <ChevronRight size={22} strokeWidth={2.5} />
      </button>

      {/* Main Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ maxWidth: '620px' }}>

          {/* Active Service Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            backgroundColor: current.badgeBg,
            color: current.badgeColor,
            border: `1px solid ${current.badgeBorder}`,
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 800,
            marginBottom: '1rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease',
          }}>
            <span>{current.badge}</span>
          </div>

          {/* Dynamic Headline */}
          <h1 style={{
            fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
            fontWeight: 800,
            color: '#0b1b3d',
            lineHeight: 1.18,
            letterSpacing: '-0.03em',
            marginBottom: '0.75rem',
            minHeight: '2.4em',
            transition: 'all 0.3s ease',
          }}>
            {current.titleLine1}<br />
            <span style={{ color: current.highlightColor }}>{current.titleHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '0.96rem',
            color: '#64748b',
            lineHeight: 1.55,
            marginBottom: '1.5rem',
            maxWidth: '520px',
            minHeight: '2.8em',
            transition: 'all 0.3s ease',
          }}>
            {current.subtitle}
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '9999px',
              padding: '0.45rem 0.5rem 0.45rem 1.35rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0',
              maxWidth: '520px',
              marginBottom: '1.75rem',
              transition: 'all 0.2s ease',
            }}
          >
            <MapPin size={20} color="#64748b" style={{ flexShrink: 0, marginRight: '0.75rem' }} />
            <input
              type="text"
              placeholder="Enter your location (e.g. Gobi, Erode)"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.96rem',
                color: '#1e293b',
                fontFamily: 'inherit',
                background: 'transparent',
              }}
            />
            <button
              type="submit"
              aria-label="Search"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#0066ff',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0,102,255,0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0052cc'; e.currentTarget.style.transform = 'scale(1.06)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#0066ff'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <Search size={18} strokeWidth={2.5} />
            </button>
          </form>

          {/* 3 Pill buttons (Clicking opens modal and sets current slide) */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.85rem' }}>

            {/* Pill 1: Book an Auto */}
            <button
              onClick={() => {
                setCurrentSlide(0);
                setActiveModal('auto');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: '#f59e0b',
                color: '#1e1b4b',
                padding: '0.75rem 1.35rem',
                borderRadius: '9999px',
                fontWeight: 800,
                fontSize: '0.92rem',
                boxShadow: currentSlide === 0
                  ? '0 0 0 3px #ffffff, 0 0 0 5px #f59e0b, 0 6px 20px rgba(245,158,11,0.45)'
                  : '0 4px 14px rgba(245,158,11,0.3)',
                transform: currentSlide === 0 ? 'scale(1.03)' : 'scale(1)',
                transition: 'all 0.25s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(245,158,11,0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = currentSlide === 0 ? 'scale(1.03)' : 'scale(1)';
                e.currentTarget.style.boxShadow = currentSlide === 0
                  ? '0 0 0 3px #ffffff, 0 0 0 5px #f59e0b, 0 6px 20px rgba(245,158,11,0.45)'
                  : '0 4px 14px rgba(245,158,11,0.3)';
              }}
            >
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>🛺</span>
              <span>Book an Auto</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </button>

            {/* Pill 2: Emergency Ambulance */}
            <button
              onClick={() => {
                setCurrentSlide(1);
                setActiveModal('ambulance');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                padding: '0.75rem 1.35rem',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.92rem',
                boxShadow: currentSlide === 1
                  ? '0 0 0 3px #ffffff, 0 0 0 5px #ef4444, 0 6px 20px rgba(239,68,68,0.45)'
                  : '0 4px 14px rgba(239,68,68,0.3)',
                transform: currentSlide === 1 ? 'scale(1.03)' : 'scale(1)',
                transition: 'all 0.25s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(239,68,68,0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = currentSlide === 1 ? 'scale(1.03)' : 'scale(1)';
                e.currentTarget.style.boxShadow = currentSlide === 1
                  ? '0 0 0 3px #ffffff, 0 0 0 5px #ef4444, 0 6px 20px rgba(239,68,68,0.45)'
                  : '0 4px 14px rgba(239,68,68,0.3)';
              }}
            >
              <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>🚑</span>
              <span>Emergency Ambulance</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </button>

            {/* Pill 3: Find Puncture Shop */}
            <button
              onClick={() => {
                setCurrentSlide(2);
                setActiveModal('puncture');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: '#10b981',
                color: '#ffffff',
                padding: '0.75rem 1.35rem',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.92rem',
                boxShadow: currentSlide === 2
                  ? '0 0 0 3px #ffffff, 0 0 0 5px #10b981, 0 6px 20px rgba(16,185,129,0.45)'
                  : '0 4px 14px rgba(16,185,129,0.3)',
                transform: currentSlide === 2 ? 'scale(1.03)' : 'scale(1)',
                transition: 'all 0.25s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(16,185,129,0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = currentSlide === 2 ? 'scale(1.03)' : 'scale(1)';
                e.currentTarget.style.boxShadow = currentSlide === 2
                  ? '0 0 0 3px #ffffff, 0 0 0 5px #10b981, 0 6px 20px rgba(16,185,129,0.45)'
                  : '0 4px 14px rgba(16,185,129,0.3)';
              }}
            >
              <Wrench size={16} strokeWidth={2.5} />
              <span>Find Puncture Shop</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </button>

          </div>

          {/* Slide Indicator Dots */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '1.75rem',
          }}>
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Jump to ${slide.badge} slide`}
                className={`hero-dot-btn ${currentSlide === idx ? 'active' : ''}`}
                style={{
                  width: currentSlide === idx ? '28px' : '9px',
                  backgroundColor: currentSlide === idx ? slide.highlightColor : '#cbd5e1',
                }}
              />
            ))}
            <span style={{
              fontSize: '0.74rem',
              color: '#94a3b8',
              fontWeight: 600,
              marginLeft: '0.35rem',
            }}>
              {currentSlide + 1} / {HERO_SLIDES.length}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};



