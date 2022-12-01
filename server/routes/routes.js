const express = require("express");
const router = express.Router();
const API = require("../controllers/api");



router.get("/workouts", API.fetchAllWorkouts);

module.exports = router;