<template>
  <div class="dashboard text-white">
    <div class="bg-decor" aria-hidden="true"></div>
    <!-- BOTÓN HAMBURGER -->
    <button class="toggle-btn" @click="toggleSidebar">☰</button>

    <!-- SIDEBAR -->
    <aside class="sidebar shadow-lg" :class="{ collapsed: isCollapsed }">
      <div class="logo fade-down">
        <a class="navbar-brand d-flex align-items-center justify-content-center text-white fw-bold" @click="goToDashboard"
          href="#">
          <img src="@/assets/logo.png" alt="Logo" height="120" class="logo-img" />
        </a>
      </div>

      <nav class="menu fade-up">
        <button class="txtSize" @click="$router.push('/dashboard/home')">🏠 Inicio</button>
        <button class="txtSize" @click="$router.push('/dashboard/database')">💾 Mis Bases de Datos</button>
        <button class="txtSize" @click="$router.push('/dashboard/Plans')">💳 Planes y Suscripciones</button>
        <button class="txtSize" @click="$router.push('/dashboard/Settings')">⚙️ Configuración</button>
      </nav>

      <!-- SECCIÓN DE USUARIO -->
      <div class="user-section fade-up">
        <div class="user-icon">
          <img v-if="avatarUrl" :src="avatarUrl" alt="Avatar de usuario" class="user-avatar" />
          <span v-else>👤</span>
        </div>
        <div class="user-info">
          <p class="user-name">{{ user ? user.nombre : 'Cargando...' }} {{ user ? user.apellido : '.' }}</p>
          <p class="user-plan">Plan: {{ user ? user.plan : 'Cargando...' }}</p>
          <button class="btn btn-outline-danger w-100 mt-2" @click="logout">Cerrar sesión</button>
        </div>
      </div>
    </aside>

    <main class="content" :class="{ expanded: isCollapsed }">

      <!-- ⭐ NUEVA CAPA ANIMADA DEL FONDO DEL CONTENIDO ⭐ -->
      <div class="component-bg-decor"></div>

      <section class="main-content fade-up">
        <router-view :user="user" />
      </section>
    </main>
  </div>
</template>

<script>
// EL SCRIPT NO NECESITA CAMBIOS
import axios from "axios";
import * as jwtDecode from "jwt-decode";

const API_URL = "https://service.quasar.andrescortes.dev/api/Users";

export default {
  name: "Dashboard",
  data() {
    return {
      user: null,
      error: "",
      isCollapsed: false,
    };
  },
  computed: {
    avatarUrl() {
      if (this.user && this.user.nombre) {
        const seed = encodeURIComponent(this.user.nombre);
        return `https://api.dicebear.com/8.x/adventurer/svg?seed=${seed}`;
      }
      return null;
    }
  },
  async created() {
    await this.getUserInfo();
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    async getUserInfo() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          this.error = "No hay token. Inicia sesión.";
          this.$router.push("/login");
          return;
        }
        const decoded = jwtDecode.jwtDecode(token);
        const userId =
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        if (!userId) {
          this.error = "No se pudo obtener el ID del usuario desde el token.";
          return;
        }
        const response = await axios.get(`${API_URL}/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        this.user = response.data.data;
      } catch (error) {
        if (error.response) {
          console.error("Error del servidor:", error.response.status, error.response.data);
          this.error = `Error ${error.response.status}: ${error.response.data.message}`;
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor:", error.request);
          this.error = "No se pudo conectar al servidor.";
        } else {
          console.error("Error desconocido:", error.message);
          this.error = "Error inesperado.";
        }
      }
    },
    goToDashboard() {
      this.$router.push("/dashboard/home");
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(ellipse at center, #111122 0%, #0a0a17 100%);
  font-family: 'Oswald', sans-serif;
}

/* Fondo creativo sutil (blobs y patrón de puntos) */
.dashboard {
  position: relative;
}
.dashboard::before,
.dashboard::after {
  content: '';
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.14;
  z-index: 0;
  pointer-events: none;
}
.dashboard::before {
  left: -8%;
  top: -12%;
  background: radial-gradient(circle at 30% 30%, rgba(0,215,255,0.9), rgba(108,99,255,0.6));
  animation: floatSlow 12s ease-in-out infinite;
}
.dashboard::after {
  right: -8%;
  bottom: -12%;
  background: radial-gradient(circle at 70% 70%, rgba(108,99,255,0.9), rgba(255,42,109,0.4));
  animation: floatSlowReverse 14s ease-in-out infinite;
}
.dashboard .content {
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.dashboard {
  background-image:
    radial-gradient(circle at 20% 20%, rgba(0,0,0,0.02) 1px, transparent 1px),
    radial-gradient(circle at 80% 80%, rgba(255,255,255,0.02) 1px, transparent 1px),
    radial-gradient(ellipse at center, #111122 0%, #0a0a17 100%);
  background-size: 18px 18px, 18px 18px, cover;
}

/* ============================================================
 ** ⭐ NUEVO FONDO ANIMADO PARA EL ÁREA DE COMPONENTES ⭐
============================================================ */
.component-bg-decor {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  background:
    /* cuadrícula */
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),

    /* figuras geométricas difusas */
    radial-gradient(circle 180px at 20% 30%, rgba(0,217,255,0.12), transparent),
    radial-gradient(circle 200px at 80% 70%, rgba(255,42,145,0.10), transparent);

  background-size:
    40px 40px,
    40px 40px,
    cover,
    cover;

  animation: gridMove 25s linear infinite, floatGeo 18s ease-in-out infinite;
}

@keyframes gridMove {
  0% { background-position: 0 0, 0 0, 0 0, 0 0; }
  100% { background-position: 200px 120px, 120px 200px, 0 0, 0 0; }
}

@keyframes floatGeo {
  0% { transform: scale(1) translateY(0); }
  50% { transform: scale(1.03) translateY(-15px); }
  100% { transform: scale(1) translateY(0); }
}

/* ============================================================ */


.sidebar {
  width: 270px;
  background: linear-gradient(180deg, #191933 0%, #0f0f1f 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 0;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease;
}

.sidebar.collapsed {
  transform: translateX(-100%);
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 2000;
}

.logo-img {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
  transition: transform 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.05);
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 15px;
}

.menu button {
  background: none;
  border: none;
  color: #ccc;
  text-align: left;
  padding: 10px 18px;
  font-size: 0.95rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.menu button:hover {
  background-color: rgba(77, 124, 138, 0.2);
  color: #fff;
  transform: translateX(5px);
}

.user-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid rgba(77, 124, 138, 0.2);
  background-color: rgba(15, 15, 30, 0.8);
}

.user-icon {
  min-width: 60px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #2c2c4a;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid rgba(77, 124, 138, 0.3);
  font-size: 2rem;
}

.user-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  width: 100%;
  font-size: 0.9rem;
  margin-top: 5px;
  text-align: center;
}

.user-name {
  font-weight: bold;
  margin: 0;
  color: #fff;
}

.user-plan {
  color: #8fa8b4;
  margin: 0;
  font-size: 0.85rem;
}

.content {
  flex: 1;
  background-color: #0e0e1c;
  padding: 0;
  overflow-y: auto;
  transition: margin-left 0.3s ease;
}

.content.expanded {
  margin-left: 0 !important;
}

.main-content {
  padding: 40px;
  color: white;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  animation: fadeUp 1s ease forwards;
}

.toggle-btn {
  display: none;
  position: fixed;
  top: 15px;
  left: 15px;
  background: rgba(25, 25, 50, 0.9);
  color: white;
  border: none;
  font-size: 1.5rem;
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
  z-index: 3000;
  transition: background 0.3s ease;
}

.toggle-btn:hover {
  background: rgba(77, 124, 138, 0.4);
}

.fade-up {
  opacity: 0;
  transform: translateY(25px);
  animation: fadeUp 1s ease forwards;
}

.fade-down {
  opacity: 0;
  transform: translateY(-25px);
  animation: fadeDown 1s ease forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* === RESPONSIVE === */
@media (max-width: 992px) {
  .toggle-btn {
    display: block;
  }

  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    height: 100%;
    z-index: 2000;
  }

  .content {
    margin-left: 0;
  }

  .main-content {
    padding: 20px;
  }
}
</style>
