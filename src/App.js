import React, { useState, useEffect } from 'react';
import './App.css';
import Inbox from './Inbox';
import SendMail from './SendMail';
import Login from './Login';
import { enviarCorreo, obtenerCorreos, obtenerDetallesCorreo } from './EmailService';

const App = () => {
  const [vistaActiva, setVistaActiva] = useState('login');
  const [correos, setCorreos] = useState([]);
  const [token, setToken] = useState(null); // Guardamos el token

  // Función para cambiar la vista
  const cambiarVista = (vista) => {
    setVistaActiva(vista);
  };

  // Función que se ejecuta cuando se obtiene el token
  const manejarToken = (nuevoToken) => {
    setToken(nuevoToken);
  };

  // Función para obtener los correos
  const obtenerCorreosBandeja = async () => {
    if (token) {
      const result = await obtenerCorreos(token);
      if (result.success) {
        setCorreos(result.data);
      } else {
        console.error('Error al obtener los correos:', result.message);
      }
    } else {
      console.error('No hay token de autenticación.');
    }
  };

  // Función para manejar el envío de un correo
  const handleEnviarCorreo = async (data) => {
    if (token) {
      const result = await enviarCorreo(data, token); // Pasamos el token aquí también
      if (result.success) {
        console.log('Correo enviado:', result.message);
      } else {
        console.error('Error al enviar correo:', result.message);
      }
    } else {
      console.error('No hay token de autenticación.');
    }
  };

  // Llamamos a la función para obtener los correos cuando la vista es 'bandeja'
  useEffect(() => {
    if (vistaActiva === 'bandeja') {
      obtenerCorreosBandeja();
    }
  }, [vistaActiva, token]); // Dependemos de token también

  return (
    <div className="App">
      <div className="sidebar">
        <div className="logo-container">
          <img src="/YIMEIL.png" alt="Logo YIMEIL" className="logo-img" />
          <h2 className="logo">YIMEIL</h2>
        </div>

        <nav>
          <ul>
            <li><a onClick={() => cambiarVista('login')}>Iniciar sesión</a></li>
            <li><a onClick={() => cambiarVista('bandeja')}>Bandeja de Entrada</a></li>
            <li><a onClick={() => cambiarVista('enviar')}>Enviar Mensaje</a></li>
          </ul>
        </nav>
      </div>

      <div className="main-content">
        {vistaActiva === 'login' && (
          <div className="capa">
            <h2>Iniciar sesión</h2>
            <Login manejarToken={manejarToken} />
          </div>
        )}

        {vistaActiva === 'bandeja' && (
          <div className="capa">
            <Inbox correos={correos} />
          </div>
        )}

        {vistaActiva === 'enviar' && (
          <div className="capa">
            <SendMail handleEnviarCorreo={handleEnviarCorreo} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
