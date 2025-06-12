import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Corrected base URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const idUtilisateur = localStorage.getItem('idUtilisateur');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (idUtilisateur) {
      config.headers['idUtilisateur'] = idUtilisateur;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
  
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem('token');
      localStorage.removeItem('idUtilisateur');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    console.error('Erreur dans la réponse:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;