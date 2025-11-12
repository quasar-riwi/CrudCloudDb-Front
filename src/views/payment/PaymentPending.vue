<template>
  <div class="payment-page pending">
    <div class="card">
      <div class="icon pending-icon">⏳</div>
      <h1>Pago Pendiente</h1>
      <p>Tu pago está siendo procesado por Mercado Pago.</p>
      <p class="highlight">Te notificaremos cuando se confirme el estado.</p>
      <button @click="$router.push('/dashboard')" class="btn">Ir al Panel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentPending",
};
</script>

<style scoped>
.payment-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #0b0b0f, #030304);
  color: #fff;
}

.card {
  background: rgba(10, 20, 30, 0.8);
  border: 2px solid #00d9ff;
  border-radius: 20px;
  padding: 40px 60px;
  text-align: center;
  box-shadow: 0 0 30px #00d9ff88;
  backdrop-filter: blur(10px);
}

h1 {
  color: #00d9ff;
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.highlight {
  color: #00ffae;
  margin-bottom: 20px;
}

.pending-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #00d9ff;
  animation: rotate 2s linear infinite;
}

.btn {
  background: linear-gradient(90deg, #00d9ff, #00ffae);
  border: none;
  padding: 10px 20px;
  color: #000;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn:hover {
  transform: scale(1.05);
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
