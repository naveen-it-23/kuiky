import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import cardAmbImg from '../assets/card_ambulance.jpg';
import cardAutoImg from '../assets/card_auto.jpg';
import cardTyreImg from '../assets/card_tyre.jpg';

export const ServicesSection = () => {
  const { setActiveModal, navigateTo } = useLanguage();
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" style={{ padding: '3.75rem 0 4.5rem', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header (Exact Match to Screenshot) */}
        <div
          className="services-header-row"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1.25rem'
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '0.35rem'
              }}
            >
              OUR SERVICES
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.35rem)',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.025em',
                margin: 0
              }}
            >
              Essential Services for Your Everyday Needs
            </h2>
          </div>

          {/* Right Subtitle & Arrow Slider Buttons */}
          <div className="services-header-right" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span
              style={{
                fontSize: '0.88rem',
                color: '#64748b',
                fontWeight: 500
              }}
            >
              Different needs, one trusted platform.
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Previous Service"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#e6f4ea',
                  color: '#04784b',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#d1ebd8'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#e6f4ea'; }}
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Next Service"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#04784b',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(4, 120, 75, 0.25)'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#035c39'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#04784b'; }}
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Service Cards Grid */}
        <div
          ref={scrollContainerRef}
          className="service-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {/* Card 1: Ambulance Booking (Soft Rose Background) */}
          <div
            className="service-card"
            onClick={() => navigateTo('services', 'ambulance')}
            style={{
              backgroundColor: '#fff1f2',
              borderRadius: '22px',
              padding: '1.6rem 1.65rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 18px rgba(225, 29, 72, 0.04)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              position: 'relative',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(225, 29, 72, 0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(225, 29, 72, 0.04)';
            }}
          >
            <div>
              {/* Header: Circle Icon + Titles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#fb7185',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="5" width="15" height="12" rx="2" fill="white" />
                    <path d="M17 9H20L22 12V17H17V9Z" fill="white" />
                    <circle cx="6.5" cy="18.5" r="2.5" fill="#fb7185" stroke="white" strokeWidth="1.5" />
                    <circle cx="17.5" cy="18.5" r="2.5" fill="#fb7185" stroke="white" strokeWidth="1.5" />
                    <path d="M7.5 11H11.5M9.5 9V13" stroke="#fb7185" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#111827', margin: '0 0 0.2rem 0' }}>
                    Ambulance Booking
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 500 }}>
                    Emergency care, just a call away.
                  </div>
                </div>
              </div>

              {/* Middle Row: Left 3 Checkmarks + Right Vehicle Image */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  minHeight: '120px'
                }}
              >
                {/* 3 Checkmarks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#04784b" />
                      <path d="M6 10.2L8.7 13L14 7.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1f2937' }}>24/7 Availability</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#04784b" />
                      <path d="M6 10.2L8.7 13L14 7.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1f2937' }}>Trained Medical Staff</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#04784b" />
                      <path d="M6 10.2L8.7 13L14 7.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1f2937' }}>24/7 Priority Emergency Line</span>
                  </div>
                </div>

                {/* Vehicle Cutout Image */}
                <div
                  style={{
                    width: '140px',
                    height: '110px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={cardAmbImg}
                    alt="Emergency Ambulance"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      mixBlendMode: 'multiply',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Button Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('services', 'ambulance');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: '#ffe4e6',
                  color: '#e11d48',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#fecdd3';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffe4e6';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Emergency SOS</span>
                <ArrowRight size={15} />
              </button>

              <a
                href="tel:+919842712108"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  padding: '0.55rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(220, 38, 38, 0.35)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>📞 Call SOS</span>
              </a>
            </div>
          </div>

          {/* Card 2: Auto Booking (Soft Warm Yellow Background) */}
          <div
            className="service-card"
            onClick={() => navigateTo('services', 'auto')}
            style={{
              backgroundColor: '#fffbeb',
              borderRadius: '22px',
              padding: '1.6rem 1.65rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 18px rgba(217, 119, 6, 0.04)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              position: 'relative',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(217, 119, 6, 0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(217, 119, 6, 0.04)';
            }}
          >
            <div>
              {/* Header: Circle Icon + Titles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#fcd34d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M4 9C4 6.5 6 4 12 4C18 4 20 6.5 20 9L21 15V19C21 19.6 20.6 20 20 20H19C18.4 20 18 19.6 18 19V18H6V19C6 19.6 5.6 20 5 20H4C3.4 20 3 19.6 3 19V15L4 9Z" fill="#1f2937" />
                    <rect x="6" y="8" width="12" height="5" rx="1" fill="#fcd34d" />
                    <circle cx="7.5" cy="15.5" r="1.5" fill="#fcd34d" />
                    <circle cx="16.5" cy="15.5" r="1.5" fill="#fcd34d" />
                  </svg>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#111827', margin: '0 0 0.2rem 0' }}>
                    Auto Booking
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 500 }}>
                    Quick rides for your daily travel.
                  </div>
                </div>
              </div>

              {/* Middle Row: Left 3 Checkmarks + Right Vehicle Image */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  minHeight: '120px'
                }}
              >
                {/* 3 Checkmarks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#04784b" />
                      <path d="M6 10.2L8.7 13L14 7.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1f2937' }}>Affordable Rates</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#04784b" />
                      <path d="M6 10.2L8.7 13L14 7.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1f2937' }}>Verified Drivers</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#04784b" />
                      <path d="M6 10.2L8.7 13L14 7.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1f2937' }}>Live Tracking</span>
                  </div>
                </div>

                {/* Vehicle Cutout Image */}
                <div
                  style={{
                    width: '140px',
                    height: '110px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={cardAutoImg}
                    alt="Auto Rickshaw"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      mixBlendMode: 'multiply',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('services', 'auto');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#fde68a';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#fef3c7';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Book Auto</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Card 3: Puncture Booking (Soft Mint Green Background) */}
          <div
            className="service-card"
            onClick={() => navigateTo('services', 'puncture')}
            style={{
              backgroundColor: '#f0fdf4',
              borderRadius: '22px',
              padding: '1.6rem 1.65rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 18px rgba(16, 163, 73, 0.04)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              position: 'relative',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(16, 163, 73, 0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(16, 163, 73, 0.04)';
            }}
          >
            <div>
              {/* Header: Circle Icon + Titles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#86efac',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6-4.6 4.6a2 2 0 0 1-1.4.6H8v2.3l2.3 2.3h2.3c.5 0 1-.2 1.4-.6l4.6-4.6 1.6 1.6a1 1 0 0 0 1.4-1.4l-6.9-7.2z" fill="#15803d" />
                    <path d="M5 19l4-4" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#111827', margin: '0 0 0.2rem 0' }}>
                    Puncture Booking
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 500 }}>
                    Get back on the road, hassle-free.
                  </div>
                </div>
              </div>

              {/* Middle Row: Left 3 Checkmarks + Right Vehicle Image */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  minHeight: '120px'
                }}
              >
                {/* 3 Checkmarks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#04784b" />
                      <path d="M6 10.2L8.7 13L14 7.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1f2937' }}>On-Road Assistance</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#04784b" />
                      <path d="M6 10.2L8.7 13L14 7.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1f2937' }}>Quick Service</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#04784b" />
                      <path d="M6 10.2L8.7 13L14 7.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1f2937' }}>Trained Professionals</span>
                  </div>
                </div>

                {/* Vehicle Cutout Image */}
                <div
                  style={{
                    width: '140px',
                    height: '110px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={cardTyreImg}
                    alt="Tyre Puncture Repair"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      mixBlendMode: 'multiply',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('services', 'puncture');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: '#dcfce7',
                  color: '#15803d',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#bbf7d0';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#dcfce7';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Book Puncture</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
