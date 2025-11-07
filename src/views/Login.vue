<template>
  <div class="login-page text-white">

    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg py-3 fixed-top animate-navbar" style="background-color: #0a0a17;">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center text-white fw-bold" @click="goToWelcome" href="#">
          <img src="@/assets/logo.png" alt="Logo" height="50" class="me-2 fade-in" />
          CrudCloud
        </a>
      </div>
    </nav>

    <!-- LOGIN -->
    <section class="login-section d-flex align-items-center justify-content-center">
      <div class="card shadow-lg border-0 p-4 fade-in-up" style="max-width: 420px; width: 100%; background-color: #181826;">
        <h2 class="text-center fw-bold mb-4 text-primary">Iniciar sesión</h2>

        <form @submit.prevent="loginUser">
          <div class="mb-3 fade-in-up delay-1">
            <label class="form-label fw-semibold text-white"  for="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              class="form-control bg-dark text-white border-0 shadow-sm"
              v-model="correo"
              required
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div class="mb-4 fade-in-up delay-2">
            <label class="form-label fw-semibold text-white" for="password">Contraseña</label>
            <input
              type="password"
              id="password"
              class="form-control bg-dark text-white border-0 shadow-sm"
              v-model="password"
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" class="btn w-100 fw-semibold text-white btn-anim" style="background-color: #007bff;">
            Iniciar sesión
          </button>
        </form>

        <p class="text-center mt-4 mb-0 text-light-emphasis fade-in-up delay-3">
          ¿No tienes cuenta?
          <a href="#" class="fw-semibold link-primary text-decoration-none" @click.prevent="goToRegister">
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

    <!-- FOOTER -->
    <footer class="text-center py-3 fade-in" style="background-color: #0a0a17; color: rgba(255,255,255,0.8);">
      <small>© 2025 CrudCloud. Todos los derechos reservados.</small>
    </footer>

  </div>
</template>

<script>
import { loginUser } from "@/api/userApi";

export default {
  name: "Login",
  data() {
    return {
      correo: "",
      password: "",
      error: null,
      message: "",
    };
  },
  mounted() {
    if (this.$route.query.registered == "true") {
      this.message = "Se te ha enviado un correo para verificar tu cuenta.";

      // 🕒 Eliminar el mensaje después de 10 segundos
      setTimeout(() => {
        this.message = "";
      }, 10000);
    }
  },
  
  
  methods: {
      

    async loginUser() {
      this.error = null;

      if (!this.correo || !this.password) {
        this.error = "Por favor, complete todos los campos.";
        return;
      }

      try {
        const credentials = {
          correo: this.correo,
          contraseña: this.password
        };

        const data = await loginUser(credentials);
        console.log("Respuesta del backend:", data);

        if (data.token) localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user && !data.user.EmailVerified) {
          this.$router.push("/verify-notice"); 
        } else {
          this.$router.push("/dashboard");
        }

      } catch (err) {
        this.error = err.response?.data?.message || err.message || "Error al iniciar sesión.";
      }
    },

    goToRegister() {
      this.$router.push("/register");
    },
    goToWelcome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #111122 0%, #0a0a17 100%);
  display: flex;
  flex-direction: column;
  padding-top: 70px;
}

.login-section {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* INPUTS */
.form-control {
  border-radius: 10px;
  transition: all 0.3s ease;

}
.form-control:focus {
  outline: none;
  box-shadow: 0 0 12px rgba(0, 123, 255, 0.4);
}

/* BOTÓN */
.btn-anim {
  border-radius: 10px;
  transition: all 0.3s ease;
}
.btn-anim:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.7);
}

/* ANIMACIONES */
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

.animate-navbar {
  animation: slideDown 1s ease-out;
}

.text-light-emphasis {
  color: white;
}

/* KEYFRAMES */
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

/* CARD */
.card {
  border-radius: 20px;
  animation: fadeUp 1.2s forwards;
  backdrop-filter: blur(8px);
}
</style>
