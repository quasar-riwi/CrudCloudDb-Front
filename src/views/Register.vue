<template>
  <div class="register-page">
    <nav class="navbar navbar-expand-lg shadow-sm py-3" style="background-color: #1B4079;">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center text-white fw-bold" @click="goToWelcome" href="#">
          <img src="@/assets/logo.png" alt="Logo" height="90" class="me-2" />
          
        </a>
      </div>
    </nav>

    <section class="register-section d-flex align-items-center mt-5 justify-content-center">
      <div v-if="!showVerification" class="card shadow-lg border-0 p-4" style="max-width: 450px; width: 100%; background-color: #ffffffd8;">
        <h2 class="text-center fw-bold mb-4" style="color: #1B4079;">Crear cuenta</h2>

        <form @submit.prevent="registerUser">
          <div class="mb-3">
            <label class="form-label fw-semibold" for="nombre">Nombre</label>
            <input type="text" id="nombre" class="form-control" v-model="nombre" required />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold" for="apellido">Apellido</label>
            <input type="text" id="apellido" class="form-control" v-model="apellido" required />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold" for="correo">Correo electrónico</label>
            <input type="email" id="correo" class="form-control" v-model="correo" required />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold" for="password">Contraseña</label>
            <input type="password" id="password" class="form-control" v-model="password" required />
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold" for="confirm">Confirmar contraseña</label>
            <input type="password" id="confirm" class="form-control" v-model="confirmPassword" required />
          </div>

          <button type="submit" class="btn w-100 text-white fw-semibold" style="background-color: #1B4079;">
            Registrarse
          </button>
        </form>

        <div v-if="error" class="alert alert-danger mt-3 text-center">
          {{ error }}
        </div>

        <div v-if="success" class="alert alert-success mt-3 text-center">
          {{ success }}
        </div>

        <p class="text-center mt-4 mb-0 text-muted">
          ¿Ya tienes una cuenta?
          <a href="#" class="fw-semibold" style="color: #4D7C8A;" @click.prevent="goToLogin">Inicia sesión</a>
        </p>
      </div>
    </section>

    <footer class="text-center py-3 mt-5" style="background-color: #1B4079; color: white;">
      <small>© 2025 Cloud Platform — Todos los derechos reservados.</small>
    </footer>
  </div>
</template>


<script>
import axios from "axios";

const API_URL = "http://localhost:5005/api/Users/register";

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
        const response = await axios.post(API_URL, {
          nombre: this.nombre,
          apellido: this.apellido,
          correo: this.correo,
          contraseña: this.password,
          confirmarContraseña: this.confirmPassword,
          plan: "Gratis"
        });

       
        this.success = "Usuario registrado correctamente.";
        this.$router.push("/login");
      } catch (error) {
        
        if (error.response && error.response.data && error.response.data.message) {
          this.error =  error.response.data.message ;
        } else {
          this.error =  error.response.data.message;
        }
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
    goToWelcome() {
      this.$router.push("/");
    }
  }
};
</script>
<style>
.register-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.register-section {
  flex: 1;
}
</style>
