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
    component: () => import('../pages/UserSettings.vue')
  },
  {
    path: '/workoutbuilder',
    component: () => import('../pages/WorkoutBuilder.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
