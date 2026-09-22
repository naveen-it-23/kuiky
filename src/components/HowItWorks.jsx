import React from 'react';
import { MapPin, List, CalendarCheck, User, ShieldCheck, Zap, RefreshCw } from 'lucide-react';
import appDualPhones from '../assets/app_dual_phones_exact.png';

export const HowItWorks = () => {
  return (
    <section id="how-it-works" style={{ padding: '3.75rem 0 4.5rem', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* ========================================================
            PART 1: 4 Steps Flow + Cursive Quote Card
            ======================================================== */}
        <div style={{ marginBottom: '2.75rem' }}>
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
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
              HOW IT WORKS
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
              Get Help in 4 Simple Steps
            </h2>
          </div>

          {/* 4 Steps + Cursive Quote Layout */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
              flexWrap: 'wrap'
            }}
          >
            {/* 4 Steps Flow Container */}
            <div
              className="how-steps-outer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flex: 1,
                flexWrap: 'wrap'
              }}
            >
              {/* Step 1: Enter Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#04784b',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2
                    }}
                  >
                    1
                  </div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: '#e6f4ea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MapPin size={22} color="#04784b" />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a' }}>Enter Location</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Share your current location</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="how-it-works-arrow" style={{ color: '#cbd5e1', fontSize: '1.1rem', margin: '0 0.25rem' }}>→</div>

              {/* Step 2: Choose Service */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#04784b',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2
                    }}
                  >
                    2
                  </div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: '#e6f4ea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <List size={22} color="#04784b" />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a' }}>Choose Service</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Select Ambulance, Auto or Puncture</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="how-it-works-arrow" style={{ color: '#cbd5e1', fontSize: '1.1rem', margin: '0 0.25rem' }}>→</div>

              {/* Step 3: Book & Confirm */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#04784b',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2
                    }}
                  >
                    3
                  </div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: '#e6f4ea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <CalendarCheck size={22} color="#04784b" />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a' }}>Book & Confirm</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Get instant confirmation</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="how-it-works-arrow" style={{ color: '#cbd5e1', fontSize: '1.1rem', margin: '0 0.25rem' }}>→</div>

              {/* Step 4: Track in Real-time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#04784b',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2
                    }}
                  >
                    4
                  </div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: '#e6f4ea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <User size={22} color="#04784b" />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a' }}>Track in Real-time</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Stay updated until service arrives</div>
                </div>
              </div>
            </div>

            {/* Right: Cursive Quote Badge Card */}
            <div
              className="how-quote-card"
              style={{
                position: 'relative',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '1.1rem 1.4rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                border: '1px solid #eef7f2',
                background: 'linear-gradient(135deg, #ffffff 0%, #f4faf6 100%)',
                minWidth: '190px'
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  backgroundColor: '#04784b',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  lineHeight: 1,
                  marginBottom: '0.4rem'
                }}
              >
                “
              </div>
              <div
                style={{
                  fontFamily: "'Caveat', cursive, sans-serif",
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  color: '#111827',
                  lineHeight: 1.15
                }}
              >
                <div>Because</div>
                <div>Your Time Matters</div>
              </div>
              {/* Double green curved underline */}
              <svg width="65" height="12" viewBox="0 0 70 12" fill="none" style={{ marginTop: '0.2rem' }}>
                <path d="M2 5C22 2 48 3 68 7" stroke="#04784b" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M12 9C28 7 50 8 62 11" stroke="#04784b" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* ========================================================
            PART 2: "Take Kuiky Everywhere" App Download Banner
            ======================================================== */}
        <div
          style={{
            backgroundColor: '#044e33',
            backgroundImage: 'linear-gradient(135deg, #034b32 0%, #044e33 60%, #023824 100%)',
            borderRadius: '24px',
            padding: '1.85rem 2.25rem',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 16px 40px -8px rgba(4, 78, 51, 0.35)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '2.5rem',
              alignItems: 'center'
            }}
            className="app-banner-grid"
          >
            {/* Left: Dual Phones Graphic */}
            <div
              className="app-banner-phones"
              style={{
                width: '260px',
                maxWidth: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <img
                src={appDualPhones}
                alt="Kuiky Mobile App"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain'
                }}
              />
            </div>

            {/* Center: Copy + App Store Badges */}
            <div>
              <h3
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '0.45rem',
                  letterSpacing: '-0.02em'
                }}
              >
                Take Kuiky Everywhere
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  color: '#d1fae5',
                  lineHeight: 1.5,
                  margin: '0 0 1.35rem 0'
                }}
              >
                Faster booking. Smarter experience.<br />
                Download the Kuiky app now.
              </p>

              {/* App Store Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {/* Google Play */}
                <a
                  href="#playstore"
                  onClick={(e) => { e.preventDefault(); alert('Kuiky Android App is launching soon on Google Play Store!'); }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding: '0.55rem 1.15rem',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'transform 0.2s ease, background 0.2s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1f2937'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#000000'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <svg width="20" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M3.6 1.8L13.8 12L3.6 22.2C3.2 21.8 3 21.2 3 20.4V3.6C3 2.8 3.2 2.2 3.6 1.8Z" fill="#2196F3" />
                    <path d="M17.3 8.5L13.8 12L17.3 15.5L21.2 13.3C22.3 12.7 22.3 11.3 21.2 10.7L17.3 8.5Z" fill="#FFC107" />
                    <path d="M13.8 12L3.6 1.8C4 1.4 4.7 1.3 5.4 1.7L17.3 8.5L13.8 12Z" fill="#4CAF50" />
                    <path d="M13.8 12L17.3 15.5L5.4 22.3C4.7 22.7 4 22.6 3.6 22.2L13.8 12Z" fill="#F44336" />
                  </svg>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.62rem', textTransform: 'uppercase', color: '#9ca3af' }}>GET IT ON</div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, lineHeight: 1 }}>Google Play</div>
                  </div>
                </a>

                {/* App Store */}
                <a
                  href="#appstore"
                  onClick={(e) => { e.preventDefault(); alert('Kuiky iOS App is launching soon on the Apple App Store!'); }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    padding: '0.55rem 1.15rem',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'transform 0.2s ease, background 0.2s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#1f2937'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#000000'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <svg width="20" height="22" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.76 1.04-1.81.93-2.88-.9.04-1.99.6-2.64 1.36-.58.67-1.08 1.74-.95 2.78 1 .08 2.04-.5 2.66-1.26z" />
                  </svg>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.62rem', textTransform: 'uppercase', color: '#9ca3af' }}>Download on the</div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, lineHeight: 1 }}>App Store</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right: 3 Feature Badges */}
            <div
              className="app-banner-features"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                flexShrink: 0
              }}
            >
              {/* Feature 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Zap size={18} color="#6ee7b7" />
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>Lightweight & Fast</span>
              </div>

              {/* Feature 2 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <ShieldCheck size={18} color="#6ee7b7" />
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>Secure & Reliable</span>
              </div>

              {/* Feature 3 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <RefreshCw size={17} color="#6ee7b7" />
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>Real-time Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
