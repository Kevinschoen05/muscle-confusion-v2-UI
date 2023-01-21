const express = require("express");
const router = express.Router();
const API = require("../controllers/api");


//Workouts 
router.get("/workouts", API.fetchAllWorkouts);
router.post("/workouts", API.addWorkout);
router.get("/workouts/users/:userID", API.fetchWorkoutsByUserId)
router.get("/workouts/:workoutID", API.fetchWorkoutbyWorkoutId)


//Exercises
router.get("/exercises", API.fetchAllExercises)
router.get("/exercises/:primaryMuscleGroup", API.fetchExercisesByMuscleGroup)


module.exports = router;