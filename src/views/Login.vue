<template>
  <div class="login-page">
    
    <nav class="navbar navbar-expand-lg shadow-sm py-3" style="background-color: #1B4079;">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center text-white fw-bold" @click="goToWelcome" href="#">
          <img src="@/assets/logo.png" alt="Logo" height="40" class="me-2" />
          Cloud Platform
        </a>
      </div>
    </nav>

    
    <section class="login-section d-flex align-items-center justify-content-center">
      <div class="card shadow-lg border-0 p-4" style="max-width: 450px; width: 100%; background-color: #ffffffd8;">
        <h2 class="text-center fw-bold mb-4" style="color: #1B4079;">Iniciar sesión</h2>

        <form @submit.prevent="loginUser">
          <div class="mb-3">
            <label class="form-label fw-semibold" for="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              class="form-control"
              v-model="correo"
              required
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold" for="password">Contraseña</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="password"
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" class="btn w-100 text-white fw-semibold" @click="goToDashboard" style="background-color: #1B4079;">
            Iniciar sesión
          </button>
        </form>

        <p class="text-center mt-4 mb-0 text-muted">
          ¿No tienes cuenta?
          <a href="#" class="fw-semibold" style="color: #4D7C8A;" @click.prevent="goToRegister">Regístrate aquí</a>
        </p>
      </div>
    </section>

   
    <footer class="text-center py-3 mt-5" style="background-color: #1B4079; color: white;">
      <small>© 2025 Cloud Platform — Todos los derechos reservados.</small>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Login",    
  data() {
    return {
      correo: "",
      password: ""
    }
  },
  methods: {
    loginUser() {
      if (!this.correo || !this.password) {
        alert("Por favor, complete todos los campos.")
        return
      }

     
      console.log("Intentando iniciar sesión con:", this.correo)
      alert("Inicio de sesión simulado con éxito.")
    },
    goToRegister() {
      this.$router.push("/register")
    },
    goToWelcome() {
      this.$router.push("/")
    },
    goToDashboard() {
      this.$router.push("/dashboard")
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #cfe4ef 0%, #e7f2dc 100%);
  display: flex;
  flex-direction: column;
}

.login-section {
  flex-grow: 1;
}


.form-control {
  border-radius: 8px;
  border: 1px solid #b7c9cc;
}
.form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(27, 64, 121, 0.25);
  border-color: #1B4079;
}


.btn:hover {
  background-color: #4D7C8A !important;
}

.card {
  border-radius: 16px;
}
</style>
