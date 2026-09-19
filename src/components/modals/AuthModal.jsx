import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, User, Phone, Lock, CheckCircle2 } from 'lucide-react';

export const AuthModal = () => {
  const { activeModal, setActiveModal, t } = useLanguage();
  const [tab, setTab] = useState('login');
  const [role, setRole] = useState('customer');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (activeModal !== 'auth') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setActiveModal(null);
    }, 1800);
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle2 size={56} color="#10b981" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              Successfully Signed In!
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.4rem' }}>
              Welcome back to Kuiky Local Assistance.
            </p>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
              <button
                onClick={() => setTab('login')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: tab === 'login' ? '#0284c7' : '#64748b',
                  borderBottom: tab === 'login' ? '3px solid #0284c7' : 'none',
                  background: 'none'
                }}
              >
                Login
              </button>
              <button
                onClick={() => setTab('register')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: tab === 'register' ? '#0284c7' : '#64748b',
                  borderBottom: tab === 'register' ? '3px solid #0284c7' : 'none',
                  background: 'none'
                }}
              >
                Register / Join Network
              </button>
            </div>

            {/* Role selection */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                SELECT YOUR ACCOUNT ROLE
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  backgroundColor: '#f8fafc',
                  outline: 'none'
                }}
              >
                <option value="customer">Customer / Passenger</option>
                <option value="auto_driver">Auto Driver Partner</option>
                <option value="ambulance_provider">Ambulance Emergency Operator</option>
                <option value="puncture_owner">Puncture & Tyre Shop Owner</option>
              </select>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                  MOBILE NUMBER
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: '#ffffff'
                }}>
                  <Phone size={18} color="#64748b" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.92rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                  PASSWORD / OTP
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: '#ffffff'
                }}>
                  <Lock size={18} color="#64748b" />
                  <input
                    type="password"
                    required
                    placeholder="Enter password or OTP"
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.92rem' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
              >
                {tab === 'login' ? 'Continue to Kuiky' : 'Register Account'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
