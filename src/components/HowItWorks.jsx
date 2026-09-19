import React from 'react';
import { MapPin, Check, ArrowRight } from 'lucide-react';

export const HowItWorks = () => {
  return (
    <section style={{ padding: '3.5rem 0', backgroundColor: '#ffffff' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '0.8fr 1.2fr',
        gap: '2.5rem',
        alignItems: 'center'
      }}>
        {/* Left Text */}
        <div>
          <span className="section-tag">HOW KUIKY WORKS</span>
          <h2 className="section-title" style={{ fontSize: '2rem', maxWidth: '320px' }}>
            Get Your Service in 3 Easy Steps
          </h2>
          <p className="section-desc" style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Simple. Fast. Convenient.
          </p>
        </div>

        {/* Right Steps Flow */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          {/* Step 1 */}
          <div style={{ flex: 1 }}>
            {/* Step Number + Icon Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '1rem'
            }}>
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#0066ff',
                backgroundColor: '#eff6ff',
                padding: '0.25rem 0.55rem',
                borderRadius: '9999px'
              }}>
                01
              </span>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#0066ff',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0, 102, 255, 0.3)'
              }}>
                <MapPin size={16} fill="#ffffff" color="#0066ff" strokeWidth={1} />
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
              Choose a Service
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.5 }}>
              Select Auto, Ambulance or Puncture Shop.
            </p>
          </div>

          {/* Arrow 1 */}
          <div style={{ marginTop: '0.75rem', color: '#cbd5e1' }}>
            <ArrowRight size={20} strokeWidth={1.75} />
          </div>

          {/* Step 2 */}
          <div style={{ flex: 1 }}>
            {/* Step Number + Icon Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '1rem'
            }}>
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#0066ff',
                backgroundColor: '#eff6ff',
                padding: '0.25rem 0.55rem',
                borderRadius: '9999px'
              }}>
                02
              </span>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#0066ff',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0, 102, 255, 0.3)'
              }}>
                <MapPin size={16} fill="#ffffff" color="#0066ff" strokeWidth={1} />
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
              Enter Your Location
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.5 }}>
              Provide your current location or destination.
            </p>
          </div>

          {/* Arrow 2 */}
          <div style={{ marginTop: '0.75rem', color: '#cbd5e1' }}>
            <ArrowRight size={20} strokeWidth={1.75} />
          </div>

          {/* Step 3 */}
          <div style={{ flex: 1 }}>
            {/* Step Number + Icon Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '1rem'
            }}>
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#0066ff',
                backgroundColor: '#eff6ff',
                padding: '0.25rem 0.55rem',
                borderRadius: '9999px'
              }}>
                03
              </span>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#0066ff',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0, 102, 255, 0.3)'
              }}>
                <Check size={18} strokeWidth={3} />
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
              Get Assistance
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.5 }}>
              Connect with the required local service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
