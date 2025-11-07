<template>
  <div class="register-page text-white">

    <!-- HEADER -->
    <nav class="navbar navbar-expand-lg py-3 fixed-top shadow-sm" style="background-color: #0a0a17;">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center fw-bold text-white" href="#" @click="goToWelcome">
          <img src="@/assets/logo.png" alt="Logo" height="40" class="me-2" />
          Cloud Platform
        </a>
      </div>
    </nav>

    <!-- FORMULARIO -->
    <section class="register-section  d-flex align-items-center justify-content-center" style="border-radius: 30px;">
      <div
        v-if="!showVerification"
        class="card border-0 shadow-lg p-4 fade-up"
        style="max-width: 450px; width: 100%; background-color: rgba(30, 30, 50, 0.9);"
      >
        <h2 class="text-center fw-bold mb-4 text-white">Crear cuenta</h2>

        <form @submit.prevent="registerUser">
          <div class="mb-3">
            <label class="form-label fw-semibold text-white" for="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              class="form-control bg-transparent text-white border-light"
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
              class="form-control bg-transparent text-white border-light"
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
              class="form-control bg-transparent text-white border-light"
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
              class="form-control bg-transparent text-white border-light"
              placeholder="********"
              v-model="password"
              required
            />
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold text-white" for="confirm">Confirmar contraseña</label>
            <input
              type="password"
              id="confirm"
              class="form-control bg-transparent text-white border-light"
              placeholder="********"
              v-model="confirmPassword"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary w-100 fw-semibold py-2 shadow-sm">Registrarse</button>
        </form>

        <div v-if="error" class="alert alert-danger mt-3 text-center">{{ error }}</div>
        <div v-if="success" class="alert alert-success mt-3 text-center">{{ success }}</div>

        <p class="text-center mt-4 mb-0 text-light-emphasis">
          ¿Ya tienes una cuenta?
          <a href="#" class="fw-semibold text-primary" @click.prevent="goToLogin">Inicia sesión</a>
        </p>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="text-center py-3 mt-5" style="background-color: #0a0a17; color: white;">
      <small>© 2025 Cloud Platform — Todos los derechos reservados.</small>
    </footer>

  </div>
</template>

<script>
import axios from "axios";

const API_URL = "https://service.quasar.andrescortes.dev/api/Users/register";

export default {
  name: "Register",
  data() {
    return {
      nombre: "",
      apellido: "",
      correo: "",
      password: "",
      confirmPassword: "",
      showVerification: false,
      error: "",
      success: ""
    };
  },
  methods: {
    async registerUser() {
      this.error = "";
      this.success = "";

      if (this.password !== this.confirmPassword) {
        this.error = "Las contraseñas no coinciden";
        return;
      }

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
        this.$router.push("/login");
      } catch (error) {

        if (error.response && error.response.data && error.response.data.message) {
          this.error = error.response.data.message;
        } else {
          this.error = "Error al registrar el usuario.";
        }
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
    goToWelcome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(ellipse at center, #111122 0%, #0a0a17 100%);
}

/* Centrar correctamente el formulario */
.register-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  padding-bottom: 60px;
}

/* Animaciones suaves */
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

/* Inputs oscuros */
.form-control {
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}
.form-control::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

/* Botón */
.btn-primary {
  background-color: #4d7c8a;
  border: none;
  transition: all 0.2s ease-in-out;
}
.btn-primary:hover {
  background-color: #5a93a2;
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(77, 124, 138, 0.6);
}

/* Navbar efecto al hacer scroll */
.navbar {
  transition: background-color 0.4s ease, box-shadow 0.4s ease;
}
.navbar.scrolled {
  background-color: #0a0a17cc !important;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);
}

/* Footer */
footer {
  font-size: 0.9rem;
}
</style>
