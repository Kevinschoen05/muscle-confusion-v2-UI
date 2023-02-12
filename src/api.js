import axios from "axios";
const exercise_url = "http://localhost:5001/api/exercises";
const workout_url = "http://localhost:5001/api/workouts";
const completedWorkout_url = "http://localhost:5001/api/completedworkouts";
const userSchedule_url = "http://localhost:5001/api/userschedule";

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

  static async getExercisesByMuscleGroup(musclegroup) {
    const res = await axios.get(`${exercise_url}/${musclegroup}`);
    return res.data;
  }

  static async getPrimaryMuscleGroups(){
    const res = await axios.get(`${exercise_url}/primaryMuscleGroups`)
    return res.data;
  }
}
