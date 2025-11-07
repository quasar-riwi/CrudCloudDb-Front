<template>
  <div class="dashboard text-white">

    <!-- SIDEBAR -->
    <aside class="sidebar shadow-lg">
      <div class="logo fade-down">
        <a
          class="navbar-brand d-flex align-items-center justify-content-center text-white fw-bold"
          @click="goToDashboard"
          href="#"
        >
          <img src="@/assets/logo.png" alt="Logo" height="120" class="logo-img" />
        </a>
      </div>

      <nav class="menu fade-up">
        <button class="txtSize" @click="$router.push('/dashboard/home')">🏠 Inicio</button>
        <button class="txtSize" @click="$router.push('/dashboard/database')">💾 Mis Bases de Datos</button>
        <button class="txtSize" @click="$router.push('/dashboard/Plans')">💳 Planes y Suscripciones</button>
        <button class="txtSize" @click="$router.push('/dashboard/Settings')">⚙️ Configuración</button>
      </nav>

      <div class="user-section fade-up">
        <div class="user-icon">👤</div>
        <div class="user-info">
          <p class="user-name">{{ user ? user.nombre : 'Cargando...' }}</p>
          <p class="user-plan">Plan: {{ user ? user.plan : 'Cargando...' }}</p>
          <button class="btn btn-outline-danger w-100 mt-2" @click="logout">Cerrar sesión</button>
        </div>
      </div>
    </aside>

    <!-- CONTENIDO -->
    <main class="content">
      <section class="main-content fade-up">
        <router-view :user="user" />
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import * as jwtDecode from "jwt-decode";

const API_URL = "http://localhost:5005/api/Users";

export default {
  name: "Dashboard",
  data() {
    return {
      user: null,
      error: "",
    };
  },
  async created() {
    await this.getUserInfo();
  },
  methods: {
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
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];
        if (!userId) {
          this.error = "No se pudo obtener el ID del usuario desde el token.";
          return;
        }

        const response = await axios.get(`${API_URL}/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.user = response.data.data;
      } catch (error) {
        this.error = "Error al obtener los datos del usuario.";
        console.error(error);
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
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* === SIDEBAR === */
.sidebar {
  width: 270px;
  background: linear-gradient(180deg, #191933 0%, #0f0f1f 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 0;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.6);
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
  align-items: flex-start;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
  border-top: 1px solid rgba(77, 124, 138, 0.2);
  background-color: rgba(15, 15, 30, 0.8);
}

.user-icon {
  font-size: 1.8rem;
}

.user-info {
  font-size: 0.9rem;
  margin-top: 5px;
  width: 100%;
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

/* === CONTENIDO === */
.content {
  flex: 1;
  background-color: #0e0e1c;
  padding: 0;
  overflow-y: auto;
}

.main-content {
  padding: 40px;
  color: white;
  min-height: 100vh;
  animation: fadeUp 1s ease forwards;
}

/* === ANIMACIONES === */
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

/* === SCROLLBAR PERSONALIZADO === */
.content::-webkit-scrollbar {
  width: 8px;
}
.content::-webkit-scrollbar-thumb {
  background: rgba(77, 124, 138, 0.5);
  border-radius: 10px;
}
.content::-webkit-scrollbar-thumb:hover {
  background: rgba(77, 124, 138, 0.8);
}
</style>
