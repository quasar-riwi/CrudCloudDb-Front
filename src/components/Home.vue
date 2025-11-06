<template>
  <div class="home-dashboard">

    <header class="header">
      <h2>👋 {{ user ? user.nombre : 'Cargando...' }}</h2>
      <p>Este es tu panel principal de <strong>CrudCloudDb Platform</strong>.</p>
    </header>


    <section class="stats-grid">
      <div class="stat-card">
        <h6>Plan Actual</h6>
        <h3>{{ user ? user.plan: 'Cargando...' }}</h3>
        <p>Hasta 2 bases de datos por motor</p>
      </div>

      <div class="stat-card">
        <h6>Bases de Datos Activas</h6>
        <h3>6</h3>
        <p>de 12 disponibles</p>
      </div>

      <div class="stat-card">
        <h6>Estado del Sistema</h6>
        <h3 class="status-active">🟢 Operativo</h3>
      </div>

      <div class="stat-card">
        <h6>Última Actividad</h6>
        <h3>Hace 3 horas</h3>
        <p>Creaste una base de datos PostgreSQL</p>
      </div>
    </section>


    <section class="engines">
      <h4>Tus motores disponibles</h4>
      <div class="engine-grid">
        <div class="engine-card">
          <h5>MySQL</h5>
          <p>2 instancias activas</p>
          <button>Ver detalles</button>
        </div>

        <div class="engine-card">
          <h5>PostgreSQL</h5>
          <p>1 instancia activa</p>
          <button>Ver detalles</button>
        </div>

        <div class="engine-card">
          <h5>MongoDB</h5>
          <p>3 instancias activas</p>
          <button>Ver detalles</button>
        </div>
      </div>
    </section>

    <div class="cta">
      <button class="btn-main">
        + Crear Nueva Base de Datos
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    user: Object
  }
};
</script>

<style scoped>

:root {
  --primary: #3B82F6; /* azul tech cloud */
  --secondary: #1E293B; /* azul grisáceo oscuro */
  --background: #F9FAFB; /* fondo panel */
  --text: #111827; /* texto principal */
  --muted: #6B7280; /* texto secundario */
  --card-bg: #ffffff;
  --radius: 12px;
}

/* 🧱 Contenedor principal */
.home-dashboard {
  background-color: var(--background);
  min-height: 100vh;
  padding: 2rem;
  color: var(--text);
  font-family: 'Inter', 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 🏷️ Encabezado */
.header h2 {
  font-size: 1.8rem;
  color: var(--secondary);
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.header p {
  color: var(--muted);
  font-size: 1rem;
}

/* 📊 Tarjetas de estadísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.stat-card h6 {
  color: var(--muted);
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-card h3 {
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-card p {
  color: var(--muted);
  font-size: 0.9rem;
}

.status-active {
  color: #10b981; /* verde éxito */
}

/* ⚙️ Motores */
.engines h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 1rem;
}

.engine-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;
}

.engine-card {
  background-color: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.engine-card:hover {
  border-color: var(--primary);
  transform: translateY(-3px);
}

.engine-card h5 {
  color: var(--secondary);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.engine-card p {
  color: var(--muted);
  margin-bottom: 0.75rem;
}

.engine-card button {
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  width: 100%;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.engine-card button:hover {
  background-color: #2563eb;
}

/* 🚀 Botón CTA */
.cta {
  text-align: center;
  margin-top: 2rem;
}

.btn-main {
  background-color: var(--primary);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-main:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}
</style>
