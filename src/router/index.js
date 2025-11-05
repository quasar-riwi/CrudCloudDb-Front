import { createRouter, createWebHistory } from 'vue-router'


import Welcome from '../views/Welcome.vue'
import Dashboard from '../views/Dashboard.vue'
import Home from '../components/Home.vue' // 
import DataBases from '@/components/DataBases.vue'

const routes = [

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
  path: '/verify-email',
  name: 'VerifyEmail',
  component: () => import('@/views/EmailVerification.vue')
},




  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, 
    children: [
      {
        path: '/dashboard', 
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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  
  if (to.meta.requiresAuth && !token) {
    
    next("/login");
  } else {
    next();
  }
});

export default router
