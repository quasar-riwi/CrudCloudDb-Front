<template>
  <div class="welcome-page">

    <nav class="navbar navbar-expand-lg shadow-sm py-3" style="background-color: #1B4079;">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center text-white fw-bold" href="#">
          <img src="@/assets/logo.png" alt="Logo" height="80" class="me-2" />
   
        </a>
        <div class="ms-auto">
          <button class="btn btn-outline-light me-2" @click="goToLogin">Iniciar sesión</button>
          <button class="btn btn-success" @click="goToRegister">Registrarse</button>
        </div>
      </div>
    </nav>

 
    <section class="hero-section d-flex align-items-center justify-content-center text-center text-dark">
      <div class="container">
        <div class="card shadow-lg p-5 mx-auto" style="max-width: 1000px; background-color: #ffffffc7; border: none;">
          <h1 class="fw-bold mb-3" style="color: #1B4079;">Nos adaptamos a tus necesidades</h1>
          <p class="lead mb-5" style="color: #4D7C8A;">
            Comienza con el plan gratuito, una vez que te registres actualiza en cualquier momento para obtener más beneficios.
          </p>

          <div class="row g-4 justify-content-center">
            
            <div class="col-md-4">
              <div class="card plan-card shadow-sm border-0 h-100">
                <div class="card-body d-flex flex-column">
                  <h4 class="fw-bold" style="color: #1B4079;">Plan Gratuito</h4>
                  <p class="text-muted flex-grow-1">Hasta <strong>2 bases de datos</strong> por motor.</p>
                  
                </div>
              </div>
            </div>

            
            <div class="col-md-4">
              <div class="card plan-card shadow-sm border-0 h-100" style="background-color: #f5fbe7;">
                <div class="card-body d-flex flex-column">
                  <h4 class="fw-bold" style="color: #4D7C8A;">Plan Intermedio</h4>
                  <p class="text-muted flex-grow-1">
                    Hasta <strong>5 bases de datos</strong> por motor.  
                     <strong>$5.000 COP/mes</strong>
                  </p>
                  
                </div>
              </div>
            </div>

      
            <div class="col-md-4">
              <div class="card plan-card shadow-sm border-0 h-100" style="background-color: #edf8ff;">
                <div class="card-body d-flex flex-column">
                  <h4 class="fw-bold" style="color: #1B4079;">Plan Avanzado</h4>
                  <p class="text-muted flex-grow-1">
                    Hasta <strong>10 bases de datos</strong> por motor.  
                     <strong>$10.000 COP/mes</strong>
                  </p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
                                                                      
    <footer class="text-center py-3 mt-5" style="background-color: #1B4079; color: white;">
      <small>© 2025 Cloud Platform — Todos los derechos reservados.</small>
    </footer>
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
.welcome-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #cfe4ef 0%, #e7f2dc 100%);
  display: flex;
  flex-direction: column;
}

.hero-section {
  flex-grow: 1;
}


.plan-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 12px;
}
.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}


.btn-primary {
  background-color: #1B4079;
  border: none;
}
.btn-primary:hover {
  background-color: #4D7C8A;
}
.btn-outline-primary {
  color: #1B4079;
  border-color: #1B4079;
}
.btn-outline-primary:hover {
  background-color: #1B4079;
  color: white;
}
.btn-success {
  background-color: #8FAD88;
  border: none;
}
.btn-success:hover {
  background-color: #CBDF90;
  color: #1B4079;
}


.navbar-brand img {
  filter: brightness(0) invert(1);
}
</style>
