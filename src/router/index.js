import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/Home.vue')
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
    path: '/exercisebuilder',
    name: 'exercise-builder',
    component: () => import('../pages/ExerciseBuilder.vue')
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
