import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HowItWorks } from './HowItWorks';
import { Testimonials } from './Testimonials';
import heroExactDitto from '../assets/hero_exact_ditto_2x.png';

export const HowItWorksPage = () => {
  const { navigateTo } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* ─── SECTION 1: SAME HERO IMAGE DITTO (WITHOUT SLIDING) ─── */}
      <section 
        className="hero-slider-wrap"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxSizing: 'border-box',
          WebkitTapHighlightColor: 'transparent',
          outline: 'none',
          userSelect: 'none'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1440px',
            margin: '0 auto',
            overflow: 'hidden'
          }}
        >
          {/* Static Single Frame - Exact Ditto Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '2048 / 868',
            userSelect: 'none'
          }}>
            <img
              src={heroExactDitto}
              alt="Kuiky - Need Help? We're Just a Tap Away."
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '2048 / 868',
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />

            {/* Interactive Clickable Hotspots */}
            <div
              onClick={() => navigateTo('services', 'auto')}
              title="Click to explore Kuiky Services"
              style={{
                position: 'absolute', left: '2.5%', top: '12%', width: '42%', height: '76%',
                cursor: 'pointer', zIndex: 10, borderRadius: '16px',
                backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none',
                WebkitTapHighlightColor: 'transparent', userSelect: 'none'
              }}
            />
            <div
              onClick={() => navigateTo('services', 'ambulance')}
              title="🚑 Click to Book Emergency Ambulance"
              style={{
                position: 'absolute', left: '44.5%', top: '30%', width: '19.2%', height: '54%',
                cursor: 'pointer', zIndex: 10, borderRadius: '16px',
                backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none',
                WebkitTapHighlightColor: 'transparent', userSelect: 'none'
              }}
            />
            <div
              onClick={() => navigateTo('services', 'auto')}
              title="🛺 Click to Book Passenger / Cargo Auto"
              style={{
                position: 'absolute', left: '63.8%', top: '40%', width: '16%', height: '46%',
                cursor: 'pointer', zIndex: 10, borderRadius: '16px',
                backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none',
                WebkitTapHighlightColor: 'transparent', userSelect: 'none'
              }}
            />
            <div
              onClick={() => navigateTo('services', 'puncture')}
              title="🔧 Click to Call Tyre & Puncture Repair"
              style={{
                position: 'absolute', left: '80%', top: '46%', width: '17%', height: '47%',
                cursor: 'pointer', zIndex: 10, borderRadius: '16px',
                backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none',
                WebkitTapHighlightColor: 'transparent', userSelect: 'none'
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: HOW IT WORKS 4 STEPS + QUOTE + APP BANNER ─── */}
      <HowItWorks />

      {/* ─── SECTION 3: WHAT PEOPLE SAY (TESTIMONIALS) ─── */}
      <Testimonials />
    </div>
  );
};

export default HowItWorksPage;
