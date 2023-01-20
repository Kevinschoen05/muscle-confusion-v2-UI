const Workout = require("../models/workouts");
const Exercise = require("../models/exercises");

module.exports = class API {
  //Workouts
  static async fetchAllWorkouts(req, res) {
    try {
      const query  = req.query;
      const workouts = await Workout.find();
      res.status(200).json(workouts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  static async addWorkout(req, res) {
    const workout = req.body;
    try {
      await Workout.create(workout);
      res.status(201).json({ message: "Workout Created Successfully!" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  //USER SPECIFIC REQUESTS
  static async fetchWorkoutsByUserId(req, res) {
    const user = req.params.userId
    try { 
      const userWorkouts = await Workout.find({
        users: user
      });
      res.status(200).json(userWorkouts);
    }
    catch (err) { 
      res.status(404).json({ message: err.message });
    }


  }

  //EXERCISES
  static async fetchAllExercises(req, res) {
    try {
      const exercises = await Exercise.find();
      res.status(200).json(exercises);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchExercisesByMuscleGroup(req, res) {
    try {
      const muscleGroup = req.params.primaryMuscleGroup;
      const exercises = await Exercise.find({
        primaryMuscleGroup: muscleGroup,
      });
      res.status(200).json(exercises);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
