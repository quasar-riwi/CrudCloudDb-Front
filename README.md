# CrudCloud — Frontend

Versión: Frontend (Vue 3 + Bootstrap) — Diseño oscuro, futurista y responsive

---

## Resumen (ES)

Este repositorio contiene la aplicación frontend de CrudCloud: una SPA construida con Vue 3 y Vite que ofrece una interfaz moderna (tema oscuro, degradados y elementos "glass") para administrar bases de datos como servicio. Incluye:

- Landing / Welcome (hero, features, secciones informativas y video explicativo)
- Login / Register (autenticación, recuperación de contraseña)
- Dashboard (layout con sidebar y rutas para Databases, Plans, Settings)

Esta documentación está pensada para desarrolladores y administradores que trabajen con el proyecto; incluye instrucciones para desarrollo local, build, despliegue, CI, pruebas y resolución de problemas.

---

## Índice

1. [Arquitectura y estructura de carpetas](#arquitectura-y-estructura-de-carpetas)
2. [Tecnologías principales](#tecnologías-principales)
3. [Rutas y vistas](#rutas-y-vistas)
4. [Flujo de autenticación](#flujo-de-autenticación)
5. [Integración con API](#integración-con-api)
6. [Variables de entorno](#variables-de-entorno)
7. [Desarrollo local](#desarrollo-local)
8. [Build y previsualización](#build-y-previsualización)
9. [Despliegue (Docker + NGINX)](#despliegue-docker--nginx)
10. [CI/CD ejemplo (GitHub Actions)](#cicd-ejemplo-github-actions)
11. [Testing y calidad](#testing-y-calidad)
12. [Errores comunes y soluciones](#errores-comunes-y-soluciones)
13. [Buenas prácticas y recomendaciones](#buenas-prácticas-y-recomendaciones)
14. [Contribución](#contribución)
15. [Seguridad y producción](#seguridad-y-producción)
16. [Roadmap sugerido](#roadmap-sugerido)
17. [Créditos & Licencia](#créditos--licencia)
18. [English version (EN)](#english-version-en)

---

## Arquitectura y estructura de carpetas

La aplicación es una SPA construida con Vite. La estructura principal (extracto):

```
/
├─ Dockerfile                # (opcional) ejemplo para servir la build
├─ nginx.conf                # (opcional) configuración nginx para SPA
├─ index.html
├─ package.json
├─ vite.config.js
├─ public/                   # archivos estáticos (imágenes, screenshots)
└─ src/
	 ├─ main.js                # bootstrap (Bootstrap, Pinia, Router)
	 ├─ App.vue                # root component (router-view)
	 ├─ api/                   # wrappers/clients (userApi.js)
	 ├─ assets/                # imágenes y recursos
	 ├─ components/            # componentes compartidos
	 ├─ router/                # rutas (index.js)
	 ├─ stores/                # Pinia stores
	 └─ views/                 # pantallas (Welcome, Login, Register, Dashboard...)
```

Archivos clave:
- `src/main.js` — importa Bootstrap, registra Pinia y Vue Router.
- `src/router/index.js` — rutas públicas y protegidas; redirección para rutas hijas del dashboard.
- `src/api/userApi.js` — llamadas a Users y Payments (axios wrappers).
- `src/views/*` — UI principal (Welcome, Login, Register, Dashboard, etc.).

---

## Tecnologías principales

- Vue 3
- Vite
- Bootstrap 5
- Pinia (state)
- Vue Router 4
- axios (HTTP)
- ESLint + plugin-vue (linting)
- Prettier (format)
- Docker + NGINX (opcional para servir la SPA en producción)

---

## Rutas y vistas

Resumen de las rutas implementadas en `src/router/index.js`:

- `/` — `Welcome.vue` (landing)
- `/login` — `Login.vue`
- `/register` — `Register.vue`
- `/verify-email` — Email verification
- `/reset-password` — Reset password
- `/payment/PaymentSuccess` — payment result
- `/dashboard` — `Dashboard.vue` (meta.requiresAuth)
	- `/dashboard/home` — home del dashboard
	- `/dashboard/database` — `DataBases.vue`
	- `/dashboard/plans` — `Plans.vue`
	- `/dashboard/settings` — `Settings.vue`

El router contiene un guard global que valida la existencia de `localStorage.token` para rutas que requieran autenticación.

---

## Flujo de autenticación

Flujo utilizado actualmente:

1. El usuario envía credenciales a `POST /Users/login` (vía `userApi.loginUser`).
2. El backend devuelve `{ token, user }` donde `token` es un JWT.
3. El frontend guarda `token` y `user` en `localStorage`.
4. Rutas protegidas comprueban token; `Dashboard.vue` decodifica el JWT para obtener el `userId` y consultar `GET /Users/{userId}`.

Recomendación: centralizar manejo de token y errores usando una instancia de axios en `src/api/client.js` y añadir refresh token si el backend lo soporta.

---

## Integración con API

Endpoints observados en el proyecto (ejemplos):

- Base Users API: `https://service.quasar.andrescortes.dev/api/Users`
	- `POST /register`
	- `POST /login`
	- `GET /verify-email?token=`
	- `POST /forgot-password`
	- `POST /reset-password`
	- `GET /{userId}`

- Base Payments API: `https://service.quasar.andrescortes.dev/api/Payments`
	- `POST /subscribe` (requiere Authorization)

Ejemplo de cliente axios recomendado (`src/api/client.js`):

```js
import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'https://service.quasar.andrescortes.dev/api',
	headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(cfg => {
	const token = localStorage.getItem('token');
	if (token) cfg.headers.Authorization = `Bearer ${token}`;
	return cfg;
});

export default api;
```

---

## Variables de entorno

Usar `.env` compatibles con Vite. Todas las variables públicas deben comenzar con `VITE_`.

Ejemplo `.env.example`:

```env
VITE_API_URL=https://service.quasar.andrescortes.dev/api
VITE_APP_TITLE=CrudCloud
VITE_PUBLIC_PATH=/
```

En el código, accede con `import.meta.env.VITE_API_URL`.

---

## Desarrollo local

Requisitos:

- Node.js (recomendado v20+)
- npm o yarn

Comandos básicos:

```bash
# clonar
git clone <repo-url>
cd CrudCloudDb-Front

# instalar dependencias
npm ci

# levantar servidor de desarrollo
npm run dev

# lint
npm run lint

# formatear
npm run format
```

> PowerShell: si ves un error relacionado con `npm.ps1` (ejecución de scripts), puedes ejecutar:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## Build y previsualización

```bash
npm run build
npm run preview
```

La carpeta `dist` contiene la versión optimizada para producción.

---

## Despliegue (Docker + NGINX)

Dockerfile (multistage) ejemplo:

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

nginx.conf (SPA):

```nginx
server {
	listen 80;
	server_name _;
	root /usr/share/nginx/html;
	index index.html;

	location / {
		try_files $uri $uri/ /index.html;
	}

	# Proxy opcional para /api
	location /api/ {
		proxy_pass https://service.quasar.andrescortes.dev/;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
	}
}
```

Construir y ejecutar:

```bash
docker build -t crudcloud-frontend:latest .
docker run -p 8080:80 crudcloud-frontend:latest
# abrir http://localhost:8080
```

---

## CI/CD — ejemplo GitHub Actions

Archivo `.github/workflows/ci.yml` (sencillo):

```yaml
name: CI
on: [push, pull_request]
jobs:
	build:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			- uses: actions/setup-node@v4
				with:
					node-version: '20'
			- run: npm ci
			- run: npm run lint
			- run: npm run build
			- run: npm run test || true
```

Si quieres publicar la imagen Docker en Docker Hub o GHCR, puedo añadir pasos de login/push.

---

## Testing y calidad

- Lint: `npm run lint` (ESLint)
- Format: `npm run format` (Prettier)

Recomendaciones de pruebas:

- Unit tests: `vitest` + `@vue/test-utils` para componentes.
- E2E tests: Playwright o Cypress para flujos críticos (registro/login, dashboard).

Ejemplo instalación Vitest:

```bash
npm i -D vitest @vue/test-utils
# script: "test:unit": "vitest"
```

---

## Errores comunes y soluciones

- PowerShell: `No se puede cargar npm.ps1` — cambiar política de ejecución o usar CMD/Git Bash.
- CORS: habilitar CORS en backend o configurar proxy en `vite.config.js`:

```js
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'https://service.quasar.andrescortes.dev',
				changeOrigin: true,
			}
		}
	}
})
```

- Assets 404 después de build: usar `import logo from '@/assets/logo.png'` y `<img :src="logo" />` o ajustar `base` en `vite.config.js`.
- Token inválido: limpiar `localStorage` y volver a iniciar sesión; implementar refresh token si es necesario.

---

## Buenas prácticas y recomendaciones

- Centralizar cliente HTTP con interceptors (`src/api/client.js`).
- Mantener URLs y secretos fuera del repositorio (`.env`).
- Preparar tests mínimos para flujos críticos.
- Revisar accesibilidad (a11y) y performance con Lighthouse.

---

## Roadmap sugerido

- Implementar refresh tokens y expiración controlada.
- Control de roles/permiso (RBAC) en Dashboard.
- Integración con Sentry para errores y monitoreo.
- Pipelines CI que ejecuten unit + e2e en PRs.

---

## Contribución

1. Abrir issue con descripción clara.
2. Crear branch: `git checkout -b feature/mi-cambio`.
3. Ejecutar `npm ci`, `npm run lint`, `npm run dev`.
4. Incluir pruebas y documentación en el PR.

Plantilla mínima de PR:

```
- Qué se cambió
- Cómo probar (pasos)
- Checklist: lint, tests, build
```

---

## Seguridad y producción

- No subir `.env` con secrets.
- Forzar HTTPS y HSTS.
- Configurar CSP cuando se carguen recursos externos (YouTube, fonts).
- Validar y sanear datos en backend y frontend.

---

## Créditos & Licencia

- Créditos: Equipo CrudCloud + librerías de la comunidad (Vue, Bootstrap, axios, etc.).
- Licencia sugerida: MIT. Añadir `LICENSE` si decides usarla.

---

## English version (EN)

CrudCloud — Frontend

Version: Frontend (Vue 3 + Bootstrap) — Dark, futuristic, and responsive design

Overview (EN)

This repository contains the frontend application of CrudCloud: a SPA built with Vue 3 and Vite that provides a modern interface (dark theme, gradients, and glass-style elements) for managing databases as a service. It includes:

Landing / Welcome (hero, features, info sections, and explainer video)

Login / Register (authentication and password recovery)

Dashboard (layout with sidebar and routes for Databases, Plans, and Settings)

This documentation is intended for developers and administrators working with the project; it includes instructions for local development, build, deployment, CI, testing, and troubleshooting.

Index

Architecture & folder structure

Main technologies

Routes & views

Authentication flow

API integration

Environment variables

Local development

Build & preview

Deployment (Docker + NGINX)

CI/CD example (GitHub Actions)

Testing & quality

Common errors & fixes

Best practices & recommendations

Contributing

Security & production

Suggested roadmap

Credits & license

English version (EN)

Architecture & folder structure

The application is a SPA built with Vite. Basic structure:

/
├─ Dockerfile                # (optional) example for build serving
├─ nginx.conf                # (optional) SPA nginx configuration
├─ index.html
├─ package.json
├─ vite.config.js
├─ public/                   # static assets (images, screenshots)
└─ src/
	 ├─ main.js                # bootstrap (Bootstrap, Pinia, Router)
	 ├─ App.vue                # root component (router-view)
	 ├─ api/                   # wrappers/clients (userApi.js)
	 ├─ assets/                # images & resources
	 ├─ components/            # shared components
	 ├─ router/                # routes (index.js)
	 ├─ stores/                # Pinia stores
	 └─ views/                 # screens (Welcome, Login, Register, Dashboard...)


Key files:

src/main.js — imports Bootstrap and registers Pinia & Vue Router

src/router/index.js — public + protected routes; redirect logic for dashboard children

src/api/userApi.js — Users and Payments axios wrappers

src/views/* — main interface screens (Welcome, Login, Dashboard, etc.)

Main technologies

Vue 3

Vite

Bootstrap 5

Pinia (state management)

Vue Router 4

axios (HTTP requests)

ESLint + plugin-vue (linting)

Prettier (formatting)

Docker + NGINX (optional production serving)

Routes & views

Summary of routes in src/router/index.js:

/ — Welcome.vue (landing)

/login — Login.vue

/register — Register.vue

/verify-email — email verification

/reset-password — password reset

/payment/PaymentSuccess — payment result

/dashboard — Dashboard.vue (meta.requiresAuth)

/dashboard/home — dashboard home

/dashboard/database — DataBases.vue

/dashboard/plans — Plans.vue

/dashboard/settings — Settings.vue

The router has a global guard that checks for localStorage.token for protected routes.

Authentication flow

Current flow:

User submits credentials to POST /Users/login (via userApi.loginUser).

Backend returns { token, user } where token is a JWT.

Frontend stores token and user in localStorage.

Protected routes validate token; Dashboard.vue decodes the JWT to extract the userId and then calls GET /Users/{userId}.

Recommendation: centralize token/error handling using a custom axios instance and add refresh tokens if supported by backend.

API integration

Main endpoints in the project:

Users API base: https://service.quasar.andrescortes.dev/api/Users

POST /register

POST /login

GET /verify-email?token=

POST /forgot-password

POST /reset-password

GET /{userId}

Payments API base: https://service.quasar.andrescortes.dev/api/Payments

POST /subscribe (requires Authorization)

Recommended axios client (src/api/client.js):

import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'https://service.quasar.andrescortes.dev/api',
	headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(cfg => {
	const token = localStorage.getItem('token');
	if (token) cfg.headers.Authorization = `Bearer ${token}`;
	return cfg;
});

export default api;

Environment variables

Use .env files compatible with Vite. All public vars must start with VITE_.

Example .env.example:

VITE_API_URL=https://service.quasar.andrescortes.dev/api
VITE_APP_TITLE=CrudCloud
VITE_PUBLIC_PATH=/


Access variables with:

import.meta.env.VITE_API_URL

Local development

Requirements:

Node.js (recommended v20+)

npm or yarn

Basic commands:

# clone
git clone <repo-url>
cd CrudCloudDb-Front

# install dependencies
npm ci

# start development server
npm run dev

# lint
npm run lint

# format
npm run format


PowerShell note: if you see npm.ps1 cannot be loaded, run:

Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

Build & preview
npm run build
npm run preview


The dist folder contains the optimized production build.

Deployment (Docker + NGINX)

Example multistage Dockerfile:

FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


Example nginx.conf (SPA):

server {
	listen 80;
	server_name _;
	root /usr/share/nginx/html;
	index index.html;

	location / {
		try_files $uri $uri/ /index.html;
	}

	# Optional proxy for /api
	location /api/ {
		proxy_pass https://service.quasar.andrescortes.dev/;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
	}
}


Build & run:

docker build -t crudcloud-frontend:latest .
docker run -p 8080:80 crudcloud-frontend:latest
# open http://localhost:8080

CI/CD — GitHub Actions example

.github/workflows/ci.yml:

name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run test || true


If you want to push Docker images to GHCR or Docker Hub, additional steps can be added.

Testing & quality

Lint: npm run lint (ESLint)

Format: npm run format (Prettier)

Testing suggestions:

Unit tests with vitest + @vue/test-utils

E2E tests with Playwright or Cypress (critical flows: login, registration, dashboard)

Install Vitest:

npm i -D vitest @vue/test-utils
# script: "test:unit": "vitest"

Common errors & fixes

PowerShell: npm.ps1 cannot be loaded → change execution policy or use CMD/Git Bash

CORS: enable it in the backend or setup Vite proxy:

export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'https://service.quasar.andrescortes.dev',
				changeOrigin: true,
			}
		}
	}
})


404 Assets after build: use imports like
import logo from '@/assets/logo.png'
and <img :src="logo" /> or configure base in vite.config.js.

Invalid token: clear localStorage and login again; consider implementing refresh tokens.

Best practices & recommendations

Centralize HTTP client and interceptors (src/api/client.js)

Keep URLs and secrets out of the repo (.env)

Implement minimal automated tests for key flows

Review accessibility (a11y) and performance with Lighthouse

Suggested roadmap

Implement refresh tokens and expiration control

Dashboard role/permission control (RBAC)

Integrate Sentry for monitoring & error tracking

CI pipelines that run unit + E2E tests on PRs

Contributing

Open an issue with a clear description

Create branch:

git checkout -b feature/my-change


Run npm ci, npm run lint, npm run dev

Include tests and documentation in your PR

Minimum PR template:

- What changed
- How to test (steps)
- Checklist: lint, tests, build

Security & production

Do not commit .env files with secrets

Enforce HTTPS and HSTS

Configure CSP when loading external resources (YouTube, fonts)

Validate and sanitize data on both frontend and backend

Credits & license

Credits: CrudCloud team + community libraries (Vue, Bootstrap, axios, etc.)

Suggested license: MIT (add a LICENSE file if you choose to use it)
