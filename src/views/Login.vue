<template>
  <div class="login-page">
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg py-3 fixed-top" :class="{ 'scrolled': isScrolled }">
      <div class="container">
        <a class="navbar-brand" @click="goToWelcome" href="#">
          <i class="fas fa-database me-2"></i>CrudCloud
        </a>
      </div>
    </nav>

    <!-- LOGIN -->
    <section class="login-section">
      <div class="grid-pattern"></div>

      <!-- Elementos flotantes -->
      <div class="floating-element floating-element-1">
        <i class="fas fa-circle"></i>
      </div>
      <div class="floating-element floating-element-2">
        <i class="fas fa-square"></i>
      </div>

      <div class="card shadow-lg border-0 p-4 fade-in-up auth-card">
        <h2 class="section-title mb-4">Iniciar sesión</h2>

        <form @submit.prevent="loginUser">
          <div class="mb-3 fade-in-up delay-1">
            <label class="form-label fw-semibold text-white" for="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              class="form-control futuristic-input"
              v-model="correo"
              required
              placeholder="ejemplo@correo.com"
              :disabled="loading"
            />
          </div>

          <div class="mb-4 fade-in-up delay-2">
            <label class="form-label fw-semibold text-white" for="password">Contraseña</label>
            <input
              type="password"
              id="password"
              class="form-control futuristic-input"
              v-model="password"
              required
              placeholder="••••••••"
              :disabled="loading"
            />
          </div>

          <button type="submit" class="btn btn-futuristic w-100 fw-semibold py-2" :disabled="loading">
            <span v-if="!loading">Iniciar sesión</span>
            <span v-else>
              <span class="spinner-border spinner-border-sm me-2" role="status"></span>
              Iniciando sesión...
            </span>
          </button>
        </form>

        <!-- Enlace de recuperación -->
        <p class="text-center mt-3">
          <a href="#" class="forgot-link" @click.prevent="showForgotModal = true">
            ¿Olvidaste tu contraseña?
          </a>
        </p>

        <p class="text-center mt-4 mb-0 text-light fade-in-up delay-3">
          ¿No tienes cuenta?
          <a href="#" class="fw-semibold text-primary text-decoration-none" @click.prevent="goToRegister">
            Regístrate aquí
          </a>
        </p>

        <div v-if="message" class="alert alert-info text-center mt-3">
          {{ message }}
        </div>

        <div v-if="error" class="alert alert-danger mt-3 text-center fade-in">
          {{ error }}
        </div>
      </div>
    </section>

    <!-- MODAL de recuperación -->
    <div v-if="showForgotModal" class="modal-backdrop">
      <div class="modal-content">
        <h3>Recuperar contraseña</h3>
        <p class="text-light">Ingresa tu correo electrónico para recibir un enlace de restablecimiento.</p>

        <input
          type="email"
          v-model="forgotEmail"
          placeholder="tuemail@dominio.com"
          class="form-control futuristic-input mb-3"
          :disabled="sendingRecovery"
        />

        <div class="d-flex justify-content-between">
          <button class="btn btn-secondary px-3" @click="showForgotModal = false">Cancelar</button>
          <button
            class="btn btn-futuristic px-3"
            @click="sendRecovery"
            :disabled="sendingRecovery"
          >
            <span v-if="!sendingRecovery">Enviar enlace</span>
            <span v-else>
              <span class="spinner-border spinner-border-sm me-2" role="status"></span>
              Enviando...
            </span>
          </button>
        </div>

        <div v-if="forgotMessage" class="alert alert-info text-center mt-3">
          {{ forgotMessage }}
        </div>

        <div v-if="forgotError" class="alert alert-danger text-center mt-3">
          {{ forgotError }}
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="footer-section">
      <div class="container text-center">
        <small>© 2025 CrudCloud. Todos los derechos reservados.</small>
      </div>
    </footer>
  </div>
</template>

<script>
import { loginUser } from "@/api/userApi";
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      correo: "",
      password: "",
      error: null,
      message: "",
      loading: false,
      isScrolled: false,

      // recuperación
      showForgotModal: false,
      forgotEmail: "",
      sendingRecovery: false,
      forgotMessage: "",
      forgotError: ""
    };
  },
  mounted() {
    if (this.$route.query.registered == "true") {
      this.message = "Se te ha enviado un correo para verificar tu cuenta.";
      setTimeout(() => (this.message = ""), 10000);
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async loginUser() {
      this.error = null;
      this.message = "";

      if (!this.correo || !this.password) {
        this.error = "Por favor, complete todos los campos.";
        return;
      }

      this.loading = true;

      try {
        const credentials = {
          correo: this.correo,
          contraseña: this.password
        };

        const data = await loginUser(credentials);
        if (data.token) localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user && !data.user.EmailVerified) {
          this.$router.push("/verify-notice");
        } else {
          this.$router.push("/dashboard");
        }
      } catch (err) {
        this.error = err.response?.data?.message || err.message || "Error al iniciar sesión.";
      } finally {
        this.loading = false;
      }
    },

    async sendRecovery() {
      this.forgotError = "";
      this.forgotMessage = "";

      if (!this.forgotEmail) {
        this.forgotError = "Por favor, ingresa tu correo electrónico.";
        return;
      }

      this.sendingRecovery = true;

      try {
        const response = await axios.post("https://service.quasar.andrescortes.dev/api/Users/forgot-password", {
          email: this.forgotEmail
        });
        this.forgotMessage =
          response.data.message || "Se ha enviado un enlace de recuperación a tu correo.";
      } catch (err) {
        this.forgotError =
          err.response?.data?.message || "Error al enviar el correo de recuperación.";
      } finally {
        this.sendingRecovery = false;
      }
    },

    goToRegister() {
      this.$router.push("/register");
    },
    goToWelcome() {
      this.$router.push("/");
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    }
  }
};
</script>

<style scoped>
/* === Mismos estilos que el tuyo, sin alterar === */
.login-page {
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #111122 0%, #0a0a17 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

.login-section {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 20px 60px;
  position: relative;
}

.auth-card {
  background: var(--card-bg) !important;
  border-radius: 15px;
  border: 1px solid rgba(0, 247, 255, 0.1);
  max-width: 420px;
  width: 100%;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(8px);
}

/* Animaciones */
.fade-in {
  opacity: 0;
  animation: fadeIn 1s forwards;
}
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 1s forwards;
}
.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }

@keyframes fadeIn { to { opacity: 1; } }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

/* Navbar con efecto scroll */
.navbar {
  background-color: rgba(10, 10, 23, 0.9) !important;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  border-bottom: 1px solid rgba(0, 247, 255, 0.2);
  z-index: 1000;
}
.navbar.scrolled {
  background-color: rgba(5, 5, 16, 0.95) !important;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
}

.navbar-brand {
  font-size: 1.8rem;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.5);
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  cursor: pointer;
}

/* Inputs, botones, grid y flotantes */
.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Oswald', sans-serif;
}
.futuristic-input {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(0, 247, 255, 0.2) !important;
  border-radius: 10px;
  color: white !important;
  transition: all 0.3s ease;
}
.futuristic-input:focus {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: var(--primary) !important;
  box-shadow: 0 0 10px rgba(0, 247, 255, 0.3) !important;
  color: white !important;
}
.futuristic-input::placeholder {
  color: rgba(255, 255, 255, 0.6) !important;
}
.btn-futuristic {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border: none;
  color: var(--darker-bg);
  font-weight: 600;
  padding: 12px 30px;
  border-radius: 50px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 247, 255, 0.4);
  z-index: 1;
}
.btn-futuristic:disabled { opacity: 0.7; cursor: not-allowed; }
.btn-futuristic:not(:disabled):hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 247, 255, 0.6);
}

/* Fondo cuadriculado */
.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(0, 247, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 247, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 0;
  opacity: 0.3;
}

/* Elementos flotantes */
.floating-element { position: absolute; z-index: 1; opacity: 0.7; }
.floating-element-1 { top: 20%; left: 10%; animation: float 6s ease-in-out infinite; }
.floating-element-2 { top: 70%; right: 15%; animation: float 8s ease-in-out infinite; }
.floating-element-1 i { font-size: 30px; color: var(--primary); }
.floating-element-2 i { font-size: 40px; color: var(--secondary); }

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

.footer-section {
  background: var(--dark-bg);
  border-top: 1px solid rgba(0, 247, 255, 0.1);
  padding: 2rem 0 1.5rem;
}

/* Variables */
:root {
  --primary: #00f7ff;
  --primary-dark: #00c2cb;
  --secondary: #6c63ff;
  --dark-bg: #0a0a17;
  --darker-bg: #050510;
  --card-bg: #111128;
  --accent: #ff2a6d;
  --text-light: #e0e0ff;
}

body {
  font-family: 'Oswald', sans-serif;
  background-color: var(--darker-bg);
  color: var(--text-light);
  overflow-x: hidden;
}
h1, h2, h3, h4, h5, .navbar-brand {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
}
.text-light { color: var(--text-light) !important; }

.alert {
  border: none;
  border-radius: 10px;
}
.alert-danger {
  background: rgba(220, 53, 69, 0.2);
  color: #ff6b6b;
  border: 1px solid rgba(220, 53, 69, 0.3);
}
.alert-info {
  background: rgba(23, 162, 184, 0.2);
  color: #6bdfff;
  border: 1px solid rgba(23, 162, 184, 0.3);
}
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(5, 5, 15, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: #111128;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(0, 247, 255, 0.3);
  width: 90%;
  max-width: 400px;
  color: white;
  box-shadow: 0 0 20px rgba(0, 247, 255, 0.4);
  text-align: center;
  animation: fadeUp 0.5s ease;
}

.forgot-link {
  color: var(--primary);
  text-decoration: none;
  transition: all 0.3s ease;
}
.forgot-link:hover {
  text-decoration: underline;
  color: var(--secondary);
}
</style>
