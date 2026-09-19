import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Wrench } from 'lucide-react';
import cardAutoImg from '../assets/card_auto.jpg';
import cardAmbImg from '../assets/card_ambulance.jpg';
import cardTyreImg from '../assets/card_tyre.jpg';

export const ServicesSection = () => {
  const { setActiveModal, navigateTo } = useLanguage();

  return (
    <section id="services" style={{ padding: '3.5rem 0 4rem', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span className="section-tag">OUR SERVICES</span>
            <h2 className="section-title">Quick & Reliable Local Services</h2>
            <p className="section-desc">Choose what you need, and we'll get you there.</p>
          </div>
          <button
            onClick={() => navigateTo('services')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#0066ff',
              fontWeight: 700,
              fontSize: '0.92rem',
              background: 'none',
              padding: 0
            }}
          >
            <span>View All Services</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* 3 Service Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {/* Card 1: Book an Auto */}
          <div 
            onClick={() => navigateTo('services', 'auto')}
            style={{
              backgroundColor: '#fffdf5',
              borderRadius: '1.25rem',
              border: '1px solid #fef08a',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.04)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            className="service-card"
          >
            {/* Top row: Badge and Vehicle Image */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '130px' }}>
              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: '#ffffff',
                padding: '0.35rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#b45309',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                border: '1px solid #fef3c7'
              }}>
                <span style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#fef3c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem'
                }}>🛺</span>
                <span>Auto Booking</span>
              </div>

              {/* Vehicle Image */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('services', 'auto');
                }}
                style={{ width: '150px', height: '115px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <img
                  src={cardAutoImg}
                  alt="Auto Rickshaw"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              </div>
            </div>

            {/* Bottom Content */}
            <div style={{ marginTop: '1rem' }}>
              <h3 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('services', 'auto');
                }}
                style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem', cursor: 'pointer' }}
              >
                Book an Auto
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Find and book an auto for your local journey quickly and easily.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('services', 'auto');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: '#0066ff',
                    background: 'none',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  <span>Auto Services</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModal('auto');
                  }}
                  style={{
                    backgroundColor: '#f59e0b',
                    color: '#1e1b4b',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    padding: '0.45rem 0.95rem',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Emergency Ambulance */}
          <div 
            onClick={() => navigateTo('services', 'ambulance')}
            style={{
              backgroundColor: '#fff7f7',
              borderRadius: '1.25rem',
              border: '1px solid #fee2e2',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.04)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            className="service-card"
          >
            {/* Top row: Badge and Vehicle Image */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '130px' }}>
              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: '#ffffff',
                padding: '0.35rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#dc2626',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                border: '1px solid #fee2e2'
              }}>
                <span style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#fee2e2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem'
                }}>🚑</span>
                <span>Emergency Ambulance</span>
              </div>

              {/* Vehicle Image */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('services', 'ambulance');
                }}
                style={{ width: '150px', height: '115px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <img
                  src={cardAmbImg}
                  alt="Emergency Ambulance"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              </div>
            </div>

            {/* Bottom Content */}
            <div style={{ marginTop: '1rem' }}>
              <h3 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('services', 'ambulance');
                }}
                style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem', cursor: 'pointer' }}
              >
                Emergency Ambulance
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Get quick access to emergency ambulance assistance when you need it.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('services', 'ambulance');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: '#0066ff',
                    background: 'none',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  <span>Ambulance Services</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModal('ambulance');
                  }}
                  style={{
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    padding: '0.45rem 0.95rem',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  Call Now
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Nearby Puncture Shops */}
          <div 
            onClick={() => navigateTo('services', 'puncture')}
            style={{
              backgroundColor: '#f2fcf6',
              borderRadius: '1.25rem',
              border: '1px solid #dcfce7',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.04)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            className="service-card"
          >
            {/* Top row: Badge and Tyre Image */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '130px' }}>
              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: '#ffffff',
                padding: '0.35rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#059669',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                border: '1px solid #dcfce7'
              }}>
                <span style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Wrench size={11} color="#059669" />
                </span>
                <span>Puncture Shops</span>
              </div>

              {/* Tyre Image */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('services', 'puncture');
                }}
                style={{ width: '150px', height: '115px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <img
                  src={cardTyreImg}
                  alt="Nearby Puncture and Tyres"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              </div>
            </div>

            {/* Bottom Content */}
            <div style={{ marginTop: '1rem' }}>
              <h3 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('services', 'puncture');
                }}
                style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem', cursor: 'pointer' }}
              >
                Nearby Puncture Shops
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Find nearby puncture and tyre repair shops in your area.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('services', 'puncture');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: '#0066ff',
                    background: 'none',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  <span>Puncture Services</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModal('puncture');
                  }}
                  style={{
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    padding: '0.45rem 0.95rem',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  Find Shops
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
