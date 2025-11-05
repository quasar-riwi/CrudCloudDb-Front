import axios from "axios";

// 🔹 URL base del backend (ajústala si el puerto cambia)
const API_URL = "http://localhost:5005/api/Users";

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

// =======================================================
// ⚙️ Configuración general de axios (opcional)
// =======================================================
// Si en el futuro quieres manejar JWT automáticamente, puedes hacerlo así:
//
// axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem("jwtToken");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
