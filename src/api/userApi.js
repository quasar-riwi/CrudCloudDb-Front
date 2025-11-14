import axios from "axios";

// 🔹 URLs base del backend
const USERS_API = "https://service.quasar.andrescortes.dev/api/Users";
const PAYMENTS_API = "https://service.quasar.andrescortes.dev/api/Payments";

// =======================================================
// 📧 Verificar correo electrónico
// =======================================================
export const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`${USERS_API}/verify-email?token=${token}`);
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
    const response = await axios.post(`${USERS_API}/register`, userData);
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
    const response = await axios.post(`${USERS_API}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error iniciando sesión:", error);
    throw new Error(
      error.response?.data?.message || "Error al iniciar sesión"
    );
  }
};

// =======================================================
// 🔄 Olvidó la contraseña
// =======================================================
export const forgotPassword = async (payload) => {
  try {
    const response = await axios.post(`${USERS_API}/forgot-password`, payload);
    return response.data;
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    throw new Error(
      error.response?.data?.message || "Error al enviar el correo de recuperación"
    );
  }
};

// =======================================================
// 🔐 Restablecer contraseña
// =======================================================
export const resetPassword = async ({ token, newPassword }) => {
  try {
    const response = await axios.post(`${USERS_API}/reset-password`, {
      token,
      newPassword,
      confirmPassword: newPassword
    });
    return response.data;
  } catch (error) {
    console.error("Error en resetPassword:", error);
    throw new Error(
      error.response?.data?.message || "Error al restablecer la contraseña"
    );
  }
};

// =======================================================
// 💳 SUSCRIPCIÓN A PLANES (MercadoPago)
// =======================================================
export const subscribePlan = async (plan, email) => {
  try {
    const token = localStorage.getItem("token"); // <<--- recuperar token

    const body = { plan, payerEmail: email };

    const response = await axios.post(
      `${PAYMENTS_API}/subscribe`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`, // <<--- enviar JWT
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error en subscribePlan:", error);
    throw new Error(
      error.response?.data?.message || "Error al crear la suscripción"
    );                                                                          
  }

};
