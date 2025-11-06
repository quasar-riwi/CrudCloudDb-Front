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
/* 🎨 Paleta CCD */
:root {
  --primary: #3B82F6;
  --secondary: #1E293B;
  --background: #F9FAFB;
  --text: #111827;
  --muted: #6B7280;
  --card-bg: #ffffff;
  --radius: 12px;
}

/* Contenedor */
.databases-view {
  background-color: var(--background);
  min-height: 100vh;
  padding: 2rem;
  color: var(--text);
  font-family: 'Inter', 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Encabezado */
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

/* Resumen */
.summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.summary-card {
  background-color: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.summary-card h6 {
  color: var(--muted);
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
}

.summary-card h3 {
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: 700;
}

/* Tabla */
.table-section {
  background-color: var(--card-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.table-header h4 {
  color: var(--secondary);
  font-weight: 700;
}

.btn-main {
  background-color: var(--primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-main:hover {
  background-color: #2563eb;
}

/* Tabla base */
.database-table {
  width: 100%;
  border-collapse: collapse;
}

.database-table th,
.database-table td {
  padding: 0.8rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.95rem;
}

.database-table th {
  color: var(--secondary);
  font-weight: 700;
  background-color: #f3f4f6;
}

.database-table tr:hover {
  background-color: #f9fafb;
}

.status.active {
  color: #10b981;
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
  transition: color 0.2s ease;
}

.btn-view {
  color: var(--primary);
}

.btn-view:hover {
  color: #2563eb;
}

.btn-delete {
  color: #ef4444;
  margin-left: 10px;
}

.btn-delete:hover {
  color: #dc2626;
}

/* Vacío */
.empty {
  text-align: center;
  color: var(--muted);
  padding: 2rem;
}
</style>
