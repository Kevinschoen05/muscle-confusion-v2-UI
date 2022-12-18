const express = require("express");
const router = express.Router();
const API = require("../controllers/api");


//Workouts 
router.get("/workouts", API.fetchAllWorkouts);
router.post("/workouts", API.addWorkout);

//Exercises
router.get("/exercises", API.fetchAllExercises)
router.get("/exercises/:primaryMuscleGroup", API.fetchExercisesByMuscleGroup)

module.exports = router;