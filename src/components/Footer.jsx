import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin } from 'lucide-react';

export const Footer = () => {
  const { setActiveModal } = useLanguage();

  return (
    <footer id="contact" style={{
      backgroundColor: '#0b1b3d',
      color: '#ffffff',
      padding: '3.5rem 0 2.5rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container">
        {/* Main 4-Column Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.9fr 1fr 1.1fr',
          gap: '2.5rem',
          alignItems: 'flex-start',
          marginBottom: '2.5rem'
        }}>
          {/* Column 1: Brand & Socials */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#0066ff',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <MapPin size={20} fill="#ffffff" color="#0066ff" strokeWidth={1} />
                <div style={{
                  position: 'absolute',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#0066ff',
                  top: '11px'
                }} />
              </div>
              <div>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>
                  Kuiky
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '2px', fontWeight: 500 }}>
                  Local Help. Always.
                </div>
              </div>
            </div>

            {/* Social Media Rounded Dark Squares */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  transition: 'background 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
              >
                f
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  transition: 'background 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
              >
                📷
              </a>

              {/* X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X Twitter"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  transition: 'background 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
              >
                𝕏
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  transition: 'background 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
              >
                ▶
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem', color: '#94a3b8' }}>
              <li><a href="#home" style={{ color: 'inherit' }}>Home</a></li>
              <li><button onClick={() => setActiveModal('auto')} style={{ background: 'none', color: 'inherit', padding: 0 }}>Book Auto</button></li>
              <li><button onClick={() => setActiveModal('ambulance')} style={{ background: 'none', color: 'inherit', padding: 0 }}>Ambulance</button></li>
              <li><button onClick={() => setActiveModal('puncture')} style={{ background: 'none', color: 'inherit', padding: 0 }}>Puncture Shops</button></li>
            </ul>
          </div>

          {/* Column 3: About Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem' }}>
              About
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem', color: '#94a3b8' }}>
              <li><a href="#about" style={{ color: 'inherit' }}>About Us</a></li>
              <li><a href="#contact" style={{ color: 'inherit' }}>Contact</a></li>
              <li><a href="#privacy" style={{ color: 'inherit' }}>Privacy Policy</a></li>
              <li><a href="#terms" style={{ color: 'inherit' }}>Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Column 4: Coverage Area & Location */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: '#0066ff',
              fontWeight: 600,
              fontSize: '0.85rem',
              alignSelf: 'flex-start'
            }}>
              <MapPin size={15} color="#0066ff" />
              <span style={{ color: '#cbd5e1' }}>Gobi, Erode, Tamil Nadu</span>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2.5rem' }}>
              © 2026 Kuiky. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
