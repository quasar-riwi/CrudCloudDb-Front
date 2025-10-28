<template>
  <div class="verification-wrapper d-flex justify-content-center align-items-center">
    <div class="card shadow-lg p-4 border-0" style="max-width: 400px; width: 100%; background-color: #ffffffd8;">
      <h4 class="text-center fw-bold mb-3" style="color: #1B4079;">
        Verificación de código
      </h4>

      <p class="text-center mb-4 text-muted">
        Hemos enviado un código de verificación a <strong>{{ email }}</strong>.
      </p>

      <input v-model="code" type="text"
        maxlength="6" class="form-control text-center fw-bold mb-3" placeholder="Ingresa el código" style="font-size: 1.5rem; letter-spacing: 4px;"/>

      <button class="btn w-100 text-white fw-semibold mb-3" style="background-color: #1B4079;" @click="verifyCode"
        :disabled="loading">
        {{ loading ? "Verificando..." : "Confirmar código" }}
      </button>

      <div class="text-center">
        <button class="btn btn-link p-0" @click="resendCode" :disabled="cooldown > 0" style="color: #4D7C8A;">
          {{ cooldown > 0 ? `Reenviar código en ${cooldown}s` : "Reenviar código" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";

const props = defineProps({
  email: { type: String, required: true },
  type: { type: String, default: "register" }  
});

const emit = defineEmits(["verified"]);

const code = ref("");
const loading = ref(false);
const cooldown = ref(0);
let timer = null;

// Verify code
const verifyCode = async () => {
  loading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Example verification logic
    if (code.value === "123456") {
      alert(" Código verificado correctamente");
      emit("verified", true);
    } else {
      alert(" Código incorrecto");
      emit("verified", false);
    }
  } finally {
    loading.value = false;
  }
};


const resendCode = async () => {
  alert(`Código reenviado a ${props.email}`);
  startCooldown();
};


const startCooldown = () => {
  cooldown.value = 30;
  clearInterval(timer);
  timer = setInterval(() => {
    if (cooldown.value > 0) cooldown.value--;
    else clearInterval(timer);
  }, 1000);
};

onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
.verification-wrapper {
  min-height: 100vh;
 
}
.card {
  border-radius: 16px;
}
</style>
