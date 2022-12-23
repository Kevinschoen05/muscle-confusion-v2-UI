import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/settings',
    name: 'user-settings',
    component: () => import('../pages/UserSettings.vue')
  },
  {
    path: '/workoutbuilder',
    name: 'workout-builder',
    component: () => import('../pages/WorkoutBuilder.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import ('../pages/Signup.vue')
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
