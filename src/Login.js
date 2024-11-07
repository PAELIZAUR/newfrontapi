import React, { useState } from 'react';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar lógica para autenticar al usuario
    console.log('Iniciar sesión con', usuario, contrasena);
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
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;
