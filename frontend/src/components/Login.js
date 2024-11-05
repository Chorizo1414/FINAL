import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      setToken(response.data.token);
      alert('Inicio de sesión exitoso');
      
      // Redirige a la página de productos
      navigate('/projects');
    } catch (error) {
      console.error(error);
      alert('Error al iniciar sesión');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      {token && <p>Token: {token}</p>}
      <p className="register-link">
        ¿No tienes cuenta?{' '}
        <span onClick={handleRegisterRedirect} style={{ color: '#4CAF50', cursor: 'pointer' }}>
          Regístrate aquí
        </span>
      </p>
    </div>
  );
};

export default Login;
