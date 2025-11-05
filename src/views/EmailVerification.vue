<template>
  <div class="verify-page d-flex flex-column min-vh-100">


    <nav class="navbar navbar-expand-lg shadow-sm py-3" style="background-color: #1B4079;">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center text-white fw-bold" href="#">
          <img src="@/assets/logo.png" alt="Logo" height="40" class="me-2" />
          Cloud Platform
        </a>
      </div>
    </nav>


    <section class="flex-grow-1 d-flex align-items-center justify-content-center">
      <div class="card shadow-lg border-0 p-4 text-center" style="max-width: 500px; width: 100%; background-color: #ffffffd8; border-radius: 20px;">
        

        <div v-if="loading" class="my-5">
          <div class="spinner-border text-primary" role="status" style="color: #1B4079 !important;"></div>
          <p class="mt-3 mb-0 fw-semibold text-secondary">Verificando tu correo, por favor espera...</p>
        </div>

        
        <div v-else-if="success" class="my-5">
          <i class="bi bi-check-circle-fill" style="font-size: 3rem; color: #28a745;"></i>
          <h4 class="mt-3 fw-bold" style="color: #1B4079;">¡Correo verificado exitosamente!</h4>
          <p class="text-muted">Ya puedes iniciar sesión en tu cuenta.</p>
          <router-link to="/login" class="btn mt-3 text-white fw-semibold" style="background-color: #1B4079;">
            Ir al login
          </router-link>
        </div>

  
        <div v-else class="my-5">
          <i class="bi bi-x-circle-fill text-danger" style="font-size: 3rem;"></i>
          <h4 class="mt-3 fw-bold" style="color: #1B4079;">Error al verificar el correo</h4>
          <p class="text-muted">{{ message }}</p>
          <router-link to="/" class="btn mt-3 fw-semibold" style="border: 1px solid #dc3545; color: #dc3545;">
            Volver al inicio
          </router-link>
        </div>

      </div>
    </section>


    <footer class="text-center py-3" style="background-color: #1B4079; color: white;">
      <small>© 2025 Cloud Platform — Todos los derechos reservados.</small>
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
  background: linear-gradient(135deg, #cfe4ef 0%, #e7f2dc 100%);
}

.card {
  border-radius: 1.5rem;
  transition: transform 0.2s ease-in-out;
}
.card:hover {
  transform: translateY(-3px);
}
</style>
