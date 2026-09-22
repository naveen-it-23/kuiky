import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Maximize2, 
  Plus, 
  Minus, 
  ExternalLink
} from 'lucide-react';
import contactHeroBanner from '../assets/contact_hero_banner_ditto_2x.png';
import contactMapImg from '../assets/contact_map_erode_hd.png';

export const ContactPage = () => {
  const { lang } = useLanguage();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mapZoom, setMapZoom] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.mobile.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Simulate reliable submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 700);
  };

  const openGoogleMaps = () => {
    window.open('https://maps.google.com/?q=Erode,+Tamil+Nadu,+India', '_blank');
  };

  return (
    <div style={{ backgroundColor: '#fcfcfd', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* ─── SECTION 1: HERO BANNER / SLIDER (DITTO REFERENCE MATCH) ─── */}
      <section 
        className="contact-hero-banner-wrap"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '2048 / 868',
            userSelect: 'none'
          }}>
            <img
              src={contactHeroBanner}
              alt="Kuiky Contact Us - We're Here to Help You"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '2048 / 868',
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
            />

            {/* Interactive Clickable Hotspots for Badges */}
            <a
              href="tel:+919876543210"
              title="Call Us: +91 98765 43210"
              style={{
                position: 'absolute',
                left: '2.5%',
                bottom: '2.5%',
                width: '23%',
                height: '24%',
                cursor: 'pointer',
                zIndex: 10,
                borderRadius: '8px',
                backgroundColor: 'transparent'
              }}
            />
            <a
              href="mailto:support@kuiky.in"
              title="Email Us: support@kuiky.in"
              style={{
                position: 'absolute',
                left: '27.5%',
                bottom: '2.5%',
                width: '24%',
                height: '24%',
                cursor: 'pointer',
                zIndex: 10,
                borderRadius: '8px',
                backgroundColor: 'transparent'
              }}
            />
            <div
              title="Support Hours: 24/7"
              style={{
                position: 'absolute',
                left: '54%',
                bottom: '2.5%',
                width: '22%',
                height: '24%',
                zIndex: 10,
                backgroundColor: 'transparent'
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: FORM & CONTACT DETAILS (MATCHING REFERENCE) ─── */}
      <section style={{
        padding: '2.5rem 1.5rem 3.5rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}>
        <div className="contact-main-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 0.85fr',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }}>
          
          {/* Left: Send Us a Message Form Card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1.5px solid #edf2f7',
            padding: '2.5rem 2.25rem',
            boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)'
          }}>
            <h2 style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#0f172a',
              margin: '0 0 0.35rem 0',
              letterSpacing: '-0.015em'
            }}>
              Send Us a Message
            </h2>
            <p style={{
              color: '#64748b',
              fontSize: '0.88rem',
              margin: '0 0 2rem 0'
            }}>
              Fill out the form and we'll get back to you as soon as possible.
            </p>

            {/* Success Message Banner */}
            {submitSuccess && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: '#dcfce7',
                border: '1.5px solid #86efac',
                color: '#15803d',
                padding: '0.85rem 1.15rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                fontSize: '0.9rem',
                fontWeight: 600
              }}>
                <CheckCircle2 size={20} />
                <span>Thank you! Your message has been sent successfully. Our support team will reach out to you shortly.</span>
              </div>
            )}

            {/* Error Message Banner */}
            {errorMessage && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1.5px solid #fecaca',
                color: '#dc2626',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                marginBottom: '1.25rem',
                fontSize: '0.88rem',
                fontWeight: 600
              }}>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Full Name */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  color: '#1f2937',
                  marginBottom: '0.45rem'
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    fontSize: '0.92rem',
                    color: '#0f172a',
                    outline: 'none',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#04784b';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(4, 120, 75, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Email Address */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  color: '#1f2937',
                  marginBottom: '0.45rem'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    fontSize: '0.92rem',
                    color: '#0f172a',
                    outline: 'none',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#04784b';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(4, 120, 75, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  color: '#1f2937',
                  marginBottom: '0.45rem'
                }}>
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter your mobile number"
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    fontSize: '0.92rem',
                    color: '#0f172a',
                    outline: 'none',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#04784b';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(4, 120, 75, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Subject Dropdown */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  color: '#1f2937',
                  marginBottom: '0.45rem'
                }}>
                  Subject *
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem 2.5rem 0.8rem 1rem',
                      borderRadius: '12px',
                      border: '1.5px solid #e2e8f0',
                      backgroundColor: '#ffffff',
                      fontSize: '0.92rem',
                      color: formData.subject ? '#0f172a' : '#94a3b8',
                      outline: 'none',
                      appearance: 'none',
                      cursor: 'pointer',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#04784b';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(4, 120, 75, 0.12)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Booking Assistance">Booking Assistance</option>
                    <option value="Driver / Service Feedback">Driver / Service Feedback</option>
                    <option value="Billing & Payments">Billing & Payments</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Partnership / Joining Kuiky">Partnership / Joining Kuiky</option>
                  </select>
                  <div style={{
                    position: 'absolute',
                    right: '1.1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#64748b'
                  }}>
                    ▼
                  </div>
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  color: '#1f2937',
                  marginBottom: '0.45rem'
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Type your message here..."
                  required
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    fontSize: '0.92rem',
                    color: '#0f172a',
                    outline: 'none',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: '110px',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#04784b';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(4, 120, 75, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  backgroundColor: '#04784b',
                  color: '#ffffff',
                  padding: '0.95rem 1.5rem',
                  borderRadius: '12px',
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(4, 120, 75, 0.28)',
                  marginTop: '0.5rem'
                }}
                onMouseOver={(e) => { if (!isSubmitting) e.currentTarget.style.backgroundColor = '#035c39'; }}
                onMouseOut={(e) => { if (!isSubmitting) e.currentTarget.style.backgroundColor = '#04784b'; }}
              >
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                <Send size={17} />
              </button>
            </form>
          </div>

          {/* Right: Stacked Contact Info & Follow Us Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* Card 1: Get in Touch (Soft Light Pastel Match) */}
            <div style={{
              backgroundColor: '#edf4f8',
              borderRadius: '20px',
              border: '1.5px solid #e2eaf0',
              padding: '2rem 1.85rem',
              boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#0f172a',
                margin: '0 0 0.35rem 0'
              }}>
                Get in Touch
              </h3>
              <p style={{
                color: '#64748b',
                fontSize: '0.84rem',
                margin: '0 0 1.75rem 0',
                lineHeight: 1.55
              }}>
                We'd love to hear from you. Reach out through any of the following channels.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#04784b',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(4, 120, 75, 0.22)'
                  }}>
                    <Phone size={17} strokeWidth={2.4} fill="#ffffff" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.15rem' }}>
                      Phone
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.45 }}>
                      <a href="tel:+919876543210" style={{ color: 'inherit', textDecoration: 'none' }}>+91 98765 43210</a><br />
                      <a href="tel:+919876543211" style={{ color: 'inherit', textDecoration: 'none' }}>+91 98765 43211</a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#04784b',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(4, 120, 75, 0.22)'
                  }}>
                    <Mail size={17} strokeWidth={2.4} fill="#04784b" color="#ffffff" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.15rem' }}>
                      Email
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.45 }}>
                      <a href="mailto:support@kuiky.in" style={{ color: 'inherit', textDecoration: 'none' }}>support@kuiky.in</a><br />
                      <a href="mailto:info@kuiky.in" style={{ color: 'inherit', textDecoration: 'none' }}>info@kuiky.in</a>
                    </div>
                  </div>
                </div>

                {/* Our Office */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#04784b',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(4, 120, 75, 0.22)'
                  }}>
                    <MapPin size={17} strokeWidth={2.4} fill="#ffffff" color="#04784b" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.15rem' }}>
                      Our Office
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.45 }}>
                      123, Main Road, Erode,<br />
                      Tamil Nadu, India - 638001
                    </div>
                  </div>
                </div>

                {/* Support Hours */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#04784b',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(4, 120, 75, 0.22)'
                  }}>
                    <Clock size={17} strokeWidth={2.4} fill="#ffffff" color="#04784b" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.15rem' }}>
                      Support Hours
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.45 }}>
                      24/7 – We're always here for you!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Follow Us (Soft Mint Match) */}
            <div style={{
              backgroundColor: '#effbf6',
              borderRadius: '20px',
              border: '1.5px solid #dcf2e8',
              padding: '1.85rem 1.85rem',
              boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)'
            }}>
              <h3 style={{
                fontSize: '1.18rem',
                fontWeight: 800,
                color: '#0f172a',
                margin: '0 0 0.35rem 0'
              }}>
                Follow Us
              </h3>
              <p style={{
                color: '#64748b',
                fontSize: '0.84rem',
                margin: '0 0 1.25rem 0'
              }}>
                Stay connected for updates, offers and more.
              </p>

              {/* Social Circles Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#1877f2',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(24, 119, 242, 0.3)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(220, 39, 67, 0.3)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#ff0000',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(255, 0, 0, 0.3)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#0a66c2',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(10, 102, 194, 0.3)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── SECTION 3: FIND US ON MAP (MATCHING REFERENCE) ─── */}
      <section style={{
        padding: '0 1.5rem 5rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: '#0f172a',
            margin: '0 0 0.35rem 0',
            letterSpacing: '-0.015em'
          }}>
            Find Us on Map
          </h2>
          <p style={{
            color: '#64748b',
            fontSize: '0.88rem',
            margin: 0
          }}>
            Visit our office or find us online.
          </p>
        </div>

        {/* Map Container Card */}
        <div style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1.5px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
          backgroundColor: '#f1f5f9',
          height: '360px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Map Base Graphic */}
          <div style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            cursor: 'grab'
          }}>
            <img
              src={contactMapImg}
              alt="Kuiky Office Location in Erode, Tamil Nadu"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${mapZoom})`,
                transition: 'transform 0.3s ease'
              }}
            />
          </div>

          {/* Top Left: Quick Open Google Maps Button */}
          <button
            type="button"
            onClick={openGoogleMaps}
            title="Open in Google Maps"
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #e2e8f0',
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#04784b',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            <MapPin size={14} color="#04784b" />
            <span>Open in Maps</span>
            <ExternalLink size={12} color="#04784b" />
          </button>

          {/* Top Right: Fullscreen Button */}
          <button
            type="button"
            onClick={openGoogleMaps}
            aria-label="Toggle Fullscreen"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              zIndex: 10,
              color: '#334155'
            }}
          >
            <Maximize2 size={16} />
          </button>

          {/* Bottom Right: Zoom Controls */}
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            zIndex: 10
          }}>
            <button
              type="button"
              onClick={() => setMapZoom((prev) => Math.min(prev + 0.25, 2.0))}
              aria-label="Zoom In"
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#ffffff',
                border: 'none',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#334155'
              }}
            >
              <Plus size={18} />
            </button>
            <button
              type="button"
              onClick={() => setMapZoom((prev) => Math.max(prev - 0.25, 1.0))}
              aria-label="Zoom Out"
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#334155'
              }}
            >
              <Minus size={18} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
