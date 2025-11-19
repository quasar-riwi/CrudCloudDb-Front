<template>
  <div class="welcome-page">
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg py-3 fixed-top" :class="{ 'scrolled': isScrolled }">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="fas fa-database me-2"></i>CrudCloud
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"><i class="fas fa-bars text-light"></i></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link text-light me-3" href="#beneficios">Beneficios</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light me-3" href="#funciona">Cómo Funciona</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light me-3" href="#tecnologias">Tecnologías</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light me-3" href="#planes">Planes</a>
            </li>
            <li class="nav-item">
              <button class="btn btn-outline-futuristic me-2" @click="goToLogin">Iniciar Sesión</button>
            </li>
            <li class="nav-item">
              <button class="btn btn-futuristic" @click="goToRegister">Registrarse</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <section class="hero futuristic-bg">
      <div class="grid-pattern"></div>

      <div class="floating-element floating-element-1">
        <i class="fas fa-circle"></i>
      </div>
      <div class="floating-element floating-element-2">
        <i class="fas fa-square"></i>
      </div>
      <div class="floating-element floating-element-3">
        <i class="fas fa-hexagon"></i>
      </div>

      <div class="container hero-content text-center">
        <h1 class="fw-bold mb-4 hero-title">
          Potencia tus Datos con <span class="text-primary">Inteligencia Cloud</span>
        </h1>
        <p class="lead mb-5 hero-subtitle">
          CrudCloud automatiza la complejidad de las bases de datos para que puedas enfocarte en construir aplicaciones increíbles, no en administrar infraestructura. Escalabilidad, seguridad y rendimiento en una sola plataforma.
        </p>
        <div class="d-flex flex-column flex-md-row justify-content-center gap-3 hero-buttons">
          <button  class="btn btn-futuristic btn-lg pulse" @click="goToRegister">
            <i class="fas fa-rocket me-2"></i>Empezar Gratis
          </button>
          <a href="#funciona" class="btn btn-outline-futuristic btn-lg">
            <i class="fas fa-play-circle me-2"></i>Ver Demo
          </a>
        </div>
      </div>
    </section>

    <!-- BENEFICIOS -->
    <section id="beneficios" class="py-5 futuristic-bg">
      <div class="container">
        <h2 class="section-title">¿Por qué elegir CrudCloud?</h2>
        <p class="section-subtitle">Simplificamos la gestión de bases de datos para acelerar tu desarrollo y potenciar tu productividad.</p>

        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="(feature, index) in features" :key="index">
            <div class="feature-card">
              <div class="card-body text-center">
                <div class="feature-icon">
                  <i :class="feature.icon"></i>
                </div>
                <h5 class="fw-bold">{{ feature.title }}</h5>
                <p>{{ feature.description }}</p>
                <ul class="text-start mt-3">
                  <li v-for="(item, itemIndex) in feature.items" :key="itemIndex">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- CÓMO FUNCIONA -->
    <section id="funciona" class="py-5 align-center futuristic-bg">
      <div class="container">
        <h2 class="section-title">¿Cómo funciona CrudCloud?</h2>
        <p class="section-subtitle">En solo tres simples pasos, tendrás tu base de datos lista para producción.</p>

        <div class="row g-4">
          <div class="col-md-6 col-lg-3" v-for="(step, index) in steps" :key="index">
            <div class="step-card text-center">
              <div class="step-number">{{ step.number }}</div>
              <h5 class="fw-bold">{{ step.title }}</h5>
              <p>{{ step.description }}</p>
              <div class="mt-4">
                <i :class="step.icon"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-5">
          <button class="btn btn-futuristic btn-lg" @click="toggleVideo" :aria-expanded="showVideo">
            <i class="fas fa-play-circle me-2"></i>{{ showVideo ? 'Ocultar Video' : 'Ver Video Explicativo' }}
          </button>
        </div>

        <!-- Video embebido (aparece sólo cuando showVideo === true) -->
        <div class="container video-wrapper mt-4" v-if="showVideo">
          <div class="video-container mx-auto">
            <!-- Usamos la clase .ratio de Bootstrap para mantener 16:9 responsive -->
            <div class="ratio ratio-16x9">
              <iframe
                :src="youtubeEmbedUrl"
                title="Video explicativo CrudCloud"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>

           
          </div>
        </div>
      </div>
    </section>

  <!-- TECNOLOGÍAS SOPORTADAS -->
<section id="tecnologias" class="py-5 futuristic-bg">
  <div class="container">
    <h2 class="section-title">Tecnologías Soportadas</h2>
    <p class="section-subtitle">Ofrecemos soporte para los motores de bases de datos más populares del mercado.</p>

    <div class="row g-4 justify-content-center">
      <div class="col-6 col-md-4 col-lg-2" 
           v-for="(tech, index) in technologies" 
           :key="index">
           
        <div class="database-card text-center p-3 shadow-sm rounded-3"
             style="background: rgba(255, 255, 255, 0.06);
                    backdrop-filter: blur(6px);
                    transition: 0.3s;">

          <!-- Imagen del motor -->
          <div class="tech-logo-wrapper mb-3"
               style="width: 80px; height: 80px; margin: auto; display: flex; align-items: center; justify-content: center;">
            <img :src="tech.image"
                 :alt="tech.name"
                 style="max-width: 100%; max-height: 100%; object-fit: contain;">
          </div>

          <h6 class="mt-2">{{ tech.name }}</h6>
        </div>

      </div>
    </div>
  </div>
</section>

    <!-- PLANES Y PRECIOS -->
    <section id="planes" class="py-5 futuristic-bg">
      <div class="container">
        <h2 class="section-title">Planes y Precios</h2>
        <p class="section-subtitle">Elige el plan que mejor se adapte a tus necesidades. Todos incluyen soporte 24/7 y garantía de tiempo de actividad.</p>

        <div class="row g-4 justify-content-center">
          <div class="col-md-6 col-lg-4" v-for="(plan, index) in plans" :key="index">
            <div :class="['plan-card', 'text-center', { 'popular': plan.popular }]">
              <div class="badge-futuristic">{{ plan.badge }}</div>
              <div class="card-body">
                <h3 class="plan-name">{{ plan.name }}</h3>
                <div class="plan-price">{{ plan.price }}</div>
                <p>{{ plan.description }}</p>
                <ul class="plan-features">
                  <li v-for="(feature, featureIndex) in plan.features" :key="featureIndex">
                    <i :class="[feature.icon, { 'text-muted': !feature.included }]"></i>
                    <span :class="{ 'text-muted': !feature.included }">{{ feature.text }}</span>
                  </li>
                </ul>
                <button class="btn w-100"
                        :class="plan.popular ? 'btn-futuristic' : 'btn-outline-futuristic'"
                        @click="goToRegister">
                  Seleccionar Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="py-5 futuristic-bg">
      <div class="container text-center">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <h2 class="section-title mb-4">¿Listo para potenciar tu aplicación?</h2>
            <p class="section-subtitle mb-5">
              Crea tu cuenta y lanza tu primera base de datos en menos de 5 minutos. Sin compromisos, sin tarjeta de crédito requerida.
            </p>
            <button class="btn btn-futuristic btn-lg me-3 mb-3" @click="goToRegister">
              <i class="fas fa-rocket me-2"></i>Empezar Gratis
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mb-4">
            <h4 class="fw-bold mb-3 footer-brand">
              <i class="fas fa-database me-2"></i>CrudCloud
            </h4>
            <p class="footer-description">La plataforma de gestión de bases de datos en la nube más avanzada, diseñada para desarrolladores que buscan rendimiento, seguridad y escalabilidad.</p>
            <div class="social-icons mt-4">
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
              <a href="#"><i class="fab fa-github"></i></a>
              <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
          </div>

          <div class="col-lg-2 col-md-6 mb-4" v-for="(footerSection, index) in footerSections" :key="index">
            <h5 class="fw-bold mb-3 footer-section-title">{{ footerSection.title }}</h5>
            <ul class="list-unstyled">
              <li v-for="(link, linkIndex) in footerSection.links" :key="linkIndex">
                <a href="#" class="footer-link text-decoration-none">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>

        <hr class="my-4 footer-divider">

        <div class="text-center">
          <small class="footer-copyright">© 2025 CrudCloud. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import postgreImg from '../assets/postgre.png';
import mysqlImg from '../assets/mysql.png';
import sqlserveImg from '../assets/sqlserve.png';
import mongodbImg from '../assets/mongodb.png';

export default {
  name: "WelcomePage",
  data() {
    return {
      isScrolled: false,
      features: [
        {
          icon: "fas fa-bolt",
          title: "Despliegue Instantáneo",
          description: "Crea instancias de bases de datos en segundos con nuestra interfaz intuitiva o API. Configuración automatizada sin complicaciones.",
          items: ["Implementación en menos de 60 segundos", "Interfaz intuitiva ", "Configuración automatizada"]
        },
      
        {
          icon: "fas fa-shield-alt",
          title: "Seguridad Integrada",
          description: "Se usa autenticacion jwt para proteger la informacion de nuestros usuarios y mediante hasheo se protegen las rutas.",
          items: ["Encriptación","Redes privadas virtuales"]
        },
        {
          icon: "fas fa-bell",
          title: "Mantente al tanto de los movimientos en tu cuenta",
          description: "Cada accion va ser notificada en tu dispositivo movil",
          items: [ "Monitoreo 24/7"]
        },
      
      ],
     
      steps: [
        {
          number: "01",
          title: "Elige tu motor",
          description: "Selecciona entre una variedad de bases de datos SQL y NoSQL populares: PostgreSQL, MySQL, MongoDB y más.",
          icon: "fas fa-database fa-2x"
        },
        {
          number: "02",
          title: "Configura tu plan",
          description: "Define los recursos como CPU, RAM y almacenamiento que tu app necesita. Escoge entre planes predefinidos o personalizados.",
          icon: "fas fa-sliders-h fa-2x"
        },
        
        {
          number: "03",
          title: "Conecta tu app",
          description: "Usa la cadena de conexión proporcionada y listo en minutos. Documentación completa y ejemplos de código incluidos.",
          icon: "fas fa-plug fa-2x"
        }
      ],
      technologies: [
        { image: postgreImg, name: "PostgreSQL" },
        { image: mysqlImg, name: "MySQL" },
        { image: sqlserveImg, name: "SQL Server" },
        { image: mongodbImg, name: "MongoDB" },
      ],
      plans: [
        {
          name: "Gratis",
          price: "$0",
          description: "Perfecto para proyectos pequeños y pruebas",
          badge: "Básico",
          popular: false,
          features: [
            { icon: "fas fa-check", text: "Hasta 2 bases de datos", included: true },
            { icon: "fas fa-check", text: "Backup semanal", included: true },
            { icon: "fas fa-check", text: "Panel de administración básico", included: true },
            { icon: "fas fa-times", text: "Monitoreo en tiempo real", included: false },
            { icon: "fas fa-times", text: "Escalado automático", included: false },
            { icon: "fas fa-times", text: "Soporte prioritario", included: false }
          ]
        },
        {
          name: "Intermedio",
          price: "$5.000",
          description: "Ideal para startups y aplicaciones en crecimiento",
          badge: "Popular",
          popular: true,
          features: [
            { icon: "fas fa-check", text: "Hasta 5 bases de datos", included: true },
            { icon: "fas fa-check", text: "Backup diario", included: true },
            { icon: "fas fa-check", text: "Monitoreo en tiempo real", included: true },
            { icon: "fas fa-check", text: "Escalado automático", included: true },
            { icon: "fas fa-times", text: "Soporte prioritario", included: false },
            { icon: "fas fa-times", text: "Integraciones avanzadas", included: false }
          ]
        },
        {
          name: "Avanzado",
          price: "$10.000",
          description: "Para empresas con aplicaciones críticas",
          badge: "Pro",
          popular: false,
          features: [
            { icon: "fas fa-check", text: "Hasta 10 bases de datos", included: true },
            { icon: "fas fa-check", text: "Backup en tiempo real", included: true },
            { icon: "fas fa-check", text: "Monitoreo avanzado y alertas", included: true },
            { icon: "fas fa-check", text: "Escalado automático", included: true },
            { icon: "fas fa-check", text: "Integraciones avanzadas", included: true },
            { icon: "fas fa-check", text: "Soporte prioritario 24/7", included: true }
          ]
        }
      ],
      footerSections: [
        {
          title: "Producto",
          links: ["Características", "Precios", "Casos de Uso", "Documentación"]
        },
        {
          title: "Empresa",
          links: ["Nosotros", "Blog", "Carreras", "Contacto"]
        },
        {
          title: "Soporte",
          links: ["Centro de Ayuda", "Estado del Sistema", "Comunidad", "Soporte Técnico"]
        },
        {
          title: "Legal",
          links: ["Privacidad", "Términos", "Seguridad", "Cookies"]
        }
      ],
      // estado para mostrar/ocultar el video
      showVideo: false,
      // id por defecto del video de YouTube (puedes cambiarlo)
      youtubeVideoId: 'gkS-jIcXM3Q'
    };
  },
  computed: {
    youtubeEmbedUrl() {
      // autoplay cuando se muestre; rel=0 para no mostrar otros videos al final
      return `https://www.youtube.com/embed/${this.youtubeVideoId}?autoplay=1&rel=0`;
    }
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    goToRegister() {
      this.$router.push("/register");
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    }
    ,
    toggleVideo() {
      this.showVideo = !this.showVideo;
      // cuando se abra, hacemos scroll suave al video para enfocarlo
      if (this.showVideo) {
        this.$nextTick(() => {
          const el = document.querySelector('.video-wrapper');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style>
/* Las fuentes ahora se cargan globalmente desde index.html */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');

:root {
  --primary: #00f7ff;
  --primary-dark: #00c2cb;
  --secondary: #6c63ff;
  --dark-bg: #0a0a17;
  --darker-bg: #050510;
  --card-bg: #111128;
  --accent: #ff2a6d;
  --text-light: #e0e0ff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Oswald', sans-serif;
  background-color: var(--darker-bg);
  color: var(--text-light);
  overflow-x: hidden;
}

.welcome-page {
  min-height: 100vh;
}

h1, h2, h3, h4, h5, .navbar-brand {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
}

.futuristic-bg {
  background: radial-gradient(ellipse at center, #111122 0%, #0a0a17 100%);
  position: relative;
  overflow: hidden;
}

.futuristic-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(0, 247, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(108, 99, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 42, 109, 0.1) 0%, transparent 50%);
  z-index: 0;
}

#funciona .row {
  justify-content: center;
  text-align: center;
}
.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(0, 247, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 247, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 0;
  opacity: 0.3;
}

/* Navbar */
.navbar {
  background-color: rgba(10, 10, 23, 0.9) !important;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  border-bottom: 1px solid rgba(0, 247, 255, 0.2);
  z-index: 1000;
}

.navbar.scrolled {
  background-color: rgba(5, 5, 16, 0.95) !important;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
}

.navbar-brand {
  font-size: 1.8rem;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.5);
}

.navbar-toggler {
  border: 1px solid var(--primary);
  color: var(--primary);
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 247, 255, 0.25);
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 80px;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, var(--text-light), var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 247, 255, 0.3);
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Botones */
.btn-futuristic {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border: none;
  color: var(--darker-bg);
  font-weight: 600;
  padding: 12px 30px;
  border-radius: 50px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 247, 255, 0.4);
  z-index: 1;
}

.btn-futuristic::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--secondary), var(--primary));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.btn-futuristic:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 247, 255, 0.6);
  color: var(--darker-bg);
}

.btn-futuristic:hover::before {
  opacity: 1;
}

.btn-outline-futuristic {
  border: 2px solid var(--primary);
  color: var(--primary);
  background: transparent;
  font-weight: 600;
  padding: 10px 28px;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.btn-outline-futuristic:hover {
  background: rgba(0, 247, 255, 0.1);
  color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 247, 255, 0.3);
}

/* Secciones */
.section-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-subtitle {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Tarjetas de características */
.feature-card {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 2rem;
  height: 100%;
  transition: all 0.4s ease;
  border: 1px solid rgba(0, 247, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 247, 255, 0.05), rgba(108, 99, 255, 0.05));
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  border-color: rgba(0, 247, 255, 0.3);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card .card-body {
  position: relative;
  z-index: 1;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--primary);
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.5);
}

/* Pasos */
.step-card {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 2rem;
  height: 100%;
  transition: all 0.4s ease;
  border: 1px solid rgba(0, 247, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.step-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 247, 255, 0.05), rgba(108, 99, 255, 0.05));
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.step-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  border-color: rgba(0, 247, 255, 0.3);
}

.step-card:hover::before {
  opacity: 1;
}

.step-number {
  font-size: 4rem;
  font-weight: 700;
  color: var(--primary);
  text-shadow: 0 0 15px rgba(0, 247, 255, 0.5);
  margin-bottom: 1rem;
  font-family: 'Oswald', sans-serif;
}

/* Tecnologías */
.database-card {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.4s ease;
  border: 1px solid rgba(0, 247, 255, 0.1);
  text-align: center;
}

.database-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  border-color: rgba(0, 247, 255, 0.3);
}

.database-card i {
  color: var(--primary);
}

/* Planes */
.plan-card {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 2.5rem 2rem;
  transition: all 0.4s ease;
  border: 1px solid rgba(0, 247, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.plan-card.popular {
  border: 2px solid var(--primary);
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(0, 247, 255, 0.3);
}

.plan-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 247, 255, 0.05), rgba(108, 99, 255, 0.05));
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.plan-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  border-color: rgba(0, 247, 255, 0.3);
}

.plan-card.popular:hover {
  transform: translateY(-10px) scale(1.05);
}

.plan-card:hover::before {
  opacity: 1;
}

.plan-card .card-body {
  position: relative;
  z-index: 1;
}

.plan-name {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--primary);
}

.plan-price {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-light);
  font-family: 'Oswald', sans-serif;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.plan-features li {
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.plan-features li:last-child {
  border-bottom: none;
}

.plan-features li i {
  color: var(--primary);
  margin-right: 0.5rem;
}

.badge-futuristic {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: var(--darker-bg);
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  position: absolute;
  top: -10px;
  right: 20px;
  box-shadow: 0 5px 15px rgba(0, 247, 255, 0.4);
}

/* Elementos flotantes */
.floating-element {
  position: absolute;
  z-index: 1;
  opacity: 0.7;
}

.floating-element-1 {
  top: 20%;
  left: 5%;
  animation: float 6s ease-in-out infinite;
}

.floating-element-2 {
  top: 60%;
  right: 10%;
  animation: float 8s ease-in-out infinite;
}

.floating-element-3 {
  bottom: 20%;
  left: 15%;
  animation: float 7s ease-in-out infinite;
}

.floating-element i {
  color: var(--primary);
}

.floating-element-1 i {
  font-size: 30px;
  color: var(--primary);
}

.floating-element-2 i {
  font-size: 40px;
  color: var(--secondary);
}

.floating-element-3 i {
  font-size: 35px;
  color: var(--accent);
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 247, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(0, 247, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 247, 255, 0);
  }
}

/* Video embebido (estilos) */
.video-wrapper {
  max-width: 980px;
}
.video-container {
  width: 100%;
  padding: 0 1rem;
}


/* Estadísticas */
.stats-section {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 3rem;
  margin: 3rem 0;
  border: 1px solid rgba(0, 247, 255, 0.1);
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary);
  font-family: 'Oswald', sans-serif;
}

.stat-label {
  font-size: 1.2rem;
  color: var(--text-light);
}

/* Footer */
.footer-section {
  background: var(--dark-bg);
  border-top: 1px solid rgba(0, 247, 255, 0.1);
  padding: 3rem 0 1.5rem;
}

.footer-brand {
  color: var(--primary);
}

.footer-description {
  color: var(--text-light);
}

.footer-section-title {
  color: var(--primary);
}

.footer-link {
  color: var(--text-light) !important;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--primary) !important;
}

.footer-divider {
  border-color: rgba(255, 255, 255, 0.1);
}

.footer-copyright {
  color: var(--text-light);
}

.social-icons a {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: var(--card-bg);
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  margin: 0 5px;
  color: var(--primary);
  transition: all 0.3s ease;
}

.social-icons a:hover {
  background: var(--primary);
  color: var(--darker-bg);
  transform: translateY(-5px);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .plan-card.popular {
    transform: scale(1);
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .btn-futuristic,
  .btn-outline-futuristic {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  .feature-card,
  .step-card,
  .plan-card {
    padding: 1.5rem;
  }

  .stats-section {
    padding: 2rem 1rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }

  .floating-element {
    display: none;
  }
}

@media (max-width: 576px) {
  .navbar-brand {
    font-size: 1.5rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .step-number {
    font-size: 3rem;
  }

  .plan-price {
    font-size: 2.5rem;
  }
}
</style>
