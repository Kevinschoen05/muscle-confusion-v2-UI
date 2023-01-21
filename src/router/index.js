import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'user-dashboard',
    component: () => import('../pages/UserDashboard.vue')
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
  },
  {
    path: '/activeworkout/:workoutID',
    name: 'active-workout',
    component: () => import ('../pages/ActiveWorkout.vue')

  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
