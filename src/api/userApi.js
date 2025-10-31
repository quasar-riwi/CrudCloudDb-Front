import axios from "axios";

const API_URL = "http://localhost:5005/api/Users"; // Ajusta si tu backend usa otro puerto

// 🔹 Enviar correo de verificación (previo al registro real)
export const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al verificar el correo electrónico");
  }
};

// 🔹 Registrar usuario definitivamente (cuando ya validó su email)
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error desconocido al registrar usuario");
  }
};

// 🔹 Iniciar sesión
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // normalmente trae el token o datos del usuario
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al iniciar sesión");
  }
};
