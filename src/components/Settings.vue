<template>
  <div class="settings-page">
    <h2 class="title">Configuración de la Cuenta</h2>

    <div class="settings-container">

      <!-- 🧍 Información del Perfil -->
      <div class="card">
        <h3>Información del Perfil</h3>
        <form @submit.prevent="updateProfile" class="form">
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" v-model="user.nombre" class="form-control" disabled/>
          </div>

          <div class="form-group">
            <label>Apellido</label>
            <input type="text" v-model="user.apellido" class="form-control" disabled />
          </div>

          <div class="form-group">
            <label>Correo Electrónico</label>
            <input type="email" v-model="user.correo" class="form-control" disabled />
          </div>
        </form>
      </div>

      <!-- 🔒 Cambiar Contraseña -->
      <div class="card">
        <h3>Seguridad</h3>
        <form @submit.prevent="changePassword" class="form">
          <div class="form-group">
            <label>Contraseña Actual</label>
            <input
              type="password"
              v-model="currentPassword"
              class="form-control"
              required
            />
          </div>

          <div class="form-group">
            <label>Nueva Contraseña</label>
            <input
              type="password"
              v-model="newPassword"
              class="form-control"
              required
            />
          </div>

          <div class="form-group">
            <label>Confirmar Nueva Contraseña</label>
            <input
              type="password"
              v-model="confirmPassword"
              class="form-control"
              required
            />
          </div>

          <button type="submit" class="btn-primary" :disabled="loading">
            {{ loading ? "Actualizando..." : "Actualizar Contraseña" }}
          </button>
        </form>
      </div>

      <!-- 💳 Plan Actual -->
      <div class="card">
        <h3>Plan Actual</h3>
        <p class="plan-text">
          Tu plan actual es:
          <span class="plan-name">{{ user.plan || "Desconocido" }}</span>
        </p>
        <button class="btn-secondary" @click="$router.push('/dashboard/plans')">
          Cambiar Plan
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Settings",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      loading: false,
    };
  },
  methods: {
    async updateProfile() {
      alert("Función para actualizar perfil aún no implementada.");
    },

    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert("❌ Las contraseñas no coinciden.");
        return;
      }

      try {
        this.loading = true;
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "http://localhost:5005/api/Users/change-password",
          {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            confirmNewPassword: this.confirmPassword, // 👈 coincide con ChangePasswordDto
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 && response.data.success) {
          alert("✅ Contraseña actualizada correctamente.");
          this.currentPassword = "";
          this.newPassword = "";
          this.confirmPassword = "";
        } else {
          alert(response.data.message || "❌ Error al cambiar la contraseña.");
        }
      } catch (error) {
        console.error("Error al cambiar la contraseña:", error);

        if (error.response && error.response.data && error.response.data.message) {
          alert(`❌ ${error.response.data.message}`);
        } else {
          alert("❌ Error al cambiar la contraseña. Inténtalo de nuevo.");
        }
      } finally {
        this.loading = false;
      }
    },

    async deleteAccount() {
      if (confirm("¿Seguro que deseas eliminar tu cuenta?")) {
        alert("Función para eliminar cuenta aún no implementada.");
      }
    },
  },
};
</script>

<style scoped>
.settings-page {
  min-height: 100vh;
  background-color: #f5f6fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
}

.title {
  color: #1B4079;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.settings-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1100px;
}

/* Tarjeta general */
.card {
  background: #fff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

/* Zona peligrosa */
.card.danger {
  border: 2px solid #dc3545;
}

/* Formularios */
.form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  color: #1B4079;
  margin-bottom: 0.3rem;
}

.form-control {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0.7rem;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #1B4079;
}

/* Botones */
.btn-primary {
  background-color: #1B4079;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background-color: #2a5cb3;
}

.btn-secondary {
  background-color: transparent;
  color: #1B4079;
  border: 2px solid #1B4079;
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background-color: #1B4079;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-danger:hover {
  background-color: #b02a37;
}

/* Texto de plan */
.plan-text {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.plan-name {
  font-weight: bold;
  color: #1B4079;
}
</style>
