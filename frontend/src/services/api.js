// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Asegúrate de que esta URL coincida con la de tu backend

// Función para registrar un usuario
export const register = async (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

// Función para iniciar sesión y obtener un token JWT
export const login = async (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

// Función para obtener datos protegidos usando el token JWT
export const getProtectedData = async (token) => {
  return axios.get(`${API_URL}/protected-route`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
