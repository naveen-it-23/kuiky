import React from 'react';
import { Car, PhoneCall, Store, Users } from 'lucide-react';

export const StatsBanner = () => {
  return (
    <section style={{ padding: '2rem 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        <div style={{
          backgroundColor: '#0b1b3d',
          borderRadius: '1.25rem',
          padding: '2rem 2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem',
          color: '#ffffff',
          boxShadow: '0 15px 35px rgba(11, 27, 61, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Decorative Background Wave Graphic */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(ellipse at top right, rgba(0, 102, 255, 0.25), transparent 70%), radial-gradient(ellipse at bottom left, rgba(16, 185, 129, 0.1), transparent 60%)',
            pointerEvents: 'none'
          }} />

          {/* SVG Abstract curved lines */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 120"
            fill="none"
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }}
          >
            <path d="M0 80 Q 250 20, 500 70 T 1000 40" stroke="#38bdf8" strokeWidth="2" fill="none" />
            <path d="M0 100 Q 300 40, 600 90 T 1000 60" stroke="#0066ff" strokeWidth="1.5" fill="none" />
          </svg>

          {/* Stat 1: 10K+ Auto Rides */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#0066ff',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(0, 102, 255, 0.4)'
            }}>
              <Car size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.2rem' }}>
                10K+
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500 }}>
                Auto Rides Completed
              </div>
            </div>
          </div>

          {/* Stat 2: 5K+ Emergency Calls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
            }}>
              <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>🚑</span>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.2rem' }}>
                5K+
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500 }}>
                Emergency Calls Handled
              </div>
            </div>
          </div>

          {/* Stat 3: 8K+ Puncture Shops Nearby */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#06b6d4',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(6, 182, 212, 0.4)'
            }}>
              <Store size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.2rem' }}>
                8K+
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500 }}>
                Puncture Shops Nearby
              </div>
            </div>
          </div>

          {/* Stat 4: 98% Customer Satisfaction */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#0066ff',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(0, 102, 255, 0.4)'
            }}>
              <Users size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.2rem' }}>
                98%
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500 }}>
                Customer Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
