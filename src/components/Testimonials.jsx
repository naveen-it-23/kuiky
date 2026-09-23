import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import avatarArun from '../assets/avatar_arun.png';
import avatarPriya from '../assets/avatar_priya.png';
import avatarVignesh from '../assets/avatar_vignesh.png';

const REVIEWS = [
  {
    id: 1,
    quote: "Kuiky helped us get an ambulance so quickly during an emergency. Truly lifesaving service for our family!",
    name: 'Arun Kumar',
    role: 'Verified Resident',
    city: 'Erode',
    service: 'Ambulance SOS',
    serviceIcon: '🚑',
    serviceColor: '#dc2626',
    serviceBg: '#fef2f2',
    rating: 5,
    avatar: avatarArun
  },
  {
    id: 2,
    quote: "Very convenient auto booking with transparent upfront fares. Drivers are courteous, polite and always on time.",
    name: 'Priya R',
    role: 'Regular Commuter',
    city: 'Perundurai',
    service: 'Auto Ride',
    serviceIcon: '🛺',
    serviceColor: '#059669',
    serviceBg: '#ecfdf5',
    rating: 5,
    avatar: avatarPriya
  },
  {
    id: 3,
    quote: "Got doorstep puncture assistance within 15 minutes right where I was stranded. Excellent mobile mechanic support!",
    name: 'Vignesh S',
    role: 'Bike Rider',
    city: 'Erode',
    service: 'Puncture Assistance',
    serviceIcon: '🔧',
    serviceColor: '#d97706',
    serviceBg: '#fffbeb',
    rating: 5,
    avatar: avatarVignesh
  },
  {
    id: 4,
    quote: "Booked an auto early morning to the railway station at 5:00 AM. The driver was already waiting at my doorstep. Extremely reliable!",
    name: 'Kavitha M',
    role: 'Daily Commuter',
    city: 'Bhavani',
    service: 'Auto Ride',
    serviceIcon: '🛺',
    serviceColor: '#059669',
    serviceBg: '#ecfdf5',
    rating: 5,
    initials: 'KM',
    initialsBg: 'linear-gradient(135deg, #10b981 0%, #047857 100%)'
  },
  {
    id: 5,
    quote: "Car tire had a tubeless puncture on the highway near Solar. The mechanic arrived with all tools and nitrogen air in 12 minutes!",
    name: 'Rajesh K',
    role: 'Car Owner',
    city: 'Solar, Erode',
    service: 'Tubeless Repair',
    serviceIcon: '🔧',
    serviceColor: '#d97706',
    serviceBg: '#fffbeb',
    rating: 5,
    initials: 'RK',
    initialsBg: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)'
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  const totalReviews = REVIEWS.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  // Auto-slide one by one every 4.2 seconds; pauses on hover or touch hold
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4200);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section 
      style={{ 
        padding: '4rem 0 5rem', 
        backgroundColor: '#fafbfb',
        borderTop: '1px solid #f1f5f9',
        borderBottom: '1px solid #f1f5f9',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Section Header with Left Title and Right Navigation Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '2.25rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div
              style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                color: '#059669',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '0.35rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>★</span> WHAT PEOPLE SAY
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.025em',
                margin: '0 0 0.35rem'
              }}
            >
              Trusted by Thousands
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b' }}>
              Real reviews from daily commuters, families, and vehicle owners across Erode.
            </p>
          </div>

          {/* Desktop / Tablet Slider Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ 
              fontSize: '0.8rem', 
              fontWeight: 800, 
              color: '#64748b', 
              letterSpacing: '0.04em',
              marginRight: '0.35rem'
            }}>
              <strong style={{ color: '#0f172a' }}>{String(currentIndex + 1).padStart(2, '0')}</strong> / {String(totalReviews).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous review"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1.5px solid #e2e8f0',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#059669';
                e.currentTarget.style.color = '#059669';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#0f172a';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next review"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1.5px solid #e2e8f0',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#059669';
                e.currentTarget.style.color = '#059669';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#0f172a';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ─── SLIDER CAROUSEL: SLIDES ONE BY ONE ─── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '820px',
            margin: '0 auto',
            overflow: 'hidden',
            borderRadius: '24px',
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.06)'
          }}
        >
          {/* Sliding Track */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.48s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                style={{
                  minWidth: '100%',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <div
                  className="testimonial-card"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #eef2f6',
                    borderRadius: '24px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Subtle Background Watermark Quote */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '1.5rem',
                      top: '1rem',
                      color: '#f1f5f9',
                      pointerEvents: 'none',
                      userSelect: 'none'
                    }}
                  >
                    <Quote size={95} strokeWidth={1} />
                  </div>

                  {/* Top Row: Service Category Pill Badge + 5 Gold Stars */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.4rem',
                      position: 'relative',
                      zIndex: 2,
                      flexWrap: 'wrap',
                      gap: '0.75rem'
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: rev.serviceBg,
                        color: rev.serviceColor,
                        padding: '0.35rem 0.8rem',
                        borderRadius: '9999px',
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        letterSpacing: '0.02em',
                        border: `1px solid ${rev.serviceColor}25`
                      }}
                    >
                      <span>{rev.serviceIcon}</span> {rev.service}
                    </span>

                    {/* 5 Stars */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={17} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text / Quote */}
                  <blockquote
                    style={{
                      fontSize: 'clamp(1.05rem, 2.3vw, 1.3rem)',
                      lineHeight: 1.6,
                      color: '#0f172a',
                      fontWeight: 600,
                      margin: '0 0 2rem 0',
                      position: 'relative',
                      zIndex: 2,
                      fontStyle: 'normal'
                    }}
                  >
                    “{rev.quote}”
                  </blockquote>

                  {/* Bottom Reviewer Details Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '1.25rem',
                      position: 'relative',
                      zIndex: 2,
                      flexWrap: 'wrap',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      {rev.avatar ? (
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid #e2e8f0',
                            flexShrink: 0
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: rev.initialsBg,
                            color: '#ffffff',
                            fontWeight: 800,
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                            flexShrink: 0
                          }}
                        >
                          {rev.initials}
                        </div>
                      )}

                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          {rev.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.1rem' }}>
                          {rev.role} • <strong style={{ color: '#475569' }}>{rev.city}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Verified Customer Badge */}
                    <div
                      style={{
                        backgroundColor: '#ecfdf5',
                        color: '#059669',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        border: '1px solid #a7f3d0'
                      }}
                    >
                      <CheckCircle2 size={13} />
                      <span>Verified Customer</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── BOTTOM PAGINATION DOTS & MOBILE CONTROLS ─── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            marginTop: '1.75rem'
          }}
        >
          {REVIEWS.map((_, dotIdx) => {
            const isActive = dotIdx === currentIndex;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                style={{
                  width: isActive ? '28px' : '9px',
                  height: '9px',
                  borderRadius: '9999px',
                  backgroundColor: isActive ? '#059669' : '#cbd5e1',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
