<template>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="logo">
        <a class="navbar-brand d-flex align-items-center justify-content-center text-white fw-bold" @click="goToDashboard" href="#">
          <img src="@/assets/logo.png" alt="Logo" height="60" /> 
        </a>
      </div>

      <nav class="menu">
        <button class="txtSize" @click="$router.push('/dashboard/home')">🏠 Inicio</button>
        <button class="txtSize" @click="$router.push('/dashboard/database')">💾 Mis Bases de Datos</button>
        <button class="txtSize" @click="$router.push('/dashboard/Plans')">💳 Planes y Suscripciones</button>
        <button class="txtSize" @click="$router.push('/dashboard/Settings')">⚙️ Configuración</button>
      </nav>

      <div class="user-section">
        <div class="user-icon">👤</div>
        <div class="user-info">
          <p class="user-name">{{ user ? user.nombre : 'Cargando...' }}</p>
          <p class="user-plan">Plan: {{ user ? user.plan : 'Cargando...' }}</p>
          <a class="btn btn-danger" @click="logout">Cerrar sesión</a>
        </div>
      </div>
    </aside>

    <main class="content">
      <section class="main-content">
        <router-view :user="user" />
      </section>
    </main>
  </div>
  
</template>

<script>
import axios from "axios";
import * as jwtDecode from "jwt-decode"; // ✅ así como dijiste que te funciona

const API_URL = "http://localhost:5005/api/Users";

export default {
  name: "Dashboard",
  data() {
    return {
      user: null,
      error: ""
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
        console.log("Token decodificado:", decoded);

        const userId =
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        if (!userId) {
          this.error = "No se pudo obtener el ID del usuario desde el token.";
          console.error(this.error);
          return;
        }

   
        const response = await axios.get(`${API_URL}/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.user = response.data.data;
        console.log("Usuario cargado:", this.user);
        console.log("🧾 Datos del usuario recibidos:", response.data);


      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        this.error = "Error al obtener los datos del usuario.";
      }
      
    },

  }
  
};
</script>

<style scoped>
.dashboard {
  overflow: hidden;
  display: flex;
  height: 100vh;
  background-color: #f5f6fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}


.sidebar {
  width: 250px;
  background-color: #2a2a3d;
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

.main-content {
  padding: 30px;
}

.welcome-message h2 {
  color: #1b4079;
  font-weight: bold;
}

.alert {
  margin-top: 10px;
}
</style>
