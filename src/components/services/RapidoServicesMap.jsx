import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  autoDrivers, 
  punctureShops, 
  popularRideLocations 
} from '../../data/kuikyData';

import { 
  MapPin, 
  Navigation, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Wrench, 
  Car, 
  Zap, 
  Package, 
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronRight,
  Send,
  Star,
  ArrowLeft
} from 'lucide-react';
import contactMapImg from '../../assets/contact_map_erode_hd.png';
import vehicleAutoStandardImg from '../../assets/vehicles/vehicle_auto_standard.jpg';
import vehicleAutoElectricImg from '../../assets/vehicles/vehicle_auto_electric.jpg';
import vehicleAutoCargoImg from '../../assets/vehicles/vehicle_auto_cargo.jpg';
import { createBookingApi, fetchDriverLocationsApi, latLngToMapPos } from '../../config/api';

export const RapidoServicesMap = ({ 
  initialMode = 'auto', 
  initialAutoType = 'standard',
  initialFilter = 'all',
  onClose,
  onServiceSelect 
}) => {
  const { lang, currentLocation, currentUser } = useLanguage();

  // Mode: 'auto' | 'puncture'
  const [activeTab, setActiveTab] = useState(initialMode);
  
  // ─── AUTO BOOKING STATE ───
  const [pickupLoc, setPickupLoc] = useState(popularRideLocations[4]); // Brough Road Market
  const [dropLoc, setDropLoc] = useState(popularRideLocations[1]); // Railway Junction
  const [selectedAutoType, setSelectedAutoType] = useState(initialAutoType || 'standard'); // 'standard' | 'electric' | 'cargo'
  const [driversList, setDriversList] = useState(autoDrivers);
  const [isLoadingDrivers, setIsLoadingDrivers] = useState(false);
  const [rideState, setRideState] = useState('idle'); // 'idle' | 'searching' | 'confirmed' | 'arrived' | 'completed'
  const [assignedDriver, setAssignedDriver] = useState(null);
  const [driverPos, setDriverPos] = useState({ x: 54, y: 32 });
  const [etaSeconds, setEtaSeconds] = useState(120);
  const [rideOtp, setRideOtp] = useState('4829');
  const [liveBooking, setLiveBooking] = useState(null);
  const [isBookingApi, setIsBookingApi] = useState(false);
  const [previewDriver, setPreviewDriver] = useState(null);

  // Fetch driver locations from Django backend (/api/driver-locations/)
  useEffect(() => {
    let isMounted = true;
    const loadDrivers = async () => {
      setIsLoadingDrivers(true);
      try {
        const data = await fetchDriverLocationsApi();
        if (isMounted && data && data.length > 0) {
          setDriversList(data);
        }
      } catch (err) {
        console.warn('[RapidoServicesMap] fetchDriverLocationsApi warning:', err);
      } finally {
        if (isMounted) setIsLoadingDrivers(false);
      }
    };
    loadDrivers();
    return () => { isMounted = false; };
  }, []);

  // Filter only drivers where is_online === true (matching Django backend field)
  const onlineDrivers = driversList.filter((d) => d.is_online !== false);

  // ─── PUNCTURE STATE ───
  const [selectedPunctureShop, setSelectedPunctureShop] = useState(punctureShops[0]);
  const [punctureFilter, setPunctureFilter] = useState(initialFilter || 'all'); // 'all' | '247' | 'mobile' | 'tubeless'
  const [sosState, setSosState] = useState('idle'); // 'idle' | 'dispatched' | 'arrived'
  const [sosMechanicPos, setSosMechanicPos] = useState({ x: 45, y: 46 });
  const [sosEta, setSosEta] = useState(180);


  // Map viewport controls with dynamic center origin for smooth camera zooming
  const [mapZoom, setMapZoom] = useState(1);
  const [mapCenterOrigin, setMapCenterOrigin] = useState({ x: 50, y: 50 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapContainerRef = useRef(null);

  // Sync mode and selections with props
  useEffect(() => {
    if (initialMode) setActiveTab(initialMode);
    if (initialAutoType) setSelectedAutoType(initialAutoType);
    if (initialFilter) setPunctureFilter(initialFilter);
  }, [initialMode, initialAutoType, initialFilter]);


  // Fare calculations based on distance
  const baseDistanceKm = 3.4;
  const calculateFare = () => {
    if (selectedAutoType === 'electric') return 30 + Math.round(baseDistanceKm * 12);
    if (selectedAutoType === 'cargo') return 50 + Math.round(baseDistanceKm * 18);
    return 35 + Math.round(baseDistanceKm * 15); // standard
  };

  // ─── AUTO RIDE BOOKING (LIVE BACKEND API INTEGRATION) ───
  const handleStartBooking = async () => {
    setRideState('searching');
    setIsBookingApi(true);
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setRideOtp(generatedOtp);

    // Initial smooth camera glide towards user's pickup spot
    setMapCenterOrigin(pickupLoc.pos);
    setMapZoom(1.25);

    // Filter available online driver matching backend vehicle_type
    const matchingDrivers = onlineDrivers.filter((d) => {
      const vType = String(d.vehicle_type || d.typeKey || '').toLowerCase();
      return vType.includes(selectedAutoType) || d.typeKey === selectedAutoType;
    });
    const chosenDriver = matchingDrivers.length > 0 ? matchingDrivers[0] : (onlineDrivers[0] || driversList[0]);

    const cleanPhone = (currentUser?.phone || '7810054614').replace(/[^0-9]/g, '').slice(-10);
    const fareVal = calculateFare();

    // Fire live backend booking request to /api/bookings/create/
    try {
      const res = await createBookingApi({
        phone: cleanPhone || '7810054614',
        service: 1,
        pickup_address: `${pickupLoc.name}, Erode`,
        destination_address: `${dropLoc.name}, Erode`,
        estimated_fare: `${fareVal}.00`,
        notes: `Auto Booking [${selectedAutoType.toUpperCase()}] • Driver: ${chosenDriver.driver_name || chosenDriver.name} (${chosenDriver.vehicleNo}) • Phone: ${chosenDriver.phone} • GPS: ${chosenDriver.latitude}, ${chosenDriver.longitude} • OTP: ${generatedOtp}`
      });

      if (res?.booking) {
        setLiveBooking(res.booking);
      }
    } catch (err) {
      console.warn('[RapidoServicesMap] Backend booking API notice:', err);
    } finally {
      setIsBookingApi(false);
    }

    setTimeout(() => {
      setAssignedDriver(chosenDriver);
      setDriverPos(chosenDriver.mapPos);
      setRideState('confirmed');
      setEtaSeconds(120);

      // Smoothly zoom in and center the map on the driver, route line & pickup location!
      const focusX = (chosenDriver.mapPos.x + pickupLoc.pos.x) / 2;
      const focusY = (chosenDriver.mapPos.y + pickupLoc.pos.y) / 2;
      setMapCenterOrigin({ x: focusX, y: focusY });
      setMapZoom(1.55);
    }, 1600);
  };

  // Animate Auto moving to pickup & update map camera
  useEffect(() => {
    if (rideState !== 'confirmed' || !assignedDriver) return;

    const waypoints = assignedDriver.routeWaypoints || [
      assignedDriver.mapPos,
      { x: (assignedDriver.mapPos.x + pickupLoc.pos.x) / 2, y: (assignedDriver.mapPos.y + pickupLoc.pos.y) / 2 },
      pickupLoc.pos
    ];

    let step = 0;
    const totalSteps = waypoints.length;
    
    const interval = setInterval(() => {
      step += 1;
      if (step < totalSteps) {
        const nextPos = waypoints[step];
        setDriverPos(nextPos);
        setEtaSeconds((prev) => Math.max(prev - 35, 15));
        // Keep camera focused on driver heading to pickup
        const curFocusX = (nextPos.x + pickupLoc.pos.x) / 2;
        const curFocusY = (nextPos.y + pickupLoc.pos.y) / 2;
        setMapCenterOrigin({ x: curFocusX, y: curFocusY });
      } else {
        setDriverPos(pickupLoc.pos);
        setRideState('arrived');
        // Zoom in closer directly on the pickup location when driver arrives!
        setMapCenterOrigin({ x: pickupLoc.pos.x, y: pickupLoc.pos.y });
        setMapZoom(1.75);
        clearInterval(interval);
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [rideState, assignedDriver, pickupLoc]);

  // ─── PUNCTURE SOS DISPATCH SIMULATION ───
  const handleRequestDoorstepSos = (shop) => {
    setSelectedPunctureShop(shop);
    setSosState('dispatched');
    setSosMechanicPos(shop.mapPos);
    setSosEta(180);

    // Animate mechanic bike towards user breakdown spot (pickupLoc.pos)
    const startX = shop.mapPos.x;
    const startY = shop.mapPos.y;
    const endX = pickupLoc.pos.x;
    const endY = pickupLoc.pos.y;

    let progress = 0;
    const sosInterval = setInterval(() => {
      progress += 0.25;
      if (progress <= 1) {
        setSosMechanicPos({
          x: startX + (endX - startX) * progress,
          y: startY + (endY - startY) * progress
        });
        setSosEta((prev) => Math.max(prev - 45, 10));
      } else {
        setSosMechanicPos({ x: endX, y: endY });
        setSosState('arrived');
        clearInterval(sosInterval);
      }
    }, 2400);
  };

  const handleCancelRide = () => {
    setRideState('idle');
    setAssignedDriver(null);
    setLiveBooking(null);
    // Smoothly zoom back out and reset map center
    setMapCenterOrigin({ x: 50, y: 50 });
    setMapZoom(1);
  };

  const filteredPunctureShops = punctureShops.filter((shop) => {
    if (punctureFilter === '247') return shop.status.includes('24/7');
    if (punctureFilter === 'mobile') return shop.mobileMechanic;
    if (punctureFilter === 'tubeless') return shop.services.some(s => s.toLowerCase().includes('tubeless'));
    return true;
  });

  return (
    <div 
      ref={mapContainerRef}
      className="rapido-root-wrapper"
      style={{
        borderRadius: onClose ? 0 : '24px',
        border: onClose ? 'none' : '1.5px solid #e2e8f0',
        boxShadow: onClose ? 'none' : '0 8px 32px rgba(15, 23, 42, 0.07)',
        marginBottom: onClose ? 0 : '3rem',
        position: 'relative'
      }}
    >

      {/* ─── TOP BAR / RAPIDO MODE SELECTOR ─── */}
      <div 
        className="rapido-map-topbar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1.25rem',
          borderBottom: '1px solid #f1f5f9',
          backgroundColor: '#ffffff',
          flexWrap: 'wrap',
          gap: '0.75rem',
          flexShrink: 0
        }}
      >
        {/* Left: Back Button & Mode Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#f1f5f9',
                color: '#0f172a',
                padding: '0.55rem 0.95rem',
                borderRadius: '9999px',
                border: '1px solid #cbd5e1',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.85rem',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e2e8f0'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              <span>{lang === 'ta' ? 'சேவைகளுக்கு திரும்புக' : 'Back to Services'}</span>
            </button>
          )}

          {/* Dedicated Service Badge - Display only the active service's title */}
          {activeTab === 'auto' && (
            <div 
              className="rapido-service-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                backgroundColor: '#ecfdf5',
                border: '1.5px solid #a7f3d0',
                padding: '0.5rem 1.15rem',
                borderRadius: '9999px',
                boxShadow: '0 2px 8px rgba(4, 120, 75, 0.12)'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>🛺</span>
              <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#065f46' }}>
                {lang === 'ta' ? 'ஆட்டோ முன்பதிவு & நேரலை' : 'Rapido Auto • Live Booking'}
              </span>
              <span style={{
                backgroundColor: '#04784b',
                color: '#ffffff',
                padding: '0.18rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.74rem',
                fontWeight: 800
              }}>
                {onlineDrivers.length} Online
              </span>
            </div>
          )}

          {activeTab === 'puncture' && (
            <div 
              className="rapido-service-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                backgroundColor: '#fffbeb',
                border: '1.5px solid #fde68a',
                padding: '0.5rem 1.15rem',
                borderRadius: '9999px',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.12)'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>🔧</span>
              <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#92400e' }}>
                {lang === 'ta' ? 'பஞ்சர் கடைகள் (அருகில்)' : 'Nearby Tyre & Puncture Works'}
              </span>
              <span style={{
                backgroundColor: '#d97706',
                color: '#ffffff',
                padding: '0.18rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.74rem',
                fontWeight: 800
              }}>
                {punctureShops.length} Spots
              </span>
            </div>
          )}

        </div>

        {/* Right: Live GPS Badge & Map Zoom controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>

          <div 
            className="rapido-gps-badge"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#065f46'
            }}
          >
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'inline-block',
              animation: 'pulse 1.5s infinite'
            }} />
            <span>GPS: Erode Active</span>
          </div>

          <button
            onClick={() => setMapZoom(prev => Math.min(prev + 0.2, 1.8))}
            className="rapido-zoom-btn"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              fontWeight: 800
            }}
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={() => setMapZoom(prev => Math.max(prev - 0.2, 1.0))}
            className="rapido-zoom-btn"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              fontWeight: 800
            }}
            title="Zoom Out"
          >
            -
          </button>

          {onClose && (
            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginLeft: '0.25rem'
              }}
              title="Close Map"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>


      {/* ─── SPLIT VIEW: SIDEBAR + MAP VIEWPORT ─── */}
      <div className="rapido-layout-container">

        {/* ─── LEFT PANEL: BOOKING / SHOP CONTROLS SIDEBAR (ALWAYS SCROLLABLE) ─── */}
        <div className="rapido-sidebar-panel">
          {activeTab === 'auto' ? (
            <div className="rapido-sidebar-inner">
              {/* Header: Status */}
              <div style={{
                backgroundColor: rideState === 'confirmed' || rideState === 'arrived' ? '#04784b' : '#f8fafc',
                color: rideState === 'confirmed' || rideState === 'arrived' ? '#ffffff' : '#0f172a',
                padding: '0.8rem 1.1rem',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>🛺</span>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                    {rideState === 'idle' && (lang === 'ta' ? 'ஆட்டோ முன்பதிவு' : 'Book Rapido Auto')}
                    {rideState === 'searching' && (lang === 'ta' ? 'ஓட்டுநரை தேடுகிறது...' : 'Finding Nearby Drivers...')}
                    {rideState === 'confirmed' && (lang === 'ta' ? 'ஓட்டுநர் வருகிறார்' : 'Driver Confirmed & Arriving')}
                    {rideState === 'arrived' && (lang === 'ta' ? 'ஓட்டுநர் வந்துவிட்டார்!' : 'Driver Arrived at Pickup!')}
                  </span>
                </div>
                {rideState !== 'idle' && (
                  <button
                    onClick={handleCancelRide}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: rideState === 'confirmed' || rideState === 'arrived' ? '#ffffff' : '#64748b',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>

              {/* Sidebar Body (No inner scroll on mobile) */}
              <div className="rapido-sidebar-scroll-body">
                {/* STATE 1: IDLE / BOOKING FORM */}
                {rideState === 'idle' && (
                  <div>
                    {/* Modern Compact Route Selector */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '12px',
                      border: '1.5px solid #e2e8f0',
                      padding: '0.45rem 0.75rem',
                      marginBottom: '0.55rem'
                    }}>
                      {/* Pickup Row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{
                          width: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <span style={{
                            width: '9px',
                            height: '9px',
                            borderRadius: '50%',
                            backgroundColor: '#10b981',
                            boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)'
                          }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1 }}>
                            {lang === 'ta' ? 'தொடக்க இடம்' : 'Pickup Location'}
                          </div>
                          <select
                            value={pickupLoc.id}
                            onChange={(e) => {
                              const found = popularRideLocations.find(l => l.id === e.target.value);
                              if (found) setPickupLoc(found);
                            }}
                            style={{
                              width: '100%',
                              padding: '0.15rem 0',
                              border: 'none',
                              backgroundColor: 'transparent',
                              fontSize: '0.84rem',
                              fontWeight: 700,
                              color: '#0f172a',
                              outline: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            {popularRideLocations.map((loc) => (
                              <option key={loc.id} value={loc.id}>{loc.name} ({loc.zone})</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Subtle connecting dotted divider */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        margin: '0.1rem 0'
                      }}>
                        <div style={{
                          width: '18px',
                          display: 'flex',
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            width: '2px',
                            height: '10px',
                            borderLeft: '2px dotted #cbd5e1'
                          }} />
                        </div>
                        <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
                      </div>

                      {/* Drop Destination Row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{
                          width: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <span style={{
                            width: '9px',
                            height: '9px',
                            borderRadius: '2px',
                            backgroundColor: '#ef4444',
                            boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.2)'
                          }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1 }}>
                            {lang === 'ta' ? 'இலக்கு இடம்' : 'Drop Destination'}
                          </div>
                          <select
                            value={dropLoc.id}
                            onChange={(e) => {
                              const found = popularRideLocations.find(l => l.id === e.target.value);
                              if (found) setDropLoc(found);
                            }}
                            style={{
                              width: '100%',
                              padding: '0.15rem 0',
                              border: 'none',
                              backgroundColor: 'transparent',
                              fontSize: '0.84rem',
                              fontWeight: 700,
                              color: '#0f172a',
                              outline: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            {popularRideLocations.map((loc) => (
                              <option key={loc.id} value={loc.id}>{loc.name} ({loc.zone})</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Auto Type Chooser */}
                    <div style={{ marginBottom: '0.55rem' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748b', marginBottom: '0.25rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        {lang === 'ta' ? 'வாகனத்தை தேர்ந்தெடுக்கவும்' : 'Choose Vehicle Type'}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.45rem' }}>
                        {/* Standard */}
                        <button
                          type="button"
                          onClick={() => setSelectedAutoType('standard')}
                          style={{
                            padding: '0.35rem 0.2rem 0.35rem',
                            borderRadius: '10px',
                            border: selectedAutoType === 'standard' ? '2.5px solid #04784b' : '1.5px solid #e2e8f0',
                            backgroundColor: selectedAutoType === 'standard' ? '#f0fdf4' : '#ffffff',
                            cursor: 'pointer',
                            textAlign: 'center',
                            boxShadow: selectedAutoType === 'standard' ? '0 3px 10px rgba(4, 120, 75, 0.12)' : '0 1px 3px rgba(0,0,0,0.02)',
                            transition: 'all 0.15s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div style={{
                            width: '100%',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.15rem',
                            borderRadius: '6px',
                            backgroundColor: selectedAutoType === 'standard' ? '#ffffff' : '#f8fafc',
                            padding: '2px',
                            border: '1px solid ' + (selectedAutoType === 'standard' ? '#bbf7d0' : '#f1f5f9')
                          }}>
                            <img
                              src={vehicleAutoStandardImg}
                              alt="Standard Auto Rickshaw"
                              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                            />
                          </div>
                          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0f172a' }}>Standard</div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#04784b' }}>
                            ₹{35 + Math.round(baseDistanceKm * 15)}
                          </div>
                        </button>

                        {/* Electric EV */}
                        <button
                          type="button"
                          onClick={() => setSelectedAutoType('electric')}
                          style={{
                            padding: '0.35rem 0.2rem 0.35rem',
                            borderRadius: '10px',
                            border: selectedAutoType === 'electric' ? '2.5px solid #04784b' : '1.5px solid #e2e8f0',
                            backgroundColor: selectedAutoType === 'electric' ? '#f0fdf4' : '#ffffff',
                            cursor: 'pointer',
                            textAlign: 'center',
                            boxShadow: selectedAutoType === 'electric' ? '0 3px 10px rgba(4, 120, 75, 0.12)' : '0 1px 3px rgba(0,0,0,0.02)',
                            transition: 'all 0.15s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div style={{
                            width: '100%',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.15rem',
                            borderRadius: '6px',
                            backgroundColor: selectedAutoType === 'electric' ? '#ffffff' : '#f8fafc',
                            padding: '2px',
                            border: '1px solid ' + (selectedAutoType === 'electric' ? '#bbf7d0' : '#f1f5f9')
                          }}>
                            <img
                              src={vehicleAutoElectricImg}
                              alt="Electric Auto Rickshaw EV"
                              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                            />
                          </div>
                          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0f172a' }}>Eco EV</div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#04784b' }}>
                            ₹{30 + Math.round(baseDistanceKm * 12)}
                          </div>
                        </button>

                        {/* Cargo */}
                        <button
                          type="button"
                          onClick={() => setSelectedAutoType('cargo')}
                          style={{
                            padding: '0.35rem 0.2rem 0.35rem',
                            borderRadius: '10px',
                            border: selectedAutoType === 'cargo' ? '2.5px solid #04784b' : '1.5px solid #e2e8f0',
                            backgroundColor: selectedAutoType === 'cargo' ? '#f0fdf4' : '#ffffff',
                            cursor: 'pointer',
                            textAlign: 'center',
                            boxShadow: selectedAutoType === 'cargo' ? '0 3px 10px rgba(4, 120, 75, 0.12)' : '0 1px 3px rgba(0,0,0,0.02)',
                            transition: 'all 0.15s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div style={{
                            width: '100%',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '0.15rem',
                            borderRadius: '6px',
                            backgroundColor: selectedAutoType === 'cargo' ? '#ffffff' : '#f8fafc',
                            padding: '2px',
                            border: '1px solid ' + (selectedAutoType === 'cargo' ? '#bbf7d0' : '#f1f5f9')
                          }}>
                            <img
                              src={vehicleAutoCargoImg}
                              alt="Cargo Goods Auto"
                              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                            />
                          </div>
                          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0f172a' }}>Cargo</div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#04784b' }}>
                            ₹{50 + Math.round(baseDistanceKm * 18)}
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Live Backend Driver Location Preview Card */}
                    {(() => {
                      const matched = onlineDrivers.find((d) => {
                        const vType = String(d.vehicle_type || d.typeKey || '').toLowerCase();
                        return vType.includes(selectedAutoType) || d.typeKey === selectedAutoType;
                      }) || onlineDrivers[0];
                      if (!matched) return null;
                      return (
                        <div style={{
                          backgroundColor: '#f0fdf4',
                          border: '1.5px solid #bbf7d0',
                          borderRadius: '10px',
                          padding: '0.45rem 0.7rem',
                          marginBottom: '0.65rem',
                          boxShadow: '0 2px 6px rgba(4, 120, 75, 0.05)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <span style={{ fontSize: '0.95rem' }}>🛺</span>
                              <strong style={{ fontSize: '0.84rem', color: '#065f46' }}>
                                {matched.driver_name || matched.name}
                              </strong>
                            </div>
                            <span style={{
                              backgroundColor: '#04784b',
                              color: '#ffffff',
                              fontSize: '0.65rem',
                              fontWeight: 800,
                              padding: '0.12rem 0.45rem',
                              borderRadius: '4px'
                            }}>
                              {matched.is_online ? 'LIVE ONLINE' : 'OFFLINE'}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#334155', marginBottom: '0.2rem' }}>
                            <span style={{ color: '#04784b', fontWeight: 600 }}>
                              📍 Lat {Number(matched.latitude).toFixed(4)}, Lng {Number(matched.longitude).toFixed(4)}
                            </span>
                            <span style={{ color: '#d97706', fontWeight: 700 }}>
                              ⏱️ {matched.eta_text || matched.eta}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b' }}>
                            <span>📞 {matched.phone || '+91 94438 12345'}</span>
                            <span style={{ color: '#059669', fontWeight: 700 }}>⚡ Verified</span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Book Button */}
                    <button
                      onClick={handleStartBooking}
                      style={{
                        width: '100%',
                        backgroundColor: '#04784b',
                        color: '#ffffff',
                        padding: '0.72rem 1rem',
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '0.92rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 14px rgba(4, 120, 75, 0.28)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>{lang === 'ta' ? `ஆட்டோ முன்பதிவு செய் • ₹${calculateFare()}` : `Book Auto Ride • ₹${calculateFare()}`}</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}

                {/* STATE 2: SEARCHING */}
                {rideState === 'searching' && (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: '#ecfdf5',
                      color: '#04784b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.75rem',
                      margin: '0 auto 1rem',
                      animation: 'pulse 1s infinite'
                    }}>
                      🛺
                    </div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                      Connecting with nearby drivers...
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.84rem' }}>
                      Matching your ride with the nearest verified Erode auto.
                    </p>
                  </div>
                )}

                {/* STATE 3: CONFIRMED & LIVE TRACKING */}
                {(rideState === 'confirmed' || rideState === 'arrived') && assignedDriver && (
                  <div>
                    {/* Live Backend Booking Synced Badge */}
                    {liveBooking && (
                      <div style={{
                        backgroundColor: '#ecfdf5',
                        border: '1.5px solid #a7f3d0',
                        borderRadius: '10px',
                        padding: '0.5rem 0.75rem',
                        marginBottom: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 2px 6px rgba(4, 120, 75, 0.08)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#10b981',
                            display: 'inline-block',
                            boxShadow: '0 0 6px rgba(16, 185, 129, 0.8)'
                          }} />
                          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#065f46' }}>
                            Django Booking Created:
                          </span>
                        </div>
                        <span style={{
                          backgroundColor: '#04784b',
                          color: '#ffffff',
                          fontWeight: 900,
                          fontSize: '0.8rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px',
                          letterSpacing: '0.04em'
                        }}>
                          {liveBooking.booking_id || `ID #${liveBooking.id}`}
                        </span>
                      </div>
                    )}

                    {/* Driver Header Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          backgroundColor: '#dcfce7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.4rem'
                        }}>
                          👨‍✈️
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.98rem' }}>
                            {assignedDriver.driver_name || assignedDriver.name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                            <span>⭐ {assignedDriver.rating}</span>
                            <span>•</span>
                            <span>{assignedDriver.experience}</span>
                            {assignedDriver.latitude && assignedDriver.longitude && (
                              <>
                                <span>•</span>
                                <span style={{ color: '#04784b', fontWeight: 600 }}>
                                  📍 {Number(assignedDriver.latitude).toFixed(4)}, {Number(assignedDriver.longitude).toFixed(4)}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* OTP Badge */}
                      <div style={{
                        backgroundColor: '#fef3c7',
                        border: '1.5px solid #fde68a',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '10px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#92400e' }}>RIDE OTP</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#b45309', letterSpacing: '0.1em' }}>
                          {rideOtp}
                        </div>
                      </div>
                    </div>

                    {/* Vehicle & Arrival Status */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      padding: '0.75rem 0.95rem',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem', paddingBottom: '0.65rem', borderBottom: '1px solid #e2e8f0' }}>
                        <div style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '10px',
                          backgroundColor: '#ffffff',
                          border: '1.5px solid #d1fae5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '3px',
                          flexShrink: 0
                        }}>
                          <img
                            src={
                              assignedDriver.typeKey === 'electric'
                                ? vehicleAutoElectricImg
                                : assignedDriver.typeKey === 'cargo'
                                ? vehicleAutoCargoImg
                                : vehicleAutoStandardImg
                            }
                            alt={assignedDriver.type}
                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                            {assignedDriver.vehicleNo}
                          </div>
                          <div style={{ fontSize: '0.76rem', color: '#04784b', fontWeight: 700 }}>
                            {assignedDriver.type}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                            {assignedDriver.stand}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Status:</span>
                        <span style={{
                          fontSize: '0.84rem',
                          fontWeight: 800,
                          color: rideState === 'arrived' ? '#15803d' : '#0284c7'
                        }}>
                          {rideState === 'arrived' ? 'Arrived at Pickup!' : `Arriving in ~${Math.round(etaSeconds / 60)} mins`}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Fare:</span>
                        <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#04784b' }}>₹{calculateFare()}</span>
                      </div>
                    </div>

                    {/* Call & WhatsApp buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                      <a
                        href={`tel:${assignedDriver.phone}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          backgroundColor: '#04784b',
                          color: '#ffffff',
                          padding: '0.75rem',
                          borderRadius: '10px',
                          textDecoration: 'none',
                          fontSize: '0.88rem',
                          fontWeight: 700
                        }}
                      >
                        <Phone size={16} />
                        <span>Call Driver</span>
                      </a>

                      <a
                        href={`https://wa.me/${assignedDriver.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          backgroundColor: '#25d366',
                          color: '#ffffff',
                          padding: '0.75rem',
                          borderRadius: '10px',
                          textDecoration: 'none',
                          fontSize: '0.88rem',
                          fontWeight: 700
                        }}
                      >
                        <MessageSquare size={16} />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                    <div style={{ marginTop: '0.85rem', textAlign: 'center' }}>
                      <button
                        onClick={handleCancelRide}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ef4444',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          padding: '0.35rem 0.65rem',
                          textDecoration: 'underline'
                        }}
                      >
                        Cancel Ride & Reset Map View
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* PUNCTURE MODE SIDEBAR */
            <div className="rapido-sidebar-inner">
              {/* Header with Quick Filters */}
              <div style={{
                backgroundColor: '#fffbeb',
                borderBottom: '1px solid #fde68a',
                padding: '0.8rem 1.1rem',
                flexShrink: 0
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>🔧</span>
                    <span style={{ fontWeight: 800, color: '#92400e', fontSize: '0.95rem' }}>
                      {sosState === 'idle' ? 'Nearby Tyre & Puncture Works' : 'Mobile Mechanic SOS Active'}
                    </span>
                  </div>
                  {sosState !== 'idle' && (
                    <button
                      onClick={() => setSosState('idle')}
                      style={{ background: 'none', border: 'none', color: '#b45309', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer' }}
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
                  {['all', '247', 'mobile', 'tubeless'].map((fKey) => (
                    <button
                      key={fKey}
                      onClick={() => setPunctureFilter(fKey)}
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        border: 'none',
                        backgroundColor: punctureFilter === fKey ? '#d97706' : '#ffffff',
                        color: punctureFilter === fKey ? '#ffffff' : '#78350f',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {fKey === 'all' && 'All Shops'}
                      {fKey === '247' && '24/7 Open'}
                      {fKey === 'mobile' && 'Doorstep Van 🛵'}
                      {fKey === 'tubeless' && 'Tubeless Repair'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Body: Selected Puncture Shop Details */}
              {selectedPunctureShop && (
                <div className="rapido-sidebar-scroll-body">
                  {sosState === 'idle' ? (
                    <div>
                      {/* Shop Name & Distance */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.15rem' }}>
                            {selectedPunctureShop.name}
                          </h4>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            Owner: {selectedPunctureShop.owner} • ⭐ {selectedPunctureShop.rating}
                          </div>
                        </div>
                        <div style={{
                          backgroundColor: '#fef3c7',
                          color: '#b45309',
                          padding: '0.25rem 0.55rem',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          whiteSpace: 'nowrap'
                        }}>
                          {selectedPunctureShop.distance}
                        </div>
                      </div>

                      {/* Address & Status */}
                      <div style={{
                        backgroundColor: '#f8fafc',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        marginBottom: '0.85rem',
                        fontSize: '0.78rem',
                        color: '#475569'
                      }}>
                        <div style={{ marginBottom: '0.25rem' }}>
                          📍 {selectedPunctureShop.address}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                          <span style={{ color: '#16a34a' }}>🟢 {selectedPunctureShop.status}</span>
                          <span style={{ color: '#0f172a' }}>Est: {selectedPunctureShop.priceEstimate}</span>
                        </div>
                      </div>

                      {/* Services Checklist */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748b', marginBottom: '0.35rem' }}>
                          SERVICES AVAILABLE:
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {selectedPunctureShop.services.map((srv, idx) => (
                            <span
                              key={idx}
                              style={{
                                backgroundColor: '#f1f5f9',
                                color: '#334155',
                                padding: '0.2rem 0.55rem',
                                borderRadius: '6px',
                                fontSize: '0.72rem',
                                fontWeight: 600
                              }}
                            >
                              ✓ {srv}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons: Request Doorstep & Call */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                        <button
                          onClick={() => handleRequestDoorstepSos(selectedPunctureShop)}
                          style={{
                            width: '100%',
                            backgroundColor: '#d97706',
                            color: '#ffffff',
                            padding: '0.8rem',
                            borderRadius: '10px',
                            border: 'none',
                            fontSize: '0.92rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
                          }}
                        >
                          <span>🛵 Request Mobile Mechanic to My Spot</span>
                        </button>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                          <a
                            href={`tel:${selectedPunctureShop.phone}`}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.35rem',
                              backgroundColor: '#ffffff',
                              color: '#04784b',
                              border: '1.5px solid #04784b',
                              padding: '0.65rem',
                              borderRadius: '10px',
                              textDecoration: 'none',
                              fontSize: '0.84rem',
                              fontWeight: 700
                            }}
                          >
                            <Phone size={15} />
                            <span>Call Shop</span>
                          </a>

                          <a
                            href={`https://wa.me/${selectedPunctureShop.whatsapp}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.35rem',
                              backgroundColor: '#25d366',
                              color: '#ffffff',
                              padding: '0.65rem',
                              borderRadius: '10px',
                              textDecoration: 'none',
                              fontSize: '0.84rem',
                              fontWeight: 700
                            }}
                          >
                            <MessageSquare size={15} />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>

                      {/* Other Nearby Shops Quick List */}
                      <div>
                        <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748b', marginBottom: '0.45rem' }}>
                          OTHER SHOPS NEARBY ({filteredPunctureShops.length}):
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                          {filteredPunctureShops.map((shp) => (
                            <div
                              key={shp.id}
                              onClick={() => setSelectedPunctureShop(shp)}
                              style={{
                                padding: '0.55rem 0.75rem',
                                borderRadius: '8px',
                                border: selectedPunctureShop.id === shp.id ? '1.5px solid #d97706' : '1px solid #e2e8f0',
                                backgroundColor: selectedPunctureShop.id === shp.id ? '#fffbeb' : '#ffffff',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}
                            >
                              <div>
                                <strong style={{ fontSize: '0.82rem', color: '#0f172a', display: 'block' }}>{shp.name}</strong>
                                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{shp.address.split(',')[0]}</span>
                              </div>
                              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#d97706' }}>{shp.distance}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* SOS DISPATCHED CARD */
                    <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                      <div style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        backgroundColor: '#fef3c7',
                        color: '#d97706',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.6rem',
                        margin: '0 auto 0.75rem',
                        animation: 'pulse 1.2s infinite'
                      }}>
                        🛵
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.2rem' }}>
                        {sosState === 'arrived' ? 'Mechanic Has Arrived at Your Spot!' : 'Mobile Mechanic Dispatched!'}
                      </h4>
                      <p style={{ color: '#64748b', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
                        {selectedPunctureShop.owner} is riding to your breakdown location.
                      </p>

                      <div style={{
                        backgroundColor: '#f8fafc',
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        marginBottom: '0.85rem',
                        fontSize: '0.82rem',
                        textAlign: 'left'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <span style={{ color: '#64748b' }}>Estimated Arrival:</span>
                          <span style={{ fontWeight: 800, color: '#d97706' }}>
                            {sosState === 'arrived' ? 'Arrived Now!' : `${Math.round(sosEta / 60)} mins (${sosEta}s)`}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#64748b' }}>Repair Kit:</span>
                          <span style={{ fontWeight: 700, color: '#0f172a' }}>Tubeless Plug + High-Pressure Air</span>
                        </div>
                      </div>

                      <a
                        href={`tel:${selectedPunctureShop.phone}`}
                        style={{
                          width: '100%',
                          backgroundColor: '#04784b',
                          color: '#ffffff',
                          padding: '0.75rem',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          textDecoration: 'none',
                          fontWeight: 700,
                          fontSize: '0.88rem'
                        }}
                      >
                        <Phone size={16} />
                        <span>Call Mechanic ({selectedPunctureShop.phone})</span>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ─── RIGHT PANEL: CLEAN, UNOBSTRUCTED LIVE MAP VIEWPORT ─── */}
        <div className="rapido-map-viewport">
          {/* Floating Map Zoom & Recenter Controls */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
            zIndex: 45
          }}>
            {/* Zoom In */}
            <button
              type="button"
              onClick={() => setMapZoom(prev => Math.min(Number((prev + 0.25).toFixed(2)), 2.5))}
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontWeight: 900,
                fontSize: '1.2rem',
                color: '#0f172a',
                transition: 'all 0.15s ease'
              }}
              title="Zoom In"
            >
              +
            </button>

            {/* Zoom Out */}
            <button
              type="button"
              onClick={() => setMapZoom(prev => Math.max(Number((prev - 0.25).toFixed(2)), 0.85))}
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontWeight: 900,
                fontSize: '1.2rem',
                color: '#0f172a',
                transition: 'all 0.15s ease'
              }}
              title="Zoom Out"
            >
              −
            </button>

            {/* Recenter & Fit Route */}
            <button
              type="button"
              onClick={() => {
                if (rideState === 'confirmed' || rideState === 'arrived') {
                  const focusX = (driverPos.x + pickupLoc.pos.x) / 2;
                  const focusY = (driverPos.y + pickupLoc.pos.y) / 2;
                  setMapCenterOrigin({ x: focusX, y: focusY });
                  setMapZoom(1.55);
                } else {
                  setMapCenterOrigin({ x: 50, y: 50 });
                  setMapZoom(1);
                }
              }}
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#04784b',
                transition: 'all 0.15s ease'
              }}
              title="Recenter on Route"
            >
              <Navigation size={16} />
            </button>
          </div>

          {/* High-Res Map Background with Dynamic Pan & Zoom */}
          <div style={{
            position: 'absolute',
            inset: 0,
            transform: `scale(${mapZoom})`,
            transformOrigin: `${mapCenterOrigin.x}% ${mapCenterOrigin.y}%`,
            transition: 'transform 0.85s cubic-bezier(0.2, 0.8, 0.2, 1), transform-origin 0.85s cubic-bezier(0.2, 0.8, 0.2, 1)',
            cursor: 'grab'
          }}>
            <img
              src={contactMapImg}
              alt="Erode Live Map"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                userSelect: 'none'
              }}
            />

            {/* SVG ROUTE LINE (When Auto is booked and en-route) */}
            {activeTab === 'auto' && rideState === 'confirmed' && assignedDriver && (
              <svg style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 15
              }}>
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#04784b" />
                  </linearGradient>
                </defs>
                {/* Animated dotted route path */}
                <line
                  x1={`${driverPos.x}%`}
                  y1={`${driverPos.y}%`}
                  x2={`${pickupLoc.pos.x}%`}
                  y2={`${pickupLoc.pos.y}%`}
                  stroke="url(#routeGradient)"
                  strokeWidth="5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  style={{ animation: 'dash 1.2s linear infinite' }}
                />
                <line
                  x1={`${pickupLoc.pos.x}%`}
                  y1={`${pickupLoc.pos.y}%`}
                  x2={`${dropLoc.pos.x}%`}
                  y2={`${dropLoc.pos.y}%`}
                  stroke="#94a3b8"
                  strokeWidth="4"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {/* SVG ROUTE LINE (When Mobile Puncture Mechanic is Dispatched) */}
            {activeTab === 'puncture' && sosState === 'dispatched' && (
              <svg style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 15
              }}>
                <line
                  x1={`${sosMechanicPos.x}%`}
                  y1={`${sosMechanicPos.y}%`}
                  x2={`${pickupLoc.pos.x}%`}
                  y2={`${pickupLoc.pos.y}%`}
                  stroke="#d97706"
                  strokeWidth="5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  style={{ animation: 'dash 1.2s linear infinite' }}
                />
              </svg>
            )}

            {/* ─── MARKER: USER PICKUP LOCATION ─── */}
            <div
              style={{
                position: 'absolute',
                left: `${pickupLoc.pos.x}%`,
                top: `${pickupLoc.pos.y}%`,
                transform: 'translate(-50%, -100%)',
                zIndex: 25,
                pointerEvents: 'none'
              }}
            >
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: activeTab === 'auto' ? 'rgba(4, 120, 75, 0.2)' : 'rgba(217, 119, 6, 0.2)',
                animation: 'pulse 1.8s infinite'
              }} />
              <div style={{
                backgroundColor: activeTab === 'auto' ? '#04784b' : '#dc2626',
                color: '#ffffff',
                padding: '0.4rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                whiteSpace: 'nowrap'
              }}>
                <span>📍</span>
                <span>{activeTab === 'auto' ? 'Pickup Here' : 'Breakdown Spot'}</span>
              </div>
            </div>

            {/* ─── MARKER: USER DROP DESTINATION (Auto Mode) ─── */}
            {activeTab === 'auto' && (
              <div
                style={{
                  position: 'absolute',
                  left: `${dropLoc.pos.x}%`,
                  top: `${dropLoc.pos.y}%`,
                  transform: 'translate(-50%, -100%)',
                  zIndex: 20,
                  pointerEvents: 'none'
                }}
              >
                <div style={{
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
                  whiteSpace: 'nowrap'
                }}>
                  <span>🏁</span>
                  <span>Drop: {dropLoc.name}</span>
                </div>
              </div>
            )}

            {/* ─── AUTO MODE: NEARBY AUTO RICKSHAWS PLOTTED ON MAP ─── */}
            {activeTab === 'auto' && (
              <>
                {onlineDrivers.map((driver) => {
                  const isAssigned = assignedDriver && assignedDriver.id === driver.id;
                  const pos = isAssigned ? driverPos : (driver.mapPos || latLngToMapPos(driver.latitude, driver.longitude));

                  return (
                    <div
                      key={driver.id}
                      onClick={() => {
                        setAssignedDriver(driver);
                        setPreviewDriver(driver);
                      }}
                      style={{
                        position: 'absolute',
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: isAssigned ? 30 : 20,
                        cursor: 'pointer',
                        transition: 'left 2.5s linear, top 2.5s linear'
                      }}
                    >
                      <div style={{
                        backgroundColor: '#ffffff',
                        border: isAssigned ? '3px solid #15803d' : '2px solid #04784b',
                        borderRadius: '50%',
                        width: isAssigned ? '52px' : '42px',
                        height: isAssigned ? '52px' : '42px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isAssigned ? '0 6px 18px rgba(21, 128, 61, 0.45)' : '0 4px 14px rgba(0,0,0,0.22)',
                        position: 'relative',
                        padding: '3px',
                        overflow: 'hidden'
                      }}>
                        <img
                          src={
                            driver.typeKey === 'electric' || (driver.vehicle_type && String(driver.vehicle_type).toLowerCase().includes('elec'))
                              ? vehicleAutoElectricImg
                              : driver.typeKey === 'cargo' || (driver.vehicle_type && String(driver.vehicle_type).toLowerCase().includes('carg'))
                              ? vehicleAutoCargoImg
                              : vehicleAutoStandardImg
                          }
                          alt={driver.driver_name || driver.name}
                          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                        />
                        {isAssigned && (
                          <span style={{
                            position: 'absolute',
                            top: '2px',
                            right: '2px',
                            width: '11px',
                            height: '11px',
                            borderRadius: '50%',
                            backgroundColor: '#22c55e',
                            border: '2px solid #ffffff'
                          }} />
                        )}
                      </div>

                      <div 
                        className="rapido-driver-badge"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          marginTop: '4px',
                          backgroundColor: isAssigned ? '#0f172a' : 'rgba(255, 255, 255, 0.95)',
                          color: isAssigned ? '#ffffff' : '#0f172a',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          whiteSpace: 'nowrap',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          pointerEvents: 'none'
                        }}
                      >
                        {isAssigned ? (
                          `Driver: ${(driver.driver_name || driver.name).split(' ')[0]}`
                        ) : (
                          <>
                            <span className="driver-label-desktop">{(driver.driver_name || driver.name).split(' ')[0]} • </span>
                            <span>{driver.eta_text || driver.eta}</span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {/* ─── INTERACTIVE POPUP: CLICKED DRIVER LOCATION DETAILS ─── */}
            {activeTab === 'auto' && previewDriver && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#ffffff',
                  borderRadius: '1rem',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)',
                  border: '2px solid #04784b',
                  padding: '1rem 1.25rem',
                  zIndex: 50,
                  width: '92%',
                  maxWidth: '380px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>🛺</span>
                    <div>
                      <strong style={{ fontSize: '0.98rem', color: '#0f172a' }}>
                        {previewDriver.driver_name || previewDriver.name}
                      </strong>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        {previewDriver.vehicle || previewDriver.type} ({previewDriver.vehicleNo})
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{
                      backgroundColor: previewDriver.is_online ? '#dcfce7' : '#f1f5f9',
                      color: previewDriver.is_online ? '#15803d' : '#64748b',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '9999px'
                    }}>
                      {previewDriver.is_online ? '● Online' : '○ Offline'}
                    </span>
                    <button
                      onClick={() => setPreviewDriver(null)}
                      style={{
                        background: '#f1f5f9',
                        border: 'none',
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#64748b',
                        fontWeight: 'bold'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* All Django Model Fields Table / Box */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.45rem',
                  fontSize: '0.76rem',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <span style={{ color: '#64748b' }}>📍 GPS Location: </span>
                    <strong style={{ color: '#04784b' }}>
                      Latitude: {Number(previewDriver.latitude).toFixed(4)}, Longitude: {Number(previewDriver.longitude).toFixed(4)}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Vehicle Type: </span>
                    <strong>{previewDriver.vehicle_type || previewDriver.typeKey}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>ETA Text: </span>
                    <strong style={{ color: '#d97706' }}>{previewDriver.eta_text || previewDriver.eta}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Phone: </span>
                    <strong>{previewDriver.phone}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Rating: </span>
                    <strong>★ {previewDriver.rating} ({previewDriver.experience})</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a
                    href={`tel:${previewDriver.phone}`}
                    style={{
                      flex: 1,
                      backgroundColor: '#f1f5f9',
                      color: '#0f172a',
                      padding: '0.55rem',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Phone size={14} /> Call Driver
                  </a>
                  <button
                    onClick={() => {
                      setSelectedAutoType(previewDriver.typeKey || 'standard');
                      setAssignedDriver(previewDriver);
                      setPreviewDriver(null);
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: '#04784b',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.55rem',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    Select This Driver
                  </button>
                </div>
              </div>
            )}

            {/* ─── PUNCTURE MODE: PUNCTURE SHOPS PLOTTED ON MAP ─── */}
            {activeTab === 'puncture' && (
              <>
                {filteredPunctureShops.map((shop) => {
                  const isSelected = selectedPunctureShop && selectedPunctureShop.id === shop.id;

                  return (
                    <div
                      key={shop.id}
                      onClick={() => setSelectedPunctureShop(shop)}
                      style={{
                        position: 'absolute',
                        left: `${shop.mapPos.x}%`,
                        top: `${shop.mapPos.y}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: isSelected ? 30 : 20,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        backgroundColor: isSelected ? '#d97706' : '#ffffff',
                        border: isSelected ? '3px solid #ffffff' : '2px solid #d97706',
                        borderRadius: '50%',
                        width: isSelected ? '46px' : '38px',
                        height: isSelected ? '46px' : '38px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isSelected ? '1.35rem' : '1.15rem',
                        boxShadow: '0 4px 14px rgba(217, 119, 6, 0.3)',
                        color: isSelected ? '#ffffff' : '#d97706'
                      }}>
                        🔧
                      </div>

                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: '4px',
                        backgroundColor: isSelected ? '#0f172a' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#0f172a',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        border: '1px solid #e2e8f0'
                      }}>
                        {shop.name.split(' ')[0]} • {shop.distance}
                      </div>
                    </div>
                  );
                })}

                {/* Mobile Mechanic En-Route Bike Marker */}
                {sosState === 'dispatched' && (
                  <div style={{
                    position: 'absolute',
                    left: `${sosMechanicPos.x}%`,
                    top: `${sosMechanicPos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 35,
                    transition: 'left 2.4s linear, top 2.4s linear'
                  }}>
                    <div style={{
                      backgroundColor: '#d97706',
                      border: '3px solid #ffffff',
                      borderRadius: '50%',
                      width: '46px',
                      height: '46px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                      boxShadow: '0 4px 16px rgba(217, 119, 6, 0.4)'
                    }}>
                      🛵
                    </div>
                    <div style={{
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      whiteSpace: 'nowrap',
                      marginTop: '4px'
                    }}>
                      Mechanic on the way ({sosEta}s)
                    </div>
                  </div>
                )}
              </>
            )}


          </div>
        </div>

      </div>
    </div>
  );
};

export default RapidoServicesMap;
