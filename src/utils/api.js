import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
    console.log('Past Events Response:', response.data); // Debugging log
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

export default api;
