import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import heroExactDitto from '../assets/hero_exact_ditto_2x.png';
import heroAmbDitto from '../assets/hero_ambulance_ditto.jpg';
import heroPuncDitto from '../assets/hero_puncture_ditto.jpg';
import { HeartPulse, Car, Wrench, ChevronRight, ChevronLeft, PhoneCall } from 'lucide-react';

const SLIDES_COUNT = 3;

export const Hero = () => {
  const { setActiveModal, navigateTo, activeModal } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Continuous auto-slide every 4 seconds (pauses only when modal is open)
  useEffect(() => {
    if (activeModal) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES_COUNT);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeModal]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES_COUNT) % SLIDES_COUNT);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES_COUNT);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext(); // swipe left -> next slide
    } else if (diff < -45) {
      handlePrev(); // swipe right -> prev slide
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section
      id="home"
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
      {/* ─── SLIDER CAROUSEL TRACK CONTAINER ─── */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          overflow: 'hidden'
        }}
      >
        {/* Continuous Horizontal Flex Track */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
            willChange: 'transform'
          }}
        >
          {/* ─── SLIDE 0: ALL SERVICES / AUTO ─── */}
          <div style={{
            position: 'relative',
            width: '100%',
            flexShrink: 0,
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

            {/* Slide 0 Hotspots */}
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

          {/* ─── SLIDE 1: EMERGENCY AMBULANCE ─── */}
          <div style={{
            position: 'relative',
            width: '100%',
            flexShrink: 0,
            aspectRatio: '2048 / 868',
            userSelect: 'none'
          }}>
            <img
              src={heroAmbDitto}
              alt="Kuiky Emergency Ambulance - Help When Seconds Count"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '2048 / 868',
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />

            {/* Slide 1 Hotspots */}
            <div
              onClick={() => setActiveModal('ambulance')}
              title="🚑 Click to Book Emergency Ambulance"
              style={{
                position: 'absolute', left: '2.5%', top: '12%', width: '42%', height: '76%',
                cursor: 'pointer', zIndex: 10, borderRadius: '16px',
                backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none',
                WebkitTapHighlightColor: 'transparent', userSelect: 'none'
              }}
            />
            <div
              onClick={() => navigateTo('services', 'ambulance')}
              title="🚑 Click to Dispatch Ambulance to Your Location"
              style={{
                position: 'absolute', left: '52%', top: '25%', width: '38%', height: '65%',
                cursor: 'pointer', zIndex: 10, borderRadius: '16px',
                backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none',
                WebkitTapHighlightColor: 'transparent', userSelect: 'none'
              }}
            />
            <a
              href="tel:+919842712108"
              title="📞 Emergency Helpline: Call +91 98427 12108"
              style={{
                position: 'absolute', left: '76%', top: '6%', width: '22%', height: '22%',
                cursor: 'pointer', zIndex: 10, borderRadius: '16px', textDecoration: 'none',
                backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none',
                WebkitTapHighlightColor: 'transparent', userSelect: 'none'
              }}
            />
          </div>

          {/* ─── SLIDE 2: TYRE & PUNCTURE SOS ─── */}
          <div style={{
            position: 'relative',
            width: '100%',
            flexShrink: 0,
            aspectRatio: '2048 / 868',
            userSelect: 'none'
          }}>
            <img
              src={heroPuncDitto}
              alt="Kuiky Tyre & Puncture SOS - Mechanic at Your Spot"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '2048 / 868',
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />

            {/* Slide 2 Hotspots */}
            <div
              onClick={() => setActiveModal('puncture')}
              title="🔧 Click to Request Tyre & Puncture Repair"
              style={{
                position: 'absolute', left: '2.5%', top: '12%', width: '42%', height: '76%',
                cursor: 'pointer', zIndex: 10, borderRadius: '16px',
                backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none',
                WebkitTapHighlightColor: 'transparent', userSelect: 'none'
              }}
            />
            <div
              onClick={() => navigateTo('services', 'puncture')}
              title="🔧 Click to Call Mechanic to Your Spot"
              style={{
                position: 'absolute', left: '52%', top: '25%', width: '38%', height: '65%',
                cursor: 'pointer', zIndex: 10, borderRadius: '16px',
                backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none',
                WebkitTapHighlightColor: 'transparent', userSelect: 'none'
              }}
            />
            <div
              onClick={() => navigateTo('services', 'puncture')}
              title="📍 Click to Browse Nearby Puncture Shops"
              style={{
                position: 'absolute', left: '76%', top: '6%', width: '22%', height: '22%',
                cursor: 'pointer', zIndex: 10, borderRadius: '16px',
                backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none',
                WebkitTapHighlightColor: 'transparent', userSelect: 'none'
              }}
            />
          </div>
        </div>

        {/* ─── SLIDER NAVIGATION CONTROLS (Positioned directly over the carousel) ─── */}

        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="hero-slider-arrow hero-slider-arrow-prev"
          style={{
            position: 'absolute',
            left: isMobile ? '0.4rem' : '1.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
            width: isMobile ? '32px' : '44px',
            height: isMobile ? '32px' : '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(11, 27, 61, 0.15)',
            cursor: 'pointer',
            zIndex: 25,
            transition: 'all 0.2s ease',
            outline: 'none',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <ChevronLeft size={isMobile ? 18 : 22} strokeWidth={2.5} />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="hero-slider-arrow hero-slider-arrow-next"
          style={{
            position: 'absolute',
            right: isMobile ? '0.4rem' : '1.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
            width: isMobile ? '32px' : '44px',
            height: isMobile ? '32px' : '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(11, 27, 61, 0.15)',
            cursor: 'pointer',
            zIndex: 25,
            transition: 'all 0.2s ease',
            outline: 'none',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <ChevronRight size={isMobile ? 18 : 22} strokeWidth={2.5} />
        </button>

        {/* Slide Indicator Dots Pill (Hidden on Mobile) */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            bottom: '0.85rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(8px)',
            padding: '0.4rem 0.85rem',
            borderRadius: '9999px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
            zIndex: 25,
            WebkitTapHighlightColor: 'transparent'
          }}>
            {[
              { label: 'All Services / Auto', activeColor: '#04784b' },
              { label: 'Ambulance', activeColor: '#dc2626' },
              { label: 'Puncture Shops', activeColor: '#059669' }
            ].map((item, idx) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Jump to ${item.label} slide`}
                style={{
                  height: '8px',
                  width: currentSlide === idx ? '28px' : '8px',
                  borderRadius: '9999px',
                  backgroundColor: currentSlide === idx ? item.activeColor : '#cbd5e1',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
                  WebkitTapHighlightColor: 'transparent'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ─── MOBILE QUICK ACTION SHORTCUTS (Fixed below the banner on mobile screens) ─── */}
      {isMobile && (
        <div style={{
          padding: '1rem 1rem 2.5rem',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          borderTop: '1px solid #f1f5f9'
        }}>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            textAlign: 'center',
            marginBottom: '0.15rem'
          }}>
            Quick Book a Service
          </div>

          {/* Ambulance Button */}
          <button
            onClick={() => setActiveModal('ambulance')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1rem',
              backgroundColor: '#fef2f2',
              border: '1.5px solid #fecaca',
              borderRadius: '14px',
              cursor: 'pointer',
              width: '100%',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                backgroundColor: '#fee2e2', color: '#dc2626',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <HeartPulse size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#991b1b' }}>Emergency Ambulance</div>
                <div style={{ fontSize: '0.73rem', color: '#dc2626' }}>24/7 • Instant Response</div>
              </div>
            </div>
            <ChevronRight size={18} color="#dc2626" />
          </button>

          {/* Auto Button */}
          <button
            onClick={() => setActiveModal('auto')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1rem',
              backgroundColor: '#fffbeb',
              border: '1.5px solid #fde68a',
              borderRadius: '14px',
              cursor: 'pointer',
              width: '100%',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                backgroundColor: '#fef3c7', color: '#b45309',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Car size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#92400e' }}>Auto Rickshaw</div>
                <div style={{ fontSize: '0.73rem', color: '#b45309' }}>Fast pickup • From ₹35</div>
              </div>
            </div>
            <ChevronRight size={18} color="#b45309" />
          </button>

          {/* Puncture Button */}
          <button
            onClick={() => setActiveModal('puncture')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1rem',
              backgroundColor: '#f0fdf4',
              border: '1.5px solid #bbf7d0',
              borderRadius: '14px',
              cursor: 'pointer',
              width: '100%',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                backgroundColor: '#dcfce7', color: '#04784b',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Wrench size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#04784b' }}>Tyre & Puncture</div>
                <div style={{ fontSize: '0.73rem', color: '#059669' }}>Roadside repair • 15 mins</div>
              </div>
            </div>
            <ChevronRight size={18} color="#04784b" />
          </button>

          {/* Explore All */}
          <button
            onClick={() => navigateTo('services', 'auto')}
            style={{
              width: '100%',
              padding: '0.6rem',
              borderRadius: '10px',
              backgroundColor: 'transparent',
              color: '#04784b',
              border: '1.5px dashed #bbf7d0',
              fontWeight: 700,
              fontSize: '0.84rem',
              cursor: 'pointer',
              marginTop: '0.1rem',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            Explore All Services →
          </button>
        </div>
      )}
    </section>
  );
};

export default Hero;
