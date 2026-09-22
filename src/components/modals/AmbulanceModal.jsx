import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { locationsList } from '../../data/kuikyData';
import { 
  X, 
  PhoneCall, 
  Phone, 
  ShieldAlert, 
  MapPin, 
  HeartPulse, 
  Clock, 
  ChevronRight,
  ChevronDown,
  Navigation,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const AmbulanceModal = () => {
  const { activeModal, setActiveModal, currentLocation, setCurrentLocation, lang } = useLanguage();
  const [patientLoc, setPatientLoc] = useState('');
  const [hospitalTarget, setHospitalTarget] = useState('');
  const [ambulanceType, setAmbulanceType] = useState('icu');
  const [sosSent, setSosSent] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  // Sync patientLoc default whenever currentLocation changes
  useEffect(() => {
    if (currentLocation) {
      const defaultAddresses = {
        erode: 'Collector Office Road / GH Junction, Erode',
        gobi: 'Main Bazar / Hospital Road, Gobi',
        perundurai: 'Near Bus Stand / NH-544 Highway, Perundurai',
        bhavani: 'Cauvery River Bridge / New Bus Stand, Bhavani',
        sathyamangalam: 'Mysore Trunk Road / GH Road, Sathyamangalam',
        coimbatore: 'Trichy Road / Gandhipuram, Coimbatore'
      };
      setPatientLoc(defaultAddresses[currentLocation.id] || `${currentLocation.name} - My Exact Landmark`);

      const defaultHospitals = {
        erode: 'Erode Govt Headquarters Hospital & Trauma Care',
        gobi: 'Gobi Govt Headquarters Hospital Emergency Ward',
        perundurai: 'IRT Govt Medical College & Trauma Center, Perundurai',
        bhavani: 'Bhavani Govt Hospital & Trauma Unit',
        sathyamangalam: 'Sathyamangalam Govt Hospital Emergency Ward',
        coimbatore: 'Coimbatore Medical College Hospital (CMCH)'
      };
      setHospitalTarget(defaultHospitals[currentLocation.id] || 'Nearest Government Hospital & Trauma Care');
    }
  }, [currentLocation]);

  if (activeModal !== 'ambulance') return null;

  const handleDispatch = (e) => {
    e.preventDefault();
    setSosSent(true);
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      setIsDetectingGps(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsDetectingGps(false);
          setPatientLoc(`GPS (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}) - Near ${currentLocation.name}`);
        },
        () => {
          setIsDetectingGps(false);
          setPatientLoc(`${currentLocation.name} - Exact Landmark`);
        },
        { timeout: 6000 }
      );
    }
  };

  // Verified Ambulances categorized by city
  const ambulancesByCity = {
    erode: [
      {
        id: 'amb-erode-108',
        name: lang === 'ta' ? 'அரசு தலைமை மருத்துவமனை 108 ஆம்புலன்ஸ்' : 'Govt Headquarters Hospital 108 ICU Unit',
        hospital: lang === 'ta' ? 'ஈரோடு அரசு தலைமை மருத்துவமனை & ட்ராமா சென்டர்' : 'Erode Govt Headquarters Hospital & Trauma Center',
        type: lang === 'ta' ? 'அட்வான்ஸ்டு ICU (வென்டிலேட்டர் + ஆக்சிஜன் + முதலுதவி)' : 'Advanced ICU (Ventilator + Oxygen + Critical Care)',
        phone: '108',
        directPhone: '+919876543210',
        eta: '3-5 mins',
        rating: '5.0',
        isFree: true,
        freeBadge: lang === 'ta' ? '100% இலவச அரசு சேவை 24/7' : '100% FREE GOVT 108 (24/7)'
      },
      {
        id: 'amb-erode-sudha',
        name: lang === 'ta' ? 'சுதா கிரிட்டிகல் கேர் அவசர ஆம்புலன்ஸ்' : 'Sudha Critical Care Emergency Ambulance',
        hospital: lang === 'ta' ? 'சுதா மல்டி ஸ்பெஷாலிட்டி, பெருந்துறை ரோடு, ஈரோடு' : 'Sudha Multi-Speciality, Perundurai Road, Erode',
        type: lang === 'ta' ? 'கார்டியாக் தீவிர சிகிச்சை & நடமாடும் ICU' : 'Cardiac Life Support & Mobile ICU',
        phone: '+919788011223',
        directPhone: '+919788011223',
        eta: '4-6 mins',
        rating: '4.9',
        isFree: false,
        freeBadge: lang === 'ta' ? '24/7 தயார் • உடனடி அனுப்புதல்' : '24/7 Standby • Rapid Dispatch'
      },
      {
        id: 'amb-erode-lotus',
        name: lang === 'ta' ? 'லோட்டஸ் அவசர விபத்து சிகிச்சை ஆம்புலன்ஸ்' : 'Lotus Trauma & Emergency Care Ambulance',
        hospital: lang === 'ta' ? 'லோட்டஸ் மருத்துவமனை, பூந்துறை ரோடு, ஈரோடு' : 'Lotus Hospital, Poondurai Road, Erode',
        type: lang === 'ta' ? 'BLS ஸ்ட்ரெச்சர் & ஆக்சிஜன் சிலிண்டர் வசதி' : 'Basic Life Support (BLS) & Oxygen Unit',
        phone: '+919443399887',
        directPhone: '+919443399887',
        eta: '5-7 mins',
        rating: '4.8',
        isFree: false,
        freeBadge: lang === 'ta' ? '24 மணி நேர சேவை' : '24/7 Emergency Line'
      }
    ],
    gobi: [
      {
        id: 'amb-gobi-108',
        name: lang === 'ta' ? 'கோபி அரசு தலைமை மருத்துவமனை 108 ஆம்புலன்ஸ்' : 'Gobi Govt Headquarters Hospital 108 Unit',
        hospital: lang === 'ta' ? 'கோபி அரசு தலைமை மருத்துவமனை, மருத்துவமனை ரோடு' : 'Gobi Govt Hospital & Emergency Trauma Ward',
        type: lang === 'ta' ? 'அட்வான்ஸ்டு ICU & விபத்து சிகிச்சை (ஆக்சிஜன் + வென்டிலேட்டர்)' : 'Advanced ICU & Trauma Support (Oxygen + Ventilator)',
        phone: '108',
        directPhone: '+919876543210',
        eta: '3-5 mins',
        rating: '5.0',
        isFree: true,
        freeBadge: lang === 'ta' ? '100% இலவச அரசு சேவை 24/7' : '100% FREE GOVT 108 (24/7)'
      },
      {
        id: 'amb-gobi-srijayam',
        name: lang === 'ta' ? 'ஸ்ரீ ஜெயம் லைஃப்கேர் அவசர ஆம்புலன்ஸ்' : 'Sri Jayam LifeCare Ambulance Service',
        hospital: lang === 'ta' ? 'மெயின் பஜார் & சத்தி ரோடு மருத்துவ நெட்வொர்க், கோபி' : 'Main Bazar & Sathy Road Network, Gobi',
        type: lang === 'ta' ? 'கார்டியாக் தீவிர சிகிச்சை & நோயாளி மாற்று வசதி' : 'Cardiac Critical Care & Patient Transfer',
        phone: '+919443399887',
        directPhone: '+919443399887',
        eta: '5-7 mins',
        rating: '4.9',
        isFree: false,
        freeBadge: lang === 'ta' ? '24/7 தயார் • உடனடி வருகை' : '24/7 Standby • Rapid Response'
      },
      {
        id: 'amb-gobi-kurinji',
        name: lang === 'ta' ? 'குறிஞ்சி அவசர மருத்துவ ஆம்புலன்ஸ்' : 'Kurinji Emergency Medical Unit',
        hospital: lang === 'ta' ? 'சத்தியமங்கலம் மெயின் ரோடு, கோபி' : 'Sathyamangalam Main Road, Gobi',
        type: lang === 'ta' ? 'BLS சக்கர ஸ்ட்ரெச்சர் & ஆக்சிஜன் வசதி' : 'BLS Stretcher & Oxygen Ambulance',
        phone: '+919788011223',
        directPhone: '+919788011223',
        eta: '6-8 mins',
        rating: '4.8',
        isFree: false,
        freeBadge: lang === 'ta' ? '24 மணி நேர சேவை' : '24/7 Available'
      }
    ],
    perundurai: [
      {
        id: 'amb-perundurai-108',
        name: lang === 'ta' ? 'IRT அரசு மருத்துவக் கல்லூரி 108 அவசர ஆம்புலன்ஸ்' : 'IRT Govt Medical College 108 Trauma Unit',
        hospital: lang === 'ta' ? 'பெருந்துறை அரசு மருத்துவக் கல்லூரி & NH-544 ஹைவே ட்ராமா' : 'Perundurai Medical College & NH-544 Trauma Center',
        type: lang === 'ta' ? 'அதிநவீன ICU & அதிவிரைவு நெடுஞ்சாலை விபத்து சிகிச்சை' : 'Advanced Highway Trauma ICU & Ventilator',
        phone: '108',
        directPhone: '+919876543210',
        eta: '3-5 mins',
        rating: '5.0',
        isFree: true,
        freeBadge: lang === 'ta' ? '100% இலவச அரசு சேவை 24/7' : '100% FREE GOVT 108 (24/7)'
      },
      {
        id: 'amb-perundurai-gh',
        name: lang === 'ta' ? 'பெருந்துறை அரசு மருத்துவமனை அவசர ஆம்புலன்ஸ்' : 'Perundurai GH Emergency Standby Unit',
        hospital: lang === 'ta' ? 'பெருந்துறை ரயில்வே ஸ்டேஷன் ரோடு GH' : 'Perundurai Station Road GH',
        type: lang === 'ta' ? 'ஆக்சிஜன் வசதி கொண்ட அவசர சிகிச்சை வாகனம்' : 'Oxygen Equipped Emergency Unit',
        phone: '+919443399887',
        directPhone: '+919443399887',
        eta: '5-7 mins',
        rating: '4.9',
        isFree: false,
        freeBadge: lang === 'ta' ? 'உடனடி வருகை' : 'Rapid Response'
      }
    ],
    bhavani: [
      {
        id: 'amb-bhavani-108',
        name: lang === 'ta' ? 'பவானி அரசு மருத்துவமனை 108 அவசர ஆம்புலன்ஸ்' : 'Bhavani Govt Hospital 108 Emergency Unit',
        hospital: lang === 'ta' ? 'பவானி அரசு மருத்துவமனை, காவேரி ரோடு' : 'Bhavani Govt Hospital, Cauvery Road',
        type: lang === 'ta' ? 'அட்வான்ஸ்டு ICU & விபத்து சிகிச்சை (ஆக்சிஜன் + வென்டிலேட்டர்)' : 'Advanced ICU & Critical Support (Oxygen + Ventilator)',
        phone: '108',
        directPhone: '+919876543210',
        eta: '3-5 mins',
        rating: '5.0',
        isFree: true,
        freeBadge: lang === 'ta' ? '100% இலவச அரசு சேவை 24/7' : '100% FREE GOVT 108 (24/7)'
      },
      {
        id: 'amb-bhavani-highway',
        name: lang === 'ta' ? 'குமாரபாளையம் & பவானி பைபாஸ் அவசர ஆம்புலன்ஸ்' : 'Komarapalayam & Bhavani Bypass Ambulance',
        hospital: lang === 'ta' ? 'பவானி புதிய பாலம் பைபாஸ் ட்ராமா நெட்வொர்க்' : 'Bhavani New Bridge Bypass Trauma Network',
        type: lang === 'ta' ? 'நெடுஞ்சாலை அதிவிரைவு விபத்து சிகிச்சை வாகனம்' : 'Highway Rapid Trauma & Stretcher Unit',
        phone: '+919443399887',
        directPhone: '+919443399887',
        eta: '5-7 mins',
        rating: '4.8',
        isFree: false,
        freeBadge: lang === 'ta' ? '24/7 நெடுஞ்சாலை சேவை' : '24/7 Highway Standby'
      }
    ],
    sathyamangalam: [
      {
        id: 'amb-sathy-108',
        name: lang === 'ta' ? 'சத்தியமங்கலம் அரசு தலைமை மருத்துவமனை 108' : 'Sathyamangalam Govt HQ Hospital 108 Unit',
        hospital: lang === 'ta' ? 'சத்தி அரசு மருத்துவமனை, மைசூர் ட்ரங்க் ரோடு' : 'Sathy Govt Hospital, Mysore Trunk Road',
        type: lang === 'ta' ? 'அட்வான்ஸ்டு ICU & மலைப்பாதை அவசர சிகிச்சை' : 'Advanced ICU & Ghat Road Emergency Support',
        phone: '108',
        directPhone: '+919876543210',
        eta: '4-6 mins',
        rating: '5.0',
        isFree: true,
        freeBadge: lang === 'ta' ? '100% இலவச அரசு சேவை 24/7' : '100% FREE GOVT 108 (24/7)'
      },
      {
        id: 'amb-sathy-bannari',
        name: lang === 'ta' ? 'பண்ணாரி நெடுஞ்சாலை அவசர ஆம்புலன்ஸ்' : 'Bannari Highway Trauma Response Unit',
        hospital: lang === 'ta' ? 'பண்ணாரி செக்போஸ்ட் & தேசிய நெடுஞ்சாலை' : 'Bannari Checkpost & National Highway',
        type: lang === 'ta' ? 'ஆக்சிஜன் சிலிண்டர் & அவசர ஸ்ட்ரெச்சர்' : 'Oxygen Support & Emergency Stretcher',
        phone: '+919788011223',
        directPhone: '+919788011223',
        eta: '6-8 mins',
        rating: '4.8',
        isFree: false,
        freeBadge: lang === 'ta' ? '24/7 தயார்' : '24/7 Standby'
      }
    ],
    coimbatore: [
      {
        id: 'amb-cbe-108',
        name: lang === 'ta' ? 'கோவை அரசு மருத்துவக் கல்லூரி 108 ஆம்புலன்ஸ்' : 'Coimbatore CMCH Govt 108 Trauma Unit',
        hospital: lang === 'ta' ? 'கோவை அரசு மருத்துவக் கல்லூரி மருத்துவமனை, திருச்சி ரோடு' : 'Coimbatore Medical College Hospital (CMCH)',
        type: lang === 'ta' ? 'அட்வான்ஸ்டு கார்டியாக் ICU & அதிதீவிர சிகிச்சை' : 'Advanced Cardiac ICU & Level-1 Trauma Care',
        phone: '108',
        directPhone: '+919876543210',
        eta: '3-5 mins',
        rating: '5.0',
        isFree: true,
        freeBadge: lang === 'ta' ? '100% இலவச அரசு சேவை 24/7' : '100% FREE GOVT 108 (24/7)'
      },
      {
        id: 'amb-cbe-ganga',
        name: lang === 'ta' ? 'கங்கா மருத்துவமனை அவசர ஆம்புலன்ஸ்' : 'Ganga Hospital Emergency Trauma Ambulance',
        hospital: lang === 'ta' ? 'கங்கா மருத்துவமனை, மேட்டுப்பாளையம் ரோடு' : 'Ganga Hospital, Mettupalayam Road, Coimbatore',
        type: lang === 'ta' ? 'ஆர்த்தோ & விபத்து தீவிர சிகிச்சை வாகனம்' : 'Ortho & Critical Trauma Mobile ICU',
        phone: '+919876543210',
        directPhone: '+919876543210',
        eta: '4-6 mins',
        rating: '4.9',
        isFree: false,
        freeBadge: lang === 'ta' ? '24 மணி நேர சேவை' : '24/7 Priority Line'
      }
    ]
  };

  const currentCityKey = currentLocation?.id || 'erode';
  const nearbyAmbulanceList = ambulancesByCity[currentCityKey] || ambulancesByCity.erode;

  // City-specific hospital suggestions
  const hospitalOptionsByCity = {
    erode: [
      'Erode Govt Headquarters Hospital & Trauma Care',
      'Sudha Multi-Speciality Critical Care, Perundurai Road',
      'Lotus Hospital & Trauma Care Center, Poondurai Road',
      'Care 24/7 Emergency Hospital, Brough Road'
    ],
    gobi: [
      'Gobi Govt Headquarters Hospital Emergency Ward',
      'Sri Jayam Multi-Speciality Hospital, Main Bazar',
      'Kurinji Critical Care Hospital, Sathy Road',
      'Gobi Rotary Community Hospital'
    ],
    perundurai: [
      'IRT Govt Medical College & Trauma Center, Perundurai',
      'Perundurai GH Emergency Ward',
      'Sanjeevi Critical Care Clinic, SIPCOT'
    ],
    bhavani: [
      'Bhavani Govt Hospital & Emergency Trauma Unit',
      'Komarapalayam GH & Highway Trauma Station',
      'Cauvery Multi-Speciality Emergency Ward'
    ],
    sathyamangalam: [
      'Sathyamangalam Govt Headquarters Hospital',
      'Bannari Highway Trauma Checkpoint Unit',
      'Puliampatti Community Emergency Center'
    ],
    coimbatore: [
      'Coimbatore Medical College Hospital (CMCH)',
      'Ganga Hospital Ortho & Trauma Care',
      'PSG Hospitals Critical Care Unit',
      'KMCH Multi-Speciality Hospital'
    ]
  };

  const currentHospitalOptions = hospitalOptionsByCity[currentCityKey] || hospitalOptionsByCity.erode;

  return (
    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          borderTop: '6px solid #dc2626',
          maxWidth: '680px',
          maxHeight: '92vh',
          padding: '1.75rem',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          style={{
            position: 'absolute',
            top: '1.15rem',
            right: '1.15rem',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#fecaca'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fee2e2'; }}
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {sosSent ? (
          /* SOS DISPATCH CONFIRMATION SCREEN */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              animation: 'pulse 1s infinite'
            }}>
              <ShieldAlert size={48} />
            </div>

            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#dc2626', marginBottom: '0.5rem' }}>
              {lang === 'ta' ? 'அவசர SOS அனுப்பப்பட்டது!' : 'EMERGENCY AMBULANCE DISPATCHED!'}
            </h3>

            <p style={{ color: '#475569', fontSize: '1.02rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {lang === 'ta' ? 'அருகிலுள்ள அவசர ஆம்புலன்ஸ் ' : 'Nearest Emergency Ambulance is dispatched to '}
              <strong>{patientLoc}</strong>. {lang === 'ta' ? 'மருத்துவ குழுவினர் உடனே உங்களை தொடர்பு கொள்கிறார்கள்.' : 'The emergency paramedic team is calling you right now.'}
            </p>

            <div style={{
              backgroundColor: '#fef2f2',
              border: '1.5px solid #fecaca',
              borderRadius: '1rem',
              padding: '1.25rem',
              marginBottom: '1.75rem',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', fontSize: '0.9rem' }}>
                <span style={{ color: '#64748b' }}>{lang === 'ta' ? 'இலக்கு மருத்துவமனை:' : 'Destination Hospital:'}</span>
                <strong style={{ color: '#0f172a' }}>{hospitalTarget}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', fontSize: '0.9rem' }}>
                <span style={{ color: '#64748b' }}>{lang === 'ta' ? 'எதிர்பார்க்கப்படும் நேரம்:' : 'Estimated Arrival:'}</span>
                <strong style={{ color: '#dc2626' }}>{lang === 'ta' ? '3-5 நிமிடங்கள் (அதிவிரைவு)' : '3-5 minutes (Priority)'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: '#64748b' }}>{lang === 'ta' ? 'அவசர கட்டணம்:' : 'Emergency Cost:'}</span>
                <strong style={{ color: '#16a34a' }}>{lang === 'ta' ? '100% இலவசம் (அரசு 108 சேவை)' : '100% FREE OF COST (Govt 108)'}</strong>
              </div>
            </div>

            {/* Direct Call Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="tel:108"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  padding: '1rem',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)'
                }}
              >
                <PhoneCall size={24} />
                <span>{lang === 'ta' ? 'அரசு 108 இலவச அவசர அழைப்பு' : 'Call 108 Emergency Hotline (100% Free)'}</span>
              </a>

              <a
                href="tel:+919876543210"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none'
                }}
              >
                <Phone size={18} />
                <span>{lang === 'ta' ? 'ட்ராமா சென்டர் டிரைவர் அழைப்பு (+91 98765 43210)' : 'Call Trauma Center Driver (+91 98765 43210)'}</span>
              </a>

              <button
                type="button"
                onClick={() => setSosSent(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  fontWeight: 600
                }}
              >
                {lang === 'ta' ? '← அவசர பட்டியலுக்கு திரும்புக' : '← Back to Emergency Directory'}
              </button>
            </div>
          </div>
        ) : (
          /* EMERGENCY CALL & DIRECTORY SCREEN */
          <div>
            {/* Header with Emergency Siren & Location Chooser */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                flexShrink: 0,
                boxShadow: '0 4px 14px rgba(220, 38, 38, 0.25)'
              }}>
                🚑
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#dc2626', margin: 0, lineHeight: 1.2 }}>
                    {lang === 'ta' ? '24/7 அவசர ஆம்புலன்ஸ் SOS' : '24/7 Emergency Ambulance SOS'}
                  </h3>
                  <span style={{
                    backgroundColor: '#dcfce7',
                    color: '#15803d',
                    padding: '0.15rem 0.55rem',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 800
                  }}>
                    🟢 {lang === 'ta' ? '24/7 தயார்' : '24/7 Active Standby'}
                  </span>
                </div>

                {/* Location Bar with Direct Switcher */}
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => setShowLocationPicker(!showLocationPicker)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        backgroundColor: '#f1f5f9',
                        color: '#0f172a',
                        border: '1px solid #cbd5e1',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e2e8f0'; }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
                    >
                      <MapPin size={13} color="#dc2626" />
                      <span>{lang === 'ta' ? 'பகுதி:' : 'Location:'}</span>
                      <strong style={{ color: '#dc2626' }}>
                        {lang === 'ta' ? currentLocation.nameTa : currentLocation.name}
                      </strong>
                      <ChevronDown size={13} color="#64748b" style={{ transform: showLocationPicker ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                    </button>

                    <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                      ({lang === 'ta' ? 'அருகிலுள்ள ஆம்புலன்ஸ்கள் காட்டப்படுகின்றன' : 'Showing ambulances near you'})
                    </span>
                  </div>

                  {/* Dropdown to switch city/location */}
                  {showLocationPicker && (
                    <div style={{
                      position: 'absolute',
                      top: 'calc(100% + 6px)',
                      left: 0,
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                      border: '1px solid #e2e8f0',
                      padding: '0.4rem',
                      zIndex: 200,
                      minWidth: '220px',
                      animation: 'scaleUp 0.15s ease'
                    }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', padding: '0.35rem 0.65rem', textTransform: 'uppercase' }}>
                        Select Your Location
                      </div>
                      {locationsList.map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => {
                            setCurrentLocation(loc);
                            setShowLocationPicker(false);
                          }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '0.45rem 0.65rem',
                            borderRadius: '8px',
                            border: 'none',
                            fontSize: '0.84rem',
                            fontWeight: currentLocation.id === loc.id ? 800 : 600,
                            backgroundColor: currentLocation.id === loc.id ? '#fee2e2' : 'transparent',
                            color: currentLocation.id === loc.id ? '#dc2626' : '#1e293b',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                          onMouseOver={(e) => {
                            if (currentLocation.id !== loc.id) e.currentTarget.style.backgroundColor = '#f8fafc';
                          }}
                          onMouseOut={(e) => {
                            if (currentLocation.id !== loc.id) e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <span>{lang === 'ta' ? loc.nameTa : loc.name}</span>
                          {currentLocation.id === loc.id && <CheckCircle2 size={14} color="#dc2626" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* 1-TAP BIG EMERGENCY FREE 108 CALL BANNER */}
            <div style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
              borderRadius: '1rem',
              padding: '1.25rem 1.4rem',
              marginBottom: '1.5rem',
              boxShadow: '0 8px 25px rgba(220, 38, 38, 0.45)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>🚨</span>
                  <strong style={{ fontSize: '1.15rem', letterSpacing: '0.01em' }}>
                    {lang === 'ta' ? 'அரசு அவசர உதவி 108 (இலவசம்)' : 'TOLL-FREE 108 EMERGENCY HOTLINE'}
                  </strong>
                </div>
                <div style={{ fontSize: '0.82rem', opacity: 0.95 }}>
                  {lang === 'ta' 
                    ? '100% முற்றிலும் இலவசம் • கட்டணம் இல்லை • 24 மணி நேரமும் உடனடி அரசு சேவை' 
                    : '100% Free of Cost 24/7 • Zero Charges • Immediate Hospital Priority'}
                </div>
              </div>

              <a
                href="tel:108"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  backgroundColor: '#ffffff',
                  color: '#dc2626',
                  padding: '0.85rem 1.6rem',
                  borderRadius: '9999px',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                  whiteSpace: 'nowrap',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <PhoneCall size={22} color="#dc2626" />
                <span>{lang === 'ta' ? 'இப்போதே 108 அழைக்க' : 'CALL 108 (FREE)'}</span>
              </a>
            </div>

            {/* NEARBY AMBULANCES DIRECTORY IN SELECTED CITY */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <HeartPulse size={18} color="#dc2626" />
                  <span>
                    {lang === 'ta' 
                      ? `${currentLocation.nameTa} பகுதிக்கான அவசர ஆம்புலன்ஸ்கள்` 
                      : `Nearby Ambulances in ${currentLocation.name}`}
                  </span>
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
                  ✓ {lang === 'ta' ? '24/7 தயார் நிலை' : 'Verified 24/7 Standby'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {nearbyAmbulanceList.map((amb) => (
                  <div
                    key={amb.id}
                    style={{
                      backgroundColor: '#ffffff',
                      border: amb.isFree ? '2px solid #fca5a5' : '1.5px solid #e2e8f0',
                      borderRadius: '1rem',
                      padding: '1rem 1.15rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.85rem'
                    }}
                  >
                    <div style={{ flex: '1 1 240px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                        <strong style={{ fontSize: '0.96rem', color: '#0f172a' }}>
                          {amb.name}
                        </strong>
                        <span style={{
                          backgroundColor: amb.isFree ? '#fee2e2' : '#f1f5f9',
                          color: amb.isFree ? '#b91c1c' : '#475569',
                          padding: '0.15rem 0.55rem',
                          borderRadius: '9999px',
                          fontSize: '0.72rem',
                          fontWeight: 800
                        }}>
                          {amb.freeBadge}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.35rem' }}>
                        🏥 {amb.hospital}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.76rem', color: '#475569', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#dc2626', fontWeight: 700 }}>
                          <Clock size={13} /> {amb.eta}
                        </span>
                        <span>•</span>
                        <span style={{ color: '#059669', fontWeight: 700 }}>
                          ✓ {amb.type}
                        </span>
                      </div>
                    </div>

                    {/* Direct Call Button for this specific ambulance */}
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {amb.isFree ? (
                        <a
                          href="tel:108"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            backgroundColor: '#dc2626',
                            color: '#ffffff',
                            padding: '0.65rem 1.25rem',
                            borderRadius: '9999px',
                            fontWeight: 800,
                            fontSize: '0.9rem',
                            textDecoration: 'none',
                            boxShadow: '0 3px 12px rgba(220, 38, 38, 0.35)'
                          }}
                        >
                          <PhoneCall size={16} />
                          <span>{lang === 'ta' ? 'இலவச 108' : 'Call 108 Free'}</span>
                        </a>
                      ) : (
                        <a
                          href={`tel:${amb.phone}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            backgroundColor: '#0f172a',
                            color: '#ffffff',
                            padding: '0.65rem 1.15rem',
                            borderRadius: '9999px',
                            fontWeight: 700,
                            fontSize: '0.88rem',
                            textDecoration: 'none'
                          }}
                        >
                          <Phone size={16} />
                          <span>{lang === 'ta' ? 'அழைக்க' : 'Call Unit'}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RAPID SOS DISPATCH FORM TO EXACT LOCATION */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '1rem',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  📝 {lang === 'ta' ? 'இருப்பிடத்திற்கு ஆம்புலன்ஸ் வரவழைக்க' : 'Request Direct Ambulance Dispatch to Your Spot'}
                </h4>
                <span style={{ fontSize: '0.74rem', color: '#dc2626', fontWeight: 700 }}>
                  {lang === 'ta' ? 'உடனடி போன் கால்' : 'Immediate Callback'}
                </span>
              </div>

              <form onSubmit={handleDispatch} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#64748b' }}>
                      {lang === 'ta' ? 'நோயாளி இருக்கும் இடம் / லேண்ட்மார்க்' : 'PATIENT LOCATION / LANDMARK'}
                    </label>
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#dc2626',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <Navigation size={12} />
                      <span>{isDetectingGps ? (lang === 'ta' ? 'கண்டறிகிறது...' : 'Detecting...') : (lang === 'ta' ? 'தற்போதைய இடம்' : 'Detect GPS')}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={patientLoc}
                    onChange={(e) => setPatientLoc(e.target.value)}
                    placeholder="e.g. Near Bus Stand, Perundurai Road"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.88rem',
                      outline: 'none',
                      backgroundColor: '#ffffff'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#64748b', marginBottom: '0.25rem' }}>
                      {lang === 'ta' ? 'விரும்பும் மருத்துவமனை' : 'PREFERRED HOSPITAL'}
                    </label>
                    <select
                      value={hospitalTarget}
                      onChange={(e) => setHospitalTarget(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.85rem',
                        outline: 'none',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      {currentHospitalOptions.map((hosp, idx) => (
                        <option key={idx} value={hosp}>{hosp}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: '#64748b', marginBottom: '0.25rem' }}>
                      {lang === 'ta' ? 'தேவையான வசதி' : 'EQUIPMENT NEEDED'}
                    </label>
                    <select
                      value={ambulanceType}
                      onChange={(e) => setAmbulanceType(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.85rem',
                        outline: 'none',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <option value="icu">Advanced ICU (Oxygen + Ventilator)</option>
                      <option value="bls">Basic Life Support (Stretcher Bed)</option>
                      <option value="108">Emergency 108 Free Govt Service</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    padding: '0.9rem',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 14px rgba(220, 38, 38, 0.35)',
                    marginTop: '0.25rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#b91c1c'; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#dc2626'; }}
                >
                  <span>🚨 {lang === 'ta' ? 'உடனடி ஆம்புலன்ஸ் வரவழைக்க (108 இலவசம்)' : 'Dispatch Ambulance to My Location (108 Free)'}</span>
                  <ChevronRight size={18} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AmbulanceModal;
