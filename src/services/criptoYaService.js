import axios from 'axios';

// Configuración base para la API de CriptoYa
const criptoYaApi = axios.create({
  baseURL: 'https://criptoya.com/api',
  timeout: 5000 // Tiempo límite para evitar bloqueos
});

// Función para obtener el precio de una criptomoneda
export const obtenerPrecio = async (exchange, cripto, moneda) => {
  try {
    const response = await criptoYaApi.get(`/${exchange}/${cripto}/${moneda}`);
    return response.data; // La respuesta contiene el precio
  } catch (error) {
    console.error('Error al obtener el precio:', error);
    throw error; // Propaga el error para manejarlo en los componentes
  }
};
