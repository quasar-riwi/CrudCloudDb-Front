<template>
  <div class="databases-view">
    <!-- Encabezado -->
    <header class="header">
      <h2>💾 Mis Bases de Datos</h2>
      <p>Gestiona, crea o elimina tus instancias en la nube desde aquí.</p>
    </header>

    <section class="summary">
      <div class="summary-card">
        <h6>Total de Bases de Datos</h6>
        <h3>{{ databases.length }}</h3>
      </div>

      <div class="summary-card">
        <h6>Motor más usado</h6>
        <h3>PostgreSQL</h3>
      </div>
    </section>

    <section class="table-section">
      <div class="table-header">
        <h4>Instancias Activas</h4>
        <button class="btn-main" @click="showModal = true">+ Nueva Base de Datos</button>
      </div>

      <table class="database-table" v-if="databases.length > 0">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Motor</th>
            <th>Creada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(db, index) in databases" :key="index">
            <td>{{ db.name }}</td>
            <td>{{ db.engine }}</td>
            <td>{{ db.created }}</td>
            <td class="actions">
              <button class="btn-delete" @click="confirmDelete(db)">Eliminar</button>

            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty">
        <p>No tienes bases de datos creadas aún.</p>
      </div>
    </section>

    <!-- === MODAL === -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-box">
        <!-- Cargando -->
        <div v-if="isLoading" class="loading-container">
          <div class="spinner"></div>
          <p>Creando instancia...</p>
        </div>

        <!-- Selección de motor -->
        <template v-else>
          <h3>Selecciona el motor</h3>
          <div class="modal-options">
            <button v-for="engine in engines" :key="engine" class="modal-btn" @click="createDatabase(engine)">
              {{ engine }}
            </button>
          </div>
          <button class="modal-cancel" @click="showModal = false">Cancelar</button>
        </template>
      </div>
    </div>

    <!-- === MODAL CONFIRMAR ELIMINACIÓN === -->
    <div v-if="showConfirmModal" class="modal-overlay" @click.self="showConfirmModal = false">
      <div class="modal-box">
        <h3 style="color: #ef4444;">¿Eliminar base de datos?</h3>
        <p style="color: #a0a8c3; margin-bottom: 1rem;">
          Estás a punto de eliminar <strong>{{ dbToDelete?.name }}</strong>.
          Esta acción no se puede deshacer.
        </p>
        <div class="modal-options">
          <button class="btn btn-danger" 
            @click="deleteDatabase">
            Sí, eliminar
          </button>
          <button class="btn btn-secondary" @click="showConfirmModal = false">Cancelar</button>
        </div>
      </div>
    </div>


    <!-- ✅ Toast -->
    <transition name="fade">
      <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Databases",
  data() {
    return {
      apiUrl: "https://service.quasar.andrescortes.dev/api/DatabaseInstances",
      databases: [],
      showModal: false,
      isLoading: false,
      toastMessage: "",
      engines: ["PostgreSQL", "MySQL", "MongoDB", "SQLServer"],
      showConfirmModal: false,
      dbToDelete: null,
    };
  },
  async mounted() {
    await this.fetchDatabases();
  },
  methods: {
    // 🔹 Obtener las instancias del usuario autenticado
    async fetchDatabases() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.showToast("⚠️ No hay token. Inicia sesión nuevamente.");
          return;
        }

        const response = await axios.get(this.apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.databases = response.data.map((db) => ({
          name: db.nombre || db.name,
          engine: db.motor || db.engine,
          status: db.estado || "active",
          created: db.fechaCreacion
            ? db.fechaCreacion.split("T")[0]
            : new Date().toISOString().split("T")[0],
          id: db.id || db.databaseInstanceId,
        }));
      } catch (error) {
        console.error("Error al obtener las bases de datos:", error);
        this.showToast("❌ No se pudieron cargar las instancias.");
      }
    },

    // 🔹 Crear nueva instancia
    async createDatabase(engine) {
      try {
        this.isLoading = true;
        const token = localStorage.getItem("token");
        if (!token) {
          this.showToast("⚠️ No hay token. Inicia sesión nuevamente.");
          this.isLoading = false;
          return;
        }

        const payload = { motor: engine };
        const response = await axios.post(this.apiUrl, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const newDb = {
          id: response.data.id || response.data.databaseInstanceId,
          name: response.data.nombre || `ccd_${engine.toLowerCase()}`,
          engine: response.data.motor || engine,
          status: "active",
          created: new Date().toISOString().split("T")[0],
        };

        this.databases.push(newDb);
        this.showModal = false;
        this.showToast(`✅ Base de datos ${newDb.name} creada correctamente.`);
      } catch (error) {
        console.error("Error al crear la base de datos:", error);
        const msg =
          error.response?.data?.message ||
          "❌ Ocurrió un error al crear la base de datos.";
        this.showToast(msg);
      } finally {
        this.isLoading = false;
      }
    },

    // 🔹 Eliminar instancia (versión definitiva)
    async deleteDatabase(db) {
      const confirmDelete = confirm(`¿Eliminar la base de datos "${db.name}"?`);
      if (!confirmDelete) return;

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.showToast("⚠️ No hay token. Inicia sesión nuevamente.");
          return;
        }

        // ✅ Enviar solicitud DELETE al backend
        const response = await axios.delete(`${this.apiUrl}/${db.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200 || response.status === 204) {
          // ✅ Actualizar la lista local
          this.databases = this.databases.filter((d) => d.id !== db.id);
          this.showToast(`🗑️ "${db.name}" eliminada correctamente.`);
        } else {
          this.showToast("❌ No se pudo eliminar la base de datos.");
        }
      } catch (error) {
        console.error("Error al eliminar la base de datos:", error);
        const msg =
          error.response?.data?.message ||
          "❌ No se pudo eliminar la base de datos. Inténtalo más tarde.";
        this.showToast(msg);
      }
    },
    confirmDelete(db) {
      this.dbToDelete = db;
      this.showConfirmModal = true;
    },

    async deleteDatabase() {
      if (!this.dbToDelete) return;
      const db = this.dbToDelete;
      this.showConfirmModal = false;

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.showToast("⚠️ No hay token. Inicia sesión nuevamente.");
          return;
        }

        const response = await axios.delete(`${this.apiUrl}/${db.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200 || response.status === 204) {
          this.databases = this.databases.filter((d) => d.id !== db.id);
          this.showToast(`🗑️ "${db.name}" eliminada correctamente.`);
        } else {
          this.showToast("❌ No se pudo eliminar la base de datos.");
        }
      } catch (error) {
        console.error("Error al eliminar la base de datos:", error);
        const msg =
          error.response?.data?.message ||
          "❌ No se pudo eliminar la base de datos. Inténtalo más tarde.";
        this.showToast(msg);
      } finally {
        this.dbToDelete = null;
      }
    },

    // 🔹 Toast helper
    showToast(message) {
      this.toastMessage = message;
      setTimeout(() => (this.toastMessage = ""), 3000);
    },
  },
};
</script>

<style scoped>


.databases-view {
  background: linear-gradient(180deg, #0b0e1a 0%, #101223 100%);
  min-height: 100vh;
  padding: 2rem;
  color: #f2f6ff;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Encabezado */
.header h2 {
  font-size: 1.8rem;
  color: #4f8cff;
  font-weight: 700;
  margin-bottom: 0.25rem;
  text-shadow: 0 0 15px rgba(79, 140, 255, 0.4);
}

.header p {
  color: #a0a8c3;
  font-size: 1rem;
}

/* Resumen */
.summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.summary-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(79, 140, 255, 0.2);
  text-align: center;
  box-shadow: 0 8px 15px rgba(79, 140, 255, 0.15);
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}

.summary-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 20px rgba(79, 140, 255, 0.4);
}

.summary-card h6 {
  color: #b6bde0;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
}

.summary-card h3 {
  color: #ffffff;
  font-size: 1.6rem;
  font-weight: 700;
}

/* Tabla */
.table-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(79, 140, 255, 0.2);
  box-shadow: 0 8px 15px rgba(79, 140, 255, 0.1);
  backdrop-filter: blur(8px);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.table-header h4 {
  color: #4f8cff;
  font-weight: 700;
}

.btn-main {
  background: linear-gradient(90deg, #0d47a1, #1b74ff);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 12px rgba(79, 140, 255, 0.3);
}

.btn-main:hover {
  background: linear-gradient(90deg, #1b74ff, #4f8cff);
  transform: scale(1.05);
  box-shadow: 0 0 18px rgba(79, 140, 255, 0.5);
}

/* Tabla base */
.database-table {
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
}

.database-table th,
.database-table td {
  padding: 0.9rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.95rem;
  white-space: nowrap;
}

.database-table th {
  color: #8ea4ff;
  font-weight: 700;
  background-color: rgba(255, 255, 255, 0.05);
}

.database-table tr:hover {
  background-color: rgba(255, 255, 255, 0.08);
  transition: 0.3s ease;
}

.status.active {
  color: #22c55e;
  font-weight: 600;
}

.status.inactive {
  color: #ef4444;
  font-weight: 600;
}

/* Botones de acción */
.actions button {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.2s ease, transform 0.2s ease;
}

.btn-view {
  color: #4f8cff;
}

.btn-view:hover {
  color: #72a2ff;
  transform: scale(1.05);
}

.btn-delete {
  color: #ef4444;
  margin-left: 10px;
}

.btn-delete:hover {
  color: #ff6b6b;
  transform: scale(1.05);
}

/* Vacío */
.empty {
  text-align: center;
  color: #a0a8c3;
  padding: 2rem;
}

/* === MODAL === */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 20, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-box {
  background: #15182a;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(79, 140, 255, 0.3);
  box-shadow: 0 0 25px rgba(79, 140, 255, 0.2);
  max-width: 400px;
  width: 90%;
}

.modal-box h3 {
  color: #4f8cff;
  margin-bottom: 1.5rem;
}

.modal-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.modal-btn {
  background: linear-gradient(90deg, #0d47a1, #1b74ff);
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-btn:hover {
  transform: scale(1.05);
  background: linear-gradient(90deg, #1b74ff, #4f8cff);
}

.modal-cancel {
  margin-top: 1.5rem;
  background: none;
  color: #a0a8c3;
  border: 1px solid rgba(160, 168, 195, 0.3);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.modal-cancel:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

/* === LOADING === */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid #4f8cff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

/* === TOAST === */
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(90deg, #0d47a1, #1b74ff);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(79, 140, 255, 0.4);
  font-weight: 600;
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* === RESPONSIVE === */
@media (max-width: 992px) {
  .databases-view {
    padding: 1.5rem;
  }

  .summary {
    grid-template-columns: 1fr 1fr;
  }

  .table-section {
    padding: 1rem;
  }

  .table-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 576px) {
  .summary {
    grid-template-columns: 1fr;
  }

  .modal-options {
    grid-template-columns: 1fr;
  }
}
</style>
