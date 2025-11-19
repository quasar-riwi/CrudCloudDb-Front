<template>
  <div class="payment-page success">
    <div class="bg-decor" aria-hidden="true"></div>
    <div class="card">
      <div class="icon success-icon">✔</div>
      <h1>¡Pago Exitoso!</h1>
      <p>Tu transacción fue procesada correctamente.</p>
      <p class="highlight">Gracias por confiar en Quasar Cloud.</p>
      <button @click="$router.push('/dashboard')" class="btn">Volver al Panel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentSuccess",
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

/* Fondo creativo sutil para páginas de pago */
.payment-page {
  position: relative;
  overflow: hidden;
}
.payment-page::before,
.payment-page::after {
  content: '';
  position: absolute;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  filter: blur(64px);
  opacity: 0.13;
  z-index: 0;
}
.payment-page::before {
  left: -6%;
  top: -8%;
  background: radial-gradient(circle at 30% 30%, rgba(0,217,255,0.9), rgba(108,99,255,0.5));
  animation: floatSlow 12s ease-in-out infinite;
}
.payment-page::after {
  right: -6%;
  bottom: -8%;
  background: radial-gradient(circle at 70% 70%, rgba(255,42,109,0.75), rgba(108,99,255,0.35));
  animation: floatSlowReverse 14s ease-in-out infinite;
}
.payment-page .card { position: relative; z-index: 1; }

.card {
  background: rgba(20, 20, 30, 0.8);
  border: 2px solid #00ffae;
  border-radius: 20px;
  padding: 40px 60px;
  text-align: center;
  box-shadow: 0 0 30px #00ffae88;
  backdrop-filter: blur(10px);
}

h1 {
  color: #00ffae;
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.highlight {
  color: #00d9ff;
  margin-bottom: 20px;
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #00ffae;
  animation: pulse 1.5s infinite;
}

.btn {
  background: linear-gradient(90deg, #00ffae, #00d9ff);
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

@keyframes pulse {
  0% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.8; transform: scale(1); }
}

@keyframes floatSlow {
  0% { transform: translateY(0) translateX(0) scale(1); }
  50% { transform: translateY(-26px) translateX(8px) scale(1.05); }
  100% { transform: translateY(0) translateX(0) scale(1); }
}
@keyframes floatSlowReverse {
  0% { transform: translateY(0) translateX(0) scale(1); }
  50% { transform: translateY(26px) translateX(-8px) scale(1.03); }
  100% { transform: translateY(0) translateX(0) scale(1); }
}
</style>
