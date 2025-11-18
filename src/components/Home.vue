<template>
  <div class="home-dashboard text-white">

    <header class="header text-center mb-5 fade-in-down">
      <h2 class="fw-bold">👋 {{ user ? user.nombre : "Cargando..." }}</h2>
      <p>Bienvenido a tu panel de <strong>Cloud Platform</strong>.</p>
    </header>

    <!-- Estadísticas -->
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

      <div v-if="!userDatabases.length" class="text-center">
        <div class="user-db-card p-4">
          <p class="mb-0 text-white">No hay actividades recientes para mostrar.</p>
        </div>
      </div>

      <div v-else class="user-db-list">
        <div v-for="activity in userDatabases" :key="activity.id" class="user-db-card">
          <ul class="db-list">
            <li>
              <span class="db-name">{{ activity.detalle }}</span>
              <span class="db-engine">{{ activity.accion }}</span>
            </li>
            <li>
              <span class="db-date">🕓 {{ activity.fecha }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Bases de datos por motor -->
    <section class="container mt-5 fade-in-up">
      <h4 class="fw-bold mb-4 text-center text-white">📊 Bases de datos por motor</h4>
      <div class="row g-4 justify-content-center">
        <div class="col-md-3" v-for="(count, motor) in engineCounts" :key="motor">
          <div class="card stat-card text-center p-4 h-100 shadow border-0">
            <h5 class="fw-bold">{{ motor.replace('SQLServer', 'SQL Server') }}</h5>
            <h3 class="fw-bold mt-2">{{ count }} / {{ planLimit }}</h3>
            <p class="subtitle mb-0">Instancias creadas</p>
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
      databases: [],
      stats: [],
      userDatabases: [],
    };
  },

  computed: {
    totalDatabases() {
      return this.databases.length;
    },

    planLimit() {
      if (!this.user || !this.user.plan) return 2;

      const planName = this.user.plan.toLowerCase();
      if (planName.includes("avanzado")) return 10;
      if (planName.includes("intermedio")) return 5;
      return 2;
    },

    engineCounts() {
      const counts = {
        MySQL: 0,
        PostgreSQL: 0,
        MongoDB: 0,
        SQLServer: 0,
      };

      this.databases.forEach((db) => {
        const motor = db.motor || db.engine;
        if (counts.hasOwnProperty(motor)) counts[motor]++;
      });

      return counts;
    },
  },

  watch: {
    user: {
      async handler(newUser) {
        if (newUser && newUser.id) {
          this.loadStats();
          await this.fetchUserActivities();   // 🔥 CARGA ACTIVIDADES APENAS USER ESTÉ LISTO
        }
      },
      immediate: true,  // 🔥 EJECUTA EL WATCHER APENAS MONTA EL COMPONENTE
    },

    totalDatabases() {
      this.loadStats();
    }
  },

  async mounted() {
    await this.fetchDatabases();
  },

  methods: {
    async fetchDatabases() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          "https://service.quasar.andrescortes.dev/api/DatabaseInstances",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        this.databases = response.data || [];
      } catch (error) {
        console.error("Error al obtener las bases de datos:", error);
      }
    },

    async fetchUserActivities() {
      try {
        const token = localStorage.getItem("token");
        if (!token || !this.user?.id) return;

        const response = await axios.get(
          `https://service.quasar.andrescortes.dev/api/AuditLogs/user/${this.user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const logs = Array.isArray(response.data) ? response.data : [];

        const filtered = logs.filter(log =>
          log.entidad === "DatabaseInstance" &&
          log.detalle &&
          typeof log.detalle === "string" &&
          log.detalle.trim().length > 0
        );

        const latestLogs = filtered
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          .slice(0, 3)
          .map(log => ({
            id: log.id,
            accion: this.formatAction(log.accion),
            detalle: log.detalle,
            fecha: new Date(log.fecha).toLocaleString("es-CO", {
              dateStyle: "short",
              timeStyle: "short",
            }),
          }));

        this.userDatabases = latestLogs;
      } catch (error) {
        console.error("Error al obtener actividades del usuario:", error);
      }
    },

    formatAction(action) {
      const map = {
        Create: "Creación",
        Delete: "Eliminación",
        Update: "Actualización",
      };
      return map[action] || action;
    },

    loadStats() {
      this.stats = [
        {
          title: "Plan Actual",
          value: this.user?.plan || "Cargando...",
          desc: !this.user?.plan
            ? "Obteniendo datos..."
            : this.user.plan.toLowerCase() === "gratis"
              ? "Hasta 2 bases de datos por motor"
              : this.user.plan.toLowerCase() === "intermedio"
                ? "Hasta 5 bases de datos por motor"
                : "Hasta 10 bases de datos por motor",
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
/* TU CSS ORIGINAL COMPLETO SIN CAMBIOS */

.home-dashboard {
  min-height: 100vh;
  padding: 3rem 1rem;
  font-family: "Poppins", sans-serif;
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
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 0.6rem 1rem;
  margin-bottom: 0.6rem;
}

.db-list li:last-child {
  margin-bottom: 0;
}

.db-name {
  font-weight: 500;
}

.db-engine {
  color: #8b5cf6;
  font-weight: 600;
  font-size: 0.9rem;
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

.db-date {
  font-size: 0.85rem;
  color: #94a3b8;
  white-space: nowrap;
}
</style>
