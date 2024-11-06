// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Asegúrate de usar estos componentes
import Login from './Login'; // El componente de inicio de sesión
import Inbox from './Inbox'; // El componente de la bandeja de entrada (crea este archivo si no lo tienes)
import SendMail from './SendMail'; // El componente de enviar correo

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Bienvenido a la aplicación de correo</h1>
        {/* Menú de navegación */}
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/login">Iniciar sesión</a></li>
            <li><a href="/inbox">Bandeja de Entrada</a></li>
            <li><a href="/send-mail">Enviar Correo</a></li>
          </ul>
        </nav>

        {/* Definir las rutas para los diferentes componentes */}
        <Routes>
          <Route path="/" element={<h2>Inicio</h2>} />
          <Route path="/login" element={<Login />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/send-mail" element={<SendMail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
