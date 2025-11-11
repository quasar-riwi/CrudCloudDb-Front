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
        <h3>6</h3>
      </div>
      <div class="summary-card">
        <h6>Disponibles</h6>
        <h3>12</h3>
      </div>
      <div class="summary-card">
        <h6>Motor más usado</h6>
        <h3>PostgreSQL</h3>
      </div>
    </section>

    <section class="table-section">
      <div class="table-header">
        <h4>Instancias Activas</h4>
        <button class="btn-main">+ Nueva Base de Datos</button>
      </div>

      <table class="database-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Motor</th>
            <th>Estado</th>
            <th>Creada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(db, index) in databases" :key="index">
            <td>{{ db.name }}</td>
            <td>{{ db.engine }}</td>
            <td>
              <span :class="['status', db.status]">
                {{ db.status === 'active' ? '🟢 Activa' : '🔴 Inactiva' }}
              </span>
            </td>
            <td>{{ db.created }}</td>
            <td class="actions">
              <button class="btn-view">Ver</button>
              <button class="btn-delete">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="databases.length === 0" class="empty">
        <p>No tienes bases de datos creadas aún.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Databases",
  data() {
    return {
      databases: [
        { name: "ccd_userdb", engine: "MySQL", status: "active", created: "2025-10-20" },
        { name: "ccd_logs", engine: "PostgreSQL", status: "active", created: "2025-10-21" },
        { name: "ccd_cache", engine: "Redis", status: "inactive", created: "2025-10-22" },
      ],
    };
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

/* === RESPONSIVE === */
@media (max-width: 992px) {
  .databases-view {
    padding: 1.5rem;
  }

  .header h2 {
    font-size: 1.6rem;
  }

  .header p {
    font-size: 0.95rem;
  }

  .summary {
    grid-template-columns: 1fr 1fr;
  }

  .btn-main {
    width: 100%;
  }

  .table-section {
    padding: 1rem;
  }

  .table-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .database-table {
    display: block;
    overflow-x: auto;
  }
}

@media (max-width: 576px) {
  .summary {
    grid-template-columns: 1fr;
  }

  .header h2 {
    font-size: 1.4rem;
    text-align: center;
  }

  .header p {
    text-align: center;
    font-size: 0.9rem;
  }

  .table-header h4 {
    font-size: 1.1rem;
  }

  .database-table th,
  .database-table td {
    font-size: 0.85rem;
    padding: 0.6rem;
  }

  .btn-main {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
}
</style>
