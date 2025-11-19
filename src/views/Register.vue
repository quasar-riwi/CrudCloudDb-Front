<template>
  <div class="register-page">

    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg py-3 fixed-top" :class="{ 'scrolled': isScrolled }">
      <div class="container">
        <a class="navbar-brand" href="#" @click="goToWelcome">
          <i class="fas fa-database me-2"></i>CrudCloud
        </a>
      </div>
    </nav>

    <!-- FORMULARIO -->
    <section class="register-section">
      <div class="grid-pattern"></div>

      <!-- Elementos flotantes -->
      <div class="floating-element floating-element-1">
        <i class="fas fa-circle"></i>
      </div>
      <div class="floating-element floating-element-2">
        <i class="fas fa-square"></i>
      </div>

      <div
        v-if="!showVerification"
        class="card border-0 shadow-lg p-4 fade-up auth-card"
      >
        <h2 class="section-title mb-4">Crear cuenta</h2>

        <form @submit.prevent="registerUser">
          <div class="mb-3">
            <label class="form-label fw-semibold text-white" for="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              class="form-control futuristic-input"
              placeholder="Tu nombre"
              v-model="nombre"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold text-white" for="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              class="form-control futuristic-input"
              placeholder="Tu apellido"
              v-model="apellido"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold text-white" for="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              class="form-control futuristic-input"
              placeholder="ejemplo@correo.com"
              v-model="correo"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold text-white" for="password">Contraseña</label>
            <input
              type="password"
              id="password"
              class="form-control futuristic-input"
              placeholder="********"
              v-model="password"
              required
            />
          </div>

          <div class="mb-2">
            <label class="form-label fw-semibold text-white" for="confirm">Confirmar contraseña</label>
            <input
              type="password"
              id="confirm"
              class="form-control futuristic-input"
              placeholder="********"
              v-model="confirmPassword"
              required
            />
          </div>

          <!-- Mensaje dinámico de coincidencia -->
          <div v-if="password && confirmPassword" class="text-center mb-3">
            <small
              v-if="passwordsMatch"
              class="text-success fw-semibold"
            >✔ Las contraseñas coinciden</small>
            <small
              v-else
              class="text-danger fw-semibold"
            >✖ Las contraseñas no coinciden</small>
          </div>

          <!-- Botón con spinner -->
          <button type="submit" class="btn btn-futuristic w-100 fw-semibold py-2" :disabled="loading || !passwordsMatch">
            <span v-if="!loading">Registrarse</span>
            <span v-else>
              <span class="spinner-border spinner-border-sm me-2" role="status"></span>
              Registrando...
            </span>
          </button>
        </form>

        <div v-if="error" class="alert alert-danger mt-3 text-center">{{ error }}</div>
        <div v-if="success" class="alert alert-success mt-3 text-center">{{ success }}</div>

        <p class="text-center mt-4 mb-0 text-light">
          ¿Ya tienes una cuenta?
          <a href="#" class="fw-semibold text-primary text-decoration-none" @click.prevent="goToLogin">Inicia sesión</a>
        </p>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer-section">
      <div class="container text-center">
        <small>© 2025 CrudCloud — Todos los derechos reservados.</small>
      </div>
    </footer>

  </div>
</template>

<script>
import axios from "axios";

const API_URL = "https://service.quasar.andrescortes.dev/api/Users/register";

export default {
  name: "RegisterPage",
  data() {
    return {
      nombre: "",
      apellido: "",
      correo: "",
      password: "",
      confirmPassword: "",
      showVerification: false,
      error: "",
      success: "",
      loading: false,
      isScrolled: false
    };
  },
  computed: {
    passwordsMatch() {
      return this.password === this.confirmPassword;
    },
  },
  methods: {
    async registerUser() {
      this.error = "";
      this.success = "";

      if (!this.passwordsMatch) {
        this.error = "Las contraseñas no coinciden";
        return;
      }

      this.loading = true;

      try {
        await axios.post(API_URL, {
          nombre: this.nombre,
          apellido: this.apellido,
          correo: this.correo,
          contraseña: this.password,
          confirmarContraseña: this.confirmPassword,
          plan: "Gratis",
        });

        this.success = "Usuario registrado correctamente.";
        setTimeout(() => {
          this.$router.push({ path: "/login", query: { registered: "true" } });
        }, 1000);
      } catch (error) {
        if (error.response?.data?.message) {
          this.error = error.response.data.message;
        } else {
          this.error = "Error al registrar el usuario.";
        }
      } finally {
        this.loading = false;
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
    goToWelcome() {
      this.$router.push("/");
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(ellipse at center, #111122 0%, #0a0a17 100%);
  position: relative;
  overflow-x: hidden;
}

.register-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 20px 60px;
  position: relative;
}

.auth-card {
  background: var(--card-bg) !important;
  border-radius: 15px;
  border: 1px solid rgba(0, 247, 255, 0.1);
  max-width: 450px;
  width: 100%;
  position: relative;
  z-index: 2;
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

/* Heredar estilos del landing */
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
}

.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Oswald', sans-serif;
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

.btn-futuristic:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-futuristic:not(:disabled):hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 247, 255, 0.6);
}

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

.floating-element {
  position: absolute;
  z-index: 1;
  opacity: 0.7;
}

.floating-element-1 {
  top: 20%;
  left: 10%;
  animation: float 6s ease-in-out infinite;
}

.floating-element-2 {
  top: 70%;
  right: 15%;
  animation: float 8s ease-in-out infinite;
}

.floating-element i {
  color: var(--primary);
}

.floating-element-1 i {
  font-size: 30px;
  color: var(--primary);
}

.floating-element-2 i {
  font-size: 40px;
  color: var(--secondary);
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

.fade-up {
  opacity: 0;
  transform: translateY(25px);
  animation: fadeUp 1s ease forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.footer-section {
  background: var(--dark-bg);
  border-top: 1px solid rgba(0, 247, 255, 0.1);
  padding: 2rem 0 1.5rem;
}

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

.text-light {
  color: var(--text-light) !important;
}

.alert {
  border: none;
  border-radius: 10px;
}

.alert-danger {
  background: rgba(220, 53, 69, 0.2);
  color: #ff6b6b;
  border: 1px solid rgba(220, 53, 69, 0.3);
}

.alert-success {
  background: rgba(40, 167, 69, 0.2);
  color: #6bff8d;
  border: 1px solid rgba(40, 167, 69, 0.3);
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
</style>
