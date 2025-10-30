<template>
  <div class="dashboard">
    <!-- Menú lateral -->
    <aside class="sidebar">
      <div class="logo">
        <a class="navbar-brand d-flex align-items-center justify-content-center text-white fw-bold" @click="goToDashboard" href="#">
          <img src="@/assets/logo.png" alt="Logo" height="60"  /> 
        </a>

      </div>

      <nav class="  menu">
        <button class="txtSize" @click="$router.push('/dashboard/home')" >
          🏠 Inicio
        </button>
        <button class="txtSize" @click="$router.push('/dashboard/database')" >
          💾 Mis Bases de Datos
        </button>
        <button class="txtSize">
          💳 Planes y Suscripciones
        </button>
        
        <button class="txtSize">
          ⚙️ Configuración
        </button>
      </nav>

      <div class="user-section">
        <div class="user-icon">👤</div>
        <div class="user-info">
          <p class="user-name">Juan José Hernández</p>
          <p class="user-plan">Plan: Gratuito</p>
        </div>
      </div>
    </aside>

    
        <main class="content">
            <section class="main-content">
                <router-view />
            </section>
        </main>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    goToDashboard() {
      this.$router.push('/dashboard/home');
    },
  },
};

 
</script>

<style scoped>


.dashboard {
  display: flex;
  height: 100vh;
  background-color: #f5f6fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #2a2a3d; /* más claro que antes */
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 0;
}

.logo {
  text-align: center;
  color: #fff;
}

.logo h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #007bff;
}

.logo p {
  font-size: 0.9rem;
  color: #bbb;
}

/* Menú */
.menu {
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 12px;
}

.menu button {
  background: none;
  border: none;
  color: #e0e0e0;
  text-align: left;
  padding: 10px 16px;
  font-size: 0.95rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s, color 0.3s;
}

.menu button:hover {
  background-color: #3a3a55;
  color: white;
}

/* Usuario abajo */
.user-section {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #222238;
  border-top: 1px solid #3a3a55;
}

.user-icon {
  font-size: 1.5rem;
  margin-right: 10px;
}

.user-info {
  font-size: 0.9rem;
}

.user-name {
  margin: 0;
  font-weight: bold;
}

.user-plan {
  margin: 0;
  color: #aaa;
}

/* Contenido principal */
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: white;
  padding: 16px 30px;
  border-bottom: 1px solid #ddd;
}

.main-content {
  padding: 30px;
}

.main-content h2 {
  color: #333;
  margin-bottom: 10px;
}

.main-content p {
  color: #555;
  line-height: 1.5;
}
</style>
