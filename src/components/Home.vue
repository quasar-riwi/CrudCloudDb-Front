<template>
  <div class="home-dashboard text-white">
    <!-- Header -->
    <header class="header text-center mb-5 fade-in-down">
      <h2 class="fw-bold">👋 {{ user ? user.nombre : "Cargando..." }}</h2>
      <p>Bienvenido a tu panel de <strong>Cloud Platform</strong>.</p>
    </header>

    <!-- Stats -->
    <section class="container fade-in-up">
      <div class="row g-4 justify-content-center">
        <div class="col-md-3" v-for="(stat, i) in stats" :key="i">
          <div class="card stat-card text-center p-4 h-100 shadow border-0">
            <h6 class="text-gradient mb-2">{{ stat.title }}</h6>
            <h3 class="fw-bold">{{ stat.value }}</h3>
            <p class="subtitle mb-0">{{ stat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Últimas actividades -->
    <section class="container mt-5 fade-in-up">
      <h4 class="fw-bold mb-4 text-center text-white">Últimas actividades</h4>
      <div class="user-db-list">
        <div
          v-for="activity in userDatabases"
          :key="activity.id"
          class="user-db-card"
        >
          <h5 class="fw-semibold mb-3">{{ activity.user }}</h5>
          <ul class="db-list">
            <li>
              <span class="db-name">{{ activity.entidad }}</span>
              <span class="db-engine">{{ activity.accion }}</span>
            </li>
            <li>
              <span class="db-name">🕓 {{ activity.fecha }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Estado de los motores -->
    <section class="container mt-5 fade-in-up">
      <h4 class="fw-bold mb-4 text-center text-white">⚙️ Estado de los motores</h4>
      <div class="row g-4 justify-content-center">
        <div class="col-md-3" v-for="(engine, i) in engines" :key="i">
          <div class="card engine-card text-center p-4 h-100 shadow border-0">
            <h5 class="fw-bold">{{ engine.name }}</h5>
            <p class="text-muted mb-2">{{ engine.instances }}</p>
            <p
              class="fw-semibold"
              :class="{
                'text-success': engine.status === 'Activo',
                'text-warning': engine.status === 'Inestable',
                'text-danger': engine.status === 'Caído'
              }"
            >
              {{ engine.status }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  props: { user: Object },
  data() {
    return {
      totalDatabases: 0,
      stats: [],
      userDatabases: [], // aquí se llenarán las actividades del usuario
      engines: [
        { name: "MySQL", instances: "2 instancias activas", status: "Activo" },
        { name: "PostgreSQL", instances: "1 instancia activa", status: "Activo" },
        { name: "MongoDB", instances: "3 instancias activas", status: "Inestable" },
      ],
    };
  },
  async mounted() {
    await this.fetchDatabaseCount();
    await this.fetchUserActivities();
    this.loadStats();
  },
  methods: {
    // 🔹 Obtener cantidad total de bases de datos del usuario
    async fetchDatabaseCount() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          "https://service.quasar.andrescortes.dev/api/DatabaseInstances",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        this.totalDatabases = response.data.length || 0;
      } catch (error) {
        console.error("Error al obtener la cantidad de bases:", error);
      }
    },

    // 🔹 Obtener las últimas 3 actividades del usuario logueado
    async fetchUserActivities() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          "https://service.quasar.andrescortes.dev/api/AuditLogs",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Ordena por fecha descendente y toma las últimas 3
        const logs = response.data
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          .slice(0, 3);

        this.userDatabases = logs.map((log) => ({
          id: log.id,
          user: this.user?.nombre || "Usuario",
          accion: log.accion || "Sin acción",
          entidad: log.entidad || "Sin entidad",
          fecha: log.fecha
            ? new Date(log.fecha).toLocaleString("es-CO", {
                dateStyle: "short",
                timeStyle: "short",
              })
            : "Fecha desconocida",
        }));
      } catch (error) {
        console.error("Error al obtener las actividades:", error);
      }
    },

    // 🔹 Cargar estadísticas del usuario
    loadStats() {
      this.stats = [
        {
          title: "Plan Actual",
          value: this.user?.plan || "Cargando...",
          desc:
            !this.user?.plan
              ? "Obteniendo datos..."
              : this.user.plan.toLowerCase() === "gratis"
              ? "Hasta 2 bases de datos por motor"
              : this.user.plan.toLowerCase() === "intermedio"
              ? "Hasta 5 bases de datos por motor"
              : this.user.plan.toLowerCase() === "avanzado"
              ? "Hasta 10 bases de datos por motor"
              : "Plan desconocido",
        },
        {
          title: "Bases Totales",
          value: this.totalDatabases,
          desc: "Activas en todos los motores",
        },
      ];
    },
  },
};
</script>

<style scoped>
/* 👇 Todo tu mismo estilo sin tocar nada */
.home-dashboard {
  min-height: 100vh;
  padding: 3rem 1rem;
  font-family: "Poppins", sans-serif;
  background: radial-gradient(circle at top, #0a0f1f, #050a18);
}
.header h2 {
  font-size: 2rem;
  color: #ffffff;
}
.header p {
  color: #c7d1e0;
  font-size: 1.1rem;
}
.stat-card,
.engine-card,
.user-db-card {
  background: rgba(17, 25, 40, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  color: #fff;
  transition: 0.3s;
  box-shadow: 0 0 20px rgba(0, 200, 255, 0.15);
}
.stat-card:hover,
.engine-card:hover,
.user-db-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 0 25px rgba(0, 200, 255, 0.25);
}
.text-gradient {
  background: linear-gradient(90deg, #00d9ff, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.subtitle {
  color: #94a3b8;
  font-size: 0.95rem;
}
.user-db-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}
.user-db-card {
  padding: 1.5rem;
}
.db-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.db-list li {
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 0.6rem 1rem;
  margin-bottom: 0.6rem;
}
.db-name {
  font-weight: 500;
}
.db-engine {
  color: #8b5cf6;
  font-weight: 600;
}
.zoom-btn {
  background: linear-gradient(90deg, #00d9ff, #8b5cf6);
  transition: all 0.3s ease;
  border: none;
}
.zoom-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 0 25px rgba(0, 200, 255, 0.3);
}
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
</style>
