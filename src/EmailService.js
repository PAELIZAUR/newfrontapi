// EmailService.js
const BASE_URL = 'http://localhost:8080'; // Asegúrate de que esta sea la URL correcta de tu servidor

const enviarCorreo = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: 'Correo enviado exitosamente', data: result };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, message: 'Error de conexión' };
  }
};

const obtenerCorreos = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/emails`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, data: result };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error('Error al obtener los correos:', error);
    return { success: false, message: 'Error de conexión' };
  }
};

const obtenerDetallesCorreo = async (emailId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/emails/${emailId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, data: result };
    } else {
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error('Error al obtener los detalles del correo:', error);
    return { success: false, message: 'Error de conexión' };
  }
};

export { enviarCorreo, obtenerCorreos, obtenerDetallesCorreo };
