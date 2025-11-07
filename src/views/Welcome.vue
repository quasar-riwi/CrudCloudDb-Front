<template>
  <div class="welcome-page bg-dark text-white">

    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg py-3 fixed-top" style="background-color: #0a0a17;">
      <div class="container d-flex justify-content-between align-items-center">
        <a class="navbar-brand text-white fw-bold d-flex align-items-center" href="#">
          <img src="@/assets/logo.png" alt="CrudCloud" height="40" class="me-2" />
          CrudCloud
        </a>

        <div>
          <a href="#beneficios" class="text-white me-4 text-decoration-none">Beneficios</a>
          <a href="#funciona" class="text-white me-4 text-decoration-none">Cómo Funciona</a>
          <a href="#planes" class="text-white me-4 text-decoration-none">Planes</a>
          <button class="btn btn-outline-light rounded-pill px-4 me-2" @click="goToLogin">Iniciar sesión</button>
          <button class="btn btn-primary rounded-pill px-4" @click="goToRegister">Registrarse</button>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero d-flex flex-column justify-content-center align-items-center text-center">
      <div class="container mt-5 pt-5">
        <h1 class="fw-bold display-4 mb-3">
          Gestiona tus datos en la nube, <span class="text-primary">sin límites.</span>
        </h1>
        <p class="lead mb-4 text-light-emphasis">
          CrudCloud automatiza la complejidad de las bases de datos para que puedas enfocarte en construir aplicaciones increíbles,
          no en administrar infraestructura.
        </p>
        <div>
          <button class="btn btn-primary btn-lg me-3 px-4" @click="goToRegister">Empezar Gratis</button>
          <a href="#planes" class="btn btn-outline-light btn-lg px-4">Ver Planes</a>
        </div>
      </div>
    </section>

    <!-- BENEFICIOS -->
    <section id="beneficios" class="py-5" style="background-color: #181826;">
      <div class="container text-center">
        <h2 class="fw-bold mb-4">¿Por qué CrudCloud?</h2>
        <p class="text-light-emphasis mb-5">Simplificamos la gestión de bases de datos para acelerar tu desarrollo.</p>

        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 bg-dark text-white border-0 shadow-sm">
              <div class="card-body">
                <div class="mb-3 fs-1 text-primary">⚡</div>
                <h5 class="fw-bold">Despliegue Rápido</h5>
                <p class="text-light-emphasis">Crea instancias de bases de datos en segundos con nuestra interfaz intuitiva o API.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 bg-dark text-white border-0 shadow-sm">
              <div class="card-body">
                <div class="mb-3 fs-1 text-primary">📈</div>
                <h5 class="fw-bold">Escalabilidad Automática</h5>
                <p class="text-light-emphasis">Escala tus recursos vertical y horizontalmente sin interrupciones, según la demanda.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 bg-dark text-white border-0 shadow-sm">
              <div class="card-body">
                <div class="mb-3 fs-1 text-primary">🔒</div>
                <h5 class="fw-bold">Seguridad Integrada</h5>
                <p class="text-light-emphasis">Backups automáticos, encriptación y redes privadas para proteger tus datos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CÓMO FUNCIONA -->
    <section id="funciona" class="py-5 bg-dark text-center">
      <div class="container">
        <h2 class="fw-bold mb-4">¿Cómo funciona?</h2>
        <p class="text-light-emphasis mb-5">En solo tres simples pasos, tendrás tu base de datos lista para producción.</p>

        <div class="row g-4 justify-content-center">
          <div class="col-md-4">
            <div class="p-4 border border-primary rounded-4 step-card">
              <div class="fs-4 mb-2 fw-bold text-primary">1</div>
              <h5>Elige tu motor</h5>
              <p class="text-light-emphasis">Selecciona entre una variedad de bases de datos SQL y NoSQL populares.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-4 border border-primary rounded-4 step-card">
              <div class="fs-4 mb-2 fw-bold text-primary">2</div>
              <h5>Configura tu plan</h5>
              <p class="text-light-emphasis">Define los recursos como CPU, RAM y almacenamiento que tu app necesita.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-4 border border-primary rounded-4 step-card">
              <div class="fs-4 mb-2 fw-bold text-primary">3</div>
              <h5>Conecta tu app</h5>
              <p class="text-light-emphasis">Usa la cadena de conexión proporcionada y listo en minutos.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MOTORES SOPORTADOS -->
    <section class="py-5" style="background-color: #181826;">
      <div class="container text-center">
        <h2 class="fw-bold mb-5">Motores Soportados</h2>
        <div class="row justify-content-center g-4">
          <div class="col-6 col-md-2" v-for="i in 5" :key="i">
            <div class="card bg-dark border-0 shadow-sm p-3 motor-card">
              <img src="@/assets/logo.png" alt="Motor" class="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PLANES Y BENEFICIOS -->
    <section id="planes" class="py-5 bg-dark">
      <div class="container text-center">
        <h2 class="fw-bold mb-4">Planes y Beneficios</h2>
        <p class="text-light-emphasis mb-5">
          Planes transparentes que escalan con tus necesidades. Sin costos ocultos.
        </p>

        <div class="row g-4 justify-content-center">
          <div class="col-md-4" v-for="(plan, i) in planes" :key="i">
            <div class="card h-100 text-white border-0 shadow-lg rounded-4 p-4 plan-card" style="background-color: #2f2f77;">
              <div class="badge bg-primary mb-2">{{ plan.etiqueta }}</div>
              <h5 class="fw-bold">{{ plan.nombre }}</h5>
              <h2 class="fw-bold">{{ plan.precio }}<span class="fs-6">/mes</span></h2>
              <p class="text-light-emphasis">{{ plan.descripcion }}</p>
              <button class="btn btn-light mt-auto" @click="goToRegister">Seleccionar Plan</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="text-center py-5" style="background-color: #181826;">
      <div class="container">
        <h2 class="fw-bold mb-4">¿Listo para empezar?</h2>
        <p class="text-light-emphasis mb-4">
          Crea tu cuenta y lanza tu primera base de datos en menos de 5 minutos.
        </p>
        <button class="btn btn-primary btn-lg px-4" @click="goToRegister">Crear cuenta gratuita</button>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="text-center py-3" style="background-color: #0a0a17;">
      <small>© 2025 CrudCloud. Todos los derechos reservados.</small>
    </footer>

  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      planes: [
        { nombre: "Gratis", precio: "$0", descripcion: "1 base de datos, 1 GB SSD, backups diarios, soporte por email.", etiqueta: "Básico" },
        { nombre: "Intermedio", precio: "$5,000", descripcion: "Hasta 10 bases de datos, 50 GB SSD, escalado automático, soporte por email.", etiqueta: "Popular" },
        { nombre: "Avanzado", precio: "$10,000", descripcion: "Bases de datos ilimitadas, almacenamiento personalizado, soporte 24/7.", etiqueta: "Pro" },
      ],
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
  mounted() {
    const sections = document.querySelectorAll("section");
    const navbar = document.querySelector(".navbar");

    const reveal = () => {
      const triggerBottom = window.innerHeight * 0.85;
      sections.forEach((sec) => {
        const secTop = sec.getBoundingClientRect().top;
        if (secTop < triggerBottom) sec.classList.add("show");
      });
    };

    window.addEventListener("scroll", () => {
      reveal();
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });

    reveal();
  },
};
</script>

<style scoped>
.hero {
  background: radial-gradient(ellipse at center, #111122 0%, #0a0a17 100%);
  min-height: 100vh;
  color: white;
  animation: fadeInHero 1.5s ease-in-out;
}

/* Animaciones base */
@keyframes fadeInHero {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

section {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s ease-out;
}
section.show {
  opacity: 1;
  transform: translateY(0);
}

/* Tarjetas */
.card {
  border-radius: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 25px rgba(0, 123, 255, 0.3);
}

/* Botones */
.btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(0, 123, 255, 0.5);
}

/* Navbar */
.navbar {
  transition: background-color 0.4s ease, box-shadow 0.4s ease;
}
.navbar.scrolled {
  background-color: #0a0a17cc !important;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);
}

/* Sección “Cómo funciona” */
.step-card {
  transition: transform 0.4s ease;
}
.step-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(13, 110, 253, 0.3);
}

/* Motores soportados */
.motor-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.motor-card:hover {
  transform: scale(1.08);
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.4);
}

/* Planes */
.plan-card {
  animation: fadeInUp 1s ease both;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Textos */
.text-light-emphasis {
  color: rgba(255, 255, 255, 0.6);
}
</style>
