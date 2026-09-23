import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send } from 'lucide-react';
import KuikyLogo from './KuikyLogo';

export const Footer = () => {
  const { setActiveModal, navigateTo, navigateToAnchor } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer
      id="contact"
      style={{
        backgroundColor: '#012825',
        color: '#ffffff',
        padding: '3.75rem 0 2.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div className="container">
        {/* 5-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr 0.9fr 0.8fr 1.3fr',
            gap: '2.5rem',
            alignItems: 'flex-start',
            marginBottom: '2rem'
          }}
          className="footer-grid-5"
        >
          {/* Column 1: Brand & Socials */}
          <div>
            <div style={{ marginBottom: '1.15rem' }}>
              <KuikyLogo height={32} showSubtitle={true} variant="light" />
            </div>

            <p
              style={{
                fontSize: '0.84rem',
                color: '#94a3b8',
                lineHeight: 1.55,
                marginBottom: '1.25rem',
                maxWidth: '260px'
              }}
            >
              Your trusted platform for Ambulance, Auto and Puncture services.
            </p>

            {/* Social Icons Row */}
            <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
              {/* Facebook */}
              <a
                href="#facebook"
                aria-label="Facebook"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              >
                f
              </a>

              {/* Instagram */}
              <a
                href="#instagram"
                aria-label="Instagram"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#youtube"
                aria-label="YouTube"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              >
                in
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', letterSpacing: '0.01em' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <li>
                <a
                  href="#home"
                  onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
                  style={{ color: '#94a3b8', fontSize: '0.84rem', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#10a349'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  Home
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.84rem', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#10a349'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.84rem', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#10a349'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('how-it-works')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.84rem', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#10a349'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.84rem', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#10a349'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', letterSpacing: '0.01em' }}>
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <li>
                <button
                  onClick={() => setActiveModal('ambulance')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.84rem', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#10a349'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  Ambulance Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('auto')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.84rem', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#10a349'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  Auto Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('puncture')}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.84rem', cursor: 'pointer', padding: 0, textAlign: 'left', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#10a349'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  Puncture Booking
                </button>
              </li>
              <li>
                <span style={{ color: '#64748b', fontSize: '0.84rem' }}>
                  24/7 Support
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Help */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', letterSpacing: '0.01em' }}>
              Help
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <li>
                <a
                  href="#faq"
                  style={{ color: '#94a3b8', fontSize: '0.84rem', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#10a349'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  style={{ color: '#94a3b8', fontSize: '0.84rem', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#10a349'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  style={{ color: '#94a3b8', fontSize: '0.84rem', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#10a349'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#support"
                  style={{ color: '#94a3b8', fontSize: '0.84rem', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#10a349'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Stay Updated */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.35rem', letterSpacing: '0.01em' }}>
              Stay Updated
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '0.85rem' }}>
              Subscribe to get the latest updates.
            </p>

            {/* Input + Send Button Container */}
            <form
              onSubmit={handleSubscribe}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                padding: '0.25rem 0.35rem 0.25rem 0.85rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
              }}
            >
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email"
                style={{
                  border: 'none',
                  outline: 'none',
                  flex: 1,
                  fontSize: '0.84rem',
                  color: '#1f2937',
                  backgroundColor: 'transparent',
                  minWidth: 0
                }}
              />
              <button
                type="submit"
                aria-label="Subscribe"
                style={{
                  width: '36px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: '#04784b',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#035c39'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#04784b'}
              >
                <Send size={15} />
              </button>
            </form>

            {subscribed && (
              <div style={{ fontSize: '0.76rem', color: '#6ee7b7', marginTop: '0.4rem' }}>
                ✓ Thank you for subscribing!
              </div>
            )}

            {/* Copyright Text directly beneath form */}
            <div
              style={{
                fontSize: '0.78rem',
                color: '#64748b',
                marginTop: '1.5rem'
              }}
            >
              © 2026 Kuiky. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
