import React, { useState } from 'react';
import './App.css';
import Inbox from './Inbox'; // Asegúrate de que tus componentes están correctamente importados
import SendMail from './SendMail'; // También importar el componente de enviar correo
import Login from './Login'; // Importar Login

const App = () => {
  // Estado para controlar qué vista se está mostrando
  const [vistaActiva, setVistaActiva] = useState('login'); // 'login' es la vista inicial

  // Función para cambiar la vista
  const cambiarVista = (vista) => {
    setVistaActiva(vista);
  };

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
        {/* Renderizado condicional de las vistas */}
        {vistaActiva === 'login' && (
          <div className="capa">
            <h2>Iniciar sesión</h2>
            <Login />
          </div>
        )}

        {vistaActiva === 'bandeja' && (
          <div className="capa">
            <Inbox />
          </div>
        )}

        {vistaActiva === 'enviar' && (
          <div className="capa">
            <SendMail />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

