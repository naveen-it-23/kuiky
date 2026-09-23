import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Zap, ShieldCheck, Users, Target, Eye, Heart, User, MapPin } from 'lucide-react';
import aboutPhoneMockup from '../assets/about_phone_mockup.jpg';
import aboutCommunityTrio from '../assets/about_community_trio.jpg';
import aboutHeroVehicles from '../assets/about_hero_vehicles_ditto.png';
import heroExactDitto from '../assets/hero_exact_ditto_2x.png';

export const AboutPage = ({ isEmbedded = false }) => {
  const { navigateTo, currentPage, lang } = useLanguage();
  const showHeroBanner = !isEmbedded && currentPage === 'about';

  useEffect(() => {
    if (!isEmbedded && currentPage === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, isEmbedded]);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* ─── TOP HERO BANNER: EXACT DITTO IMAGE (WITHOUT SLIDING) ─── */}
      {showHeroBanner && (
        <section 
          className="hero-slider-wrap"
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxSizing: 'border-box',
            WebkitTapHighlightColor: 'transparent',
            outline: 'none',
            userSelect: 'none'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1440px',
              margin: '0 auto',
              overflow: 'hidden'
            }}
          >
            {/* Static Single Frame - Exact Ditto Image */}
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '2048 / 868',
              userSelect: 'none'
            }}>
              <img
                src={heroExactDitto}
                alt="Kuiky - Need Help? We're Just a Tap Away."
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '2048 / 868',
                  display: 'block',
                  userSelect: 'none',
                  pointerEvents: 'none'
                }}
              />

              {/* Interactive Clickable Hotspots */}
              <div
                onClick={() => navigateTo('services', 'auto')}
                title="Click to explore Kuiky Services"
                style={{
                  position: 'absolute', left: '2.5%', top: '12%', width: '42%', height: '76%',
                  cursor: 'pointer', zIndex: 10, borderRadius: '16px',
                  backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none',
                  WebkitTapHighlightColor: 'transparent', userSelect: 'none'
                }}
              />
              <div
                onClick={() => navigateTo('services', 'ambulance')}
                title="🚑 Click to Book Emergency Ambulance"
                style={{
                  position: 'absolute', left: '44.5%', top: '30%', width: '19.2%', height: '54%',
                  cursor: 'pointer', zIndex: 10, borderRadius: '16px',
                  backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none',
                  WebkitTapHighlightColor: 'transparent', userSelect: 'none'
                }}
              />
              <div
                onClick={() => navigateTo('services', 'auto')}
                title="🛺 Click to Book Passenger / Cargo Auto"
                style={{
                  position: 'absolute', left: '63.8%', top: '40%', width: '16%', height: '46%',
                  cursor: 'pointer', zIndex: 10, borderRadius: '16px',
                  backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none',
                  WebkitTapHighlightColor: 'transparent', userSelect: 'none'
                }}
              />
              <div
                onClick={() => navigateTo('services', 'puncture')}
                title="🔧 Click to Call Tyre & Puncture Repair"
                style={{
                  position: 'absolute', left: '80%', top: '46%', width: '17%', height: '47%',
                  cursor: 'pointer', zIndex: 10, borderRadius: '16px',
                  backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none',
                  WebkitTapHighlightColor: 'transparent', userSelect: 'none'
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* ─── SECTION 1: HERO / BANNER ─── */}
      <section className="about-section about-hero-section" style={{
        padding: '3rem 1.5rem 3.5rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}>
        <div className="about-hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          {/* Left Column: Headline & Features */}
          <div className="about-hero-text">
            {/* Tag Pill */}
            <div style={{
              display: 'inline-block',
              backgroundColor: '#e6f4ea',
              color: '#0f172a',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              marginBottom: '1.25rem'
            }}>
              ABOUT KUIKY
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem'
            }}>
              Simple Services<br />
              for a <span style={{ color: '#04784b' }}>Better Tomorrow</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              color: '#475569',
              fontSize: '1rem',
              lineHeight: 1.65,
              maxWidth: '480px',
              marginBottom: '2rem'
            }}>
              Kuiky is your trusted platform to book an auto, call an ambulance or find a puncture shop — all in one place, anytime, anywhere.
            </p>

            {/* 3 Badges Row — fixed 3-column grid, no wrap, always 1 row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem 1rem',
              width: '100%',
              maxWidth: '480px'
            }}>
              {/* Badge 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ color: '#059669', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <Zap size={20} fill="#059669" color="#059669" />
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.25 }}>
                  Fast<br />
                  <span style={{ fontWeight: 600, color: '#64748b' }}>Response</span>
                </div>
              </div>

              {/* Badge 2 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ color: '#059669', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={20} color="#059669" />
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.25 }}>
                  Safe &<br />
                  <span style={{ fontWeight: 600, color: '#64748b' }}>Reliable</span>
                </div>
              </div>

              {/* Badge 3 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ color: '#059669', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <Users size={20} color="#059669" />
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.25 }}>
                  For a<br />
                  <span style={{ fontWeight: 600, color: '#64748b' }}>Community</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Vehicles Scene with Cursive Script */}
          <div className="about-hero-image-wrap" style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <img
              src={aboutHeroVehicles}
              alt="Kuiky Auto, Ambulance and Tyre Mechanic Scene"
              className="about-hero-image"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '16px',
                margin: '0 auto'
              }}
            />

            {/* Top Right Cursive Badge */}
            <div className="about-hero-cursive" style={{
              position: 'absolute',
              top: '6%',
              right: '4%',
              textAlign: 'center',
              pointerEvents: 'none'
            }}>
              <div style={{
                fontFamily: "'Caveat', cursive, sans-serif",
                fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                fontWeight: 700,
                color: '#1e293b',
                lineHeight: 1.05
              }}>
                People<br />First,<br />Always
              </div>
              <svg width="65" height="12" viewBox="0 0 65 12" fill="none" style={{ marginTop: '2px' }}>
                <path d="M2 9C20 3 45 3 63 8" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: OUR STORY ─── */}
      <section className="about-section about-story-section" style={{
        padding: '3rem 1.5rem 4rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}>
        <div className="about-story-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          maxWidth: '1060px',
          margin: '0 auto'
        }}>
          {/* Left Column: Phone Mockup in Hand */}
          <div className="about-story-image-wrap" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}>
            <div className="about-story-card" style={{
              borderRadius: '22px',
              overflow: 'hidden',
              boxShadow: '0 10px 28px rgba(11, 27, 61, 0.09)',
              maxWidth: '320px',
              width: '100%',
              border: '1px solid #e2e8f0',
              aspectRatio: '4 / 5',
              backgroundColor: '#f8fafc',
              margin: '0 auto'
            }}>
              <img
                src={aboutPhoneMockup}
                alt="Kuiky App in Hand"
                className="about-story-image"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          {/* Right Column: Our Story Text */}
          <div className="about-story-text">
            <div style={{
              color: '#059669',
              fontWeight: 800,
              fontSize: '1.2rem',
              marginBottom: '0.4rem',
              letterSpacing: '-0.01em'
            }}>
              Our Story
            </div>

            <h2 style={{
              fontSize: 'clamp(1.85rem, 3.2vw, 2.6rem)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '1.4rem'
            }}>
              Built to Make Help<br />More Accessible
            </h2>

            <p style={{
              color: '#475569',
              fontSize: '1.02rem',
              lineHeight: 1.75,
              maxWidth: '520px'
            }}>
              Kuiky was started with a simple idea — essential services should be just a few taps away. We saw people struggling to find autos, get quick ambulance support or locate a nearby puncture shop. So, we built Kuiky to solve this real-world problem and make everyday life easier for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: THREE CARDS (Our Mission, Our Vision, Our Values) ─── */}
      <section style={{
        padding: '1rem 1.5rem 4rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem'
        }}>
          {/* Card 1: Our Mission */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1.5px solid #eef2f6',
            padding: '2.2rem 1.85rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#e6f4ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
              marginBottom: '1.25rem'
            }}>
              <Target size={26} strokeWidth={2.4} />
            </div>
            <h3 style={{
              fontSize: '1.22rem',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '0.65rem'
            }}>
              Our Mission
            </h3>
            <p style={{
              color: '#475569',
              fontSize: '0.94rem',
              lineHeight: 1.6,
              margin: 0
            }}>
              To provide quick, reliable and easy access to auto, ambulance and puncture services for everyone.
            </p>
          </div>

          {/* Card 2: Our Vision */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1.5px solid #eef2f6',
            padding: '2.2rem 1.85rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#e6f4ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
              marginBottom: '1.25rem'
            }}>
              <Eye size={26} strokeWidth={2.4} />
            </div>
            <h3 style={{
              fontSize: '1.22rem',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '0.65rem'
            }}>
              Our Vision
            </h3>
            <p style={{
              color: '#475569',
              fontSize: '0.94rem',
              lineHeight: 1.6,
              margin: 0
            }}>
              To become the most trusted local service platform in every city, helping communities move safer and smarter.
            </p>
          </div>

          {/* Card 3: Our Values */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1.5px solid #eef2f6',
            padding: '2.2rem 1.85rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#e6f4ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
              marginBottom: '1.25rem'
            }}>
              <Heart size={26} strokeWidth={2.4} fill="#059669" />
            </div>
            <h3 style={{
              fontSize: '1.22rem',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '0.65rem'
            }}>
              Our Values
            </h3>
            <p style={{
              color: '#475569',
              fontSize: '0.94rem',
              lineHeight: 1.6,
              margin: 0
            }}>
              Safety • Reliability • Simplicity<br />Community • Customer First
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: WHY CHOOSE KUIKY? ─── */}
      <section style={{
        padding: '3rem 1.5rem 4rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}>
        {/* Section Header */}
        <div style={{ marginBottom: '2.8rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '0.4rem',
            letterSpacing: '-0.02em'
          }}>
            Why Choose Kuiky?
          </h2>
          <p style={{
            color: '#64748b',
            fontSize: '0.96rem',
            margin: 0
          }}>
            Because we care about your time, safety and peace of mind.
          </p>
        </div>

        {/* 4 Feature Items Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem'
        }}>
          {/* Item 1: Quick Access */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              backgroundColor: '#e6f4ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
              marginBottom: '0.9rem'
            }}>
              <Zap size={26} strokeWidth={2.2} fill="#059669" />
            </div>
            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.98rem', marginBottom: '0.3rem' }}>
              Quick Access
            </div>
            <div style={{ color: '#64748b', fontSize: '0.84rem' }}>
              Get help in minutes
            </div>
          </div>

          {/* Item 2: Trusted Service Providers */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              backgroundColor: '#e6f4ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
              marginBottom: '0.9rem'
            }}>
              <User size={26} strokeWidth={2.4} fill="#059669" />
            </div>
            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.98rem', marginBottom: '0.3rem' }}>
              Trusted Service Providers
            </div>
            <div style={{ color: '#64748b', fontSize: '0.84rem' }}>
              Verified and reliable
            </div>
          </div>

          {/* Item 3: Local Support */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              backgroundColor: '#e6f4ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
              marginBottom: '0.9rem'
            }}>
              <MapPin size={26} strokeWidth={2.4} fill="#059669" />
            </div>
            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.98rem', marginBottom: '0.3rem' }}>
              Local Support
            </div>
            <div style={{ color: '#64748b', fontSize: '0.84rem' }}>
              Available in your city
            </div>
          </div>

          {/* Item 4: People First */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              backgroundColor: '#e6f4ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
              marginBottom: '0.9rem'
            }}>
              <Heart size={26} strokeWidth={2.4} fill="#059669" />
            </div>
            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.98rem', marginBottom: '0.3rem' }}>
              People First
            </div>
            <div style={{ color: '#64748b', fontSize: '0.84rem' }}>
              Your safety is our priority
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: COMMUNITY BANNER ("Together for a Safer, Smarter Community") ─── */}
      <section className="about-section about-community-section" style={{
        padding: '1rem 1.5rem 5rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}>
        <div className="about-community-banner" style={{
          backgroundColor: '#eefcf4',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #e6f9ee 100%)',
          borderRadius: '24px',
          border: '1.5px solid #d1fae5',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          alignItems: 'center'
        }}>
          {/* Left: Text */}
          <div className="about-community-text" style={{ padding: '2.5rem 2.5rem' }}>
            <h3 style={{
              fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
              fontWeight: 800,
              color: '#04784b',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '0.85rem'
            }}>
              Together for a Safer,<br />
              Smarter Community
            </h3>
            <p style={{
              color: '#475569',
              fontSize: '0.96rem',
              lineHeight: 1.6,
              maxWidth: '420px',
              margin: 0
            }}>
              Kuiky is more than a service — it's a step towards stronger, safer and more connected communities.
            </p>
          </div>

          {/* Right: Trio Image + Cursive Slogan */}
          <div className="about-community-image-wrap" style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '1rem 1.5rem 0',
            width: '100%'
          }}>
            <img
              src={aboutCommunityTrio}
              alt="Kuiky Auto, Ambulance and Puncture Community Workers"
              className="about-community-image"
              style={{
                maxWidth: '380px',
                width: '100%',
                height: 'auto',
                display: 'block',
                margin: '0 auto'
              }}
            />

            {/* Cursive Tag */}
            <div className="about-community-cursive" style={{
              position: 'absolute',
              top: '15%',
              right: '8%',
              textAlign: 'center',
              pointerEvents: 'none'
            }}>
              <div style={{
                fontFamily: "'Caveat', cursive, sans-serif",
                fontSize: 'clamp(1.4rem, 2vw, 1.85rem)',
                fontWeight: 700,
                color: '#1e293b',
                lineHeight: 1.15
              }}>
                Different<br />Services<br />One Community
              </div>
              <svg width="70" height="12" viewBox="0 0 70 12" fill="none" style={{ marginTop: '2px' }}>
                <path d="M2 9C22 3 50 3 68 8" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
