<template>
  <div class="verify-page bg-dark text-white d-flex flex-column min-vh-100">

    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg py-3 shadow-sm" style="background-color: #0a0a17;">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center text-white fw-bold" href="#">
          <img src="@/assets/logo.png" alt="CrudCloud" height="40" class="me-2" />
          CrudCloud
        </a>
      </div>
    </nav>

    <!-- CONTENIDO -->
    <section class="flex-grow-1 d-flex align-items-center justify-content-center">
      <div
        class="card text-center shadow-lg border-0 p-4"
        style="max-width: 500px; width: 100%; background-color: #181826; border-radius: 20px;"
      >

        <!-- Estado de carga -->
        <div v-if="loading" class="my-5">
          <div class="spinner-border text-primary" role="status"></div>
          <p class="mt-3 mb-0 text-light-emphasis fw-semibold">
            Verificando tu correo, por favor espera...
          </p>
        </div>

        <!-- Éxito -->
        <div v-else-if="success" class="my-5">
          <i class="bi bi-check-circle-fill text-success" style="font-size: 3rem;"></i>
          <h4 class="mt-3 fw-bold text-primary">¡Correo verificado exitosamente!</h4>
          <p class="text-light-emphasis mb-3">Ya puedes iniciar sesión en tu cuenta.</p>
          <router-link
            to="/login"
            class="btn btn-primary rounded-pill px-4 fw-semibold"
          >
            Ir al login
          </router-link>
        </div>

        <!-- Error -->
        <div v-else class="my-5">
          <i class="bi bi-x-circle-fill text-danger" style="font-size: 3rem;"></i>
          <h4 class="mt-3 fw-bold text-primary">Error al verificar el correo</h4>
          <p class="text-light-emphasis">{{ message }}</p>
          <router-link
            to="/"
            class="btn btn-outline-danger rounded-pill px-4 fw-semibold"
          >
            Volver al inicio
          </router-link>
        </div>

      </div>
    </section>

    <!-- FOOTER -->
    <footer class="text-center py-3" style="background-color: #0a0a17;">
      <small class="text-light-emphasis">
        © 2025 CrudCloud — Todos los derechos reservados.
      </small>
    </footer>

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
      this.message = "Token no proporcionado.";
      return;
    }

    try {
      const response = await verifyEmail(token);
      this.success = true;
      this.message = response?.message || "Verificación completada.";
    } catch (error) {
      this.success = false;
      this.message = error.message || "No se pudo verificar el correo.";
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.verify-page {
  background: radial-gradient(ellipse at center, #111122 0%, #0a0a17 100%);
  color: white;
}

.card {
  border-radius: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.25);
}

/* Animación de entrada */
section {
  animation: fadeInUp 0.8s ease both;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Texto sutil */
.text-light-emphasis {
  color: rgba(255, 255, 255, 0.6) !important;
}
</style>
