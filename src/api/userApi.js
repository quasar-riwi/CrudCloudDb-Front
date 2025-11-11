import axios from "axios";

// 🔹 URL base del backend (ajústala si el puerto cambia)
const API_URL = "https://service.quasar.andrescortes.dev/api/Users";

// =======================================================
// 📧 Verificar correo electrónico
// =======================================================
export const verifyEmail = async (token) => {
  try {
    // El backend espera el token como query en un GET
    const response = await axios.get(`${API_URL}/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    console.error("Error verificando el correo:", error);
    throw new Error(
      error.response?.data?.message || "Error al verificar el correo electrónico"
    );
  }
};

// =======================================================
// 👤 Registrar usuario
// =======================================================
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registrando usuario:", error);
    throw new Error(
      error.response?.data?.message || "Error desconocido al registrar usuario"
    );
  }
};

// =======================================================
// 🔑 Iniciar sesión
// =======================================================
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // normalmente incluye el token JWT
  } catch (error) {
    console.error("Error iniciando sesión:", error);
    throw new Error(
      error.response?.data?.message || "Error al iniciar sesión"
    );
  }
};

export const forgotPassword = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, payload);
    return response.data;
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    throw new Error(
      error.response?.data?.message || "Error al enviar el correo de recuperación"
    );
  }
};

export const resetPassword = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, payload);
    return response.data;
  } catch (error) {
    console.error("Error en resetPassword:", error);
    throw new Error(
      error.response?.data?.message || "Error al restablecer la contraseña"
    );
  }
};
