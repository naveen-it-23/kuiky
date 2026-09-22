import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { locationsList } from '../data/kuikyData';
import { User, Phone, ChevronDown, Mail, MapPin, Save, ArrowLeft, Check, LogOut, RefreshCw, Globe, AlertCircle, CheckCircle2 } from 'lucide-react';
import { fetchUserProfileApi, updateUserProfileApi, API_ENDPOINTS } from '../config/api';

export const ProfilePage = () => {
  const { currentUser, updateUserProfile, navigateTo, logout, lang, setCurrentLocation } = useLanguage();

  // Initialize fields with values from currentUser or exact defaults
  const [fullName, setFullName] = useState(() => {
    if (currentUser?.name && currentUser.name !== 'User 1354') return currentUser.name;
    return 'Sri Raj';
  });

  const [phone, setPhone] = useState(() => {
    if (currentUser?.phone && !currentUser.phone.includes('9080231354')) {
      return currentUser.phone.replace(/^\+91\s*/, '');
    }
    return '90802 31354';
  });

  const [email, setEmail] = useState(() => {
    if (currentUser?.email && !currentUser.email.includes('1354')) return currentUser.email;
    return 'sriraj@example.com';
  });

  const [location, setLocation] = useState(() => {
    if (currentUser?.city && !currentUser.city.includes('Perambalur')) return currentUser.city;
    return 'Erode, Tamil Nadu';
  });

  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Backend API Integration for api/profile/ [name='profile']
  const [backendProfile, setBackendProfile] = useState(null);
  const [backendProfileId, setBackendProfileId] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [apiSyncStatus, setApiSyncStatus] = useState(null); // 'connected' | 'offline' | 'error' | null
  const [apiMessage, setApiMessage] = useState(null);

  // Fetch profile from Django backend API: GET /api/profile/?phone=<phone>
  const loadProfilesFromApi = async () => {
    setIsLoadingProfile(true);
    setApiMessage(null);
    try {
      const cleanCurrentPhone = (phone || currentUser?.phone || '9080231354').replace(/[^0-9]/g, '').slice(-10);
      const profile = await fetchUserProfileApi(cleanCurrentPhone);
      setBackendProfile(profile);
      if (profile.id) setBackendProfileId(profile.id);
      setApiSyncStatus('connected');
      setApiMessage(`Fetched from ${API_ENDPOINTS.PROFILE}?phone=${cleanCurrentPhone}`);

      if (profile.name) setFullName(profile.name);
      if (profile.phone) setPhone(profile.phone);
      if (profile.email) setEmail(profile.email);
      if (profile.city) setLocation(profile.city);
    } catch (err) {
      console.warn('[ProfilePage] Failed to fetch /api/profile/:', err);
      if (err.message && (err.message.includes('8012') || err.message.includes('Failed to fetch') || err.status === 502 || err.status === 504)) {
        setApiSyncStatus('offline');
        setApiMessage('Backend server offline (run: python manage.py runserver 8000)');
      } else {
        setApiSyncStatus('error');
        setApiMessage(err.message || 'Error fetching from /api/profile/');
      }
    } finally {
      setIsLoadingProfile(false);
    }
  };

  useEffect(() => {
    loadProfilesFromApi();
  }, []);

  // Sync state if currentUser changes externally
  useEffect(() => {
    if (currentUser?.name && currentUser.name !== 'User 1354') {
      setFullName(currentUser.name);
    }
    if (currentUser?.phone && !currentUser.phone.includes('9080231354')) {
      setPhone(currentUser.phone.replace(/^\+91\s*/, ''));
    }
    if (currentUser?.email && !currentUser.email.includes('1354')) {
      setEmail(currentUser.email);
    }
    if (currentUser?.city && !currentUser.city.includes('Perambalur')) {
      setLocation(currentUser.city);
    }
  }, [currentUser]);

  const handleSaveChanges = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    const cleanPhone = phone.trim().replace(/[^0-9]/g, '').slice(-10);
    const updated = {
      name: fullName.trim() || 'Sri Raj',
      phone: cleanPhone,
      email: email.trim(),
      city: location.trim(),
      role: 'Verified User'
    };
    updateUserProfile(updated);

    try {
      const payload = {
        phone: cleanPhone,
        name: updated.name,
        email: updated.email,
        selected_location: updated.city
      };

      const result = await updateUserProfileApi(payload);
      if (result?.id) setBackendProfileId(result.id);
      setBackendProfile(result);
      setApiSyncStatus('connected');
      setApiMessage('Saved and synced with backend API (/api/profile/)');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (err) {
      console.warn('[ProfilePage] Backend save warning:', err);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
      if (err.message && (err.message.includes('8012') || err.message.includes('Failed to fetch') || err.status === 502 || err.status === 504)) {
        setApiSyncStatus('offline');
        setApiMessage('Saved locally. Backend offline (run: python manage.py runserver 8000)');
      } else {
        setApiMessage(err.message || 'Saved locally');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectLocation = (loc) => {
    const locName = loc.name.includes('Tamil Nadu') ? loc.name : `${loc.name}, Tamil Nadu`;
    setLocation(locName);
    setCurrentLocation(loc);
    setShowLocationPicker(false);
  };

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '85vh',
      padding: '2rem 1rem 3.5rem'
    }}>
      {/* Top Back Nav Bar */}
      <div style={{
        maxWidth: '560px',
        margin: '0 auto 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button
          onClick={() => navigateTo('home')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'none',
            border: 'none',
            color: '#059669',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            padding: '0.35rem 0.65rem',
            borderRadius: '8px',
            transition: 'background-color 0.15s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ecfdf5'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <ArrowLeft size={16} />
          <span>{lang === 'ta' ? 'முகப்புக்குத் திரும்பு' : 'Back to Home'}</span>
        </button>

        <button
          onClick={() => {
            if (window.confirm(lang === 'ta' ? 'வெளியேற விரும்புகிறீர்களா?' : 'Are you sure you want to sign out?')) {
              logout();
            }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            fontWeight: 600,
            fontSize: '0.82rem',
            cursor: 'pointer',
            padding: '0.35rem 0.65rem',
            borderRadius: '8px',
            transition: 'color 0.15s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = '#ef4444';
            e.currentTarget.style.backgroundColor = '#fef2f2';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = '#94a3b8';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <LogOut size={14} />
          <span>{lang === 'ta' ? 'வெளியேறு' : 'Sign Out'}</span>
        </button>
      </div>

      {/* Main Container matching the screenshot */}
      <div style={{
        maxWidth: '560px',
        margin: '0 auto'
      }}>
        {/* Page Title & Subtitle */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#0f172a',
            margin: '0 0 0.35rem 0',
            letterSpacing: '-0.025em',
            lineHeight: 1.2
          }}>
            My Profile
          </h1>
          <p style={{
            fontSize: '0.94rem',
            color: '#64748b',
            margin: 0,
            lineHeight: 1.45
          }}>
            Manage your personal information and account settings.
          </p>
        </div>

        {/* Backend DRF API Status Banner for api/profiles/ */}
        <div style={{
          marginBottom: '1.25rem',
          padding: '0.7rem 1rem',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontSize: '0.82rem',
          fontWeight: 600,
          backgroundColor: apiSyncStatus === 'connected' ? '#ecfdf5' : apiSyncStatus === 'offline' ? '#fffbeb' : '#f8fafc',
          border: `1.5px solid ${apiSyncStatus === 'connected' ? '#a7f3d0' : apiSyncStatus === 'offline' ? '#fde68a' : '#e2e8f0'}`,
          color: apiSyncStatus === 'connected' ? '#065f46' : apiSyncStatus === 'offline' ? '#92400e' : '#475569',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <span style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: apiSyncStatus === 'connected' ? '#10b981' : apiSyncStatus === 'offline' ? '#f59e0b' : '#94a3b8',
              display: 'inline-block',
              boxShadow: apiSyncStatus === 'connected' ? '0 0 6px rgba(16, 185, 129, 0.6)' : 'none'
            }} />
            <span>
              {isLoadingProfile 
                ? 'Fetching /api/profile/?phone=...' 
                : apiSyncStatus === 'connected' 
                ? `API Connected • /api/profile/ (Synced: ${backendProfile?.name || fullName})` 
                : apiSyncStatus === 'offline'
                ? 'Backend Offline • Run: python manage.py runserver 8000'
                : apiSyncStatus === 'error'
                ? `Backend Notice: ${apiMessage || 'User not registered in database yet'}`
                : 'API Endpoint: /api/profile/?phone=<number>'}
            </span>
          </div>

          <button
            type="button"
            onClick={loadProfilesFromApi}
            disabled={isLoadingProfile}
            style={{
              background: apiSyncStatus === 'connected' ? '#d1fae5' : '#fef3c7',
              border: 'none',
              color: apiSyncStatus === 'connected' ? '#04784b' : '#b45309',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: isLoadingProfile ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.65rem',
              borderRadius: '9999px',
              transition: 'all 0.15s ease'
            }}
          >
            <RefreshCw size={13} style={{ animation: isLoadingProfile ? 'spin 1s linear infinite' : 'none' }} />
            <span>{isLoadingProfile ? 'Fetching...' : 'Refetch API'}</span>
          </button>
        </div>

        {/* Top Welcome Banner: "Hello, Sri Raj 👋" with subtle foliage illustration */}
        <div style={{
          position: 'relative',
          backgroundColor: '#ecfdf5',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #e6f9ee 100%)',
          border: '1px solid #d1fae5',
          borderRadius: '16px',
          padding: '1.35rem 1.6rem',
          marginBottom: '1.4rem',
          overflow: 'hidden'
        }}>
          {/* Subtle bottom-right foliage watermark matching screenshot */}
          <div style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            opacity: 0.75
          }}>
            <svg width="105" height="52" viewBox="0 0 105 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="94" cy="46" rx="20" ry="18" fill="#86efac" fillOpacity="0.45" />
              <ellipse cx="76" cy="42" rx="16" ry="15" fill="#6ee7b7" fillOpacity="0.5" />
              <ellipse cx="58" cy="47" rx="14" ry="13" fill="#a7f3d0" fillOpacity="0.55" />
              <ellipse cx="44" cy="50" rx="10" ry="10" fill="#bbf7d0" fillOpacity="0.6" />
            </svg>
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              margin: '0 0 0.35rem 0',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.35rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.25
            }}>
              <span style={{ color: '#0f172a' }}>Hello,</span>
              <span style={{ color: '#059669' }}>{fullName || 'Sri Raj'}</span>
              <span>👋</span>
            </h2>
            <p style={{
              fontSize: '0.88rem',
              color: '#475569',
              margin: 0,
              lineHeight: 1.45
            }}>
              Keep your information updated for a better and faster service experience.
            </p>
          </div>
        </div>

        {/* White Card: "Personal Information" */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.02)',
          padding: '1.75rem 1.6rem'
        }}>
          {/* Section Header */}
          <div style={{ marginBottom: '1.35rem' }}>
            <h3 style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: '#0f172a',
              margin: '0 0 0.25rem 0',
              letterSpacing: '-0.01em'
            }}>
              Personal Information
            </h3>
            <p style={{
              fontSize: '0.86rem',
              color: '#64748b',
              margin: 0
            }}>
              Update your details to keep your account secure.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {/* Field 1: Full Name */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.86rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '0.45rem'
              }}>
                Full Name <span style={{ color: '#ef4444' }}>*</span>
              </label>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                height: '46px',
                border: `1.5px solid ${focusedField === 'name' ? '#059669' : '#e2e8f0'}`,
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                padding: '0 0.5rem',
                transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
                boxShadow: focusedField === 'name' ? '0 0 0 3px rgba(5, 150, 105, 0.1)' : 'none'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <User size={16} color="#64748b" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter full name"
                  required
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '0 0.75rem',
                    fontSize: '0.94rem',
                    fontWeight: 500,
                    color: '#0f172a',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </div>

            {/* Field 2: Mobile Number */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.86rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '0.45rem'
              }}>
                Mobile Number <span style={{ color: '#ef4444' }}>*</span>
              </label>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                {/* Left: Country Code Box */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  height: '46px',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  padding: '0 0.65rem 0 0.45rem',
                  flexShrink: 0,
                  userSelect: 'none'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Phone size={15} color="#64748b" />
                  </div>
                  <span style={{
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    color: '#0f172a'
                  }}>
                    +91
                  </span>
                  <ChevronDown size={14} color="#64748b" />
                </div>

                {/* Right: Phone Input Box */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  height: '46px',
                  border: `1.5px solid ${focusedField === 'phone' ? '#059669' : '#e2e8f0'}`,
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  padding: '0 0.85rem',
                  transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
                  boxShadow: focusedField === 'phone' ? '0 0 0 3px rgba(5, 150, 105, 0.1)' : 'none'
                }}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="98765 43210"
                    required
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      fontSize: '0.94rem',
                      fontWeight: 500,
                      color: '#0f172a',
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Field 3: Email Address */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.86rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '0.45rem'
              }}>
                Email Address
              </label>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                height: '46px',
                border: `1.5px solid ${focusedField === 'email' ? '#059669' : '#e2e8f0'}`,
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                padding: '0 0.5rem',
                transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
                boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(5, 150, 105, 0.1)' : 'none'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Mail size={16} color="#64748b" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="name@example.com"
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '0 0.75rem',
                    fontSize: '0.94rem',
                    fontWeight: 500,
                    color: '#0f172a',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </div>

            {/* Field 4: Location */}
            <div style={{ position: 'relative' }}>
              <label style={{
                display: 'block',
                fontSize: '0.86rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '0.45rem'
              }}>
                Location
              </label>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '46px',
                border: `1.5px solid ${focusedField === 'location' ? '#059669' : '#e2e8f0'}`,
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                padding: '0 0.65rem 0 0.5rem',
                transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
                boxShadow: focusedField === 'location' ? '0 0 0 3px rgba(5, 150, 105, 0.1)' : 'none'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  minWidth: 0
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={16} color="#64748b" />
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setFocusedField('location')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter location"
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      padding: '0 0.75rem',
                      fontSize: '0.94rem',
                      fontWeight: 500,
                      color: '#0f172a',
                      backgroundColor: 'transparent',
                      minWidth: 0
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowLocationPicker(!showLocationPicker)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#059669',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ecfdf5'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Change
                </button>
              </div>

              {/* Location Selector Dropdown */}
              {showLocationPicker && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  right: 0,
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #bbf7d0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  zIndex: 20,
                  padding: '0.5rem',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  <div style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    padding: '0.35rem 0.5rem 0.25rem'
                  }}>
                    Select Your City / Town
                  </div>
                  {locationsList.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => handleSelectLocation(loc)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '0.5rem 0.65rem',
                        background: 'none',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: location.includes(loc.name) ? '#04784b' : '#1e293b',
                        backgroundColor: location.includes(loc.name) ? '#ecfdf5' : 'transparent',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseOver={(e) => {
                        if (!location.includes(loc.name)) e.currentTarget.style.backgroundColor = '#f8fafc';
                      }}
                      onMouseOut={(e) => {
                        if (!location.includes(loc.name)) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span>{loc.name}, Tamil Nadu</span>
                      {location.includes(loc.name) && <Check size={16} color="#04784b" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Save Changes Button */}
            <button
              type="submit"
              disabled={isSaving}
              style={{
                marginTop: '0.85rem',
                width: '100%',
                height: '48px',
                backgroundColor: isSaving ? '#059669' : '#04784b',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.98rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.55rem',
                cursor: isSaving ? 'wait' : 'pointer',
                boxShadow: '0 2px 8px rgba(4, 120, 75, 0.22)',
                transition: 'all 0.18s ease',
                opacity: isSaving ? 0.85 : 1
              }}
              onMouseOver={(e) => {
                if (!isSaving) {
                  e.currentTarget.style.backgroundColor = '#03653f';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseOut={(e) => {
                if (!isSaving) {
                  e.currentTarget.style.backgroundColor = '#04784b';
                  e.currentTarget.style.transform = 'none';
                }
              }}
            >
              {isSaving ? (
                <>
                  <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Saving & Syncing to API...</span>
                </>
              ) : (
                <>
                  <Save size={18} strokeWidth={2.4} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Success Toast */}
        {savedSuccess && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#ecfdf5',
            border: '1.5px solid #a7f3d0',
            borderRadius: '12px',
            color: '#065f46',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            animation: 'fadeIn 0.2s ease',
            boxShadow: '0 2px 8px rgba(5, 150, 105, 0.1)'
          }}>
            <Check size={18} color="#059669" strokeWidth={2.6} />
            <span>Profile information updated successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
