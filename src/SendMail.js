import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const SendMail = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: to,
      subject: subject,
      message: body,
    };

    emailjs
      .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then(
        (response) => {
          console.log('Correo enviado', response);
        },
        (error) => {
          console.log('Error al enviar el correo', error);
        }
      );
  };

  return (
    <div>
      <h2>Enviar correo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="to">Para:</label>
          <input
            type="email"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Asunto:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Cuerpo del mensaje:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default SendMail;
