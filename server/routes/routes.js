const express = require("express");
const router = express.Router();
const API = require("../controllers/api");


//Workouts 
router.get("/workouts", API.fetchAllWorkouts);
router.post("/workouts", API.addWorkout);
router.get("/workouts/users/:userID", API.fetchWorkoutsByUserId)
router.get("/workouts/:workoutID", API.fetchWorkoutbyWorkoutId)


//Completed Workouts
router.get("/completedWorkouts", API.fetchAllCompletedWorkouts)
router.get("/completedWorkouts/users/:userID", API.fetchCompletedWorkoutsByUserId)
router.post("/completedWorkouts", API.addCompletedWorkout)

//Exercises
router.get("/exercises", API.fetchAllExercises)
router.post("/exercises", API.addExercise)
router.get("/exercises/muscleGroups", API.getMuscleGroups)
router.get("/exercises/:primaryMuscleGroup", API.fetchExercisesByMuscleGroup)

//User Specific
router.get("/userSchedule/users/:userID", API.fetchUserSchedule)
router.post("/userSchedule", API.createUserSchedule)
router.put("/userSchedule/users/:userID", API.updateUserSchedule)


module.exports = router;