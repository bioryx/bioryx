import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.config?.skipAlert) {
      alert(error.response?.data?.message || 'An error occurred. Please try again.');
    }
    return Promise.reject(error);
  }
)

export const authAPI = {
  login: async (username, password) => {
    const response = await api.post('/api/auth/login', { username, password });
    return response.data;
  },
};

export const eventsAPI = {
  getUpcomingEvents: async () => {
    const response = await api.get('/api/events/getupcomingevents');
    return response.data;
  },
  getPastEvents: async (page) => {
    const response = await api.get(`/api/events/getpastevents?page=${page}`);
    return response.data;
  },
  addEvent: async (eventData) => {
    const response = await api.post('/api/events/addevent', eventData);
    return response.data;
  },
  updateEvent: async (id, eventData) => {
    const response = await api.put(`/api/events/updateevent/${id}`, eventData);
    return response.data;
  },
  deleteEvent: async (id) => {
    const response = await api.delete(`/api/events/deleteevent/${id}`);
    return response.data;
  },
  completeEvent: async (id) => {
    const response = await api.put(`/api/events/completeevent/${id}`);
    return response.data;
  },
};

export const bannerAPI = {
  uploadBanner: async (file) => {
    const formData = new FormData();
    formData.append('bannerImage', file);
    const response = await api.post('/api/banner/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  getBanner: async () => {
    const response = await api.get('/api/banner/get', { responseType: 'blob' });
    return response.data;
  },
  checkBannerExists: async () => {
    try {
      const response = await api.get('/api/banner/get', { responseType: 'blob', skipAlert: true });
      return { exists: true, data: response.data };
    } catch {
      return { exists: false };
    }
  },
  deleteBanner: async () => {
    const response = await api.delete('/api/banner/delete');
    return response.data;
  },
};

export default api;
