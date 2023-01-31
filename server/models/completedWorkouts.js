const mongoose = require('mongoose'); 

const completedWorkoutSchema = mongoose.Schema({
    workoutID: String, 
    workoutTitle: String, 
    workoutDuration: String, 
    exercises: { 
        type: Array
    },
    users: { 
        type: Array
    }
})
module.exports = mongoose.model("CompletedWorkout", completedWorkoutSchema)