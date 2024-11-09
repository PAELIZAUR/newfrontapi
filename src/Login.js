import React, { useState } from 'react';

const Login = ({ manejarToken }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(''); // Para mostrar errores de autenticación
  const [cargando, setCargando] = useState(false); // Para mostrar un estado de carga

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(''); // Limpiar el error antes de realizar la solicitud

    // Llamada a la API para autenticar al usuario
    try {
      const response = await fetch('https://poo2024.unsada.edu.ar/cuentas/login', { // Cambia esta URL según tu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contrasena }),
      });

      const result = await response.json();

      if (response.ok) {
        // Si la respuesta es exitosa, obtenemos el token
        const token = result.token; // Suponiendo que el token viene en result.token
        manejarToken(token); // Pasamos el token al componente App.js
        console.log('Token recibido:', token);
      } else {
        // Si hay un error en la respuesta
        setError(result.message || 'Error al autenticar');
      }
    } catch (error) {
      setError('Hubo un problema al conectar con el servidor');
    } finally {
      setCargando(false); // Finalmente, cambiamos el estado de carga
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <div>
        <label htmlFor="usuario">Usuario:</label>
        <input
          type="text"
          id="usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Ingrese su usuario"
        />
      </div>
      <div>
        <label htmlFor="contrasena">Contraseña:</label>
        <input
          type="password"
          id="contrasena"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Ingrese su contraseña"
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={cargando}>
        {cargando ? 'Cargando...' : 'Iniciar sesión'}
      </button>
    </form>
  );
};

export default Login;
