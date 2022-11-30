const API = require("../controllers/api");
const express = require("express");
const router = express.Router();


router.get("/workouts", API.fetchAllWorkouts);

module.exports = router;