import React from 'react';

const testimonialsList = [
  {
    id: 't-1',
    quote: '“Booked an auto in minutes. Super easy and fast!”',
    name: 'Ramesh Kumar',
    role: 'Local Resident',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 't-2',
    quote: '“Ambulance service was quick and very helpful. Thank you Kuiky!”',
    name: 'Priya S',
    role: 'Gobi',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 't-3',
    quote: '“Found a puncture shop nearby and got quick service.”',
    name: 'Arun V',
    role: 'Traveller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
  }
];

export const Testimonials = () => {
  return (
    <section style={{ padding: '3.5rem 0 4.5rem', backgroundColor: '#ffffff' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '0.8fr 1.2fr',
        gap: '2.5rem',
        alignItems: 'center'
      }}>
        {/* Left Column: Heading Info */}
        <div>
          <span className="section-tag">WHAT OUR USERS SAY</span>
          <h2 className="section-title" style={{ fontSize: '1.9rem', maxWidth: '340px' }}>
            Trusted by Thousands in Our Community
          </h2>
          <p className="section-desc" style={{ fontSize: '0.88rem', marginTop: '0.5rem' }}>
            Real people. Real experiences. Here's what they say about Kuiky.
          </p>
        </div>

        {/* Right Column: 3 Cards in a row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem'
        }}>
          {testimonialsList.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem',
                border: '1px solid #f1f5f9',
                padding: '1.25rem 1rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <p style={{
                fontSize: '0.82rem',
                color: '#334155',
                lineHeight: 1.5,
                marginBottom: '1.25rem',
                fontStyle: 'normal'
              }}>
                {item.quote}
              </p>

              {/* User Avatar + Name + Subtitle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <img
                  src={item.avatar}
                  alt={item.name}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
