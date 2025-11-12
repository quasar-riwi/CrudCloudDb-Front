<template>
  <div class="payment-page failure">
    <div class="card">
      <div class="icon failure-icon">✖</div>
      <h1>Pago Fallido</h1>
      <p>Ocurrió un error al procesar tu pago.</p>
      <p class="highlight">Verifica tu método de pago e inténtalo nuevamente.</p>
      <button @click="$router.push('/plans')" class="btn">Volver a Planes</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentFailure",
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
  background: rgba(30, 10, 10, 0.8);
  border: 2px solid #ff3d71;
  border-radius: 20px;
  padding: 40px 60px;
  text-align: center;
  box-shadow: 0 0 30px #ff3d7188;
  backdrop-filter: blur(10px);
}

h1 {
  color: #ff3d71;
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.highlight {
  color: #ff7eb3;
  margin-bottom: 20px;
}

.failure-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #ff3d71;
  animation: flicker 2s infinite;
}

.btn {
  background: linear-gradient(90deg, #ff3d71, #ff7eb3);
  border: none;
  padding: 10px 20px;
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn:hover {
  transform: scale(1.05);
}

@keyframes flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: 0.3; }
}
</style>
