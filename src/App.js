import React, { useState, useEffect } from 'react';
import './App.css';
import Inbox from './Inbox';
import SendMail from './SendMail';
import Login from './Login';
import { enviarCorreo, obtenerCorreos } from './EmailService';

const App = () => {
  const [vistaActiva, setVistaActiva] = useState('bienvenida'); // Al principio, mostramos la pantalla de bienvenida
  const [correos, setCorreos] = useState([]);
  const [token, setToken] = useState(null);

  // Actualiza la vista activa solo si hay token o si es la vista 'login'
  const cambiarVista = (vista) => {
    if (token || vista === 'login') {
      setVistaActiva(vista);
    }
  };

  // Guarda el token obtenido del login y cambia a la bandeja
  const manejarToken = (nuevoToken) => {
    setToken(nuevoToken);
    setVistaActiva('bandeja'); // Cambia automáticamente a bandeja después de iniciar sesión
  };

  // Obtiene los correos de la bandeja
  const obtenerCorreosBandeja = async () => {
    if (!token) return console.error('No hay token de autenticación.');

    try {
      const result = await obtenerCorreos(token);
      if (result.success) {
        setCorreos(result.data);
      } else {
        console.error('Error al obtener los correos:', result.message);
      }
    } catch (error) {
      console.error('Error en obtenerCorreosBandeja:', error);
    }
  };

  // Envía un correo
  const handleEnviarCorreo = async (data) => {
    if (!token) return console.error('No hay token de autenticación.');

    try {
      const result = await enviarCorreo(data, token);
      if (result.success) {
        console.log('Correo enviado:', result.message);
      } else {
        console.error('Error al enviar correo:', result.message);
      }
    } catch (error) {
      console.error('Error en handleEnviarCorreo:', error);
    }
  };

  // Actualiza la lista de correos cuando cambia la vista a 'bandeja'
  useEffect(() => {
    if (vistaActiva === 'bandeja') obtenerCorreosBandeja();
  }, [vistaActiva, token]);

  return (
    <div className="App">
      <div className="sidebar">
        <div className="logo-container">
          <img src="/YIMEIL.png" alt="Logo YIMEIL" className="logo-img" />
          <h2 className="logo">YIMEIL</h2>
        </div>
        <nav>
          <ul>
            {!token ? (
              <li>
                <a onClick={() => cambiarVista('login')}>Iniciar sesión</a>
              </li>
            ) : (
              <>
                <li><a onClick={() => cambiarVista('bandeja')}>Bandeja de Entrada</a></li>
                <li><a onClick={() => cambiarVista('enviar')}>Enviar Mensaje</a></li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div className="main-content">
        {vistaActiva === 'bienvenida' && (
          <div className="capa bienvenida">
            <img src="/YIMEILL.png" alt="Logo YIMEIL" className="logo-img" />
            <h2>¡Bienvenidos a YIMEIL!</h2>
            <p>Inicia sesión para continuar</p>
          </div>
        )}
        {vistaActiva === 'login' && (
          <div className="capa">
            <h2>Iniciar sesión</h2>
            <Login manejarToken={manejarToken} />
          </div>
        )}
        {vistaActiva === 'bandeja' && token && (
          <div className="capa">
            <Inbox correos={correos} />
          </div>
        )}
        {vistaActiva === 'enviar' && token && (
          <div className="capa">
            <SendMail handleEnviarCorreo={handleEnviarCorreo} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
