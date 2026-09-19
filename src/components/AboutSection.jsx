import React from 'react';
import { Zap, ShieldCheck, MapPin, Headphones, Play } from 'lucide-react';
import aboutTownImg from '../assets/about_town.jpg';

export const AboutSection = () => {
  return (
    <section id="about" style={{ padding: '3.5rem 0 4rem', backgroundColor: '#ffffff' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '0.95fr 1.05fr',
        gap: '3rem',
        alignItems: 'center'
      }}>
        {/* Left Video / Graphic Card */}
        <div style={{
          position: 'relative',
          borderRadius: '1.5rem',
          overflow: 'hidden',
          boxShadow: '0 15px 35px rgba(11, 27, 61, 0.1)',
          height: '310px',
          backgroundColor: '#f1f5f9'
        }}>
          {/* Scenic Town Image */}
          <img
            src={aboutTownImg}
            alt="Supporting Your Local Needs"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Darker subtle gradient for text readability */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0.5) 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            {/* Handwritten White Cursive Script */}
            <div style={{
              fontFamily: "'Caveat', cursive, sans-serif",
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.15,
              textShadow: '0 2px 10px rgba(0,0,0,0.6)',
              marginBottom: '1.25rem'
            }}>
              <div>Supporting</div>
              <div>Your Local</div>
              <div>Needs</div>
            </div>

            {/* Blue Play Button */}
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#0066ff',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(0, 102, 255, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Play size={20} fill="#ffffff" style={{ marginLeft: '3px' }} />
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            About Kuiky
          </h2>

          <p style={{
            color: '#475569',
            fontSize: '0.92rem',
            lineHeight: 1.65,
            marginBottom: '1rem'
          }}>
            Kuiky is a local assistance platform designed to make everyday transportation and emergency services easier to access.
          </p>

          <p style={{
            color: '#475569',
            fontSize: '0.92rem',
            lineHeight: 1.65,
            marginBottom: '2rem'
          }}>
            We bring together auto booking, emergency ambulance assistance, and nearby puncture-shop discovery in one simple interface.
          </p>

          {/* 4 Features Horizontal Row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.25rem'
          }}>
            {/* Feature 1: Fast Service */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#0066ff',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Zap size={15} fill="#ffffff" />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                Fast Service
              </span>
            </div>

            {/* Feature 2: Trusted Support */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShieldCheck size={16} />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                Trusted Support
              </span>
            </div>

            {/* Feature 3: Local Focus */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#8b5cf6',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapPin size={15} fill="#ffffff" color="#8b5cf6" />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                Local Focus
              </span>
            </div>

            {/* Feature 4: 24/7 Assistance */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Headphones size={15} />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                24/7 Assistance
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
