import React from 'react';
import { Star } from 'lucide-react';
import avatarArun from '../assets/avatar_arun.png';
import avatarPriya from '../assets/avatar_priya.png';
import avatarVignesh from '../assets/avatar_vignesh.png';

const REVIEWS = [
  {
    quote: "'Kuiky helped us get an ambulance so quickly during an emergency. Truly lifesaving!'",
    name: 'Arun Kumar',
    city: 'Erode',
    avatar: avatarArun
  },
  {
    quote: '"Very convenient auto booking. Drivers are polite and on time."',
    name: 'Priya R',
    city: 'Perundurai',
    avatar: avatarPriya
  },
  {
    quote: '"Got puncture service within 15 minutes. Excellent support!"',
    name: 'Vignesh S',
    city: 'Erode',
    avatar: avatarVignesh
  }
];

export const Testimonials = () => {
  return (
    <section style={{ padding: '3.75rem 0 4.5rem', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
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
            WHAT PEOPLE SAY
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
            Trusted by Thousands
          </h2>
        </div>

        {/* 3 Review Cards Grid */}
        <div
          className="testimonials-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                border: '1.5px solid #f1f5f9',
                padding: '1.65rem 1.5rem',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.04)';
              }}
            >
              {/* Review Quote */}
              <p
                style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: '#1f2937',
                  margin: '0 0 1.5rem 0',
                  fontWeight: 500
                }}
              >
                {rev.quote}
              </p>

              {/* Author Info + 5 Stars Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}
              >
                {/* Author Avatar + Name + City */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a' }}>
                      {rev.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      {rev.city}
                    </div>
                  </div>
                </div>

                {/* 5 Yellow Stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
