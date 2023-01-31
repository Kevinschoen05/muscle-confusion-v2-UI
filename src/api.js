import axios from "axios";
const exercise_url = "http://localhost:5001/api/exercises";
const workout_url = "http://localhost:5001/api/workouts";
const completedWorkout_url = "http://localhost:5001/api/completedWorkouts";

export default class API {
  //WORKOUTS
  static async addWorkout(workout) {
    const res = await axios.post(workout_url, workout);
    return res.data;
  }

  static async getWorkoutsByWorkoutID(workoutID){
    const res = await axios.get(`${workout_url}/${workoutID}`)
    return res.data
  }


  //COMPLETED WORKOUTS 
  static async addCompletedWorkout(workout) {
    const res = await axios.post(completedWorkout_url, workout)
    return res.data
  }

  //USER DATA

  static async getWorkoutsByUserID(userID){
    const res = await axios.get(`${workout_url}/users/${userID}`)
    return res.data
  }

  //EXERCISES

  static async getExercisesByMuscleGroup(musclegroup){
    const res = await axios.get(`${exercise_url}/${musclegroup}`);
    return res.data;
  }

}
