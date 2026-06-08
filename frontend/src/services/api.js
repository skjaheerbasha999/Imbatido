const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Auth endpoints
export const authAPI = {
  signup: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  login: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/auth/${id}`);
    return response.json();
  },

  updateUser: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/auth/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

// Medicine endpoints
export const medicineAPI = {
  getUserMedicines: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/medicines/user/${userId}`);
    return response.json();
  },

  getMedicine: async (id) => {
    const response = await fetch(`${API_BASE_URL}/medicines/${id}`);
    return response.json();
  },

  createMedicine: async (data) => {
    const response = await fetch(`${API_BASE_URL}/medicines`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  updateMedicine: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/medicines/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteMedicine: async (id) => {
    const response = await fetch(`${API_BASE_URL}/medicines/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

// Adherence endpoints
export const adherenceAPI = {
  getUserAdherence: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/adherence/user/${userId}`);
    return response.json();
  },

  getAdherenceRange: async (userId, startDate, endDate) => {
    const response = await fetch(
      `${API_BASE_URL}/adherence/user/${userId}/range?startDate=${startDate}&endDate=${endDate}`
    );
    return response.json();
  },

  markAsTaken: async (data) => {
    const response = await fetch(`${API_BASE_URL}/adherence`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  updateAdherence: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/adherence/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getStats: async (userId, startDate, endDate) => {
    const response = await fetch(
      `${API_BASE_URL}/adherence/stats/${userId}?startDate=${startDate}&endDate=${endDate}`
    );
    return response.json();
  },
};

export default { authAPI, medicineAPI, adherenceAPI };
