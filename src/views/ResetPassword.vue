<template>
  <div class="reset-container">
    <div class="reset-card">
      <h2 class="title">Restablecer contraseña</h2>
      <p class="subtitle">Ingresa una nueva contraseña para tu cuenta.</p>

      <form @submit.prevent="handleReset">
        <div class="form-group">
          <label for="newPassword">Nueva contraseña</label>
          <input
            type="password"
            id="newPassword"
            v-model="newPassword"
            placeholder="••••••••"
            required
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          <span v-if="loading">Actualizando...</span>
          <span v-else>Actualizar contraseña</span>
        </button>
      </form>

      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <router-link to="/login" class="back-link">← Volver al inicio de sesión</router-link>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "ResetPassword",
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      successMessage: "",
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    async handleReset() {
      this.successMessage = "";
      this.errorMessage = "";

      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Las contraseñas no coinciden.";
        return;
      }

      if (this.newPassword.length < 6) {
        this.errorMessage = "La contraseña debe tener al menos 6 caracteres.";
        return;
      }

      // Obtenemos el token del query param ?token=XXXX
      const token = this.$route.query.token;
      if (!token) {
        this.errorMessage = "El enlace de recuperación no es válido o ha expirado.";
        return;
      }

      try {
        this.loading = true;
        const response = await api.post("/auth/reset-password", {
          token,
          newPassword: this.newPassword,
        });

        // Puedes personalizar el mensaje según tu backend
        if (response.status === 200) {
          this.successMessage = "✅ Tu contraseña ha sido actualizada correctamente.";
          this.newPassword = "";
          this.confirmPassword = "";
          setTimeout(() => {
            this.$router.push("/login");
          }, 2500);
        }
      } catch (error) {
        console.error(error);
        this.errorMessage =
          error.response?.data?.message ||
          "❌ No se pudo actualizar la contraseña. Intenta de nuevo.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.reset-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top, #0a0f1f, #050a18);
  font-family: 'Poppins', sans-serif;
}

.reset-card {
  background: rgba(17, 25, 40, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2.5rem;
  width: 400px;
  text-align: center;
  box-shadow: 0 0 25px rgba(0, 200, 255, 0.2);
  color: #fff;
  animation: fadeIn 1s ease;
}

.title {
  font-size: 1.8rem;
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
}

.form-group {
  text-align: left;
  margin-bottom: 1rem;
}

label {
  font-size: 0.9rem;
  color: #cbd5e1;
  margin-bottom: 0.3rem;
  display: block;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 1rem;
  transition: all 0.2s;
}

input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 8px #00d9ff;
}

.btn-primary {
  margin-top: 1rem;
  width: 100%;
  background: linear-gradient(90deg, #00d9ff, #8b5cf6);
  border: none;
  border-radius: 12px;
  color: white;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover {
  transform: scale(1.03);
  box-shadow: 0 0 20px #00d9ff;
}

.success {
  margin-top: 1rem;
  color: #00ffae;
  font-size: 0.95rem;
}

.error {
  margin-top: 1rem;
  color: #ff3d71;
  font-size: 0.95rem;
}

.back-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: #00d9ff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.back-link:hover {
  color: #8b5cf6;
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
