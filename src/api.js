import axios from "axios";
const exercise_url = "https://muscle-confusion-server.onrender.com/api/exercises";
const workout_url = "https://muscle-confusion-server.onrender.com/api/workouts";
const completedWorkout_url = "https://muscle-confusion-server.onrender.com/api/completedworkouts";
const userSchedule_url = "https://muscle-confusion-server.onrender.com/api/userschedule";

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
    const res = await axios.get(`${userSchedule_url}/users/${userID}`);
    return res.data;
  }

  static async updateUserSchedule(userID, body) {
    const res = await axios.put(`${userSchedule_url}/users/${userID}`, {
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
