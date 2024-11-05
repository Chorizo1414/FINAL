// frontend/src/services/api.js
import axios from 'axios';
import apiUrl from '../apiConfig';

const token = localStorage.getItem('token');
const API_URL = 'http://localhost:5000'; 

const apiInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${token}`, // Incluye el token en el header Authorization
  },
});

// Función para registrar un usuario
export const register = async (username, password) => {
  return axios.post(`${apiUrl}/register`, { username, password });
};


export const login = async (username, password) => {
  const response = await apiInstance.post(`/api/auth/login`, {
    username,
    password,
  });
  return response;
};

// Función para obtener datos protegidos usando el token JWT
export const getProtectedData = async (token) => {
  return axios.get(`${apiUrl}/protected-route`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login');
};
