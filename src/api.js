import axios from "axios";

const exercise_url =
  "https://muscle-confusion-server.onrender.com/api/exercises";
const workout_url = "https://muscle-confusion-server.onrender.com/api/workouts";
const completedWorkout_url =
  "https://muscle-confusion-server.onrender.com/api/completedworkouts";
const matchupWorkout_url =
  "https://muscle-confusion-server.onrender.com/api/matchupWorkouts";
const completedMatchupWorkout_url =
  "https://muscle-confusion-server.onrender.com/api/completedMatchupWorkouts";
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

  static async updateWorkoutByWorkoutID(workoutID, body) {
    const res = await axios.put(`${workout_url}/edit/${workoutID}`, {
      _id: workoutID,
      updatedFinalWorkout: body,
    });
    return res.data;
  }

  //COMPLETED WORKOUTS
  static async addCompletedWorkout(workout) {
    const res = await axios.post(completedWorkout_url, workout);
    return res.data;
  }

  static async getCompletedWorkoutsByWorkoutID(workoutID) {
    const res = await axios.get(`${completedWorkout_url}/${workoutID}`, {
      params: {
        sortByCompletionDate: true,
      },
    });
    return res.data;
  }

  static async getCompletedWorkoutByID(completedWorkoutID) {
    const res = await axios.get(
      `${completedWorkout_url}/id/${completedWorkoutID}`
    );
    return res.data;
  }

  //Matchup workouts

  static async createMatchupWorkout(matchupWorkout) {
    const res = await axios.post(matchupWorkout_url, matchupWorkout);
    return res.data;
  }

  static async getMatchupWorkoutsByUserID(userIDs, pendingUserWorkout = false) {
    const userIDsArray = Array.isArray(userIDs) ? userIDs : [userIDs];
    const userIDsString = userIDsArray.join(","); // Convert the array of userIDs to a comma-separated string

    // Construct the URL with the userIDs as path parameter and pendingUserWorkout as query parameter
    const url = `${matchupWorkout_url}/${encodeURIComponent(
      userIDsString
    )}?pendingUserWorkout=${pendingUserWorkout}`;

    const res = await axios.get(url);
    return res.data;
  }

  static async getMatchupWorkoutByMatchupWorkoutID(matchupWorkoutID) {
    const res = await axios.get(`${matchupWorkout_url}/id/${matchupWorkoutID}`);
    return res.data;
  }

  static async updateMatchupWorkout(
    matchupWorkoutID,
    userID,
    totalVolume,
    completionDate,
    workoutDuration,
    completedExercises
  ) {
    const requestBody = {
      userID: userID,
      matchupWorkoutID: matchupWorkoutID,
      totalVolume: totalVolume,
      completionDate: completionDate,
      workoutDuration: workoutDuration,
      completedExercises: completedExercises,
    };
    const res = await axios.put(
      `${matchupWorkout_url}/update/${matchupWorkoutID}`,
      requestBody
    );

    return res.data;
  }

  //COMPLETED MATCHUP WORKOUTS
  static async getCompletedMatchupWorkouts() {
    const res = await axios.get(`${completedMatchupWorkout_url}`);
    return res.data;
  }
  static async getCompletedMatchupWorkoutsByUserID(userIDs) {
    const userIDsArray = Array.isArray(userIDs) ? userIDs : [userIDs];
    const userIDsString = userIDsArray.join(","); // Convert the array of userIDs to a comma-separated string
    const res = await axios.get(
      `${completedMatchupWorkout_url}/${userIDsString}`
    );
    return res.data;
  }

  static async getCompletedMatchupWorkoutbyID(completedMatchupWorkoutID) {
    const res = await axios.get(
      `${completedMatchupWorkout_url}/id/${completedMatchupWorkoutID}`
    );
    return res.data;
  }

  static async createCompletedMatchupWorkout(workout) {
    const requestBody = workout;

    const res = await axios.post(`${completedMatchupWorkout_url}`, requestBody);

    return res.data;
  }

  //USER DATA

  static async initializeUser(userID, userName) {
    const res = await axios.post(`${user_url}/initializeUser/${userID}`, {
      userName: userName,
    });
    return res.data;
  }

  static async getAllUsers() {
    const res = await axios.get(`${user_url}`);
    return res.data;
  }

  static async getWorkoutsByUserID(userID) {
    const res = await axios.get(`${workout_url}/users/${userID}`);
    return res.data;
  }

  static async getCompletedWorkoutsByUserID(userIDs) {
    const userIDsArray = Array.isArray(userIDs) ? userIDs : [userIDs];
    const userIDsString = userIDsArray.join(","); // Convert the array of userIDs to a comma-separated string
    const res = await axios.get(
      `${completedWorkout_url}/users/${userIDsString}`
    );
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

  static async updateUserScheduleAsComplete(userID, workoutID) {
    const res = axios.put(`${user_url}/${userID}/complete/UserSchedule`, {
      userID: userID,
      workoutID: workoutID,
    });
    return res.data;
  }

  static async getUserFriends(userID) {
    const res = await axios.get(`${user_url}/friends/${userID}`);
    return res.data;
  }

  static async getUserFriendsDetails(userIDsString) {
    const res = await axios.get(`${user_url}/friends/data`, {
      params: { userIDs: userIDsString },
    });
    return res.data;
  }

  static async updateUserFriends(userID, body) {
    const res = await axios.put(`${user_url}/friends/add/${userID}`, {
      newFriends: body,
    });
    return res.data;
  }
  //BIOMETRICS

  static async getUserWeights(userID) {
    const res = await axios.get(`${user_url}/${userID}/biometrics/weights`);
    return res.data;
  }

  static async getUserTargetWeights(userID) {
    const res = await axios.get(
      `${user_url}/${userID}/biometrics/targetWeights`
    );
    return res.data;
  }

  static async getUserBirthday(userID) {
    const res = await axios.get(`${user_url}/${userID}/biometrics/birthday`);
    return res.data;
  }

  static async getUserHeight(userID) {
    const res = await axios.get(`${user_url}/${userID}/biometrics/heights`);
    return res.data;
  }

  static async addUserWeight(userID, weight) {
    const res = await axios.put(`${user_url}/${userID}/biometrics/weights`, {
      weight: weight,
    });
    return res.data;
  }

  static async addUserTargetWeight(userID, weight) {
    const res = await axios.put(
      `${user_url}/${userID}/biometrics/targetWeights`,
      {
        weight: weight,
      }
    );
    return res.data;
  }

  static async addUserBirthday(userID, birthday) {
    const res = await axios.put(`${user_url}/${userID}/biometrics/birthday`, {
      birthday: birthday,
    });
    return res.data;
  }

  static async addUserHeight(userID, heightFeet, heightInches) {
    const res = await axios.put(`${user_url}/${userID}/biometrics/heights`, {
      heightFeet: heightFeet, // Send heightFeet
      heightInches: heightInches, // Send heightInches
    });
    return res.data;
  }

  //MESSAGING
  static async createMessage(newMessage) {
    const res = await axios.post(`${user_url}/messages`, newMessage);
    return res.data;
  }

  static async getUserMessages(userID) {
    const res = await axios.get(`${user_url}/inbox/${userID}`);
    return res.data;
  }

  static async updateMessageByMessageID(messageID, body) {
    const res = await axios.put(`${user_url}/messages/${messageID}`, {
      messageAccepted: body,
    });
    return res.data;
  }
  //EXERCISES

  static async addExercise(exercise) {
    const res = await axios.post(`${exercise_url}`, exercise);
    return res.data;
  }

  static async getExercisesByMuscleGroup(musclegroup) {
    const res = await axios.get(`${exercise_url}/${musclegroup}`);
    return res.data;
  }

  static async getMuscleGroups() {
    const res = await axios.get(`${exercise_url}/muscleGroups`);
    return res.data;
  }

  static async getExerciseByExerciseID(exerciseID) {
    const res = await axios.get(`${exercise_url}/id/${exerciseID}`);
    return res.data;
  }

  static async getRandomExercises(
    desiredExerciseCount,
    minSets,
    maxSets,
    minReps,
    maxReps,
    muscleGroups,
    equipment
  ) {
    // Convert the array of muscle groups to a comma-separated string
    const muscleGroupsStr = muscleGroups.join(",");

    // Construct the query string
    const queryString = `?desiredExerciseCount=${desiredExerciseCount}&minSets=${minSets}&maxSets=${maxSets}&minReps=${minReps}&maxReps=${maxReps}&muscleGroups=${muscleGroupsStr}&equipment=${equipment}`;

    try {
      const res = await axios.get(`${exercise_url}/random/${queryString}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching random exercises:", error);
      throw error; // Rethrow or handle as needed
    }
  }
}
