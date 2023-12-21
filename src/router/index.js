import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

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
    path: "/profile",
    name: "user-profile",
    component: () => import("../pages/UserProfile.vue"),
    children: [
      {
        path: "/profile/biometrics",
        name: "user-biometrics",
        component: () => import("../profile-views/UserBiometrics.vue"),
      },
      {
        path: "/profile/friends",
        name: "user-friends",
        component: () => import("../profile-views/UserFriends.vue"),
      },

    ]
  },
  {
    path: '/inbox',
    name: 'user-inbox',
    component: () => import("../pages/UserInbox.vue")
  },
  {
    path: "/workoutbuilder",
    name: "workout-builder",
    component: () => import("../pages/WorkoutBuilder.vue"),
  },
  {
    path: "/workoutbuilder/edit/:workoutID",
    name: "edit-workout",
    component: () => import("../pages/WorkoutBuilder.vue"),
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
    path: "/activeworkout/freestyle",
    name: "freestyle-workout",
    component: () => import("../pages/ActiveWorkout.vue"),
  },
  {
    path: "/completedMatchupWorkout/id/:completedMatchupWorkoutID",
    name: "matchup-workout",
    component: () => import("../pages/MatchupWorkout.vue")
  },
  {
    path: "/matchupworkouts",
    name: "matchup-workouts",
    component: () => import("../pages/MatchupWorkoutsHome.vue")
  },
  {
    path: "/randomworkoutgenerator",
    name: "random-workout-generator",
    component: () => import("../pages/RandomWorkoutGenerator.vue")
  },
  {
    path: "/stats",
    name: "stats-home",
    component: () => import("../pages/StatsHome.vue"),
    children: [
      {
        path: "/stats/completedworkouts",
        name: "completed-workouts-view",
        component: () => import("../data-views/CompletedWorkoutsView.vue"),
      },
      {
        path: "/stats/presetworkouts",
        name: "preset-workouts-view",
        component: () => import("../data-views/PresetWorkoutsView.vue"),
      },
      {
        path: "/stats/completedexercises",
        name: "completed-exercises-view",
        component: () => import("../data-views/CompletedExercisesView.vue"),

      },
    ],
  },

  //Stats page data view routes go here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  if (!store.state.user && to.name !== "login" && to.name !== "signup") {
    return { name: "login" };
  }
});

export default router;
