import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Search, ArrowRight, Wrench } from 'lucide-react';

export const NearbySection = () => {
  const { setActiveModal } = useLanguage();
  const [searchVal, setSearchVal] = useState('');

  return (
    <section id="nearby" style={{ padding: '3.5rem 0 4rem', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* 3 Columns Layout: Left Text & Search | Center Map | Right 3 Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.35fr 1fr',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {/* Column 1: Left Info & Search Bar */}
          <div>
            <span className="section-tag">NEARBY SERVICES</span>
            <h2 className="section-title" style={{ fontSize: '1.9rem', marginBottom: '0.65rem' }}>
              Find Services Near You
            </h2>
            <p className="section-desc" style={{ fontSize: '0.88rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
              Explore the nearest auto stands, ambulance services and puncture shops around your location.
            </p>

            {/* Search Input Box */}
            <form
              onSubmit={(e) => { e.preventDefault(); setActiveModal('auto'); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '9999px',
                padding: '0.35rem 0.4rem 0.35rem 1.1rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
              }}
            >
              <MapPin size={16} color="#64748b" style={{ marginRight: '0.6rem', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search your location..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.85rem',
                  color: '#1e293b',
                  backgroundColor: 'transparent'
                }}
              />
              <button
                type="submit"
                aria-label="Search"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#0066ff',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(0, 102, 255, 0.3)'
                }}
              >
                <Search size={15} strokeWidth={2.5} />
              </button>
            </form>
          </div>

          {/* Column 2: Center Vector Road Map Card */}
          <div style={{
            backgroundColor: '#f1f5f9',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            height: '270px',
            position: 'relative',
            boxShadow: '0 8px 25px rgba(11, 27, 61, 0.06)'
          }}>
            {/* Realistic stylized vector map graphic */}
            <svg width="100%" height="100%" viewBox="0 0 400 270" style={{ position: 'absolute', inset: 0 }}>
              {/* Map background fill */}
              <rect width="400" height="270" fill="#f8fafc" />

              {/* Park green zones */}
              <path d="M 0 0 L 120 0 C 130 50, 80 80, 40 100 L 0 110 Z" fill="#e2f7e8" opacity="0.8" />
              <path d="M 280 180 C 330 170, 390 200, 400 240 L 400 270 L 260 270 Z" fill="#e2f7e8" opacity="0.8" />
              <path d="M 250 20 C 300 10, 350 30, 380 70 L 320 90 Z" fill="#e0f2fe" opacity="0.6" />

              {/* Secondary roads */}
              <path d="M 0 140 Q 180 160 400 130" stroke="#ffffff" strokeWidth="18" fill="none" strokeLinecap="round" />
              <path d="M 0 140 Q 180 160 400 130" stroke="#cbd5e1" strokeWidth="12" fill="none" strokeLinecap="round" />
              <path d="M 0 140 Q 180 160 400 130" stroke="#ffffff" strokeWidth="8" fill="none" strokeLinecap="round" />

              {/* Vertical arterial road */}
              <path d="M 190 0 C 180 100, 240 170, 210 270" stroke="#ffffff" strokeWidth="20" fill="none" />
              <path d="M 190 0 C 180 100, 240 170, 210 270" stroke="#cbd5e1" strokeWidth="14" fill="none" />
              <path d="M 190 0 C 180 100, 240 170, 210 270" stroke="#ffffff" strokeWidth="10" fill="none" />

              {/* Cross streets */}
              <path d="M 60 0 L 140 270" stroke="#cbd5e1" strokeWidth="6" fill="none" strokeDasharray="3 3" />
              <path d="M 270 0 L 330 270" stroke="#cbd5e1" strokeWidth="6" fill="none" strokeDasharray="3 3" />
              <path d="M 0 60 Q 200 40 400 90" stroke="#cbd5e1" strokeWidth="7" fill="none" strokeDasharray="2 2" />
              <path d="M 0 210 Q 200 230 400 200" stroke="#cbd5e1" strokeWidth="7" fill="none" />
            </svg>

            {/* Pin 1: Auto (Yellow circular badge at top-left road) */}
            <div
              onClick={() => setActiveModal('auto')}
              style={{
                position: 'absolute',
                top: '32%',
                left: '26%',
                cursor: 'pointer',
                transform: 'translate(-50%, -50%)',
                zIndex: 5
              }}
              title="Auto Stand (2.3 km away)"
            >
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#f59e0b',
                color: '#1e1b4b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                boxShadow: '0 4px 10px rgba(245, 158, 11, 0.4)',
                border: '2px solid #ffffff'
              }}>
                🛺
              </div>
            </div>

            {/* Pin 2: Active User Pin (Center Blue Marker with ring) */}
            <div style={{
              position: 'absolute',
              top: '52%',
              left: '52%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              cursor: 'pointer'
            }}
            title="Your Location"
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#0066ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 0 6px rgba(0, 102, 255, 0.2), 0 4px 12px rgba(0, 102, 255, 0.4)',
                border: '2px solid #ffffff'
              }}>
                <MapPin size={18} fill="#ffffff" color="#0066ff" strokeWidth={1} />
              </div>
            </div>

            {/* Pin 3: Ambulance (Red circular badge at bottom-center) */}
            <div
              onClick={() => setActiveModal('ambulance')}
              style={{
                position: 'absolute',
                top: '73%',
                left: '68%',
                cursor: 'pointer',
                transform: 'translate(-50%, -50%)',
                zIndex: 5
              }}
              title="Ambulance Service (3.1 km away)"
            >
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                boxShadow: '0 4px 10px rgba(239, 68, 68, 0.4)',
                border: '2px solid #ffffff'
              }}>
                🚑
              </div>
            </div>

            {/* Pin 4: Puncture Shop (Green circular badge at bottom-right) */}
            <div
              onClick={() => setActiveModal('puncture')}
              style={{
                position: 'absolute',
                top: '80%',
                left: '84%',
                cursor: 'pointer',
                transform: 'translate(-50%, -50%)',
                zIndex: 5
              }}
              title="Puncture Shop (1.5 km away)"
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(16, 185, 129, 0.4)',
                border: '2px solid #ffffff'
              }}>
                <Wrench size={13} color="#ffffff" />
              </div>
            </div>
          </div>

          {/* Column 3: Right 3 Service Distance Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Card 1: Auto Stand */}
            <div
              onClick={() => setActiveModal('auto')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                backgroundColor: '#ffffff',
                border: '1px solid #f1f5f9',
                borderRadius: '0.9rem',
                padding: '0.75rem 1rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                flexShrink: 0
              }}>
                🛺
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>
                  Auto Stand
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  2.3 km • Gobi Main Road
                </div>
              </div>
            </div>

            {/* Card 2: Ambulance Service */}
            <div
              onClick={() => setActiveModal('ambulance')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                backgroundColor: '#ffffff',
                border: '1px solid #f1f5f9',
                borderRadius: '0.9rem',
                padding: '0.75rem 1rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                flexShrink: 0
              }}>
                🚑
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>
                  Ambulance Service
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  3.1 km • Erode Road
                </div>
              </div>
            </div>

            {/* Card 3: Puncture Shop */}
            <div
              onClick={() => setActiveModal('puncture')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                backgroundColor: '#ffffff',
                border: '1px solid #f1f5f9',
                borderRadius: '0.9rem',
                padding: '0.75rem 1rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Wrench size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>
                  Puncture Shop
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  1.5 km • Market Street
                </div>
              </div>
            </div>

            {/* Bottom Link: View on Map */}
            <button
              onClick={() => setActiveModal('auto')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: '#0066ff',
                fontWeight: 700,
                fontSize: '0.82rem',
                background: 'none',
                padding: '0.2rem 0',
                marginTop: '0.2rem'
              }}
            >
              <span>View on Map</span>
              <ArrowRight size={13} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
