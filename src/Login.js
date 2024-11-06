// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Para mostrar mensajes de error
  const navigate = useNavigate(); // Para redirigir a la bandeja de entrada al iniciar sesión correctamente

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Datos de login
    const loginData = {
      username,
      password
    };

    try {
      // Enviar solicitud POST a la API de autenticación (ajusta la URL según tu backend)
      const response = await fetch('https://tu-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      // Obtener el token de la respuesta
      const data = await response.json();
      const token = data.token; // Suponiendo que la respuesta tiene un campo 'token'

      // Guardar el token en el localStorage
      localStorage.setItem('authToken', token);

      // Redirigir a la bandeja de entrada
      navigate('/inbox');
    } catch (error) {
      // Si ocurre un error, mostrar mensaje
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Correo electrónico:</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error si es necesario */}
    </div>
  );
};

export default Login;
