<template>
  <div class="settings-page container py-5">
    <h2 class="text-center mb-5 fw-bold fade-in">Configuración de la Cuenta</h2>

    <div class="row g-4 justify-content-center">

      <!-- 🧍 Información del Perfil -->
      <div class="col-md-4 fade-in-up">
        <div class="card shadow-lg bg-dark text-white rounded-4 p-4 border-0 h-100">
          <h4 class="mb-3">Información del Perfil</h4>
          <form @submit.prevent="updateProfile" class="form">
            <div class="mb-3">
              <label class="form-label text-white">Nombre</label>
              <input type="text" v-model="user.nombre" class="form-control bg-transparent text-white border-light" disabled />
            </div>

            <div class="mb-3">
              <label class="form-label text-white">Apellido</label>
              <input type="text" v-model="user.apellido" class="form-control bg-transparent text-white border-light" disabled />
            </div>

            <div class="mb-3">
              <label class="form-label text-white">Correo Electrónico</label>
              <input type="email" v-model="user.correo" class="form-control bg-transparent text-white border-light" disabled />
            </div>
          </form>
        </div>
      </div>

      <!-- 🔒 Cambiar Contraseña -->
      <div class="col-md-4 fade-in-up delay-1">
        <div class="card shadow-lg bg-dark text-white rounded-4 p-4 border-0 h-100">
          <h4 class="mb-3">Seguridad</h4>
          <form @submit.prevent="changePassword" class="form">
            <div class="mb-3">
              <label class="form-label text-white">Contraseña Actual</label>
              <input type="password" v-model="currentPassword" class="form-control bg-transparent text-white border-light" required />
            </div>

            <div class="mb-3">
              <label class="form-label text-white">Nueva Contraseña</label>
              <input type="password" v-model="newPassword" class="form-control bg-transparent text-white border-light" required />
            </div>

            <div class="mb-4">
              <label class="form-label text-white">Confirmar Nueva Contraseña</label>
              <input type="password" v-model="confirmPassword" class="form-control bg-transparent text-white border-light" required />

              <!-- 🔥 Indicador en tiempo real -->
              <p v-if="confirmPassword"
                 :class="passwordsMatch ? 'text-success' : 'text-danger'"
                 class="mt-2 fw-bold small">
                {{ passwordsMatch ? "✔ Las contraseñas coinciden" : "✖ Las contraseñas no coinciden" }}
              </p>
            </div>

            <button type="submit" class="btn btn-primary w-100 rounded-pill fw-bold" :disabled="loading">
              {{ loading ? "Actualizando..." : "Actualizar Contraseña" }}
            </button>
          </form>
        </div>
      </div>

      <!-- 💳 Plan Actual -->
      <div class="col-md-4 fade-in-up delay-2">
        <div class="card shadow-lg bg-dark text-white rounded-4 p-4 border-0 h-100 d-flex flex-column justify-content-between">
          <div>
            <h4 class="mb-3">Plan Actual</h4>
            <p class="fs-5">
              Tu plan actual es:
              <span class="fw-bold text-info">{{ user.plan || "Desconocido" }}</span>
            </p>
              <!-- Barras de progreso por motor -->
              <div class="mt-3">
                <h6 class="mb-2">Uso de instancias por motor</h6>
                <div v-for="engine in engines" :key="engine" class="mb-3">
                  <div class="engine-header d-flex justify-content-between align-items-baseline mb-1">
                    <div class="engine-name">{{ engine }}</div>
                    <div class="engine-count fw-bold small">{{ engineCounts[engine]?.count || 0 }} / {{ userLimit }}</div>
                  </div>

                  <div class="progress engine-progress" aria-hidden="true">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      :style="{ width: Math.min(100, Math.round(((engineCounts[engine]?.count||0) / userLimit) * 100)) + '%' }"
                      :aria-valuenow="engineCounts[engine]?.count || 0"
                      :aria-valuemin="0"
                      :aria-valuemax="userLimit"
                    ></div>
                  </div>
                </div>
                <p class="small text-muted mt-2">Actualizado: {{ lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : '—' }}</p>
              </div>
          </div>
          <button class="btn btn-outline-info w-100 rounded-pill fw-bold mt-3" @click="$router.push('/dashboard/plans')">
            Cambiar Plan
          </button>
        </div>
      </div>

    </div>

    <!-- 🔥 MODAL PERSONALIZADO -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-box">
        <h4 class="modal-title" :class="modalType === 'success' ? 'text-info' : 'text-danger'">
          {{ modalType === 'success' ? '✔ Éxito' : '⚠ Error' }}
        </h4>
        <p class="modal-message">{{ modalMessage }}</p>

        <button class="btn btn-primary w-100 mt-3 rounded-pill fw-bold" @click="showModal = false">
          Cerrar
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Settings",
  props: { user: { type: Object, required: true } },
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      loading: false,

      // Modal
      showModal: false,
      modalMessage: "",
      modalType: "success",
      // Engines / usage
      engines: ["PostgreSQL", "MySQL", "MongoDB", "SQLServer"],
      engineCounts: {},
      countsIntervalId: null,
      lastUpdated: null,
      dbApiUrl: "https://service.quasar.andrescortes.dev/api/DatabaseInstances",
    };
  },

  computed: {
    userLimit() {
      if (!this.user || !this.user.plan) return 2;

      switch (this.user.plan.toLowerCase()) {
        case "gratis": return 2;
        case "intermedio": return 5;
        case "avanzado": return 10;
        default: return 2;
      }
    },
    // 🔥 Computado para revisar coincidencia en tiempo real
    passwordsMatch() {
      return this.newPassword && this.confirmPassword && this.newPassword === this.confirmPassword;
    }
  },

  methods: {
    showModalMessage(msg, type = "success") {
      this.modalMessage = msg;
      this.modalType = type;
      this.showModal = true;
    },

    async updateProfile() {
      this.showModalMessage("Función para actualizar perfil aún no implementada.", "error");
    },

    async changePassword() {
      if (!this.passwordsMatch) {
        this.showModalMessage("Las contraseñas no coinciden.", "error");
        return;
      }

      try {
        this.loading = true;
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "https://service.quasar.andrescortes.dev/api/Users/change-password",
          {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            confirmNewPassword: this.confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 && response.data.success) {
          this.showModalMessage("Contraseña actualizada correctamente.", "success");
          this.currentPassword = "";
          this.newPassword = "";
          this.confirmPassword = "";
        } else {
          this.showModalMessage(response.data.message || "Error al cambiar la contraseña.", "error");
        }
      } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        this.showModalMessage("Error al cambiar la contraseña. Inténtalo de nuevo.", "error");
      } finally {
        this.loading = false;
      }
    },

    // Fetch counts of DB instances and compute per-engine counts
    async fetchInstanceCounts() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // reset counts to zero
          this.engineCounts = this.engines.reduce((acc, e) => { acc[e] = { count: 0 }; return acc; }, {});
          return;
        }

        const response = await axios.get(this.dbApiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const counts = {};
        this.engines.forEach((e) => { counts[e] = { count: 0 }; });

        (response.data || []).forEach((db) => {
          const engineName = db.motor || db.engine || db.Motor || db.engineName;
          // Normalize a few common names
          if (!engineName) return;
          let key = engineName;
          if (/postgre/i.test(engineName)) key = "PostgreSQL";
          else if (/mysql/i.test(engineName)) key = "MySQL";
          else if (/mongo/i.test(engineName)) key = "MongoDB";
          else if (/sqlserver/i.test(engineName) || /sql server/i.test(engineName)) key = "SQLServer";

          if (!counts[key]) counts[key] = { count: 0 };
          counts[key].count++;
        });

        // Ensure every engine has a count
        this.engines.forEach((e) => { if (!counts[e]) counts[e] = { count: 0 }; });

        this.engineCounts = counts;
        this.lastUpdated = Date.now();
      } catch (error) {
        // On error, keep previous counts but log
        console.error("Error fetching instance counts:", error);
      }
    },
  },

  async mounted() {
    // Start polling for counts (every 5s)
    await this.fetchInstanceCounts();
    this.countsIntervalId = setInterval(() => {
      this.fetchInstanceCounts();
    }, 5000);
  },

  beforeUnmount() {
    if (this.countsIntervalId) clearInterval(this.countsIntervalId);
  },
};
</script>

<style scoped>
/* ----------- ESTILOS GENERALES ----------- */
.settings-page {
  min-height: 100vh;
  color: white;
  animation: fadeIn 1s ease-in-out;
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-control:focus {
  box-shadow: 0 0 10px rgba(0, 173, 255, 0.6);
  border-color: #00aaff;
}

.btn-primary {
  background: linear-gradient(90deg, #00aaff, #007bff);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(90deg, #007bff, #00aaff);
}

/* ----------- ANIMACIONES ----------- */
.fade-in {
  opacity: 0;
  transform: translateY(-15px);
  animation: fadeIn 0.8s ease forwards;
}

.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 1s ease forwards;
}

.delay-1 {
  animation-delay: 0.2s;
}

.delay-2 {
  animation-delay: 0.4s;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ----------- MODAL PERSONALIZADO ----------- */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease forwards;
  z-index: 2000;
}

.modal-box {
  background: rgba(15, 15, 20, 0.85);
  border: 1px solid rgba(0, 170, 255, 0.4);
  border-radius: 20px;
  padding: 30px;
  width: 90%;
  max-width: 420px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 170, 255, 0.3);
  animation: fadeUp 0.4s ease forwards;
}

.modal-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-message {
  color: #ddd;
  font-size: 1.1rem;
}

/* Engine label and progress tweaks */
.engine-header .engine-name {
  font-size: 0.95rem;
  color: #b6bde0;
  font-weight: 600;
}
.engine-header .engine-count {
  color: #e6f7ff;
}
.engine-progress {
  height: 12px;
  border-radius: 10px;
  background: rgba(255,255,255,0.04);
  overflow: hidden;
}
.engine-progress .progress-bar {
  height: 100%;
  background: linear-gradient(90deg, rgba(0,217,255,0.95), rgba(0,255,174,0.9));
  transition: width 600ms cubic-bezier(.2,.9,.2,1);
  box-shadow: inset 0 -2px 8px rgba(0,0,0,0.25);
}
.engine-name { margin-bottom: 6px; }
.engine-count { min-width: 56px; text-align: right; }

@media (max-width: 576px) {
  .engine-header { flex-direction: row; gap: 8px; }
  .engine-name { font-size: 0.9rem; }
}
</style>