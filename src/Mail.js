// src/Mail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const Mail = () => {
  const { id } = useParams(); // Obtiene el id del correo desde la URL

  // Aquí puedes simular una lista de correos o traerla de una base de datos/API
  const mails = [
    { id: '1', from: 'soporte@correo.com', subject: 'Actualización importante', body: 'El servicio se actualizará el próximo lunes.' },
    { id: '2', from: 'noticias@correo.com', subject: 'Últimas noticias', body: 'Las noticias más recientes en tecnología...' },
  ];

  // Buscar el correo correspondiente al id
  const mail = mails.find(mail => mail.id === id);

  if (!mail) {
    return <p>Correo no encontrado.</p>;
  }

  return (
    <div>
      <h2>{mail.subject}</h2>
      <p><strong>De:</strong> {mail.from}</p>
      <p>{mail.body}</p>
    </div>
  );
};

export default Mail;
