import { 
  autoDrivers, 
  punctureShops, 
  popularRideLocations, 
  ambulancesByCity, 
  locationsList 
} from '../data/kuikyData';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://affecting-tingling-duke.ngrok-free.dev';

export const API_ENDPOINTS = {
  // Django mainkuiky.urls exact endpoints
  SEND_OTP: `${API_BASE_URL}/api/auth/send-otp/`,
  VERIFY_OTP: `${API_BASE_URL}/api/auth/verify-otp/`,
  PROFILE: `${API_BASE_URL}/api/profile/`,
  LOCATIONS: `${API_BASE_URL}/api/locations/`, // [name='locations-list']
  CATEGORIES: `${API_BASE_URL}/api/categories/`,
  SERVICES: `${API_BASE_URL}/api/services/`,
  BOOKINGS: `${API_BASE_URL}/api/bookings/`,
  BOOKING_CREATE: `${API_BASE_URL}/api/bookings/create/`,
  AMBULANCES: `${API_BASE_URL}/api/ambulances/`, // [name='ambulance-list']
  PUNCTURE_WORKS: `${API_BASE_URL}/api/puncture-works/`, // [name='puncture-list']
  DRIVER_LOCATIONS: `${API_BASE_URL}/api/driver-locations/`,
};

/**
 * Send 6-digit OTP to the specified 10-digit mobile number via /api/auth/send-otp/
 * @param {string} phone 
 * @returns {Promise<{success: boolean, message: string, phone?: string, dev_otp?: string}>}
 */
export async function sendOtpApi(phone) {
  const cleanPhone = phone.replace(/[^0-9]/g, '').slice(-10);
  const response = await fetch(API_ENDPOINTS.SEND_OTP, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify({ phone: cleanPhone }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    const err = new Error(data.message || `Server returned ${response.status} (${response.statusText || 'Error'})`);
    err.status = response.status;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Verify 6-digit OTP for the specified mobile number via /api/auth/verify-otp/
 * @param {string} phone 
 * @param {string} otp 
 * @returns {Promise<{success: boolean, message: string, user?: object, token?: string}>}
 */
export async function verifyOtpApi(phone, otp) {
  const cleanPhone = phone.replace(/[^0-9]/g, '').slice(-10);
  const cleanOtp = String(otp).trim();
  const response = await fetch(API_ENDPOINTS.VERIFY_OTP, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify({ phone: cleanPhone, otp: cleanOtp }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    const err = new Error(data.message || `Server returned ${response.status} (${response.statusText || 'Invalid OTP'})`);
    err.status = response.status;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Normalizes user profile data from Django UserProfile model
 * @param {object} raw
 * @returns {object}
 */
export function normalizeUserProfile(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    name: raw.name || raw.full_name || raw.username || 'Sri Raj',
    phone: raw.phone ? String(raw.phone).replace(/^\+91/, '').trim() : '',
    email: raw.email || '',
    city: raw.selected_location || raw.city || raw.location || raw.address || 'Erode, Tamil Nadu',
    role: raw.role || 'Verified User',
    isVerified: Boolean(raw.is_verified),
    joinedDate: raw.created_at ? new Date(raw.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'September 2026',
    raw
  };
}

/**
 * Fetch user profile from Django endpoint: GET /api/profile/?phone=<phone>
 * @param {string} phone - 10-digit mobile number
 * @returns {Promise<object>}
 */
export async function fetchUserProfileApi(phone) {
  const cleanPhone = phone ? phone.replace(/[^0-9]/g, '').slice(-10) : '';
  const url = `${API_ENDPOINTS.PROFILE}${cleanPhone ? `?phone=${cleanPhone}` : ''}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (response.status === 404) {
      console.info(`[Django API] ${url} returned 404. Endpoint 'api/profile/' is not yet registered in mainkuiky.urls. Using session user.`);
      return null;
    }

    const data = await response.json().catch(() => null);
    if (!response.ok || data?.success === false) {
      return null;
    }
    return normalizeUserProfile(data.user || data);
  } catch (err) {
    console.warn('[Django API] Profile fetch error:', err);
    return null;
  }
}

/**
 * Update user profile on Django endpoint: PUT /api/profile/
 * @param {object} profileData - { phone, name, email, selected_location }
 * @returns {Promise<object>}
 */
export async function updateUserProfileApi(profileData) {
  const digits = (profileData.phone || '').replace(/[^0-9]/g, '').slice(-10);
  const payload = {
    phone: `+91${digits}`,
    name: profileData.name || profileData.full_name || '',
    email: profileData.email || '',
    selected_location: profileData.selected_location || profileData.city || profileData.location || 'Erode, Tamil Nadu'
  };

  try {
    const response = await fetch(API_ENDPOINTS.PROFILE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 404) {
      console.info("[Django API] PUT /api/profile/ returned 404. Endpoint 'api/profile/' is not yet registered in mainkuiky.urls. Saved locally.");
      return normalizeUserProfile(payload);
    }

    const data = await response.json().catch(() => null);
    if (!response.ok || data?.success === false) {
      return normalizeUserProfile(payload);
    }
    return normalizeUserProfile(data.user || data);
  } catch (err) {
    console.warn('[Django API] Profile update error:', err);
    return normalizeUserProfile(payload);
  }
}

/**
 * Normalizes a location record from Django /api/locations/ [name='locations-list']
 * @param {object} item
 * @param {number} idx
 * @returns {object}
 */
export function normalizeLocation(item, idx = 0) {
  if (!item) return null;
  const id = String(item.id || item.slug || item.code || `loc-${idx + 1}`).toLowerCase();
  const name = item.name || item.city || item.title || item.location_name || `Location ${idx + 1}`;
  const nameTa = item.name_ta || item.nameTa || item.name || name;
  const zone = item.zone || item.district || item.area || 'Central';
  const latitude = item.latitude !== undefined && item.latitude !== null && !isNaN(Number(item.latitude))
    ? Number(item.latitude)
    : 11.3410 + (idx * 0.005);
  const longitude = item.longitude !== undefined && item.longitude !== null && !isNaN(Number(item.longitude))
    ? Number(item.longitude)
    : 77.7172 + (idx * 0.005);
  const pos = item.pos || (item.mapPos ? item.mapPos : latLngToMapPos(latitude, longitude));

  return {
    id,
    name,
    nameTa,
    zone,
    latitude,
    longitude,
    pos,
    raw: item
  };
}

/**
 * Fetch locations list from Django /api/locations/ [name='locations-list']
 * @returns {Promise<Array<object>>}
 */
export async function fetchLocationsApi() {
  try {
    const response = await fetch(API_ENDPOINTS.LOCATIONS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (response.ok) {
      const data = await response.json().catch(() => null);
      const list = Array.isArray(data) ? data : (data?.results || data?.locations || []);
      if (Array.isArray(list) && list.length > 0) {
        return list.map((item, idx) => normalizeLocation(item, idx));
      }
    }
  } catch {
    // Continue to fallback
  }

  // Gracefully fallback to local popular ride locations
  return popularRideLocations.map((item, idx) => normalizeLocation(item, idx));
}

/**
 * Fetch services list from Django /api/services/
 * @returns {Promise<{counts: object, results: Array<object>}>}
 */
export async function fetchServicesApi() {
  const response = await fetch(API_ENDPOINTS.SERVICES, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });
  return response.json().catch(() => ({ counts: {}, results: [] }));
}

/**
 * Create a new booking via Django endpoint: POST /api/bookings/create/
 * @param {object} bookingData
 * @returns {Promise<{success: boolean, message: string, booking: object}>}
 */
export async function createBookingApi(bookingData) {
  const cleanPhone = (bookingData.phone || '').replace(/[^0-9]/g, '').slice(-10);
  const payload = {
    phone: cleanPhone || '7810054614',
    service: bookingData.service || 1,
    pickup_address: bookingData.pickup_address || 'Brough Road Market, Erode',
    destination_address: bookingData.destination_address || 'Railway Junction, Erode',
    estimated_fare: String(bookingData.estimated_fare || '86.00'),
    notes: bookingData.notes || null,
  };

  const response = await fetch(API_ENDPOINTS.BOOKING_CREATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    const err = new Error(data.message || (Array.isArray(data.service) ? data.service[0] : `Booking failed (${response.status})`));
    err.status = response.status;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Fetch bookings list from Django endpoint: GET /api/bookings/
 * @returns {Promise<{success: boolean, count: number, results: Array<object>}>}
 */
export async function fetchBookingsApi() {
  const response = await fetch(API_ENDPOINTS.BOOKINGS, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });
  return response.json().catch(() => ({ success: false, count: 0, results: [] }));
}

/**
 * Normalizes an ambulance record from Django /api/ambulances/ [name='ambulance-list']
 * @param {object} item
 * @param {number} idx
 * @returns {object}
 */
export function normalizeAmbulance(item, idx = 0) {
  if (!item) return null;
  const nameEn = item.name || item.ambulance_name || item.driver_name || item.hospital_name || `Ambulance Unit ${idx + 1}`;
  const nameTa = item.name_ta || item.nameTa || item.name || nameEn;
  const hospitalEn = item.hospital || item.hospital_name || item.address || 'Local Hospital & Emergency Care';
  const hospitalTa = item.hospital_ta || item.hospitalTa || item.hospital || hospitalEn;
  const typeEn = item.type || item.ambulance_type || 'Advanced ICU & Critical Care';
  const typeTa = item.type_ta || item.typeTa || item.type || 'அட்வான்ஸ்டு ICU & தீவிர சிகிச்சை';
  const phone = item.phone || item.contact_number || item.mobile || item.driver_phone || '+91 98427 12108';
  const eta = item.eta || item.eta_text || '3-6 mins';
  const rating = String(item.rating || '4.9');
  const isFree = item.is_free !== undefined ? Boolean(item.is_free) : true;

  return {
    id: item.id || `amb-api-${idx + 1}`,
    nameEn,
    nameTa,
    hospitalEn,
    hospitalTa,
    typeEn,
    typeTa,
    phone,
    directPhone: item.directPhone || phone,
    eta,
    rating,
    isFree,
    freeBadgeEn: item.badge || item.freeBadgeEn || '24/7 Verified Emergency Line',
    freeBadgeTa: item.badge_ta || item.freeBadgeTa || '24/7 சரிபார்க்கப்பட்ட அவசர சேவை',
    latitude: item.latitude ? Number(item.latitude) : null,
    longitude: item.longitude ? Number(item.longitude) : null,
    raw: item
  };
}

/**
 * Fetch ambulances list from Django /api/ambulances/ [name='ambulance-list']
 * @param {string|number} locationId
 * @returns {Promise<Array<object>>}
 */
export async function fetchAmbulancesApi(locationId = null) {
  const url = locationId
    ? `${API_ENDPOINTS.AMBULANCES}?location=${encodeURIComponent(locationId)}`
    : API_ENDPOINTS.AMBULANCES;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (response.ok) {
      const data = await response.json().catch(() => null);
      const list = Array.isArray(data) ? data : (data?.results || data?.ambulances || []);
      if (Array.isArray(list) && list.length > 0) {
        return list.map((item, idx) => normalizeAmbulance(item, idx));
      }
    }
  } catch {
    // Continue to fallback
  }

  // Gracefully fallback to city / default list
  const cityKey = locationId ? String(locationId).toLowerCase() : 'erode';
  const fallbackList = ambulancesByCity[cityKey] || ambulancesByCity['erode'] || [];
  return fallbackList.map((item, idx) => normalizeAmbulance(item, idx));
}

/**
 * Normalizes a puncture work record from Django /api/puncture-works/ [name='puncture-list']
 * @param {object} item
 * @param {number} idx
 * @returns {object}
 */
export function normalizePunctureShop(item, idx = 0) {
  if (!item) return null;
  const name = item.name || item.shop_name || `Puncture Shop ${idx + 1}`;
  const nameTa = item.name_ta || item.nameTa || name;
  const owner = item.owner || item.owner_name || item.mechanic_name || 'Verified Mechanic';
  const ownerTa = item.owner_ta || item.ownerTa || owner;
  const phone = item.phone || item.mobile || item.contact_number || '+91 98422 33445';
  const address = item.address || item.location_address || 'Erode, Tamil Nadu';
  const addressTa = item.address_ta || item.addressTa || address;
  const distance = item.distance || `${(0.4 + (idx * 0.4)).toFixed(1)} km away`;
  const eta = item.eta || item.eta_text || `${5 + (idx * 3)} mins dispatch`;

  let services = ['2-Wheeler Puncture', '4-Wheeler Tubeless Repair', 'Mobile On-Site Breakdown Assistance', 'Air Pressure & Nitrogen'];
  if (Array.isArray(item.services) && item.services.length > 0) {
    services = item.services;
  } else if (typeof item.services === 'string' && item.services.trim()) {
    services = item.services.split(',').map(s => s.trim());
  }

  const status = item.status || (item.is_open !== false ? 'Open 24/7' : 'Closed');
  const mobileMechanic = item.mobile_mechanic !== undefined 
    ? Boolean(item.mobile_mechanic) 
    : (item.mobileMechanic !== undefined ? Boolean(item.mobileMechanic) : true);
  const rating = item.rating ? Number(item.rating) : 4.8;
  const priceEstimate = item.price_estimate || item.priceEstimate || '₹60 - ₹120';

  const latitude = item.latitude ? Number(item.latitude) : (11.3410 + (idx * 0.003));
  const longitude = item.longitude ? Number(item.longitude) : (77.7172 + (idx * 0.004));
  const mapPos = item.mapPos || latLngToMapPos(latitude, longitude);

  return {
    id: item.id || `punc-${idx + 1}`,
    name,
    nameTa,
    owner,
    ownerTa,
    phone,
    whatsapp: item.whatsapp || String(phone).replace(/[^0-9]/g, ''),
    address,
    addressTa,
    distance,
    eta,
    services,
    status,
    mobileMechanic,
    rating,
    mapPos,
    priceEstimate,
    latitude,
    longitude,
    raw: item
  };
}

/**
 * Fetch puncture works list from Django /api/puncture-works/ [name='puncture-list']
 * @param {string} filter
 * @returns {Promise<Array<object>>}
 */
export async function fetchPunctureWorksApi(filter = null) {
  try {
    const response = await fetch(API_ENDPOINTS.PUNCTURE_WORKS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (response.ok) {
      const data = await response.json().catch(() => null);
      const list = Array.isArray(data) ? data : (data?.results || data?.puncture_works || data?.shops || []);
      if (Array.isArray(list) && list.length > 0) {
        const mapped = list.map((item, idx) => normalizePunctureShop(item, idx));
        if (filter === '247') return mapped.filter(s => String(s.status).includes('24/7'));
        if (filter === 'mobile') return mapped.filter(s => s.mobileMechanic);
        if (filter === 'tubeless') return mapped.filter(s => s.services.some(srv => srv.toLowerCase().includes('tubeless')));
        return mapped;
      }
    }
  } catch {
    // Continue to fallback
  }

  // Gracefully fallback to local puncture shops dataset
  const fallbackList = punctureShops.map((item, idx) => normalizePunctureShop(item, idx));
  if (filter === '247') return fallbackList.filter(s => String(s.status).includes('24/7'));
  if (filter === 'mobile') return fallbackList.filter(s => s.mobileMechanic);
  if (filter === 'tubeless') return fallbackList.filter(s => s.services.some(srv => srv.toLowerCase().includes('tubeless')));
  return fallbackList;
}

/**
 * Convert GPS Latitude and Longitude into map overlay percentage coordinates ({x, y})
 * calibrated for the Erode region map canvas.
 * @param {number} lat
 * @param {number} lng
 * @returns {{x: number, y: number}}
 */
export function latLngToMapPos(lat, lng) {
  const numericLat = Number(lat);
  const numericLng = Number(lng);
  if (isNaN(numericLat) || isNaN(numericLng)) {
    return { x: 50, y: 50 };
  }

  // Erode bounding coordinates:
  // North (Veerappanchatiram / Bhavani Rd): 11.3650
  // South (Railway Junction / Solar): 11.3200
  // West (Perundurai Rd Corner / Thindal): 77.6900
  // East (Central Bus Stand / Brough Rd): 77.7350
  const minLat = 11.3150;
  const maxLat = 11.3750;
  const minLng = 77.6850;
  const maxLng = 77.7450;

  const rawX = ((numericLng - minLng) / (maxLng - minLng)) * 100;
  const rawY = ((maxLat - numericLat) / (maxLat - minLat)) * 100;

  // Clamp within visible map canvas boundaries (15% - 85%)
  const clampedX = Math.round(Math.min(Math.max(rawX, 15), 85));
  const clampedY = Math.round(Math.min(Math.max(rawY, 15), 85));

  return { x: clampedX, y: clampedY };
}

/**
 * Normalizes a driver location record conforming to Django DriverLocation model:
 * - driver_name (CharField)
 * - phone (CharField)
 * - vehicle_type (ForeignKey / ChoiceField)
 * - latitude (DecimalField / FloatField)
 * - longitude (DecimalField / FloatField)
 * - eta_text (CharField)
 * - is_online (BooleanField)
 * - updated_at (DateTimeField)
 * 
 * @param {object} item
 * @param {number} idx
 * @returns {object}
 */
export function normalizeDriverLocation(item, idx = 0) {
  if (!item) return null;

  const driver_name = item.driver_name || item.name || item.nameEn || `Driver ${idx + 1}`;
  const phone = item.phone || item.mobile || item.contact_number || '+91 94438 12345';

  // vehicle_type can be a foreign key object ({ id, name }) or string like 'standard', 'electric', 'cargo'
  let vehicle_type = 'standard';
  if (typeof item.vehicle_type === 'object' && item.vehicle_type !== null) {
    vehicle_type = item.vehicle_type.name || item.vehicle_type.type || item.vehicle_type.title || 'standard';
  } else if (item.vehicle_type) {
    vehicle_type = String(item.vehicle_type);
  } else if (item.typeKey) {
    vehicle_type = item.typeKey;
  }

  const cleanVehicleKey = String(vehicle_type).toLowerCase().includes('elec')
    ? 'electric'
    : String(vehicle_type).toLowerCase().includes('carg')
    ? 'cargo'
    : 'standard';

  const latitude = item.latitude !== null && item.latitude !== undefined && !isNaN(Number(item.latitude))
    ? Number(item.latitude)
    : 11.3410 + (idx * 0.004);

  const longitude = item.longitude !== null && item.longitude !== undefined && !isNaN(Number(item.longitude))
    ? Number(item.longitude)
    : 77.7172 + (idx * 0.005);

  const eta_text = item.eta_text || item.eta || `${2 + idx * 2} mins away`;
  const is_online = item.is_online !== undefined ? Boolean(item.is_online) : true;
  const updated_at = item.updated_at || new Date().toISOString();

  const mapPos = item.mapPos || latLngToMapPos(latitude, longitude);

  return {
    id: item.id || `driver-${idx + 1}`,
    // Exact Django Backend Fields:
    driver_name,
    phone,
    vehicle_type,
    latitude,
    longitude,
    eta_text,
    is_online,
    updated_at,

    // UI Backwards-Compatibility Aliases:
    name: driver_name,
    nameEn: driver_name,
    nameTa: item.nameTa || driver_name,
    typeKey: cleanVehicleKey,
    type: item.type || (cleanVehicleKey === 'electric' ? 'Electric Auto (Eco 4 Seater)' : cleanVehicleKey === 'cargo' ? 'Cargo & Parcel Auto (500kg)' : 'Passenger Auto (3 Seater)'),
    vehicle: item.vehicle || (cleanVehicleKey === 'electric' ? 'Electric Auto (Eco 4 Seater)' : cleanVehicleKey === 'cargo' ? 'Cargo & Parcel Auto (500kg)' : 'Passenger Auto (3 Seater)'),
    vehicleNo: item.vehicleNo || item.vehicle_number || `TN 36 AX ${4500 + idx * 111}`,
    rating: item.rating ? Number(item.rating) : 4.8,
    trips: item.trips || (950 + idx * 210),
    experience: item.experience || `${5 + idx} Years Exp`,
    stand: item.stand || 'Erode Auto Stand',
    standTa: item.standTa || 'ஈரோடு ஆட்டோ சங்கம்',
    status: is_online ? 'Available Now' : 'Offline',
    baseFare: item.baseFare || (cleanVehicleKey === 'electric' ? 30 : cleanVehicleKey === 'cargo' ? 50 : 35),
    perKm: item.perKm || (cleanVehicleKey === 'electric' ? 12 : cleanVehicleKey === 'cargo' ? 18 : 15),
    eta: eta_text,
    mapPos,
    routeWaypoints: item.routeWaypoints || [mapPos],
    raw: item
  };
}

/**
 * Fetch live driver locations from Django backend (/api/driver-locations/)
 * Conforming to Django fields: driver_name, phone, vehicle_type, latitude, longitude, eta_text, is_online, updated_at
 * @returns {Promise<Array<object>>}
 */
export async function fetchDriverLocationsApi() {
  try {
    const response = await fetch(API_ENDPOINTS.DRIVER_LOCATIONS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (response.ok) {
      const data = await response.json().catch(() => null);
      const list = Array.isArray(data) ? data : (data?.results || data?.drivers || data?.driver_locations || []);
      if (Array.isArray(list) && list.length > 0) {
        return list.map((item, idx) => normalizeDriverLocation(item, idx));
      }
    }
  } catch {
    // Continue to fallback
  }

  // Gracefully fallback to normalized local drivers dataset
  return autoDrivers.map((item, idx) => normalizeDriverLocation(item, idx));
}

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  sendOtpApi,
  verifyOtpApi,
  fetchUserProfileApi,
  updateUserProfileApi,
  fetchLocationsApi,
  fetchServicesApi,
  createBookingApi,
  fetchBookingsApi,
  fetchAmbulancesApi,
  fetchPunctureWorksApi,
  fetchDriverLocationsApi,
  normalizeDriverLocation,
  normalizeAmbulance,
  normalizePunctureShop,
  normalizeLocation,
  latLngToMapPos,
  normalizeUserProfile,
};
