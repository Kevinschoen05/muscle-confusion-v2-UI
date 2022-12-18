const express = require("express");
const router = express.Router();
const API = require("../controllers/api");



router.get("/workouts", API.fetchAllWorkouts);
router.post("/workouts", API.addWorkout);

router.get("/exercises", API.fetchAllExercises)
router.get("/exercises/:primaryMuscleGroup", API.fetchExercisesByMuscleGroup)

module.exports = router;