import axios from "axios";

const API_URL = "http://localhost:5005/api/Users"; // o https://localhost:5006 si usas HTTPS

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    // 🔹 Importante: reenviar el mensaje del backend al front
    
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error desconocido al registrar usuario");
  }
};
