<template>
  <div class="plans-page">
    <h2 class="title">Elige el plan que mejor se adapte a ti</h2>

    <div class="plans-container">

      <div
        class="plan-card free"
        :class="{ disabled: userPlan === 'Gratis' }"
      >
        <div class="plan-header">
          <h3>Plan Gratuito</h3>
          <p class="subtitle">Ideal para empezar</p>
        </div>
        <p class="description">Hasta <strong>2 bases de datos</strong> por motor.</p>
        <p class="price">💸 $0 COP / mes</p>

        <button
          class="btn-select"
          :disabled="userPlan === 'Gratis'"
        >
          {{ userPlan === 'Gratis' ? 'Plan actual ' : 'Seleccionar' }}
        </button>
      </div>


      <div
        class="plan-card medium"
        :class="{ disabled: userPlan === 'Intermedio' }"
      >
        <div class="plan-header">
          <h3>Plan Intermedio</h3>
          <p class="subtitle">Perfecto para proyectos pequeños</p>
        </div>
        <p class="description">Hasta <strong>5 bases de datos</strong> por motor.</p>
        <p class="price">💰 $5.000 COP / mes</p>

        <button
          class="btn-select"
          :disabled="userPlan === 'Intermedio'"
        >
          {{ userPlan === 'Intermedio' ? 'Plan actual ✅' : 'Seleccionar' }}
        </button>
      </div>

      <div
        class="plan-card pro"
        :class="{ disabled: userPlan === 'Avanzado' }"
      >
        <div class="plan-header">
          <h3>Plan Avanzado</h3>
          <p class="subtitle">Para empresas o proyectos grandes</p>
        </div>
        <p class="description">Hasta <strong>10 bases de datos</strong> por motor.</p>
        <p class="price">💎 $10.000 COP / mes</p>

        <button
          class="btn-select"
          :disabled="userPlan === 'Avanzado'"
        >
          {{ userPlan === 'Avanzado' ? 'Plan actual ✅' : 'Seleccionar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Plans",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    userPlan() {
      return this.user?.plan || '';
    }
  }
};
</script>

<style scoped>
.plans-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #0b0e1a 0%, #101223 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  padding: 2rem;
  color: #f0f0f0;
}

.title {
  color: #4f8cff;
  font-weight: 700;
  font-size: 2.2rem;
  margin-bottom: 3rem;
  text-align: center;
  text-shadow: 0 0 15px rgba(79, 140, 255, 0.3);
}

.plans-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
}

.plan-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(79, 140, 255, 0.2);
  border-radius: 20px;
  padding: 3rem 2rem;
  width: 360px;
  height: 460px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(79, 140, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(8px);
}

.plan-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(79, 140, 255, 0.25);
}

.plan-header h3 {
  color: #4f8cff;
  font-weight: 700;
  font-size: 1.6rem;
  margin-bottom: 0.3rem;
}

.subtitle {
  color: #a0a0a0;
  font-size: 0.95rem;
}

.description {
  color: #cfd8ff;
  font-size: 1.05rem;
  margin-bottom: 1.8rem;
  line-height: 1.5;
}

.price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
}

/* Botón */
.btn-select {
  background: linear-gradient(90deg, #0d47a1, #1b74ff);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 0.9rem 2rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(79, 140, 255, 0.3);
}

.btn-select:hover {
  background: linear-gradient(90deg, #1b74ff, #4f8cff);
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(79, 140, 255, 0.5);
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
  transform: none !important;
}

@media (max-width: 768px) {
  .plans-container {
    flex-direction: column;
    align-items: center;
  }

  .plan-card {
    width: 90%;
    max-width: 400px;
    height: auto;
  }
}
</style>
