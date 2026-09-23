import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { punctureShops } from '../../data/kuikyData';
import { fetchPunctureWorksApi } from '../../config/api';
import { X, Phone, MessageSquare, Wrench, MapPin, CheckCircle2 } from 'lucide-react';

export const PunctureModal = () => {
  const { activeModal, setActiveModal, currentLocation, lang } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [requestSubmitted, setRequestSubmitted] = useState(null);
  const [shopsList, setShopsList] = useState(punctureShops);

  useEffect(() => {
    let isMounted = true;
    fetchPunctureWorksApi().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        setShopsList(data);
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  if (activeModal !== 'puncture') return null;

  return (
    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ borderTop: '6px solid #10b981' }}>
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
            backgroundColor: '#d1fae5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        {requestSubmitted ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: '#d1fae5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <CheckCircle2 size={40} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Mechanic Dispatched!
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Mobile Puncture Mechanic from <strong>{requestSubmitted.name}</strong> is heading to your breakdown location.
            </p>

            <a
              href={`tel:${requestSubmitted.phone}`}
              className="btn btn-puncture"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <Phone size={18} />
              <span>Call Mechanic ({requestSubmitted.phone})</span>
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
                backgroundColor: '#d1fae5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem'
              }}>
                🛠️
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669', lineHeight: 1.1 }}>
                  Nearby Puncture & Repair Shops
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  Doorstep & Roadside Breakdown Assistance • {lang === 'ta' ? currentLocation.nameTa : currentLocation.name}
                </p>
              </div>
            </div>

            {/* Puncture Shops List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {shopsList.map((shop) => (
                <div
                  key={shop.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '1rem',
                    padding: '1.15rem',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
                        {lang === 'ta' ? shop.nameTa : shop.name}
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
                        Contact: {lang === 'ta' ? shop.ownerTa : shop.owner} • <span style={{ color: '#059669', fontWeight: 700 }}>{shop.status}</span>
                      </p>
                    </div>
                    <span style={{
                      backgroundColor: '#e0f2fe',
                      color: '#0284c7',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.6rem',
                      borderRadius: '9999px',
                      flexShrink: 0
                    }}>
                      {shop.distance}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.85rem' }}>
                    📍 {lang === 'ta' ? shop.addressTa : shop.address}
                  </p>

                  {/* Services tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                    {shop.services.map((svc, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: '#f1f5f9',
                          color: '#334155',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px'
                        }}
                      >
                        {svc}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '0.5rem' }}>
                    <a
                      href={`tel:${shop.phone}`}
                      className="btn btn-outline"
                      style={{ fontSize: '0.8rem', padding: '0.45rem' }}
                    >
                      <Phone size={14} color="#059669" />
                      <span>Call</span>
                    </a>

                    <a
                      href={`https://wa.me/${shop.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.3rem',
                        padding: '0.45rem',
                        borderRadius: '9999px',
                        backgroundColor: '#25d366',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.8rem'
                      }}
                    >
                      <MessageSquare size={14} />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() => setRequestSubmitted(shop)}
                      className="btn btn-puncture"
                      style={{ fontSize: '0.8rem', padding: '0.45rem' }}
                    >
                      Request On-Site
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
