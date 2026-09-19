import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  autoDrivers, 
  ambulanceServices, 
  punctureShops 
} from '../data/kuikyData';
import { 
  ArrowLeft, 
  Search, 
  ArrowRight, 
  X, 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  Phone, 
  MessageSquare, 
  Eye, 
  Zap 
} from 'lucide-react';
import cardAutoImg from '../assets/card_auto.jpg';
import cardAmbImg from '../assets/card_ambulance.jpg';
import cardTyreImg from '../assets/card_tyre.jpg';
import heroAutoBanner from '../assets/hero_auto_banner.jpg';
import heroAmbBanner from '../assets/hero_ambulance_banner.jpg';
import heroPuncBanner from '../assets/hero_banner_exact.jpg';

export const AllServicesPage = () => {
  const { 
    lang, 
    setActiveModal, 
    selectedServiceCategory, 
    navigateTo 
  } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);
  const activeCategory = selectedServiceCategory || 'all';

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedServiceModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const services = [
    {
      id: 'srv-auto-passenger',
      category: 'auto',
      titleEn: 'Passenger Auto Rickshaw',
      titleTa: 'பயணிகள் ஆட்டோ ரிக்ஷா',
      badgeEn: 'Most Popular',
      badgeTa: 'மிகவும் பிரபலம்',
      badgeColor: '#b45309',
      badgeBg: '#fffbeb',
      badgeBorder: '#fde68a',
      taglineEn: 'Base ₹35 • 3-5 min pickup',
      taglineTa: 'அடிப்படை ₹35 • 3-5 நிமிடம்',
      descEn: 'Reliable passenger auto rickshaws for daily commutes, market visits, town trips, and bus stand connections with verified local drivers.',
      descTa: 'தினசரி பயணம், மார்க்கெட் மற்றும் பேருந்து நிலையங்களுக்கு பாதுகாப்பான பயணிகள் ஆட்டோ ரிக்ஷா.',
      img: cardAutoImg,
      icon: '🛺',
      fareEn: 'Base ₹35 + ₹15/km (Zero surge pricing)',
      fareTa: 'அடிப்படை ₹35 + கி.மீக்கு ₹15 (கூடுதல் கட்டணம் இல்லை)',
      etaEn: '3-5 min pickup',
      etaTa: '3-5 நிமிடம்',
      featuresEn: [
        '3-Passenger capacity with comfortable legroom',
        'Transparent local fare with direct UPI / Cash payment',
        'Verified drivers with valid union badges and licenses',
        'Safe night travel with route tracking'
      ],
      featuresTa: [
        '3 பயணிகள் அமரும் வசதி',
        'நேரடி UPI / பணம் செலுத்தும் வசதி',
        'அங்கீகரிக்கப்பட்ட உள்ளூர் ஓட்டுநர்கள்',
        'பாதுகாப்பான இரவு நேர பயணம்'
      ],
      actionModal: 'auto',
      actionLabelEn: 'Book Auto Now',
      actionLabelTa: 'ஆட்டோ புக் செய்ய'
    },
    {
      id: 'srv-auto-electric',
      category: 'auto',
      titleEn: 'Eco Electric Auto (EV)',
      titleTa: 'சுற்றுச்சூழல் மின்சார ஆட்டோ',
      badgeEn: 'Zero Emissions',
      badgeTa: 'சுற்றுச்சூழல் நட்பு',
      badgeColor: '#059669',
      badgeBg: '#f0fdf4',
      badgeBorder: '#bbf7d0',
      taglineEn: 'Base ₹30 • Silent Ride',
      taglineTa: 'அடிப்படை ₹30 • அமைதியான சவாரி',
      descEn: 'Modern, silent, battery-powered electric autos with comfortable 4-seater capacity and smooth suspension for clean local commutes.',
      descTa: 'சத்தமில்லாத நவீன மின்சார ஆட்டோ. வசதியான 4 பேர் அமரும் இருக்கைகள் மற்றும் குறைந்த கட்டணம்.',
      img: heroAutoBanner,
      icon: '⚡',
      fareEn: 'Base ₹30 + ₹12/km',
      fareTa: 'அடிப்படை ₹30 + கி.மீக்கு ₹12',
      etaEn: '5-7 min pickup',
      etaTa: '5-7 நிமிடம்',
      featuresEn: [
        'Modern 4-passenger seating with wide legroom',
        'Eco-friendly zero emissions and silent ride',
        'Smooth electric suspension for town roads',
        'Budget-friendly per-kilometer fare rates'
      ],
      featuresTa: [
        '4 பேர் அமரும் வசதியான இருக்கைகள்',
        'புகை இல்லாத பசுமை சுற்றுச்சூழல் நட்பு',
        'மென்மையான நவீன சஸ்பென்ஷன் வசதி',
        'குறைவான கி.மீ கட்டண விகிதம்'
      ],
      actionModal: 'auto',
      actionLabelEn: 'Book Electric Auto',
      actionLabelTa: 'எலக்ட்ரிக் ஆட்டோ புக் செய்ய'
    },
    {
      id: 'srv-auto-cargo',
      category: 'auto',
      titleEn: 'Cargo & Goods Auto',
      titleTa: 'சரக்கு & பார்சல் ஆட்டோ',
      badgeEn: 'Up to 500kg',
      badgeTa: '500 கிலோ வரை',
      badgeColor: '#4f46e5',
      badgeBg: '#eef2ff',
      badgeBorder: '#c7d2fe',
      taglineEn: 'Base ₹50 • Shop & Parcel Load',
      taglineTa: 'அடிப்படை ₹50 • சரக்கு & பார்சல்',
      descEn: 'Heavy-duty open and closed cargo autos for shop goods delivery, luggage transfer, market parcels, and household shifting support.',
      descTa: 'கடை சரக்குகள், பார்சல்கள், விவசாய விளைபொருட்கள் மற்றும் சாமான்கள் கொண்டு செல்ல.',
      img: cardAutoImg,
      icon: '📦',
      fareEn: 'Base ₹50 + ₹18/km',
      fareTa: 'அடிப்படை ₹50 + கி.மீக்கு ₹18',
      etaEn: '10 min pickup',
      etaTa: '10 நிமிடம்',
      featuresEn: [
        'High payload capacity up to 500 kg',
        'Secure tie-down ropes and weather covers available',
        'Door-to-door shop and residential delivery',
        'Experienced drivers for heavy material handling'
      ],
      featuresTa: [
        '500 கிலோ வரை சுமை ஏற்றும் திறன்',
        'பாதுகாப்பான கயிறு மற்றும் தார்ப்பாய் வசதி',
        'டோர்-டு-டோர் பாதுகாப்பான டெலிவரி',
        'அனுபவமிக்க சரக்கு ஓட்டுநர்கள்'
      ],
      actionModal: 'auto',
      actionLabelEn: 'Book Cargo Auto',
      actionLabelTa: 'சரக்கு ஆட்டோ புக் செய்ய'
    },
    {
      id: 'srv-amb-emergency',
      category: 'ambulance',
      titleEn: '24/7 Emergency Ambulance (108)',
      titleTa: '24/7 அவசர ஆம்புலன்ஸ் (108)',
      badgeEn: 'Immediate 24/7',
      badgeTa: '24/7 உடனடி அவசரம்',
      badgeColor: '#dc2626',
      badgeBg: '#fef2f2',
      badgeBorder: '#fecaca',
      taglineEn: 'Toll-Free 108 • 5-8 min dispatch',
      taglineTa: 'இலவச 108 • 5-8 நிமிட வருகை',
      descEn: 'Rapid emergency ambulance dispatch across Gobi, Erode, Perundurai, and surrounding rural areas with direct hospital priority access.',
      descTa: 'மருத்துவ அவசர காலங்களில் உடனே உதவும் ஆம்புலன்ஸ் நெட்வொர்க். மருத்துவமனைக்கு விரைவு முன்னுரிமை பயணம்.',
      img: cardAmbImg,
      icon: '🚑',
      fareEn: 'Toll-Free 108 / Standard Emergency Line',
      fareTa: 'இலவச அழைப்பு 108 / உடனடி அவசர உதவி',
      etaEn: '5-8 min dispatch',
      etaTa: '5-8 நிமிட வருகை',
      featuresEn: [
        'Emergency siren with hospital priority traffic lane',
        'First aid trained paramedics on-board',
        'Immediate hospital trauma center coordination',
        'Available 24/7, 365 days across rural and urban zones'
      ],
      featuresTa: [
        'அவசர சைரன் & மருத்துவமனை முன்னுரிமை',
        'முதல் உதவி மருத்துவ உதவியாளர்கள் வசதி',
        'மருத்துவமனை அவசர பிரிவுக்கு உடனடி தகவல்',
        'ஆண்டு முழுவதும் 24 மணி நேரமும் தயார்'
      ],
      actionModal: 'ambulance',
      actionLabelEn: 'Call Emergency 108',
      actionLabelTa: '108 அழைக்க'
    },
    {
      id: 'srv-amb-icu',
      category: 'ambulance',
      titleEn: 'Advanced ICU & Cardiac Ambulance',
      titleTa: 'அட்வான்ஸ்டு ICU கார்டியாக் ஆம்புலன்ஸ்',
      badgeEn: 'Critical Life Support',
      badgeTa: 'தீவிர சிகிச்சை வசதி',
      badgeColor: '#b91c1c',
      badgeBg: '#fee2e2',
      badgeBorder: '#fca5a5',
      taglineEn: 'Ventilator & Oxygen • ICU Paramedic',
      taglineTa: 'வென்டிலேட்டர் & ஆக்சிஜன் வசதி',
      descEn: 'Full mobile Intensive Care Unit equipped with medical oxygen cylinders, ventilator, cardiac multipara monitor, and defibrillator.',
      descTa: 'ஆக்சிஜன் சிலிண்டர், வென்டிலேட்டர், கார்டியாக் மானிட்டர் கொண்ட நடமாடும் தீவிர சிகிச்சை ஆம்புலன்ஸ்.',
      img: heroAmbBanner,
      icon: '🫀',
      fareEn: 'Transparent Fixed Distance Transfer Rates',
      fareTa: 'வெளிப்படையான நிலையான கட்டணம்',
      etaEn: 'Priority Dispatch',
      etaTa: 'முன்னுரிமை அனுப்புதல்',
      featuresEn: [
        'On-board dual medical oxygen cylinders',
        'Transport ventilator and multipara cardiac monitor',
        'Specialized ICU paramedic and resuscitation kit',
        'Inter-city and multi-speciality hospital transfers'
      ],
      featuresTa: [
        'இரட்டை மருத்துவ ஆக்சிஜன் சிலிண்டர்கள்',
        'வென்டிலேட்டர் & கார்டியாக் மானிட்டர்',
        'பயிற்சி பெற்ற தீவிர சிகிச்சை உதவியாளர்',
        'நகரங்களுக்கு இடையிலான மருத்துவமனை மாற்றம்'
      ],
      actionModal: 'ambulance',
      actionLabelEn: 'Request ICU Ambulance',
      actionLabelTa: 'ICU ஆம்புலன்ஸ் கோர'
    },
    {
      id: 'srv-amb-bls',
      category: 'ambulance',
      titleEn: 'Basic Life Support (BLS) Transfer',
      titleTa: 'அடிப்படை உயிர் ஆதரவு (BLS) நோயாளி மாற்றம்',
      badgeEn: 'Patient Transport',
      badgeTa: 'பாதுகாப்பான போக்குவரத்து',
      badgeColor: '#c026d3',
      badgeBg: '#fdf4ff',
      badgeBorder: '#f5d0fe',
      taglineEn: 'Discharge & Dialysis • Stretcher Ready',
      taglineTa: 'டிஸ்சார்ஜ் & டயாலிசிஸ் சவாரி',
      descEn: 'Comfortable non-critical ambulance transfers for hospital discharge, clinic checkups, routine dialysis appointments, and bed-ridden seniors.',
      descTa: 'டிஸ்சார்ஜ், டயாலிசிஸ் மற்றும் வழக்கமான பரிசோதனைகளுக்கு சக்கர ஸ்ட்ரெச்சருடன் கூடிய நோயாளி போக்குவரத்து.',
      img: cardAmbImg,
      icon: '🏥',
      fareEn: 'Affordable Fixed Distance Rates',
      fareTa: 'மிதமான நிலையான கட்டணம்',
      etaEn: 'Scheduled or Instant Booking',
      etaTa: 'முன்பதிவு அல்லது உடனடி',
      featuresEn: [
        'Comfortable wheeled patient stretcher with safety belt',
        'On-demand oxygen mask and first aid support',
        'Wheelchair friendly loading ramp',
        'Dedicated care assistant for boarding and drop-off'
      ],
      featuresTa: [
        'பாதுகாப்பான சக்கர ஸ்ட்ரெச்சர் வசதி',
        'ஆக்சிஜன் மாஸ்க் மற்றும் முதல் உதவி',
        'வீல்சேர் ஏற்றுவதற்கான வசதி',
        'நோயாளிக்கு உதவும் கனிவான உதவியாளர்'
      ],
      actionModal: 'ambulance',
      actionLabelEn: 'Book Patient Transfer',
      actionLabelTa: 'நோயாளி ஆம்புலன்ஸ் புக் செய்ய'
    },
    {
      id: 'srv-punc-mobile',
      category: 'puncture',
      titleEn: '24/7 Mobile Puncture SOS (Doorstep)',
      titleTa: '24/7 டோர்ஸ்டெப் மொபைல் பஞ்சர் SOS',
      badgeEn: 'Mechanic at Your Location',
      badgeTa: 'இருப்பிடத்திற்கே மெக்கானிக்',
      badgeColor: '#059669',
      badgeBg: '#ecfdf5',
      badgeBorder: '#a7f3d0',
      taglineEn: 'Doorstep ₹100 • 15-20 min arrival',
      taglineTa: 'டோர்ஸ்டெப் ₹100 • 15-20 நிமிடம்',
      descEn: 'Stranded on the road or stuck at home? A verified mechanic arrives directly at your breakdown location with repair kit and high-pressure air pump.',
      descTa: 'வழியில் வண்டி பஞ்சரா? உங்கள் இருப்பிடத்திற்கே இருசக்கர வாகனத்தில் மெக்கானிக் வந்து சரிசெய்வார்.',
      img: cardTyreImg,
      icon: '🔧',
      fareEn: 'Doorstep Charge ₹100 + Patch Cost',
      fareTa: 'டோர்ஸ்டெப் வருகை ₹100 + பேட்ச் கட்டணம்',
      etaEn: '15-20 min arrival',
      etaTa: '15-20 நிமிட வருகை',
      featuresEn: [
        '15 km coverage radius around Gobi & Erode',
        '2-Wheeler tube and tubeless puncture repairs',
        'High-pressure electric air inflator on-site',
        'Spare tube replacement available upon request'
      ],
      featuresTa: [
        '15 கி.மீ பரப்பளவு முழுமையான சேவை',
        'இருசக்கர வாகன டியூப் & டியூப்லெஸ் பழுது',
        'உடனடி ஏர் பிரஷர் நிரப்புதல் வசதி',
        'புதிய டியூப் மாற்றுதல் வசதி'
      ],
      actionModal: 'puncture',
      actionLabelEn: 'Request Mobile Mechanic',
      actionLabelTa: 'மெக்கானிக் வரவழைக்க'
    },
    {
      id: 'srv-punc-tubeless',
      category: 'puncture',
      titleEn: 'Tubeless & Vulcanizing Shops',
      titleTa: 'டியூப்லெஸ் & டயர் வல்கனைசிங் கடைகள்',
      badgeEn: 'All Vehicles',
      badgeTa: 'அனைத்து வாகனங்கள்',
      badgeColor: '#0284c7',
      badgeBg: '#f0f9ff',
      badgeBorder: '#bae6fd',
      taglineEn: 'Patch from ₹60 • Open Now Nearby',
      taglineTa: 'பேட்ச் ₹60 முதல் • அருகில் தயார்',
      descEn: 'Nearby verified tyre shops for vulcanized hot patches, tubeless puncture plugs, valve pin replacements, and sidewall damage inspection.',
      descTa: 'அருகிலுள்ள கடைகளில் விரைவான டியூப்லெஸ் பஞ்சர் மற்றும் தரமான ஹாட் ரப்பர் பேட்ச் பணிகள்.',
      img: heroPuncBanner,
      icon: '🛞',
      fareEn: 'Bike: ₹60 | Car: ₹120 | Vulcanize: ₹150',
      fareTa: 'பைக்: ₹60 | கார்: ₹120 | வல்கனைஸ்: ₹150',
      etaEn: 'Open Now Nearby',
      etaTa: 'அருகில் திறந்துள்ளது',
      featuresEn: [
        'High-grade imported rubber plugs for tubeless tyres',
        'Hot vulcanizing machine for heavy tube tears',
        'Alloy wheel scratch-free rim clamping tools',
        'Nitrogen air filling stations available'
      ],
      featuresTa: [
        'உயர்தர ரப்பர் பிளக்ஸ் பயன்பாடு',
        'ஹாட் வல்கனைசிங் மெஷின் பேட்ச்',
        'அலாய் வீல் சேதமடையாத உபகரணங்கள்',
        'நைட்ரஜன் காற்று நிரப்பும் வசதி'
      ],
      actionModal: 'puncture',
      actionLabelEn: 'Find Tyre Shops',
      actionLabelTa: 'பஞ்சர் கடை காண்க'
    },
    {
      id: 'srv-punc-breakdown',
      category: 'puncture',
      titleEn: 'Battery Jumpstart & Fuel SOS',
      titleTa: 'பேட்டரி ஜம்ப்ஸ்டார்ட் & அவசர எரிபொருள்',
      badgeEn: 'Breakdown Help',
      badgeTa: 'பிரேக்-டவுன் உதவி',
      badgeColor: '#d97706',
      badgeBg: '#fffbeb',
      badgeBorder: '#fde68a',
      taglineEn: '12V Cables • 2L Fuel at MRP',
      taglineTa: '12V கேபிள்கள் • அவசர எரிபொருள்',
      descEn: 'Quick roadside breakdown support including 12V battery jumpstart with jumper cables, emergency 2-3L petrol/diesel delivery, and towing support.',
      descTa: 'பேட்டரி டெட் ஆனால் ஜம்ப்ஸ்டார்ட் மற்றும் வழியில் பெட்ரோல்/டீசல் தீர்ந்துபோனால் அவசர எரிபொருள் கொண்டு வருதல்.',
      img: cardTyreImg,
      icon: '🔋',
      fareEn: 'Service Visit ₹100 + Fuel at MRP',
      fareTa: 'சேவை கட்டணம் ₹100 + எரிபொருள் MRP விலை',
      etaEn: 'Immediate Dispatch',
      etaTa: 'உடனடி வருகை',
      featuresEn: [
        '12V heavy-duty copper jumper cables for instant start',
        'Clean emergency metal container with fresh petrol/diesel',
        'Spark plug clean and basic fuse inspection',
        'Direct contact with local 2-wheeler towing trucks'
      ],
      featuresTa: [
        '12V காப்பர் ஜம்பர் கேபிள் ஜம்ப்ஸ்டார்ட்',
        'பாதுகாப்பான கேனில் அவசர பெட்ரோல்/டீசல்',
        'ஸ்பார்க் பிளக் & ஃப்யூஸ் பரிசோதனை',
        'உள்ளூர் டோயிங் வாகன இணைப்பு'
      ],
      actionModal: 'puncture',
      actionLabelEn: 'Get Roadside SOS',
      actionLabelTa: 'பிரேக்-டவுன் உதவி பெற'
    }
  ];

  // Filter based on category and search query
  const filteredServices = services.filter((srv) => {
    const matchesCategory = activeCategory === 'all' || srv.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const title = (lang === 'ta' ? srv.titleTa : srv.titleEn).toLowerCase();
    const desc = (lang === 'ta' ? srv.descTa : srv.descEn).toLowerCase();
    const badge = (lang === 'ta' ? srv.badgeTa : srv.badgeEn).toLowerCase();
    const tagline = (lang === 'ta' ? srv.taglineTa : srv.taglineEn).toLowerCase();
    return matchesCategory && (title.includes(q) || desc.includes(q) || badge.includes(q) || tagline.includes(q));
  });

  const categoryHeaders = {
    all: {
      tag: lang === 'ta' ? 'அனைத்து சேவைகளும்' : 'KUIKY SERVICES',
      title: lang === 'ta' ? 'கோபி & ஈரோட்டில் உள்ள சேவைகள்' : 'Services in Your City',
      desc: lang === 'ta' 
        ? 'படத்தை கிளிக் செய்து சேவையின் முழு விவரங்களை அறியலாம்.'
        : 'Click on any service image to view complete details, pricing, and verified providers.'
    },
    auto: {
      tag: lang === 'ta' ? 'ஆட்டோ சேவைகள்' : 'AUTO & TRANSIT',
      title: lang === 'ta' ? 'பயணிகள் மற்றும் சரக்கு ஆட்டோ' : 'Auto Rickshaw & Transit',
      desc: lang === 'ta'
        ? 'கோபி மற்றும் ஈரோட்டின் ஆட்டோ சேவைகளின் விவரங்களை காண கிளிக் செய்யவும்.'
        : 'Click on any auto card to see live drivers, vehicle details, and instant booking.'
    },
    ambulance: {
      tag: lang === 'ta' ? 'ஆம்புலன்ஸ் சேவைகள்' : '24/7 EMERGENCY AMBULANCE',
      title: lang === 'ta' ? 'அவசர ஆம்புலன்ஸ் நெட்வொர்க்' : '24/7 Emergency Ambulance',
      desc: lang === 'ta'
        ? 'முழு விவரங்கள் மற்றும் அவசர தொடர்பு எண்களை அறிய கிளிக் செய்யவும்.'
        : 'Click on any ambulance card to view medical ICU specs and direct emergency numbers.'
    },
    puncture: {
      tag: lang === 'ta' ? 'பஞ்சர் சேவைகள்' : 'PUNCTURE & TYRE SOS',
      title: lang === 'ta' ? 'டோர்ஸ்டெப் பஞ்சர் & மெக்கானிக்' : 'Puncture & Breakdown SOS',
      desc: lang === 'ta'
        ? 'டோர்ஸ்டெப் மெக்கானிக் மற்றும் வாட்ஸ்அப் தொடர்புகளுக்கு கார்டை கிளிக் செய்யவும்.'
        : 'Click on any card to view doorstep mobile mechanics, WhatsApp chat, and repair rates.'
    }
  };

  const headerInfo = categoryHeaders[activeCategory] || categoryHeaders.all;

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      
      {/* Top Banner & Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '2rem 0 2.25rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
      }}>
        <div className="container">
          {/* Breadcrumb / Back Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigateTo('home')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#f1f5f9',
                color: '#0f172a',
                padding: '0.45rem 0.95rem',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e2e8f0'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              <span>{lang === 'ta' ? 'முகப்புக்கு திரும்புக' : 'Back to Home'}</span>
            </button>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>/</span>
            <button
              onClick={() => navigateTo('services', 'all')}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: activeCategory === 'all' ? '#0066ff' : '#64748b',
                fontSize: '0.85rem',
                fontWeight: activeCategory === 'all' ? 700 : 600,
                cursor: 'pointer'
              }}
            >
              {lang === 'ta' ? 'சேவைகள்' : 'Services'}
            </button>
            {activeCategory !== 'all' && (
              <>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>/</span>
                <span style={{ color: '#0066ff', fontSize: '0.85rem', fontWeight: 700 }}>
                  {activeCategory === 'auto' ? (lang === 'ta' ? 'ஆட்டோ' : 'Auto') : activeCategory === 'ambulance' ? (lang === 'ta' ? 'ஆம்புலன்ஸ்' : 'Ambulance') : (lang === 'ta' ? 'பஞ்சர்' : 'Puncture')}
                </span>
              </>
            )}
          </div>

          {/* Heading */}
          <div style={{ maxWidth: '780px', marginBottom: '1.75rem' }}>
            <span className="section-tag" style={{
              color: activeCategory === 'ambulance' ? '#ef4444' : activeCategory === 'puncture' ? '#10b981' : '#0066ff'
            }}>
              {headerInfo.tag}
            </span>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: '#0b1b3d',
              lineHeight: 1.2,
              marginBottom: '0.6rem',
              letterSpacing: '-0.02em'
            }}>
              {headerInfo.title}
            </h1>
            <p style={{ fontSize: '0.96rem', color: '#64748b', lineHeight: 1.5 }}>
              {headerInfo.desc}
            </p>
          </div>

          {/* Search bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '9999px',
            padding: '0.45rem 0.6rem 0.45rem 1.25rem',
            border: '1px solid #cbd5e1',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
            maxWidth: '520px'
          }}>
            <Search size={18} color="#64748b" style={{ flexShrink: 0, marginRight: '0.65rem' }} />
            <input
              type="text"
              placeholder={lang === 'ta' ? 'தேடுக (எ.கா: ஆட்டோ, 108, பஞ்சர்)...' : 'Search service (e.g. electric auto, 108, tubeless)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.92rem',
                color: '#1e293b',
                background: 'transparent'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'none',
                  fontSize: '0.8rem',
                  color: '#94a3b8',
                  padding: '0.2rem 0.5rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container" style={{ marginTop: '2rem' }}>
        
        {/* Category Filter Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          {[
            { id: 'all', labelEn: 'All Services', labelTa: 'அனைத்து சேவைகள்', count: 9 },
            { id: 'auto', labelEn: '🛺 Auto Rickshaw', labelTa: '🛺 ஆட்டோ ரிக்ஷா', count: 3 },
            { id: 'ambulance', labelEn: '🚑 Ambulance SOS', labelTa: '🚑 ஆம்புலன்ஸ் SOS', count: 3 },
            { id: 'puncture', labelEn: '🔧 Puncture & Tyre SOS', labelTa: '🔧 பஞ்சர் & டயர் SOS', count: 3 },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => navigateTo('services', cat.id)}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: isActive ? '#0066ff' : '#ffffff',
                  color: isActive ? '#ffffff' : '#475569',
                  border: isActive ? '1px solid #0066ff' : '1px solid #e2e8f0',
                  boxShadow: isActive ? '0 4px 14px rgba(0, 102, 255, 0.25)' : '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                <span>{lang === 'ta' ? cat.labelTa : cat.labelEn}</span>
                <span style={{
                  fontSize: '0.72rem',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                  color: isActive ? '#ffffff' : '#64748b',
                  padding: '0.12rem 0.45rem',
                  borderRadius: '9999px',
                  fontWeight: 800
                }}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Minimal Clean Services Grid: Image + Minimal Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(285px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3.5rem'
        }}>
          {filteredServices.map((srv) => {
            const title = lang === 'ta' ? srv.titleTa : srv.titleEn;
            const badge = lang === 'ta' ? srv.badgeTa : srv.badgeEn;
            const tagline = lang === 'ta' ? srv.taglineTa : srv.taglineEn;

            return (
              <div
                key={srv.id}
                onClick={() => setSelectedServiceModal(srv)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '1.25rem',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                className="card service-minimal-card"
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(15, 23, 42, 0.08)';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(15, 23, 42, 0.04)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                {/* Image Container with hover zoom */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '185px',
                  backgroundColor: '#f1f5f9',
                  overflow: 'hidden',
                }}>
                  <img
                    src={srv.img}
                    alt={title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />

                  {/* Gradient bottom overlay for contrast */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15,23,42,0.45) 0%, transparent 60%)',
                    pointerEvents: 'none'
                  }} />

                  {/* Category / Highlight Badge floating on top-left */}
                  <div style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(6px)',
                    border: `1px solid ${srv.badgeBorder}`,
                    color: srv.badgeColor,
                    padding: '0.28rem 0.65rem',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    pointerEvents: 'none'
                  }}>
                    <span>{srv.icon}</span>
                    <span>{badge}</span>
                  </div>

                  {/* "Click image to view details" hover pill */}
                  <div style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    right: '0.75rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.82)',
                    backdropFilter: 'blur(6px)',
                    color: '#ffffff',
                    padding: '0.28rem 0.65rem',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    pointerEvents: 'none'
                  }}>
                    <Eye size={12} strokeWidth={2.5} />
                    <span>{lang === 'ta' ? 'விவரம் காண்க' : 'View Details'}</span>
                  </div>
                </div>

                {/* Card Body: Only Minimal Details */}
                <div style={{ padding: '1.15rem 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    {/* Title */}
                    <h3 style={{
                      fontSize: '1.12rem',
                      fontWeight: 800,
                      color: '#0f172a',
                      marginBottom: '0.45rem',
                      lineHeight: 1.35
                    }}>
                      {title}
                    </h3>

                    {/* Minimal 1-liner Tag / Rate */}
                    <p style={{
                      fontSize: '0.82rem',
                      color: '#64748b',
                      fontWeight: 600,
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}>
                      <span>🏷️</span>
                      <span>{tagline}</span>
                    </p>
                  </div>

                  {/* Clean Bottom Link */}
                  <div style={{
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#0066ff'
                  }}>
                    <span>{lang === 'ta' ? 'முழு விவரங்கள்' : 'See Full Details'}</span>
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 24/7 Emergency Assistance Help Strip */}
        <div style={{
          backgroundColor: '#fff1f2',
          border: '1px solid #fecdd3',
          borderRadius: '1.25rem',
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: '#dc2626',
              flexShrink: 0
            }}>
              🚨
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#991b1b', marginBottom: '0.2rem' }}>
                {lang === 'ta' ? 'அவசர உதவி தேவையா? (24 மணி நேரமும்)' : 'Need Immediate Emergency Help?'}
              </h4>
              <p style={{ fontSize: '0.86rem', color: '#7f1d1d', margin: 0 }}>
                {lang === 'ta' 
                  ? 'ஆம்புலன்ஸ் அவசரத்திற்கு 108 என்ற எண்ணை இலவசமாக அழைக்கலாம்.' 
                  : 'Dial toll-free 108 for immediate medical ambulance dispatch across Gobi & Erode.'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="tel:108"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                padding: '0.7rem 1.35rem',
                borderRadius: '9999px',
                fontWeight: 800,
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(220, 38, 38, 0.35)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#b91c1c'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#dc2626'; }}
            >
              <PhoneCall size={16} strokeWidth={2.5} />
              <span>{lang === 'ta' ? '108 அழைக்க' : 'Call 108 Emergency'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE DETAILS MODAL: SHOWN AFTER CLICKING THE IMAGE OR CARD         */}
      {/* ========================================================================= */}
      {selectedServiceModal && (
        <div 
          onClick={() => setSelectedServiceModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '1.5rem',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Header Image Showcase - Adjusted, Uncropped & Perfectly Centered */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '290px',
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid #f1f5f9',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Subtle ambient blur background matching photo colors */}
              <img
                src={selectedServiceModal.img}
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'blur(28px)',
                  opacity: 0.28,
                  transform: 'scale(1.2)',
                  pointerEvents: 'none'
                }}
              />

              {/* Main Crisp Image - Clickable to Book/Call */}
              <img
                src={selectedServiceModal.img}
                alt={lang === 'ta' ? selectedServiceModal.titleTa : selectedServiceModal.titleEn}
                onClick={() => {
                  const targetModal = selectedServiceModal.actionModal;
                  setSelectedServiceModal(null);
                  setActiveModal(targetModal);
                }}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  maxWidth: '92%',
                  maxHeight: '90%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 25px rgba(15, 23, 42, 0.12))',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                title={lang === 'ta' ? 'முன்பதிவு செய்ய கிளிக் செய்யவும்' : 'Click to book this service'}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />

              {/* Category / Highlight Badge floating on top-left */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                zIndex: 10,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                color: selectedServiceModal.badgeColor,
                border: `1px solid ${selectedServiceModal.badgeBorder}`,
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 800,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}>
                <span>{selectedServiceModal.icon}</span>
                <span>{lang === 'ta' ? selectedServiceModal.badgeTa : selectedServiceModal.badgeEn}</span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedServiceModal(null)}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 10,
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  color: '#0f172a',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Modal Body Content */}
            <div style={{ padding: '1.75rem' }}>
              
              {/* Service Title & Tagline */}
              <div style={{ marginBottom: '1.15rem' }}>
                <h2 style={{
                  fontSize: '1.65rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  marginBottom: '0.35rem',
                  lineHeight: 1.25
                }}>
                  {lang === 'ta' ? selectedServiceModal.titleTa : selectedServiceModal.titleEn}
                </h2>
                <p style={{
                  fontSize: '0.88rem',
                  color: '#64748b',
                  fontWeight: 600,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <span>🏷️</span>
                  <span>{lang === 'ta' ? selectedServiceModal.taglineTa : selectedServiceModal.taglineEn}</span>
                </p>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.98rem',
                color: '#475569',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}>
                {lang === 'ta' ? selectedServiceModal.descTa : selectedServiceModal.descEn}
              </p>

              {/* Specs & Pricing Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '0.85rem',
                marginBottom: '1.75rem'
              }}>
                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '1rem',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: '#eff6ff',
                    color: '#0066ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    flexShrink: 0
                  }}>
                    🏷️
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>
                      {lang === 'ta' ? 'கட்டணம்' : 'Pricing & Fare'}
                    </span>
                    <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>
                      {lang === 'ta' ? selectedServiceModal.fareTa : selectedServiceModal.fareEn}
                    </strong>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '1rem',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: '#f0fdf4',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    flexShrink: 0
                  }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>
                      {lang === 'ta' ? 'வருகை நேரம்' : 'Estimated Arrival'}
                    </span>
                    <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>
                      {lang === 'ta' ? selectedServiceModal.etaTa : selectedServiceModal.etaEn}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Service Features Checklist */}
              <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  color: '#1e293b',
                  marginBottom: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  {lang === 'ta' ? 'முக்கிய சிறப்பம்சங்கள்' : 'What is Included'}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.65rem' }}>
                  {(lang === 'ta' ? selectedServiceModal.featuresTa : selectedServiceModal.featuresEn).map((feat, i) => (
                    <div 
                      key={i} 
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        fontSize: '0.88rem',
                        color: '#334155',
                        backgroundColor: '#f8fafc',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '0.65rem',
                        border: '1px solid #f1f5f9'
                      }}
                    >
                      <CheckCircle2 size={16} color="#10b981" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contextual Verified Providers List (Auto Drivers / Ambulance Units / Puncture Shops) */}
              {selectedServiceModal.category === 'auto' && (
                <div style={{
                  backgroundColor: '#fffbeb',
                  border: '1px solid #fef3c7',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  marginBottom: '1.75rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#92400e', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Zap size={16} />
                      <span>{lang === 'ta' ? 'அருகிலுள்ள உள்ளூர் ஓட்டுநர்கள்' : 'Available Local Drivers in Gobi'}</span>
                    </h4>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d', backgroundColor: '#dcfce7', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                      🟢 Live
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {autoDrivers.slice(0, 2).map((drv) => (
                      <div 
                        key={drv.id}
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '0.75rem',
                          padding: '0.75rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          border: '1px solid #fde68a'
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block' }}>
                            {lang === 'ta' ? drv.nameTa : drv.nameEn}
                          </strong>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            {drv.vehicle} • {drv.rating}★ ({drv.trips} trips)
                          </span>
                        </div>
                        <a
                          href={`tel:${drv.phone}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            backgroundColor: '#f59e0b',
                            color: '#1e1b4b',
                            padding: '0.4rem 0.85rem',
                            borderRadius: '9999px',
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            textDecoration: 'none'
                          }}
                        >
                          <Phone size={13} strokeWidth={2.5} />
                          <span>Call</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedServiceModal.category === 'ambulance' && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fee2e2',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  marginBottom: '1.75rem'
                }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#991b1b', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    🚨 <span>{lang === 'ta' ? 'அவசர ஆம்புலன்ஸ் நெட்வொர்க்' : 'Emergency Ambulance Units'}</span>
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {ambulanceServices.slice(0, 2).map((amb) => (
                      <div 
                        key={amb.id}
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '0.75rem',
                          padding: '0.75rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          border: '1px solid #fecaca'
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block' }}>
                            {lang === 'ta' ? amb.nameTa : amb.nameEn}
                          </strong>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            {amb.type} • {amb.features.slice(0, 2).join(', ')}
                          </span>
                        </div>
                        <a
                          href={`tel:${amb.phone}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            backgroundColor: '#dc2626',
                            color: '#ffffff',
                            padding: '0.4rem 0.85rem',
                            borderRadius: '9999px',
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            textDecoration: 'none'
                          }}
                        >
                          <Phone size={13} strokeWidth={2.5} />
                          <span>Call</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedServiceModal.category === 'puncture' && (
                <div style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #dcfce7',
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  marginBottom: '1.75rem'
                }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#166534', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    🔧 <span>{lang === 'ta' ? 'அருகிலுள்ள பஞ்சர் கடைகள் & வாட்ஸ்அப்' : 'Nearby Repair Shops & Direct WhatsApp'}</span>
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {punctureShops.slice(0, 2).map((shp) => (
                      <div 
                        key={shp.id}
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '0.75rem',
                          padding: '0.75rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          border: '1px solid #bbf7d0',
                          flexWrap: 'wrap',
                          gap: '0.5rem'
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block' }}>
                            {lang === 'ta' ? shp.nameTa : shp.nameEn}
                          </strong>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            {shp.distance} • {shp.timing}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <a
                            href={`https://wa.me/91${shp.phone}?text=Hello%20Kuiky%20Puncture%20SOS`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              backgroundColor: '#22c55e',
                              color: '#ffffff',
                              padding: '0.4rem 0.75rem',
                              borderRadius: '9999px',
                              fontSize: '0.76rem',
                              fontWeight: 800,
                              textDecoration: 'none'
                            }}
                          >
                            <MessageSquare size={13} strokeWidth={2.5} />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`tel:${shp.phone}`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              backgroundColor: '#0f172a',
                              color: '#ffffff',
                              padding: '0.4rem 0.75rem',
                              borderRadius: '9999px',
                              fontSize: '0.76rem',
                              fontWeight: 800,
                              textDecoration: 'none'
                            }}
                          >
                            <Phone size={13} strokeWidth={2.5} />
                            <span>Call</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    const targetModal = selectedServiceModal.actionModal;
                    setSelectedServiceModal(null);
                    setActiveModal(targetModal);
                  }}
                  style={{
                    flex: 1,
                    minWidth: '220px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: selectedServiceModal.category === 'ambulance' ? '#dc2626' : selectedServiceModal.category === 'puncture' ? '#10b981' : '#f59e0b',
                    color: selectedServiceModal.category === 'auto' ? '#1e1b4b' : '#ffffff',
                    padding: '0.85rem 1.5rem',
                    borderRadius: '9999px',
                    fontWeight: 800,
                    fontSize: '0.98rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <span>{lang === 'ta' ? selectedServiceModal.actionLabelTa : selectedServiceModal.actionLabelEn}</span>
                  <ArrowRight size={17} strokeWidth={2.5} />
                </button>

                <button
                  onClick={() => setSelectedServiceModal(null)}
                  style={{
                    padding: '0.85rem 1.4rem',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e2e8f0'; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
                >
                  {lang === 'ta' ? 'மூடுக' : 'Close'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
