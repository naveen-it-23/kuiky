import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ambulanceServices } from '../../data/kuikyData';
import { X, PhoneCall, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AmbulanceModal = () => {
  const { activeModal, setActiveModal, currentLocation, lang } = useLanguage();
  const [patientLoc, setPatientLoc] = useState('Erode Main Road, Gobi');
  const [hospitalTarget, setHospitalTarget] = useState('Gobi Government Hospital');
  const [ambulanceType, setAmbulanceType] = useState('icu');
  const [sosSent, setSosSent] = useState(false);

  if (activeModal !== 'ambulance') return null;

  const handleDispatch = (e) => {
    e.preventDefault();
    setSosSent(true);
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ borderTop: '6px solid #ef4444' }}>
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
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        {sosSent ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <ShieldAlert size={44} />
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#dc2626', marginBottom: '0.5rem' }}>
              EMERGENCY SOS DISPATCHED!
            </h3>
            <p style={{ color: '#475569', fontSize: '1rem', marginBottom: '1.5rem' }}>
              The nearest Ambulance unit is dispatched to <strong>{patientLoc}</strong>. Driver is contacting you immediately.
            </p>

            <a
              href="tel:108"
              className="btn btn-ambulance"
              style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginBottom: '1rem' }}
            >
              <PhoneCall size={22} />
              <span>Call 108 Emergency Hotline</span>
            </a>

            <a
              href="tel:+919876543210"
              className="btn btn-outline"
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}
            >
              <span>Call Local ICU Dispatch (+91 98765 43210)</span>
            </a>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem'
              }}>
                🚑
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#dc2626', lineHeight: 1.1 }}>
                  Emergency Ambulance SOS
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  24/7 Rapid Response Network • {lang === 'ta' ? currentLocation.nameTa : currentLocation.name}
                </p>
              </div>
            </div>

            {/* Emergency Hotline Big Banner Button */}
            <a
              href="tel:108"
              className="btn btn-ambulance"
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: '1.1rem',
                borderRadius: '1rem',
                marginBottom: '1.5rem',
                boxShadow: '0 8px 25px rgba(239, 68, 68, 0.4)'
              }}
            >
              <PhoneCall size={22} />
              <span>1-TAP SOS CALL (HOTLINE 108)</span>
            </a>

            {/* Dispatch Request Form */}
            <form onSubmit={handleDispatch} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                  PATIENT PICKUP LOCATION
                </label>
                <input
                  type="text"
                  required
                  value={patientLoc}
                  onChange={(e) => setPatientLoc(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    borderRadius: '0.75rem',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                  PREFERRED HOSPITAL / DESTINATION
                </label>
                <input
                  type="text"
                  required
                  value={hospitalTarget}
                  onChange={(e) => setHospitalTarget(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem',
                    borderRadius: '0.75rem',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                  AMBULANCE EQUIPMENT REQUIREMENT
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setAmbulanceType('bls')}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      border: ambulanceType === 'bls' ? '2px solid #ef4444' : '1px solid #cbd5e1',
                      backgroundColor: ambulanceType === 'bls' ? '#fee2e2' : '#ffffff',
                      color: ambulanceType === 'bls' ? '#dc2626' : '#334155',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}
                  >
                    Basic Life Support (BLS)
                  </button>

                  <button
                    type="button"
                    onClick={() => setAmbulanceType('icu')}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      border: ambulanceType === 'icu' ? '2px solid #ef4444' : '1px solid #cbd5e1',
                      backgroundColor: ambulanceType === 'icu' ? '#fee2e2' : '#ffffff',
                      color: ambulanceType === 'icu' ? '#dc2626' : '#334155',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}
                  >
                    Advanced ICU & Oxygen
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-ambulance"
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
              >
                Dispatch Ambulance Now
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
