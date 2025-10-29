import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'


const routes = [
  { path: '/', name: 'Welcome', component: Welcome },
    { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
    { path: '/register', name: 'Register', component: () => import('../views/Register.vue') }
    
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router