<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow p-4 text-center" style="max-width: 420px; width: 100%;">
      <div v-if="loading">
        <div class="spinner-border text-primary mb-3" role="status"></div>
        <h5>Verificando tu cuenta...</h5>
        <p class="text-muted small">Por favor espera un momento.</p>
      </div>

      <div v-else-if="success">
        <i class="bi bi-check-circle-fill text-success fs-1 mb-3"></i>
        <h5>¡Cuenta verificada exitosamente!</h5>
        <p class="text-muted small">
          Ya puedes acceder a tu cuenta y comenzar a usar la plataforma.
        </p>
        <button class="btn btn-success w-100 mt-3" @click="goToDashboard">
          Ir al Dashboard
        </button>
      </div>

      <div v-else>
        <i class="bi bi-x-circle-fill text-danger fs-1 mb-3"></i>
        <h5>Hubo un problema</h5>
        <p class="text-muted small">{{ errorMessage }}</p>
        <router-link to="/login" class="btn btn-outline-primary w-100 mt-3">
          Volver al inicio de sesión
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { verifyEmail } from "@/api/userApi";

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const success = ref(false);
const errorMessage = ref("");

onMounted(async () => {
  const token = route.query.token;

  if (!token) {
    loading.value = false;
    errorMessage.value = "Token de verificación no encontrado.";
    return;
  }

  try {
    const response = await verifyEmail(token);
    console.log(response);
    success.value = true;
  } catch (error) {
    errorMessage.value = error.message || "Error al verificar el correo.";
  } finally {
    loading.value = false;
  }
});

const goToDashboard = () => {
  router.push("/dashboard");
};
</script>

<style scoped>
.card {
  border-radius: 1rem;
  background-color: #ffffff;
}
.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
