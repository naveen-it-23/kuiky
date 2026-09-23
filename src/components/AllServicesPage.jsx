import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  autoDrivers, 
  ambulanceServices, 
  punctureShops,
  ambulancesByCity
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
  Zap,
  MapPin,
  ShieldAlert,
  HeartPulse,
  Wrench,
  AlertTriangle,
  Navigation
} from 'lucide-react';
import cardAutoImg from '../assets/card_auto.jpg';
import cardAmbImg from '../assets/card_ambulance.jpg';
import cardTyreImg from '../assets/card_tyre.jpg';
import heroAutoBanner from '../assets/hero_auto_banner.jpg';
import heroAmbBanner from '../assets/hero_ambulance_banner.jpg';
import heroPuncBanner from '../assets/hero_banner_exact.jpg';
import vehicleAutoStandardImg from '../assets/vehicles/vehicle_auto_standard.jpg';
import vehicleAutoElectricImg from '../assets/vehicles/vehicle_auto_electric.jpg';
import vehicleAutoCargoImg from '../assets/vehicles/vehicle_auto_cargo.jpg';
import ambulance108Img from '../assets/vehicles/ambulance_108_unit.jpg';
import ambulanceIcuImg from '../assets/vehicles/ambulance_icu_unit.jpg';
import RapidoServicesMap from './services/RapidoServicesMap';
import { fetchAmbulancesApi } from '../config/api';

export const AllServicesPage = () => {
  const { 
    lang, 
    setActiveModal, 
    selectedServiceCategory, 
    navigateTo,
    currentLocation
  } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);
  const [selectedAutoType, setSelectedAutoType] = useState('standard'); // 'standard' | 'electric' | 'cargo'
  const [selectedPunctureFilter, setSelectedPunctureFilter] = useState('all'); // 'all' | '247' | 'mobile' | 'tubeless'
  const [selectedCity, setSelectedCity] = useState(currentLocation?.id || 'erode');
  const activeCategory = (selectedServiceCategory && ['auto', 'ambulance', 'puncture'].includes(selectedServiceCategory))
    ? selectedServiceCategory
    : 'auto';

  // Keep selectedCity in sync with currentLocation if it changes
  useEffect(() => {
    if (currentLocation?.id && ['erode', 'gobi', 'perundurai', 'bhavani', 'sathyamangalam', 'coimbatore'].includes(currentLocation.id)) {
      setSelectedCity(currentLocation.id);
    }
  }, [currentLocation]);

  const [apiAmbulances, setApiAmbulances] = useState([]);

  // Fetch live backend ambulances for current city
  useEffect(() => {
    let isMounted = true;
    if (selectedCity) {
      fetchAmbulancesApi(selectedCity).then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setApiAmbulances(data);
        }
      }).catch(() => {});
    }
    return () => { isMounted = false; };
  }, [selectedCity]);

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
      actionLabelEn: 'Book Auto & Track on Map',
      actionLabelTa: 'ஆட்டோ புக் செய்து மேப்பில் பார்க்க'
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
      actionLabelEn: 'Book Electric Auto on Map',
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
      actionLabelEn: 'Book Cargo Auto on Map',
      actionLabelTa: 'சரக்கு ஆட்டோ புக் செய்ய'
    },

    {
      id: 'srv-amb-emergency',
      category: 'ambulance',
      titleEn: '24/7 Emergency Ambulance',
      titleTa: '24/7 அவசர ஆம்புலன்ஸ்',
      badgeEn: 'Immediate 24/7',
      badgeTa: '24/7 உடனடி அவசரம்',
      badgeColor: '#dc2626',
      badgeBg: '#fef2f2',
      badgeBorder: '#fecaca',
      taglineEn: 'Direct Priority Line • 5-8 min dispatch',
      taglineTa: 'நேரடி அவசர உதவி • 5-8 நிமிட வருகை',
      descEn: 'Rapid emergency ambulance dispatch across Gobi, Erode, Perundurai, and surrounding rural areas with direct hospital priority access.',
      descTa: 'மருத்துவ அவசர காலங்களில் உடனே உதவும் ஆம்புலன்ஸ் நெட்வொர்க். மருத்துவமனைக்கு விரைவு முன்னுரிமை பயணம்.',
      img: cardAmbImg,
      icon: '🚑',
      fareEn: 'Direct Priority Emergency Response Line',
      fareTa: 'நேரடி முன்னுரிமை அவசர உதவி',
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
      actionLabelEn: 'Call Emergency Unit',
      actionLabelTa: 'அவசர உதவி அழைக்க'
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
      actionLabelEn: 'Request Mobile Mechanic on Map',
      actionLabelTa: 'மேப்பில் மெக்கானிக் வரவழைக்க'
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
      actionLabelEn: 'View Nearby Shops on Map',
      actionLabelTa: 'அருகிலுள்ள கடைகளை மேப்பில் பார்க்க'
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
      actionLabelEn: 'Get Roadside SOS on Map',
      actionLabelTa: 'பிரேக்-டவுன் உதவி மேப்பில் பெற'
    }

  ];

  // Contextual search filter for drivers on the Auto tab
  const displayAutoDrivers = autoDrivers.filter((drv) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (drv.nameEn && drv.nameEn.toLowerCase().includes(q)) ||
      (drv.nameTa && drv.nameTa.toLowerCase().includes(q)) ||
      (drv.vehicle && drv.vehicle.toLowerCase().includes(q)) ||
      (drv.stand && drv.stand.toLowerCase().includes(q)) ||
      (drv.standTa && drv.standTa.toLowerCase().includes(q))
    );
  });

  // Contextual search filter for ambulances on the Ambulance tab
  const baseCityAmbulances = ambulancesByCity[selectedCity] || ambulancesByCity.erode;
  const currentCityAmbulances = apiAmbulances.length > 0 ? apiAmbulances : baseCityAmbulances;
  const displayAmbulances = currentCityAmbulances.filter((amb) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (amb.nameEn && amb.nameEn.toLowerCase().includes(q)) ||
      (amb.nameTa && amb.nameTa.toLowerCase().includes(q)) ||
      (amb.hospitalEn && amb.hospitalEn.toLowerCase().includes(q)) ||
      (amb.hospitalTa && amb.hospitalTa.toLowerCase().includes(q)) ||
      (amb.typeEn && amb.typeEn.toLowerCase().includes(q))
    );
  });

  const categoryHeaders = {
    auto: {
      tag: lang === 'ta' ? 'ஆட்டோ சேவைகள்' : 'AUTO & TRANSIT',
      title: lang === 'ta' ? 'பயணிகள் மற்றும் சரக்கு ஆட்டோ' : 'Auto Rickshaw & Transit',
      desc: lang === 'ta'
        ? 'கோபி மற்றும் ஈரோட்டின் நேரலை ஆட்டோக்கள், கட்டண கணக்கீடு & முன்பதிவு.'
        : 'Live nearby autos, route calculation, upfront fares and instant booking.'
    },
    ambulance: {
      tag: lang === 'ta' ? 'ஆம்புலன்ஸ் சேவைகள்' : '24/7 EMERGENCY AMBULANCE',
      title: lang === 'ta' ? 'அவசர ஆம்புலன்ஸ் நெட்வொர்க்' : '24/7 Emergency Ambulance SOS',
      desc: lang === 'ta'
        ? 'நேரடி அவசர ஊர்தி மற்றும் உங்கள் அருகிலுள்ள மருத்துவமனை ஆம்புலன்ஸ் தொடர்புகள்.'
        : 'Zero waiting, verified direct emergency dispatch and 24/7 local hospital ambulances.'
    },
    puncture: {
      tag: lang === 'ta' ? 'பஞ்சர் சேவைகள்' : 'PUNCTURE & TYRE SOS',
      title: lang === 'ta' ? 'டோர்ஸ்டெப் பஞ்சர் & மெக்கானிக்' : 'Puncture & Breakdown SOS',
      desc: lang === 'ta'
        ? 'அருகிலுள்ள பஞ்சர் கடைகள் நேரலை மேப், டோர்ஸ்டெப் மெக்கானிக் & வாட்ஸ்அப் உதவி.'
        : 'Live interactive map of verified puncture shops, 24/7 night breakdown & doorstep mechanic.'
    }
  };

  const headerInfo = categoryHeaders[activeCategory] || categoryHeaders.auto;

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
            <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
              {lang === 'ta' ? 'சேவைகள்' : 'Services'}
            </span>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>/</span>
            <span style={{ color: '#0066ff', fontSize: '0.85rem', fontWeight: 700 }}>
              {activeCategory === 'auto' ? (lang === 'ta' ? '🛺 ஆட்டோ ரிக்ஷா' : '🛺 Auto Rickshaw') : activeCategory === 'ambulance' ? (lang === 'ta' ? '🚑 ஆம்புலன்ஸ் SOS' : '🚑 Ambulance SOS') : (lang === 'ta' ? '🔧 பஞ்சர் & டயர் SOS' : '🔧 Puncture & Tyre SOS')}
            </span>
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
              placeholder={
                activeCategory === 'auto'
                  ? (lang === 'ta' ? 'ஆட்டோ ஓட்டுநர் அல்லது இடம் தேடுக...' : 'Search auto driver or stand...')
                  : activeCategory === 'ambulance'
                  ? (lang === 'ta' ? 'மருத்துவமனை அல்லது ஆம்புலன்ஸ் தேடுக...' : 'Search hospital or ambulance...')
                  : (lang === 'ta' ? 'பஞ்சர் கடை அல்லது பகுதி தேடுக...' : 'Search puncture shop or area...')
              }
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
        
        {/* Category Filter Tabs - Only the Particular Services */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          {[
            { id: 'auto', labelEn: '🛺 Auto Rickshaw', labelTa: '🛺 ஆட்டோ ரிக்ஷா', count: autoDrivers.length },
            { id: 'ambulance', labelEn: '🚑 Ambulance SOS', labelTa: '🚑 ஆம்புலன்ஸ் SOS', count: currentCityAmbulances.length },
            { id: 'puncture', labelEn: '🔧 Puncture & Tyre SOS', labelTa: '🔧 பஞ்சர் & டயர் SOS', count: punctureShops.length },
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

        {/* =============================================================== */}
        {/* VIEW 1: DEDICATED AUTO RICKSHAW PAGE WITH IN-PAGE LIVE MAP      */}
        {/* =============================================================== */}
        {activeCategory === 'auto' && (
          <div>
            {/* Vehicle Type Selector Cards */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {lang === 'ta' ? 'வாகன வகையை தேர்வு செய்க' : 'Select Auto Vehicle Type'}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                  {lang === 'ta' ? 'நேரலை கட்டண கணக்கீட்டிற்கு கார்டை தொடவும்' : 'Click card to update map fare & booking'}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem'
              }}>
                {[
                  {
                    id: 'standard',
                    nameEn: 'Passenger Auto Rickshaw',
                    nameTa: 'பயணிகள் ஆட்டோ ரிக்ஷா',
                    fareEn: 'Base ₹35 + ₹15/km',
                    fareTa: 'அடிப்படை ₹35 + கி.மீக்கு ₹15',
                    image: vehicleAutoStandardImg,
                    etaEn: '3-5 min pickup',
                    etaTa: '3-5 நிமிடம்',
                    descEn: '3-Seater capacity • Daily local commutes & market trips',
                    descTa: '3 பயணிகள் அமரும் வசதி • தினசரி உள்ளூர் பயணம்',
                    badge: lang === 'ta' ? 'மிகவும் பிரபலம்' : 'Most Popular',
                    tag: 'Bajaj RE 3-Wheeler'
                  },
                  {
                    id: 'electric',
                    nameEn: 'Eco Electric Auto (EV)',
                    nameTa: 'சுற்றுச்சூழல் மின்சார ஆட்டோ',
                    fareEn: 'Base ₹30 + ₹12/km',
                    fareTa: 'அடிப்படை ₹30 + கி.மீக்கு ₹12',
                    image: vehicleAutoElectricImg,
                    etaEn: '5-7 min pickup',
                    etaTa: '5-7 நிமிடம்',
                    descEn: '4-Seater wide legroom • Silent ride & zero emissions',
                    descTa: '4 பயணிகள் இருக்கை • அமைதியான பசுமை பயணம்',
                    badge: lang === 'ta' ? 'சுற்றுச்சூழல் நட்பு' : 'Silent EV',
                    tag: 'Mahindra Treo EV'
                  },
                  {
                    id: 'cargo',
                    nameEn: 'Cargo & Goods Auto',
                    nameTa: 'சரக்கு & பார்சல் ஆட்டோ',
                    fareEn: 'Base ₹50 + ₹18/km',
                    fareTa: 'அடிப்படை ₹50 + கி.மீக்கு ₹18',
                    image: vehicleAutoCargoImg,
                    etaEn: '10 min pickup',
                    etaTa: '10 நிமிடம்',
                    descEn: 'Up to 500kg payload • Shop delivery & parcel shifting',
                    descTa: '500 கிலோ வரை சுமை • கடை சாமான்கள் டெலிவரி',
                    badge: lang === 'ta' ? '500 கிலோ வரை' : 'Up to 500kg',
                    tag: 'Piaggio Ape Cargo'
                  }
                ].map((veh) => {
                  const isSelected = selectedAutoType === veh.id;
                  return (
                    <div
                      key={veh.id}
                      onClick={() => setSelectedAutoType(veh.id)}
                      className="service-selector-card"
                      style={{
                        backgroundColor: isSelected ? '#ecfdf5' : '#ffffff',
                        border: isSelected ? '2.5px solid #04784b' : '1.5px solid #e2e8f0',
                        borderRadius: '1.25rem',
                        padding: '1.15rem',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: isSelected ? '0 10px 28px rgba(4, 120, 75, 0.16)' : '0 2px 8px rgba(0,0,0,0.04)',
                        position: 'relative',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {/* Vehicle Image Showcase Box */}
                      <div style={{
                        width: '100%',
                        height: '145px',
                        backgroundColor: '#ffffff',
                        borderRadius: '1rem',
                        border: '1px solid ' + (isSelected ? '#a7f3d0' : '#f1f5f9'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        marginBottom: '0.85rem',
                        overflow: 'hidden',
                        padding: '0.5rem'
                      }}>
                        <img
                          src={veh.image}
                          alt={veh.nameEn}
                          style={{
                            maxHeight: '100%',
                            maxWidth: '100%',
                            objectFit: 'contain',
                            transition: 'transform 0.25s ease'
                          }}
                        />

                        <span style={{
                          position: 'absolute',
                          top: '0.65rem',
                          right: '0.65rem',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          backgroundColor: isSelected ? '#04784b' : 'rgba(15, 23, 42, 0.85)',
                          color: '#ffffff',
                          padding: '0.22rem 0.6rem',
                          borderRadius: '9999px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                        }}>
                          {isSelected ? (lang === 'ta' ? '✓ தேர்வு' : '✓ Selected') : veh.badge}
                        </span>

                        <span style={{
                          position: 'absolute',
                          bottom: '0.5rem',
                          left: '0.65rem',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          backgroundColor: 'rgba(255, 255, 255, 0.92)',
                          color: '#475569',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0'
                        }}>
                          {veh.tag}
                        </span>
                      </div>

                      {/* Header Info */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <div>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.15rem' }}>
                            {lang === 'ta' ? veh.nameTa : veh.nameEn}
                          </h4>
                          <span style={{ fontSize: '0.76rem', color: '#04784b', fontWeight: 700 }}>
                            ⚡ {lang === 'ta' ? veh.etaTa : veh.etaEn}
                          </span>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.25rem 0 0.85rem', lineHeight: 1.45 }}>
                        {lang === 'ta' ? veh.descTa : veh.descEn}
                      </p>

                      <div style={{
                        borderTop: '1px solid ' + (isSelected ? '#a7f3d0' : '#f1f5f9'),
                        paddingTop: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', fontWeight: 600 }}>
                            {lang === 'ta' ? 'கட்டணம்' : 'Estimated Fare'}
                          </span>
                          <strong style={{ fontSize: '0.96rem', color: isSelected ? '#04784b' : '#0f172a', fontWeight: 900 }}>
                            {lang === 'ta' ? veh.fareTa : veh.fareEn}
                          </strong>
                        </div>
                        <span style={{
                          fontSize: '0.78rem',
                          color: isSelected ? '#04784b' : '#0066ff',
                          fontWeight: 800,
                          backgroundColor: isSelected ? '#d1fae5' : '#eff6ff',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '8px'
                        }}>
                          {isSelected ? (lang === 'ta' ? 'மேப்பில் செயலில் உள்ளது' : 'Active on Map') : (lang === 'ta' ? 'தேர்வு செய்க' : 'Select Ride')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LIVE AUTO BOOKING & TRACKING MAP (IN-PAGE EMBED) */}
            <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🛺</span>
                  <span>{lang === 'ta' ? 'நேரலை ஆட்டோ மேப் & முன்பதிவு' : 'Live Auto Booking & Real-Time Tracking Map'}</span>
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
                  {lang === 'ta' 
                    ? 'பிக்கப் மற்றும் சேருமிடத்தை தேர்வு செய்து நேரலையில் ஆட்டோவை புக் செய்யலாம்.' 
                    : 'Select pickup & destination below to see live nearby autos moving and book instantly.'}
                </p>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#065f46'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                <span>{autoDrivers.length} {lang === 'ta' ? 'ஆட்டோக்கள் நேரலை தயார்' : 'Autos Active Nearby'}</span>
              </div>
            </div>

            {/* The Map Container */}
            <div className="rapido-embed-card">
              <RapidoServicesMap 
                initialMode="auto"
                initialAutoType={selectedAutoType}
              />
            </div>

            {/* Available Local Drivers in Gobi & Erode */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '1.25rem',
              border: '1px solid #e2e8f0',
              padding: '1.5rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Zap size={18} color="#d97706" />
                  <span>{lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட உள்ளூர் ஓட்டுநர்கள்' : 'Verified Local Drivers in Your City'}</span>
                </h4>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                  {lang === 'ta' ? 'நேரடி அழைப்பு & முன்கூட்டிய முன்பதிவு' : 'Direct calling & advance booking'}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                {displayAutoDrivers.map((drv) => (
                  <div
                    key={drv.id}
                    style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '0.9rem',
                      padding: '1rem',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '0.96rem', color: '#0f172a' }}>
                        {lang === 'ta' ? drv.nameTa : drv.nameEn}
                      </strong>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#d97706' }}>
                        ★ {drv.rating}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '10px',
                        backgroundColor: '#ffffff',
                        border: '1.5px solid #d1fae5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2px',
                        flexShrink: 0
                      }}>
                        <img
                          src={
                            drv.typeKey === 'electric'
                              ? vehicleAutoElectricImg
                              : drv.typeKey === 'cargo'
                              ? vehicleAutoCargoImg
                              : vehicleAutoStandardImg
                          }
                          alt={drv.vehicle}
                          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                        />
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{drv.vehicle} • {drv.vehicleNo}</div>
                        <div>📍 {lang === 'ta' ? drv.standTa : drv.stand} ({drv.trips} {lang === 'ta' ? 'சவாரிகள்' : 'trips'})</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <a
                        href={`tel:${drv.phone}`}
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.35rem',
                          backgroundColor: '#04784b',
                          color: '#ffffff',
                          padding: '0.55rem',
                          borderRadius: '9999px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          textDecoration: 'none'
                        }}
                      >
                        <Phone size={14} strokeWidth={2.5} />
                        <span>{lang === 'ta' ? 'அழைக்க' : 'Call Driver'}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transparent Local Auto Policies */}
            <div style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '1.25rem',
              padding: '1.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.3rem' }}>🛡️</span>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#92400e', display: 'block', marginBottom: '0.15rem' }}>
                    {lang === 'ta' ? 'சர்ஜ் கட்டணம் இல்லை' : 'Zero Surge Pricing'}
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: '#78350f' }}>
                    {lang === 'ta' ? 'மழை அல்லது இரவு நேரங்களிலும் நியாயமான உள்ளூர் கட்டணம்.' : 'Transparent fair rates 24/7 with no peak surge multiples.'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.3rem' }}>💵</span>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#92400e', display: 'block', marginBottom: '0.15rem' }}>
                    {lang === 'ta' ? 'நேரடி UPI / பணம்' : 'Direct Cash / UPI'}
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: '#78350f' }}>
                    {lang === 'ta' ? 'கமிஷன் பிடித்தம் இன்றி ஓட்டுநருக்கு நேரடியாக பணம் செலுத்துங்கள்.' : 'Pay drivers directly via GPay, PhonePe, or Cash.'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.3rem' }}>📍</span>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#92400e', display: 'block', marginBottom: '0.15rem' }}>
                    {lang === 'ta' ? 'நேரலை கண்காணிப்பு' : 'Live Route Tracking'}
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: '#78350f' }}>
                    {lang === 'ta' ? 'ஓட்டுநர் வரும் வழியை மேப்பில் நிகழ்நேரத்தில் பார்க்கலாம்.' : 'Real-time GPS tracking of your assigned auto driver.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =============================================================== */}
        {/* VIEW 2: DEDICATED PUNCTURE & TYRE WORKS WITH IN-PAGE LIVE MAP   */}
        {/* =============================================================== */}
        {activeCategory === 'puncture' && (
          <div>
            {/* Quick Filter Pills */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {lang === 'ta' ? 'பஞ்சர் சேவை வகையை வடிகட்டுக' : 'Filter Breakdown & Repair Services'}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                  {lang === 'ta' ? 'வடிகட்டியை தொடவும்' : 'Tap to filter map markers & repair spots'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', labelEn: '🔧 All Verified Shops', labelTa: '🔧 அனைத்து கடைகளும்', count: punctureShops.length },
                  { id: '247', labelEn: '⏰ Open 24/7 (Night SOS)', labelTa: '⏰ 24/7 இரவு பஞ்சர்', count: 3 },
                  { id: 'mobile', labelEn: '🛵 Doorstep Mobile Van (₹100)', labelTa: '🛵 டோர்ஸ்டெப் மெக்கானிக்', count: 3 },
                  { id: 'tubeless', labelEn: '🛞 Tubeless & Vulcanizing', labelTa: '🛞 டியூப்லெஸ் & வல்கனைசிங்', count: 4 }
                ].map((flt) => {
                  const isSelected = selectedPunctureFilter === flt.id;
                  return (
                    <button
                      key={flt.id}
                      onClick={() => setSelectedPunctureFilter(flt.id)}
                      style={{
                        padding: '0.55rem 1.15rem',
                        borderRadius: '9999px',
                        fontSize: '0.86rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        backgroundColor: isSelected ? '#d97706' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#475569',
                        border: isSelected ? '1px solid #d97706' : '1px solid #e2e8f0',
                        boxShadow: isSelected ? '0 4px 14px rgba(217, 119, 6, 0.25)' : '0 2px 4px rgba(0,0,0,0.02)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>{lang === 'ta' ? flt.labelTa : flt.labelEn}</span>
                      <span style={{
                        fontSize: '0.72rem',
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                        color: isSelected ? '#ffffff' : '#64748b',
                        padding: '0.1rem 0.45rem',
                        borderRadius: '9999px',
                        fontWeight: 800
                      }}>
                        {flt.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Map Header */}
            <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🔧</span>
                  <span>{lang === 'ta' ? 'அருகிலுள்ள பஞ்சர் கடைகள் நேரலை மேப்' : 'Nearby Puncture Works & Mobile Mechanic Map'}</span>
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
                  {lang === 'ta' 
                    ? 'மேப்பில் உள்ள கடைகளை தொட்டு வாட்ஸ்அப் அல்லது போன் மூலம் தொடர்பு கொள்ளலாம்.' 
                    : 'Click any shop on the map for direct WhatsApp, phone call, or doorstep mechanic dispatch.'}
                </p>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#92400e'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d97706', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                <span>{punctureShops.length} {lang === 'ta' ? 'கடைகள் மேப்பில் உள்ளன' : 'Repair Spots Listed'}</span>
              </div>
            </div>

            {/* In-Page Embedded Map */}
            <div className="rapido-embed-card">
              <RapidoServicesMap 
                initialMode="puncture"
                initialFilter={selectedPunctureFilter}
              />
            </div>

            {/* Breakdown SOS Options Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '1.15rem',
                padding: '1.35rem',
                boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🔋</span>
                  <h4 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {lang === 'ta' ? '12V பேட்டரி ஜம்ப்ஸ்டார்ட் SOS' : '12V Battery Jumpstart SOS'}
                  </h4>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 1rem' }}>
                  {lang === 'ta' 
                    ? 'பேட்டரி டெட் ஆனால் கவலை வேண்டாம். காப்பர் ஜம்பர் கேபிள்களுடன் மெக்கானிக் வந்து ஸ்டார்ட் செய்து தருவார்.' 
                    : 'Dead vehicle battery? Heavy-duty copper cables arrive on a bike to jumpstart your bike or car immediately.'}
                </p>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#d97706', display: 'block' }}>
                  {lang === 'ta' ? 'வருகை கட்டணம் ₹100' : 'Service Visit ₹100'}
                </span>
              </div>

              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '1.15rem',
                padding: '1.35rem',
                boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>⛽</span>
                  <h4 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {lang === 'ta' ? 'அவசர எரிபொருள் (MRP விலையில்)' : 'Emergency Fuel at MRP'}
                  </h4>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 1rem' }}>
                  {lang === 'ta' 
                    ? 'வழியில் பெட்ரோல்/டீசல் தீர்ந்துபோனால் 2-3 லிட்டர் அவசர எரிபொருள் உங்கள் இடத்திற்கு கொண்டு வரப்படும்.' 
                    : 'Ran out of fuel on the road? Emergency 2-3L clean petrol/diesel brought to your exact spot at official bunk rates.'}
                </p>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#059669', display: 'block' }}>
                  {lang === 'ta' ? 'டெலிவரி ₹100 + பெட்ரோல் பில்' : 'Delivery ₹100 + MRP Fuel'}
                </span>
              </div>

              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '1.15rem',
                padding: '1.35rem',
                boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🛞</span>
                  <h4 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {lang === 'ta' ? 'வெளிப்படையான பஞ்சர் கட்டணம்' : 'Standard Repair Rates'}
                  </h4>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{lang === 'ta' ? 'பைக் டியூப் பஞ்சர்' : '2-Wheeler Tube Patch'}:</span>
                    <strong>₹60</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{lang === 'ta' ? 'கார் டியூப்லெஸ் பிளக்' : 'Car Tubeless Plug'}:</span>
                    <strong>₹120</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{lang === 'ta' ? 'ஹாட் வல்கனைசிங்' : 'Hot Vulcanizing'}:</span>
                    <strong>₹150</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =============================================================== */}
        {/* VIEW 3: DEDICATED 24/7 EMERGENCY AMBULANCE SOS (STRICTLY NO MAPS)*/}
        {/* =============================================================== */}
        {activeCategory === 'ambulance' && (
          <div>
            {/* Giant Emergency Hero Banner with 108 Direct Calling */}
            <div style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
              borderRadius: '1.5rem',
              padding: '2.25rem',
              color: '#ffffff',
              marginBottom: '2.5rem',
              boxShadow: '0 12px 36px rgba(220, 38, 38, 0.28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ maxWidth: '640px', position: 'relative', zIndex: 2 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  marginBottom: '1rem',
                  textTransform: 'uppercase'
                }}>
                  <span>🚨</span>
                  <span>{lang === 'ta' ? '24/7 அவசர மருத்துவ உதவி சேவை' : '24/7 Emergency Medical Response & Priority Dispatch'}</span>
                </div>

                <h2 style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  marginBottom: '0.65rem',
                  letterSpacing: '-0.02em'
                }}>
                  {lang === 'ta' ? '24/7 அவசர ஆம்புலன்ஸ் — நேரடி உதவி' : '24/7 Priority Emergency Ambulance'}
                </h2>

                <p style={{
                  fontSize: '1rem',
                  opacity: 0.95,
                  lineHeight: 1.55,
                  marginBottom: '1.5rem'
                }}>
                  {lang === 'ta'
                    ? 'மருத்துவ அவசர காலங்களில் மேப் தேட தேவையில்லை. உடனே அவசர எண்ணை அழைத்து உங்கள் இருப்பிடத்திற்கு ஆம்புலன்ஸை வரவழைக்கவும்.'
                    : 'Zero waiting. Dial verified emergency numbers immediately for priority medical dispatch and rapid hospital transfer across your location.'}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                  <a
                    href={`tel:${(currentCityAmbulances[0]?.phone || '+91 98427 12108').replace(/\s+/g, '')}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      backgroundColor: '#ffffff',
                      color: '#dc2626',
                      padding: '0.9rem 1.85rem',
                      borderRadius: '9999px',
                      fontSize: '1.05rem',
                      fontWeight: 900,
                      textDecoration: 'none',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <PhoneCall size={20} strokeWidth={2.8} />
                    <span>{lang === 'ta' ? `உடனே அழைக்க: ${currentCityAmbulances[0]?.phone || '+91 98427 12108'}` : `Call Emergency: ${currentCityAmbulances[0]?.phone || '+91 98427 12108'}`}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveModal('ambulance')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.18)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      border: '1.5px solid rgba(255, 255, 255, 0.4)',
                      padding: '0.88rem 1.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.28)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)'; }}
                  >
                    <HeartPulse size={18} strokeWidth={2.5} />
                    <span>{lang === 'ta' ? 'ஆம்புலன்ஸ் கோரிக்கை படிவம்' : 'Request Ambulance Dispatch'}</span>
                  </button>
                </div>
              </div>

              {/* Siren Visual Element */}
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4.5rem',
                flexShrink: 0
              }}>
                🚑
              </div>
            </div>

            {/* City Selector Tabs for Hospital & Ambulance Directory */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <MapPin size={18} color="#dc2626" />
                  <span>{lang === 'ta' ? 'நகர வாரியாக சரிபார்க்கப்பட்ட ஆம்புலன்ஸ் பட்டியல்' : 'Verified Emergency Ambulances in Your City'}</span>
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                  {lang === 'ta' ? 'நகரத்தை தேர்வு செய்க' : 'Select city to view local hospital units'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'erode', labelEn: 'Erode', labelTa: 'ஈரோடு' },
                  { id: 'gobi', labelEn: 'Gobichettipalayam', labelTa: 'கோபிசெட்டிபாளையம்' },
                  { id: 'perundurai', labelEn: 'Perundurai', labelTa: 'பெருந்துறை' },
                  { id: 'bhavani', labelEn: 'Bhavani', labelTa: 'பவானி' },
                  { id: 'sathyamangalam', labelEn: 'Sathyamangalam', labelTa: 'சத்தியமங்கலம்' },
                  { id: 'coimbatore', labelEn: 'Coimbatore', labelTa: 'கோயம்புத்தூர்' }
                ].map((city) => {
                  const isSelected = selectedCity === city.id;
                  return (
                    <button
                      key={city.id}
                      onClick={() => setSelectedCity(city.id)}
                      style={{
                        padding: '0.5rem 1.15rem',
                        borderRadius: '9999px',
                        fontSize: '0.86rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        backgroundColor: isSelected ? '#dc2626' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#475569',
                        border: isSelected ? '1px solid #dc2626' : '1px solid #e2e8f0',
                        boxShadow: isSelected ? '0 4px 14px rgba(220, 38, 38, 0.25)' : '0 2px 4px rgba(0,0,0,0.02)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>📍</span>
                      <span style={{ marginLeft: '0.35rem' }}>{lang === 'ta' ? city.labelTa : city.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* City Ambulances Directory Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2.5rem'
            }}>
              {displayAmbulances.map((amb) => (
                <div
                  key={amb.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '1.15rem',
                    border: amb.isFree ? '2px solid #fca5a5' : '1px solid #e2e8f0',
                    padding: '1.4rem',
                    boxShadow: amb.isFree ? '0 6px 20px rgba(220, 38, 38, 0.08)' : '0 4px 14px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <div>
                    {/* Badge & Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        backgroundColor: amb.isFree ? '#fee2e2' : '#f1f5f9',
                        color: amb.isFree ? '#b91c1c' : '#475569',
                        padding: '0.22rem 0.65rem',
                        borderRadius: '9999px',
                        border: amb.isFree ? '1px solid #fecaca' : '1px solid #e2e8f0'
                      }}>
                        {amb.isFree ? '🚨 ' : '🚑 '}
                        {lang === 'ta' ? amb.freeBadgeTa : amb.freeBadgeEn}
                      </span>

                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#d97706' }}>
                        ★ {amb.rating} ({amb.eta})
                      </span>
                    </div>

                    {/* Ambulance Vehicle Image Showcase */}
                    <div style={{
                      width: '100%',
                      height: '145px',
                      backgroundColor: '#ffffff',
                      borderRadius: '0.9rem',
                      border: amb.isFree ? '1px solid #fecaca' : '1px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      marginBottom: '0.85rem',
                      overflow: 'hidden',
                      padding: '0.5rem',
                      boxShadow: 'inset 0 0 12px rgba(0,0,0,0.02)'
                    }}>
                      <img
                        src={amb.isFree || (amb.nameEn && amb.nameEn.includes('108')) ? ambulance108Img : ambulanceIcuImg}
                        alt={amb.nameEn}
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain'
                        }}
                      />

                      <span style={{
                        position: 'absolute',
                        bottom: '0.5rem',
                        left: '0.65rem',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        color: '#0f172a',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0'
                      }}>
                        {amb.isFree ? 'Emergency Response Unit' : 'Advanced Cardiac ICU'}
                      </span>
                    </div>

                    {/* Unit Name & Hospital */}
                    <h4 style={{ fontSize: '1.12rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.35rem', lineHeight: 1.3 }}>
                      {lang === 'ta' ? amb.nameTa : amb.nameEn}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600, margin: '0 0 0.65rem' }}>
                      🏥 {lang === 'ta' ? amb.hospitalTa : amb.hospitalEn}
                    </p>

                    {/* Type & Equipment */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '0.65rem',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.8rem',
                      color: '#334155',
                      fontWeight: 600,
                      marginBottom: '1rem',
                      border: '1px solid #f1f5f9'
                    }}>
                      ⚡ {lang === 'ta' ? amb.typeTa : amb.typeEn}
                    </div>
                  </div>

                  {/* Call Actions */}
                  <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                    <a
                      href={`tel:${(amb.phone || '').replace(/\s+/g, '')}`}
                      style={{
                        flex: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.45rem',
                        backgroundColor: '#dc2626',
                        color: '#ffffff',
                        padding: '0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.9rem',
                        fontWeight: 800,
                        textDecoration: 'none',
                        boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#b91c1c'; }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#dc2626'; }}
                    >
                      <PhoneCall size={16} strokeWidth={2.5} />
                      <span>{lang === 'ta' ? `${amb.phone} அழைக்க` : `Call ${amb.phone}`}</span>
                    </a>

                    {amb.directPhone && amb.directPhone !== amb.phone && (
                      <a
                        href={`tel:${(amb.directPhone || '').replace(/\s+/g, '')}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.35rem',
                          backgroundColor: '#f1f5f9',
                          color: '#0f172a',
                          padding: '0.75rem 1rem',
                          borderRadius: '9999px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          border: '1px solid #e2e8f0'
                        }}
                      >
                        <Phone size={14} />
                        <span>Direct</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency Patient & Caller Guidelines */}
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fee2e2',
              borderRadius: '1.25rem',
              padding: '1.75rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem'
            }}>
              <div>
                <strong style={{ fontSize: '0.94rem', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                  <ShieldAlert size={18} />
                  <span>{lang === 'ta' ? '1. அமைதியாக இருங்கள்' : '1. Stay Calm & State Landmark'}</span>
                </strong>
                <p style={{ fontSize: '0.82rem', color: '#7f1d1d', margin: 0, lineHeight: 1.45 }}>
                  {lang === 'ta' ? 'அழைக்கும் போது உங்கள் அருகிலுள்ள முக்கிய அடையாளம், தெரு பெயர் தெளிவாக கூறவும்.' : 'Provide the exact landmark, building name, and road to the operator clearly.'}
                </p>
              </div>

              <div>
                <strong style={{ fontSize: '0.94rem', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                  <HeartPulse size={18} />
                  <span>{lang === 'ta' ? '2. நோயாளியின் நிலை' : '2. Describe Patient Condition'}</span>
                </strong>
                <p style={{ fontSize: '0.82rem', color: '#7f1d1d', margin: 0, lineHeight: 1.45 }}>
                  {lang === 'ta' ? 'நெஞ்சு வலி, மூச்சுத்திணறல் அல்லது விபத்து காயங்களை கூறினால் அதற்கேற்ப ICU ஆம்புலன்ஸ் அனுப்பப்படும்.' : 'Inform if oxygen, ventilator, or cardiac life support is urgently required.'}
                </p>
              </div>

              <div>
                <strong style={{ fontSize: '0.94rem', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                  <Clock size={18} />
                  <span>{lang === 'ta' ? '3. போனை தயாராக வைக்கவும்' : '3. Keep Phone Line Open'}</span>
                </strong>
                <p style={{ fontSize: '0.82rem', color: '#7f1d1d', margin: 0, lineHeight: 1.45 }}>
                  {lang === 'ta' ? 'ஆம்புலன்ஸ் ஓட்டுநர் வழிகாட்ட அழைக்கலாம். அழைப்பை துண்டிக்காமல் தயாராக இருக்கவும்.' : 'The ambulance pilot will call for final navigation as they enter your street.'}
                </p>
              </div>
            </div>
          </div>
        )}
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
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Scrollable Modal Interior with No Corner Clipping */}
            <div style={{
              overflowY: 'auto',
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column'
            }}>
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

              {/* Main Crisp Image - Clickable to Open Corresponding Live Map / Service */}
              <img
                src={selectedServiceModal.img}
                alt={lang === 'ta' ? selectedServiceModal.titleTa : selectedServiceModal.titleEn}
                onClick={() => {
                  const cat = selectedServiceModal.category;
                  const srvId = selectedServiceModal.id;
                  setSelectedServiceModal(null);

                  if (cat === 'auto') {
                    const autoType = srvId.includes('electric') ? 'electric' : srvId.includes('cargo') ? 'cargo' : 'standard';
                    setSelectedAutoType(autoType);
                    navigateTo('services', 'auto');
                  } else if (cat === 'puncture') {
                    const filter = srvId.includes('mobile') ? 'mobile' : srvId.includes('tubeless') ? 'tubeless' : 'all';
                    setSelectedPunctureFilter(filter);
                    navigateTo('services', 'puncture');
                  } else if (cat === 'ambulance') {
                    navigateTo('services', 'ambulance');
                  }
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
                    const cat = selectedServiceModal.category;
                    const srvId = selectedServiceModal.id;
                    setSelectedServiceModal(null);

                    if (cat === 'auto') {
                      const autoType = srvId.includes('electric') ? 'electric' : srvId.includes('cargo') ? 'cargo' : 'standard';
                      setSelectedAutoType(autoType);
                      navigateTo('services', 'auto');
                    } else if (cat === 'puncture') {
                      const filter = srvId.includes('mobile') ? 'mobile' : srvId.includes('tubeless') ? 'tubeless' : 'all';
                      setSelectedPunctureFilter(filter);
                      navigateTo('services', 'puncture');
                    } else if (cat === 'ambulance') {
                      navigateTo('services', 'ambulance');
                    }
                  }}
                  style={{
                    flex: 1,
                    minWidth: '220px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: selectedServiceModal.category === 'ambulance' ? '#dc2626' : selectedServiceModal.category === 'puncture' ? '#d97706' : '#04784b',
                    color: '#ffffff',
                    padding: '0.85rem 1.5rem',
                    borderRadius: '9999px',
                    fontWeight: 800,
                    fontSize: '0.98rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
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
      </div>
      )}

    </div>
  );
};

