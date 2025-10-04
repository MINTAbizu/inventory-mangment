import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth services
export const authService = {
  register: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.get('/logout');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/getuser');
    return response.data;
  },

  updateUser: async (userData) => {
    const response = await api.patch('/updateuser', userData);
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await api.patch('/changepassword', passwordData);
    return response.data;
  },

  forgetPassword: async (email) => {
    const response = await api.post('/forgetpassword', { email });
    return response.data;
  },

  checkLoginStatus: async () => {
    const response = await api.get('/loggden');
    return response.data;
  },
};

export default api; 