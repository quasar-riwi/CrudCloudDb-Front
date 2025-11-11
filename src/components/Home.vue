<template>
  <div class="home-dashboard text-white">
    <!-- Header -->
    <header class="header text-center mb-5 fade-in-down">
      <h2 class="fw-bold">👋 {{ user ? user.nombre : 'Cargando...' }}</h2>
      <p>Bienvenido a tu panel de <strong>Cloud Platform</strong>.</p>
    </header>

    <!-- Stats -->
    <section class="container fade-in-up">
      <div class="row g-4 justify-content-center">
        <div
          class="col-md-3"
          v-for="(stat, i) in stats"
          :key="i"
        >
          <div
            class="card stat-card text-center p-4 h-100 shadow border-0 bg-opacity-75"
            style="background-color: #ffffffd8;"
          >
            <h6 class="text-dark mb-2">{{ stat.title }}</h6>
            <h3 class="fw-bold" style="color: #1B4079;">{{ stat.value }}</h3>
            <p class="text-muted mb-0">{{ stat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Engines -->
    <section class="container mt-5 fade-in-up">
      <h4 class="fw-bold mb-4 text-center text-white">⚙️ Tus motores disponibles</h4>
      <div class="row g-4 justify-content-center">
        <div
          class="col-md-3"
          v-for="(engine, i) in engines"
          :key="i"
        >
          <div
            class="card engine-card text-center p-4 h-100 shadow border-0 bg-opacity-75"
            style="background-color: #ffffffd8;"
          >
            <h5 class="fw-bold" style="color: #1B4079;">{{ engine.name }}</h5>
            <p class="text-muted mb-3">{{ engine.instances }}</p>
            <button
              class="btn w-100 text-white fw-semibold"
              style="background-color: #1B4079;"
            >
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    
  </div>
</template>

<script>
export default {
  name: "Home",
  props: { user: Object },
  data() {
    return {
      stats: [
        { title: "Plan Actual", value: this.user ? this.user.plan : "Cargando...", desc: "Hasta 2 bases de datos por motor" },
        { title: "Bases Activas", value: "6", desc: "de 12 disponibles" },
        { title: "Estado del Sistema", value: "🟢 Operativo", desc: "" },
        { title: "Última Actividad", value: "Hace 3 horas", desc: "Creaste una base PostgreSQL" },
      ],
      engines: [
        { name: "MySQL", instances: "2 instancias activas" },
        { name: "PostgreSQL", instances: "1 instancia activa" },
        { name: "MongoDB", instances: "3 instancias activas" },
      ]
    };
  }
};
</script>

<style scoped>
.home-dashboard {

  min-height: 100vh;
  padding: 3rem 1rem;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

/* Header */
.header h2 {
  font-size: 2rem;
  color: #ffffff;
}
.header p {
  color: #e6e6e6;
  font-size: 1.1rem;
}

/* Animaciones */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease forwards;
}
.fade-in-down {
  opacity: 0;
  transform: translateY(-30px);
  animation: fadeInDown 1s ease forwards;
}
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeInDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tarjetas */
.stat-card:hover,
.engine-card:hover {
  transform: translateY(-8px) scale(1.02);
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
}

/* Botón principal */
.zoom-btn {
  transition: all 0.3s ease;
}
.zoom-btn:hover {
  transform: scale(1.08);
  background-color: #153663 !important;
}

/* Colores de texto */
.text-muted {
  color: rgba(0, 0, 0, 0.65) !important;
}
</style>
