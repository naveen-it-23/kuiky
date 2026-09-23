import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HowItWorks } from './HowItWorks';
import { Testimonials } from './Testimonials';
import howItWorksBanner from '../assets/how_it_works_banner.jpg';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const HowItWorksPage = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* ─── SECTION 1: SINGLE HERO PICTURE (SAME SIZE AS HERO SLIDER) ─── */}
      <section 
        className="how-it-works-hero-banner"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          paddingTop: '2rem',
          paddingBottom: '2.5rem',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1rem' }}>
          
          {/* Short & Sweet Header Text */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#e6f4ea',
              color: '#04784b',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              marginBottom: '0.75rem',
              textTransform: 'uppercase'
            }}>
              <Zap size={14} />
              <span>{lang === 'ta' ? 'எளிதான வழிகாட்டல்' : 'SIMPLE & TRANSPARENT'}</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.85rem)',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              margin: '0 0 0.65rem'
            }}>
              {lang === 'ta' ? 'குய்க்கி எவ்வாறு செயல்படுகிறது?' : 'How Kuiky Works'}
            </h1>

            <p style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.08rem)',
              color: '#475569',
              maxWidth: '620px',
              margin: '0 auto 1.25rem',
              lineHeight: 1.55
            }}>
              {lang === 'ta'
                ? 'ஆட்டோ, ஆம்புலன்ஸ் அல்லது பஞ்சர் — 4 எளிய படிகளில் உங்கள் இருப்பிடத்திற்கு உடனடி சேவை.'
                : 'Need a quick auto, emergency ambulance, or mobile tyre puncture fix? Get verified assistance in 4 simple steps.'}
            </p>

            {/* Short & Sweet Key Highlights */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              fontSize: '0.86rem',
              fontWeight: 700,
              color: '#04784b'
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={16} /> {lang === 'ta' ? 'உடனடி உறுதிப்படுத்தல்' : 'Instant Confirmation'}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <CheckCircle2 size={16} /> {lang === 'ta' ? 'நேரலை ஜிபிஎஸ் டிராக்கிங்' : 'Live GPS Tracking'}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={16} /> {lang === 'ta' ? 'சரிபார்க்கப்பட்ட ஓட்டுநர்கள்' : 'Verified Local Drivers'}
              </span>
            </div>
          </div>

          {/* Single Pic Frame (Same Size & Aspect Ratio as Hero Slider) */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '2048 / 868',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0',
            backgroundColor: '#ffffff'
          }}>
            <img
              src={howItWorksBanner}
              alt="How Kuiky Works - Step by Step Service Guide"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block'
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: 4 STEPS BREAKDOWN + CURSIVE QUOTE + APP BANNER ─── */}
      <HowItWorks />

      {/* ─── SECTION 3: WHAT PEOPLE SAY (TESTIMONIALS) ─── */}
      <Testimonials />
    </div>
  );
};

export default HowItWorksPage;
