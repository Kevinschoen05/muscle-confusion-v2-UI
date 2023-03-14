import { createRouter, createWebHistory } from "vue-router";
import store from '../store/index'

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../pages/Home.vue"),
  },
  {
    path: "/dashboard",
    name: "user-dashboard",
    component: () => import("../pages/UserDashboard.vue"),
  },
  {
    path: "/workoutbuilder",
    name: "workout-builder",
    component: () => import("../pages/WorkoutBuilder.vue"),
  },
  {
    path: "/workoutbuilder/edit/:workoutID",
    name: "edit-workout",
    component: () => import("../pages/WorkoutBuilder.vue")
  },
  {
    path: "/exercisebuilder",
    name: "exercise-builder",
    component: () => import("../pages/ExerciseBuilder.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../pages/Signup.vue"),
  },
  {
    path: "/activeworkout/:workoutID",
    name: "active-workout",
    component: () => import("../pages/ActiveWorkout.vue"),
  },

  {
    path: "/stats",
    name: "stats-home",
    component: () => import("../pages/StatsHome.vue")
  }
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  if (!store.state.user && to.name !== "login") {
    return { name: "login" };
  }
});

export default router;
