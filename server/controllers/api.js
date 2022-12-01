const Workout = require("../models/workouts");


module.exports = class API {
    static async fetchAllWorkouts(req, res) {
        try {
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
};