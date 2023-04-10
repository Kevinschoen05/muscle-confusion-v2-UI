import axios from "axios";

const exercise_url = "https://muscle-confusion-server.onrender.com/api/exercises";
const workout_url = "https://muscle-confusion-server.onrender.com/api/workouts";
const completedWorkout_url = "https://muscle-confusion-server.onrender.com/api/completedworkouts";
const user_url = "https://muscle-confusion-server.onrender.com/api/users";

/*
const test_exercise_url = "http://localhost:1000/api/exercises";
const test_workout_url = "http://localhost:1000/api/workouts";
const test_completedWorkout_url = "http://localhost:1000/api/completedworkouts";
const test_user_url = "http://localhost:1000/api/users";
*/ 

export default class API {
  //WORKOUTS
  static async addWorkout(workout) {
    const res = await axios.post(workout_url, workout);
    return res.data;
  }

  static async getWorkoutsByWorkoutID(workoutID) {
    const res = await axios.get(`${workout_url}/${workoutID}`);
    return res.data;
  }

  static async updateWorkoutByWorkoutID(workoutID, body){
    const res = await axios.put(`${workout_url}/edit/${workoutID}`, {
      _id: workoutID,
      updatedFinalWorkout: body 
    });
    return res.data
  }

  //COMPLETED WORKOUTS
  static async addCompletedWorkout(workout) {
    const res = await axios.post(completedWorkout_url, workout);
    return res.data;
  }

  //USER DATA

  static async getWorkoutsByUserID(userID) {
    const res = await axios.get(`${workout_url}/users/${userID}`);
    return res.data;
  }

  static async getCompletedWorkoutsByUserID(userID) {
    const res = await axios.get(`${completedWorkout_url}/users/${userID}`);
    return res.data;
  }

  static async getUserSchedule(userID) {
    const res = await axios.get(`${user_url}/${userID}/userSchedule`);
    return res.data;
  }

  static async updateUserSchedule(userID, body) {
    const res = await axios.put(`${user_url}/${userID}/userSchedule`, {
      user: userID,
      schedule: body,
    });
    return res.data;
  }

  //EXERCISES

  static async addExercise(exercise){
    const res = await axios.post(`${exercise_url}`, exercise)
    return res.data;
  }

  static async getExercisesByMuscleGroup(musclegroup) {
    const res = await axios.get(`${exercise_url}/${musclegroup}`);
    return res.data;
  }

  static async getMuscleGroups(){
    const res = await axios.get(`${exercise_url}/muscleGroups`)
    return res.data;
  }
}
