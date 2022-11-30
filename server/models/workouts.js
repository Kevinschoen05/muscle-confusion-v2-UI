import mongoose from 'mongoose'
const {Schema } = mongoose;

const workoutSchema =  new Schema({
    workoutTitle: {
        type: String
    },
    exercises: {
        type: [
            Mixed
        ]
    }
})
module.exports = mongoose.model("Workouts", workoutSchema)