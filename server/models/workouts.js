import mongoose from 'mongoose'
const {Schema } = mongoose;

const workoutSchema =  new Schema({
    title: String, 
    exercises: {
        primaryMuscleGroup: String,
        secondaryMuscleGroup: Array,
        excerciseName: String,
        
    }



})
module.exports = mongoose.model("Workouts", workoutSchema)