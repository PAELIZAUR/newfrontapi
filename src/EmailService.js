const BASE_URL = 'http://localhost:8080'; // Asegúrate de que esta sea la URL correcta de tu servidor

// Función para enviar un correo
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
      console.error('Error al enviar el correo:', result);
      return { success: false, message: result.message || 'Error desconocido al enviar el correo' };
    }
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, message: 'Error de conexión' };
  }
};

// Función para obtener los correos
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
      console.error('Error al obtener los correos:', result);
      return { success: false, message: result.message || 'Error desconocido al obtener los correos' };
    }
  } catch (error) {
    console.error('Error al obtener los correos:', error);
    return { success: false, message: 'Error de conexión' };
  }
};

// Función para obtener detalles de un correo específico
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
      console.error('Error al obtener los detalles del correo:', result);
      return { success: false, message: result.message || 'Error desconocido al obtener los detalles del correo' };
    }
  } catch (error) {
    console.error('Error al obtener los detalles del correo:', error);
    return { success: false, message: 'Error de conexión' };
  }
};

export { enviarCorreo, obtenerCorreos, obtenerDetallesCorreo };
