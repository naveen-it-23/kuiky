export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://affecting-tingling-duke.ngrok-free.dev';

export const API_ENDPOINTS = {
  // Django mainkuiky.urls exact endpoints
  SEND_OTP: `${API_BASE_URL}/api/auth/send-otp/`,
  VERIFY_OTP: `${API_BASE_URL}/api/auth/verify-otp/`,
  PROFILE: `${API_BASE_URL}/api/profile/`,
  LOCATIONS: `${API_BASE_URL}/api/locations/`,
  CATEGORIES: `${API_BASE_URL}/api/categories/`,
  SERVICES: `${API_BASE_URL}/api/services/`,
  BOOKINGS: `${API_BASE_URL}/api/bookings/`,
  BOOKING_CREATE: `${API_BASE_URL}/api/bookings/create/`,
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
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || data?.success === false) {
    const err = new Error(data?.message || data?.detail || `Failed to fetch profile (${response.status})`);
    err.status = response.status;
    err.data = data;
    throw err;
  }
  return normalizeUserProfile(data.user || data);
}

/**
 * Update user profile on Django endpoint: PUT /api/profile/
 * @param {object} profileData - { phone, name, email, selected_location }
 * @returns {Promise<object>}
 */
export async function updateUserProfileApi(profileData) {
  const cleanPhone = (profileData.phone || '').replace(/[^0-9]/g, '').slice(-10);
  const payload = {
    phone: cleanPhone,
    name: profileData.name || profileData.full_name || '',
    email: profileData.email || '',
    selected_location: profileData.selected_location || profileData.city || profileData.location || 'Erode, Tamil Nadu'
  };

  const response = await fetch(API_ENDPOINTS.PROFILE, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || data?.success === false) {
    const err = new Error(data?.message || data?.detail || `Failed to update profile (${response.status})`);
    err.status = response.status;
    err.data = data;
    throw err;
  }
  return normalizeUserProfile(data.user || data);
}

/**
 * Fetch locations list from Django /api/locations/
 * @returns {Promise<Array<object>>}
 */
export async function fetchLocationsApi() {
  const response = await fetch(API_ENDPOINTS.LOCATIONS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });
  return response.json().catch(() => []);
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
  normalizeUserProfile,
};
