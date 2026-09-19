import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { autoDrivers } from '../../data/kuikyData';
import { X, MapPin, Phone, Car, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AutoModal = () => {
  const { activeModal, setActiveModal, currentLocation, lang } = useLanguage();
  const [pickup, setPickup] = useState('Gobi Bus Stand');
  const [destination, setDestination] = useState('Erode Road Junction');
  const [autoType, setAutoType] = useState('standard');
  const [bookedDriver, setBookedDriver] = useState(null);

  if (activeModal !== 'auto') return null;

  const handleBookNow = (driver) => {
    setBookedDriver(driver);
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

        {bookedDriver ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <CheckCircle2 size={40} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Auto Ride Confirmed!
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Driver <strong>{lang === 'ta' ? bookedDriver.nameTa : bookedDriver.name}</strong> is arriving in <strong>{bookedDriver.eta}</strong>.
            </p>

            <div style={{
              backgroundColor: '#f8fafc',
              padding: '1.25rem',
              borderRadius: '1rem',
              border: '1px solid #e2e8f0',
              textAlign: 'left',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Vehicle No:</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{bookedDriver.vehicleNo}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Stand:</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{lang === 'ta' ? bookedDriver.standTa : bookedDriver.stand}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Estimated Fare:</span>
                <span style={{ fontWeight: 800, color: '#d97706', fontSize: '1.1rem' }}>₹{bookedDriver.baseFare + 45}</span>
              </div>
            </div>

            <a
              href={`tel:${bookedDriver.phone}`}
              className="btn btn-auto"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <Phone size={18} />
              <span>Call Driver ({bookedDriver.phone})</span>
            </a>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                🛺
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                  Book an Auto
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  Location: {lang === 'ta' ? currentLocation.nameTa : currentLocation.name}
                </p>
              </div>
            </div>

            {/* Location Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                  PICKUP LOCATION
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: '#f8fafc'
                }}>
                  <MapPin size={18} color="#d97706" />
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.92rem', background: 'transparent' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                  DROP DESTINATION
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: '#f8fafc'
                }}>
                  <MapPin size={18} color="#0284c7" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.92rem', background: 'transparent' }}
                  />
                </div>
              </div>
            </div>

            {/* Drivers List */}
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.85rem' }}>
              Nearby Available Auto Drivers ({autoDrivers.length})
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {autoDrivers.map((driver) => (
                <div
                  key={driver.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '1rem',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
                      {lang === 'ta' ? driver.nameTa : driver.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {lang === 'ta' ? driver.standTa : driver.stand} • <span style={{ color: '#d97706', fontWeight: 600 }}>{driver.eta}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700, marginTop: '2px' }}>
                      ★ {driver.rating} ({driver.experience})
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a
                      href={`tel:${driver.phone}`}
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: '#f1f5f9',
                        color: '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Call Driver"
                    >
                      <Phone size={16} />
                    </a>
                    <button
                      onClick={() => handleBookNow(driver)}
                      className="btn btn-auto"
                      style={{ fontSize: '0.82rem', padding: '0.5rem 0.85rem' }}
                    >
                      Book Ride
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
