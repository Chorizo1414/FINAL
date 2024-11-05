import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de tener axios instalado
import './Login.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:5000/register', {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

  
      if (response.status === 201) {
        alert('Registro exitoso');
        navigate('/Projects');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Hubo un error al registrarse');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit" className="login-button">Registrarse</button>
      </form>
      <p className="register-link">
        ¿Ya tienes cuenta?{' '}
        <span onClick={handleLoginRedirect} style={{ color: '#4CAF50', cursor: 'pointer' }}>
          Iniciar sesión aquí
        </span>
      </p>
    </div>
  );
};

export default Register;
