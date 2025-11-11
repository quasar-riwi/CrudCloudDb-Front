<template>
  <div class="verify-container">
    <div class="verify-card">

      <!-- Estado de carga -->
      <div v-if="loading" class="verify-state">
        <div class="spinner"></div>
        <p class="text">Verificando tu correo, por favor espera...</p>
      </div>

      <!-- Éxito -->
      <div v-else-if="success" class="verify-state">
        <i class="bi bi-check-circle-fill icon success"></i>
        <h2 class="title">¡Correo verificado exitosamente!</h2>
        <p class="subtitle">Ya puedes iniciar sesión en tu cuenta.</p>
        <router-link
          to="/login"
          class="btn btn-futuristic w-100 fw-semibold py-2 mt-3 text-center d-inline-block"
        >
          Ir al inicio de sesión
        </router-link>
      </div>

      <!-- Error -->
      <div v-else class="verify-state">
        <i class="bi bi-x-circle-fill icon error"></i>
        <h2 class="title">Error al verificar el correo</h2>
        <p class="subtitle">{{ message }}</p>
        <router-link to="/" class="btn-outline">Volver al inicio</router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { verifyEmail } from "@/api/userApi";

export default {
  name: "EmailVerification",
  data() {
    return {
      loading: true,
      success: false,
      message: "",
    };
  },
  async created() {
    const token = this.$route.query.token;

    if (!token) {
      this.loading = false;
      this.success = false;
      this.message = "El enlace de verificación no es válido o ha expirado.";
      return;
    }

    try {
      const response = await verifyEmail(token);
      this.success = true;
      this.message = response?.message || "Verificación completada correctamente.";
    } catch (error) {
      this.success = false;
      this.message =
        error.response?.data?.message || "No se pudo verificar el correo electrónico.";
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
/* === Fondo general === */
.verify-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top, #0a0f1f, #050a18);
  font-family: "Poppins", sans-serif;
  color: #fff;
}

/* === Tarjeta principal === */
.verify-card {
  background: rgba(17, 25, 40, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2.5rem;
  width: 420px;
  text-align: center;
  box-shadow: 0 0 25px rgba(0, 200, 255, 0.2);
  animation: fadeIn 1s ease;
}

/* === Estados (loading, éxito, error) === */
.verify-state {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}
.icon.success {
  color: #00ffae;
}
.icon.error {
  color: #ff3d71;
}

/* === Tipografía === */
.title {
  font-size: 1.6rem;
  font-weight: 600;
  background: linear-gradient(90deg, #00d9ff, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #94a3b8;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  max-width: 320px;
}

/* === Botones === */
.btn-primary,
.btn-outline {
  display: inline-block;
  width: 100%;
  padding: 12px;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(90deg, #00d9ff, #8b5cf6);
  color: #fff;
  border: none;
}
.btn-primary:hover {
  transform: scale(1.03);
  box-shadow: 0 0 20px #00d9ff;
}

.btn-outline {
  color: #ff3d71;
  border: 1px solid #ff3d71;
  background: transparent;
}
.btn-outline:hover {
  background: rgba(255, 61, 113, 0.1);
  transform: scale(1.03);
}

/* === Animaciones === */
.spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top: 3px solid #00d9ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

.text {
  color: #94a3b8;
  font-size: 0.95rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
