<template>
  <div class="welcome-page d-flex justify-content-center align-items-center">
    <div class="text-center p-4 rounded shadow-sm bg-white">
      <h1 class="fw-bold mb-3" style="color: #1B4079;">Bienvenido a Cloud Platform</h1>
      <p class="mb-4 textIntro">
        Tu espacio seguro para gestionar y conectar todo en la nube.
      </p>

      <div class="d-flex gap-3 justify-content-center">
        <button class="btn btn-primary px-4" @click="goToLogin">Iniciar sesión</button>
        <button class="btn btn-outline-success px-4" @click="goToRegister">Registrarse</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  methods: {
    goToLogin() {
      this.$router.push("/login")
    },
    goToRegister() {
      this.$router.push("/register")
    }
  }
}
</script>

<style scoped>

.textIntro {
    color: #4D7C8A;
}
body {

}

.welcome-page {
    
  min-height: 100vh; 
  width: 100%; 
  background-color: #c7dcf7; 
  display: flex;
  align-items: center;
  justify-content: center;
  
}


.btn-primary {
  background-color: #1B4079;
  border: none;
}
.btn-primary:hover {
  background-color: #4D7C8A;
}
.btn-outline-success {
  color: #8FAD88;
  border-color: #8FAD88;
}
.btn-outline-success:hover {
  background-color: #CBDF90;
  color: #1B4079;
  border-color: #CBDF90;
}
</style>
