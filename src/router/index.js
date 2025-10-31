import { createRouter, createWebHistory } from 'vue-router'


import Welcome from '../views/Welcome.vue'
import Dashboard from '../views/Dashboard.vue'
import Home from '../components/Home.vue' // 
import DataBases from '@/components/DataBases.vue'

const routes = [
  // Página de bienvenida
  { 
    path: '/', 
    name: 'Welcome', 
    component: Welcome 
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: () => import('../views/Login.vue') 
  },
  { 
    path: '/register', 
    name: 'Register', 
    component: () => import('../views/Register.vue') 
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard, 
    children: [
      {
        path: '/dashboard', // redirección al entrar a /dashboard
        redirect: '/dashboard/home',
      },
      {
        path: 'home', 
        name: 'DashboardHome',
        component: Home,
      },
      {
        path: 'database', 
        name: 'Dashboard/Database',
        component: DataBases,
      },
      
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
