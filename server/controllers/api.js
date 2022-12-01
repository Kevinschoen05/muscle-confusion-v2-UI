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
};