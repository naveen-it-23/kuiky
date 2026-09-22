import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, Check, ChevronDown, ArrowLeft, Loader2 } from 'lucide-react';
import KuikyLogo from '../KuikyLogo';
import { sendOtpApi, verifyOtpApi } from '../../config/api';

export const AuthModal = () => {
  const { 
    activeModal, 
    rawSetActiveModal, 
    pendingAction, 
    setPendingAction, 
    completeLogin, 
    lang 
  } = useLanguage();

  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']); // 6-digit OTP
  const [generatedOtp, setGeneratedOtp] = useState('482910');
  const [otpError, setOtpError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const inputRefs = useRef([]);

  const closeModal = useCallback(() => {
    rawSetActiveModal(null);
    setPendingAction(null);
    setStep('phone');
    setPhone('');
    setPhoneError('');
    setOtpDigits(['', '', '', '', '', '']);
    setOtpError('');
    setIsSuccess(false);
  }, [rawSetActiveModal, setPendingAction]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModal === 'auth') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, closeModal]);

  // Resend OTP countdown
  useEffect(() => {
    let timer;
    if (step === 'otp' && resendTimer > 0) {
      timer = setInterval(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendTimer]);

  if (activeModal !== 'auth') return null;

  // Step 1: Send OTP to Backend API
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setPhoneError(lang === 'ta' ? 'சரியான 10-இலக்க எண்ணை உள்ளிடவும்' : 'Enter a valid 10-digit mobile number');
      return;
    }
    setPhoneError('');
    setIsLoading(true);

    try {
      const res = await sendOtpApi(cleanPhone);
      if (res?.dev_otp) {
        setGeneratedOtp(String(res.dev_otp));
      }
      setStep('otp');
      setResendTimer(30);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (err) {
      console.warn('Backend send-otp error:', err);
      // If backend endpoint is missing (404 Not Found), fall back to dev mode OTP (482910)
      if (err.status === 404 || err.message?.includes('404')) {
        console.info('Backend /api/auth/send-otp/ returned 404. Proceeding in development OTP mode');
        setStep('otp');
        setResendTimer(30);
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      } else {
        setPhoneError(err.message || (lang === 'ta' ? 'OTP அனுப்புவதில் பிழை ஏற்பட்டது' : 'Failed to send OTP. Please try again.'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1b: Resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0 || isLoading) return;
    setIsLoading(true);
    setOtpError('');
    try {
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      const res = await sendOtpApi(cleanPhone);
      if (res?.dev_otp) {
        setGeneratedOtp(String(res.dev_otp));
      }
      setResendTimer(30);
    } catch (err) {
      if (err.status === 404 || err.message?.includes('404')) {
        setResendTimer(30);
      } else {
        setOtpError(err.message || 'Failed to resend OTP');
      }
    } finally {
      setIsLoading(false);
    }
  };


  // Step 2: 6-Digit OTP typing
  const handleDigitChange = (index, value) => {
    const cleanVal = value.replace(/[^0-9]/g, '');
    setOtpError('');

    if (!cleanVal) {
      const newDigits = [...otpDigits];
      newDigits[index] = '';
      setOtpDigits(newDigits);
      return;
    }

    // Pasted 6-digit code
    if (cleanVal.length > 1) {
      const pasted = cleanVal.slice(0, 6).split('');
      const newDigits = [...otpDigits];
      pasted.forEach((char, i) => {
        newDigits[i] = char;
      });
      setOtpDigits(newDigits);
      const nextIdx = Math.min(pasted.length, 5);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    // Single digit entry
    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal.slice(-1);
    setOtpDigits(newDigits);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (pastedData) {
      const newDigits = [...otpDigits];
      pastedData.split('').forEach((char, i) => {
        newDigits[i] = char;
      });
      setOtpDigits(newDigits);
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleAutoFill = () => {
    setOtpDigits(generatedOtp.split(''));
    setOtpError('');
  };

  // Step 2: Verify & Submit to Backend API
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length < 6) {
      setOtpError(lang === 'ta' ? '6-இலக்க OTP உள்ளிடவும்' : 'Enter the 6-digit OTP');
      return;
    }

    setOtpError('');
    setIsLoading(true);
    const cleanPhone = phone.replace(/[^0-9]/g, '');

    try {
      const result = await verifyOtpApi(cleanPhone, enteredOtp);
      setIsSuccess(true);

      const userObj = {
        id: result.user?.id,
        name: result.user?.name || ('User ' + cleanPhone.slice(-4)),
        phone: result.user?.phone ? result.user.phone.replace(/^\+91/, '').trim() : cleanPhone,
        email: result.user?.email || '',
        city: result.user?.selected_location || 'Erode, Tamil Nadu',
        role: result.user?.role || 'Verified User',
        token: result.token || null
      };

      setTimeout(() => {
        setIsSuccess(false);
        setStep('phone');
        completeLogin(userObj);
      }, 700);
    } catch (err) {
      console.warn('Backend verify-otp error:', err);
      // Fallback: If entered OTP equals generated demo OTP or backend is missing (404), allow login
      if (enteredOtp === generatedOtp || err.status === 404 || err.message?.includes('404')) {
        setIsSuccess(true);
        const userObj = {
          name: 'User ' + cleanPhone.slice(-4),
          phone: '+91 ' + cleanPhone,
          role: 'Verified User'
        };
        setTimeout(() => {
          setIsSuccess(false);
          setStep('phone');
          completeLogin(userObj);
        }, 700);
      } else {
        setOtpError(err.message || (lang === 'ta' ? 'தவறான OTP' : 'Invalid OTP. Please check and try again.'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={closeModal}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'fadeIn 0.2s ease-out forwards'
      }}
    >
      <div 
        className="auth-exact-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          maxWidth: '390px',
          width: '100%',
          padding: '2.25rem 1.85rem 1.75rem',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04)',
          animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          boxSizing: 'border-box'
        }}
      >
        {/* Top-Right Close Button (X) */}
        <button
          onClick={closeModal}
          type="button"
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.15s ease'
          }}
          onMouseOver={(e) => { e.currentTarget.style.color = '#111827'; }}
          onMouseOut={(e) => { e.currentTarget.style.color = '#6b7280'; }}
        >
          <X size={20} strokeWidth={2} />
        </button>

        {isSuccess ? (
          /* Success Indicator */
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#dcfce7',
              color: '#10a349',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 6px 18px rgba(16, 163, 73, 0.25)'
            }}>
              <Check size={32} strokeWidth={3} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: '0 0 0.3rem' }}>
              {lang === 'ta' ? 'வெற்றிகரமாக உள்நுழைந்தது!' : 'Login Successful!'}
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#6b7280', margin: 0 }}>
              {pendingAction?.title 
                ? (lang === 'ta' ? `${pendingAction.title} திறக்கப்படுகிறது...` : `Opening ${pendingAction.title}...`)
                : (lang === 'ta' ? 'குயிகிக்கு வரவேற்கிறோம்' : 'Welcome to Kuiky')}
            </p>
          </div>
        ) : step === 'phone' ? (
          /* =========================================================
             STEP 1: Exact Login Screen as User Reference Image
             ========================================================= */
          <div>
            {/* 1. Kuiky Logo at Top Center */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <KuikyLogo height={38} />
            </div>

            {/* 2. Heading */}
            <h2 style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#111827',
              textAlign: 'center',
              margin: '0 0 0.45rem 0',
              letterSpacing: '-0.01em'
            }}>
              {lang === 'ta' ? 'தொடர உள்நுழைக' : 'Login to Continue'}
            </h2>

            {/* 3. Subtitle */}
            <p style={{
              fontSize: '0.86rem',
              color: '#6b7280',
              textAlign: 'center',
              margin: '0 0 1.5rem 0',
              lineHeight: 1.4
            }}>
              {pendingAction?.title ? (
                lang === 'ta' 
                  ? `${pendingAction.title} பெற 6-இலக்க OTP பெற உங்கள் மொபைல் எண்ணை உள்ளிடவும்` 
                  : `Enter your mobile number to receive a 6-digit OTP for ${pendingAction.title}`
              ) : (
                lang === 'ta' 
                  ? '6-இலக்க OTP பெற உங்கள் மொபைல் எண்ணை உள்ளிடவும்' 
                  : 'Enter your mobile number to receive a 6-digit OTP'
              )}
            </p>

            {/* 4. Form */}
            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* Mobile Number Input Container with +91 v and divider */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: phoneError ? '1.5px solid #ef4444' : '1.5px solid #e5e7eb',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                height: '50px',
                transition: 'border-color 0.2s ease',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)'
              }}>
                {/* +91 Country Code with Chevron */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  paddingLeft: '0.95rem',
                  paddingRight: '0.75rem',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#111827',
                  flexShrink: 0,
                  userSelect: 'none'
                }}>
                  <span>+91</span>
                  <ChevronDown size={15} color="#4b5563" strokeWidth={2.5} />
                </div>

                {/* Thin Vertical Divider */}
                <div style={{
                  width: '1px',
                  height: '24px',
                  backgroundColor: '#e5e7eb',
                  flexShrink: 0
                }} />

                {/* Mobile Input Field */}
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  placeholder={lang === 'ta' ? 'மொபைல் எண் உள்ளிடவும்' : 'Enter your mobile number'}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10));
                    if (phoneError) setPhoneError('');
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    padding: '0 0.95rem',
                    fontSize: '0.94rem',
                    color: '#111827',
                    background: 'transparent',
                    letterSpacing: '0.02em'
                  }}
                />
              </div>

              {phoneError && (
                <div style={{ color: '#ef4444', fontSize: '0.74rem', fontWeight: 600, marginTop: '0.35rem' }}>
                  {phoneError}
                </div>
              )}

              {/* 5. Emerald Green Pill Action Button: Send OTP */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: isLoading ? '#6ee7b7' : '#10a349',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(16, 163, 73, 0.25)',
                  transition: 'all 0.2s ease',
                  marginTop: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => { if (!isLoading) e.currentTarget.style.backgroundColor = '#0d873d'; }}
                onMouseOut={(e) => { if (!isLoading) e.currentTarget.style.backgroundColor = '#10a349'; }}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                    <span>{lang === 'ta' ? 'அனுப்பப்படுகிறது...' : 'Sending OTP...'}</span>
                  </>
                ) : (
                  <span>{lang === 'ta' ? 'OTP அனுப்புக' : 'Send OTP'}</span>
                )}
              </button>

              {/* 6. OR Divider */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                margin: '1.5rem 0 1.25rem'
              }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
                <span style={{
                  padding: '0 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#9ca3af',
                  letterSpacing: '0.05em'
                }}>
                  OR
                </span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
              </div>

              {/* 7. Terms & Conditions and Privacy Policy */}
              <p style={{
                fontSize: '0.78rem',
                color: '#6b7280',
                textAlign: 'center',
                lineHeight: 1.5,
                margin: 0
              }}>
                {lang === 'ta' ? 'தொடர்வதன் மூலம், நீங்கள் எங்கள் ' : 'By continuing, you agree to our '}
                <a 
                  href="#terms" 
                  onClick={(e) => e.preventDefault()}
                  style={{
                    color: '#10a349',
                    textDecoration: 'underline',
                    fontWeight: 600
                  }}
                >
                  {lang === 'ta' ? 'விதிமுறைகள்' : 'Terms & Conditions'}
                </a>
                {' '}{lang === 'ta' ? 'மற்றும்' : 'and'}{' '}
                <a 
                  href="#privacy" 
                  onClick={(e) => e.preventDefault()}
                  style={{
                    color: '#10a349',
                    textDecoration: 'underline',
                    fontWeight: 600
                  }}
                >
                  {lang === 'ta' ? 'தனியுரிமைக் கொள்கை' : 'Privacy Policy'}
                </a>
              </p>

            </form>
          </div>
        ) : (
          /* =========================================================
             STEP 2: 6-Digit OTP Verification Screen
             ========================================================= */
          <div>
            {/* Back Button */}
            <button
              type="button"
              onClick={() => setStep('phone')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                background: 'none',
                border: 'none',
                color: '#6b7280',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: 0,
                marginBottom: '0.85rem'
              }}
            >
              <ArrowLeft size={15} />
              <span>{lang === 'ta' ? 'பின்செல்' : 'Back'}</span>
            </button>

            {/* Logo */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <KuikyLogo height={34} />
            </div>

            <h2 style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#111827',
              textAlign: 'center',
              margin: '0 0 0.35rem 0'
            }}>
              {lang === 'ta' ? 'OTP சரிபார்க்கவும்' : 'Verify OTP'}
            </h2>

            <p style={{
              fontSize: '0.82rem',
              color: '#6b7280',
              textAlign: 'center',
              margin: '0 0 1.25rem 0'
            }}>
              {lang === 'ta' 
                ? `+91 ${phone} எண்ணிற்கு அனுப்பப்பட்ட 6-இலக்க OTP-ஐ உள்ளிடவும்`
                : `Enter the 6-digit OTP sent to +91 ${phone}`}
            </p>

            <form onSubmit={handleVerifyOtp}>
              {/* 6 Digit Input Boxes */}
              <div 
                onPaste={handlePaste}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  marginBottom: '1rem'
                }}
              >
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={2}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    style={{
                      width: '42px',
                      height: '46px',
                      borderRadius: '10px',
                      border: digit ? '2px solid #10a349' : '1.5px solid #d1d5db',
                      backgroundColor: digit ? '#f0fdf4' : '#ffffff',
                      textAlign: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#111827',
                      outline: 'none',
                      transition: 'all 0.15s ease',
                      boxShadow: digit ? '0 0 0 2px rgba(16, 163, 73, 0.15)' : 'none'
                    }}
                  />
                ))}
              </div>

              {otpError && (
                <div style={{ color: '#ef4444', fontSize: '0.74rem', fontWeight: 600, textAlign: 'center', marginBottom: '0.75rem' }}>
                  {otpError}
                </div>
              )}

              {/* Auto-Fill and Resend row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.78rem',
                marginBottom: '1.25rem'
              }}>
                <button
                  type="button"
                  onClick={handleAutoFill}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#10a349',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  {lang === 'ta' ? 'தானியங்கி நிரப்பு' : 'Auto-Fill'} ({generatedOtp})
                </button>

                <span style={{ color: '#6b7280' }}>
                  {resendTimer > 0 
                    ? `${lang === 'ta' ? 'மீண்டும் அனுப்ப' : 'Resend in'} ${resendTimer}s`
                    : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isLoading}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: isLoading ? '#9ca3af' : '#10a349',
                          fontWeight: 700,
                          cursor: isLoading ? 'not-allowed' : 'pointer',
                          padding: 0
                        }}
                      >
                        {lang === 'ta' ? 'மீண்டும் அனுப்புக' : 'Resend OTP'}
                      </button>
                    )}
                </span>
              </div>

              {/* Verify & Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: isLoading ? '#6ee7b7' : '#10a349',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(16, 163, 73, 0.25)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => { if (!isLoading) e.currentTarget.style.backgroundColor = '#0d873d'; }}
                onMouseOut={(e) => { if (!isLoading) e.currentTarget.style.backgroundColor = '#10a349'; }}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                    <span>{lang === 'ta' ? 'சரிபார்க்கப்படுகிறது...' : 'Verifying OTP...'}</span>
                  </>
                ) : (
                  <span>{lang === 'ta' ? 'சரிபார்த்து உள்நுழைக' : 'Verify & Login'}</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
