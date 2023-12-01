<template>
    <div class="p-5 flex flex-column flex-auto">
        <div class="grid">
            <div class="col-12">
                <div class="surface-card pl-4 pt-4 pb-4 border-bottom-none">
                    <div class="text-900 font-medium text-xl">Leaderboard</div>
                </div>
                <div
                    class="surface-card   border-top-none border-noround-top border-round flex p-3 flex-column md:flex-row">
                </div>
            </div>
            <div class="col-12 lg:col-6">
                <div class="surface-card shadow-2 border-round h-30rem p-4 overflow-auto">
                    <div class="flex align-items-center justify-content-between mb-3">
                        <div class="text-900 font-medium text-xl">Completed Matchups</div>
                        <div>
                            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"></Button>
                            <Menu ref="menu1" id="overlay_menu" :popup="true"></Menu>
                        </div>
                    </div>
                    <ul class="p-0">
                        <li class="py-3 border-bottom-1 surface-border flex flex-column"
                            v-for="workout in workoutsWithWinners" :key="workout._id">
                            <span class="text-900 font-bold block mb-2">
                                {{ workout.workoutTitle }}
                            </span>
                            <div v-if="!workout.isTie">
                                <p>Winner: {{ workout.winner }}</p>
                                <p>Loser: {{ workout.loser }}</p>
                                <Button @click="viewCompletedMatchupResults(workout._id)">See Detailed Results</Button>
                            </div>
                            <p v-else>Tie</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-12 lg:col-6">
                <div class="surface-card shadow-2 border-round p-4 h-30rem overflow-auto">
                    <div class="flex align-items-center justify-content-between mb-3">
                        <div class="text-900 font-medium text-xl">Open Matchups</div>
                        <div>
                            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"></Button>
                            <Menu ref="menu2" id="overlay_menu" :popup="true"></Menu>
                        </div>
                    </div>
                    <ul class="p-0">
                        <li class="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row"
                            v-for="workout in userMatchupWorkouts" :key="workout._id">
                            <div class="flex align-items-start">
                                <div>
                                    <span class="text-900 font-bold block mb-2">{{ workout.workoutTitle }}</span>
                                    <div
                                        class="flex md:align-items-stretch md:justify-content-between flex-column md:flex-row">
                                        <div class="surface-card shadow-2 p-3 border-1 border-50 border-round">
                                            <div class="flex justify-content-between mb-3">
                                                <div>
                                                    <span class="block text-500 font-medium mb-3">{{
                                                        workout.userWorkoutData[0].userName }}</span>
                                                    <div class="text-900 font-medium text-xl">{{
                                                        workout.userWorkoutData[0].totalVolume }} lbs</div>
                                                </div>
                                            </div>
                                            <Button v-if="workout.userWorkoutData[0].userID === this.$store.state.user.uid"
                                                class="flex align-self-center p-button-success m-2"
                                                @click="startMatchupWorkout(workout.workoutID, workout._id)"> Complete
                                                Workout</Button>
                                        </div>
                                        <span class="flex align-self-center text-900 font-bold block p-4">VS.</span>
                                        <div class="surface-card shadow-2 p-3 border-1 border-50 border-round">
                                            <div class="flex justify-content-between mb-3">
                                                <div>
                                                    <span class="block text-500 font-medium mb-3">
                                                        {{ workout.userWorkoutData[1].userName }}</span>
                                                    <div class="text-900 font-medium text-xl">{{
                                                        workout.userWorkoutData[1].totalVolume }} lbs</div>
                                                </div>
                                            </div>
                                            <Button v-if="workout.userWorkoutData[1].userID === this.$store.state.user.uid"
                                                class="flex align-self-center p-button-success m-2"
                                                @click="startMatchupWorkout(workout.workoutID, workout._id)"> Complete
                                                Workout</Button>
                                            <div v-else>
                                                <span v-if="workout.userWorkoutData[1].completionDate"
                                                    class="text-500">Completed: {{
                                                        formatDate(workout.userWorkoutData[1].completionDate) }}</span>
                                                <span v-else class="text-500"> Not Completed</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-12 lg:col-4">
                <div class="surface-card border-round shadow-2 p-4 text-center">

                </div>
            </div>
            <div class="col-12 lg:col-4">
                <div class="surface-card border-round shadow-2 p-4 text-center">
                </div>
            </div>
            <div class="col-12 lg:col-4">
                <div class="surface-card border-round shadow-2 p-4 text-center">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../api'
import dayjs from 'dayjs';
import localizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(localizedFormat)

export default {

    data() {
        return {
            userMatchupWorkouts: [],
            userCompletedMatchupWorkouts: []
        };
    },
    computed: {
        workoutsWithWinners() {
            return this.userCompletedMatchupWorkouts.map(workout => {
                // Assuming there are always 2 users in userWorkoutData
                const user1 = workout.userWorkoutData[0];
                const user2 = workout.userWorkoutData[1];

                let winner, loser;
                if (user1.totalVolume > user2.totalVolume) {
                    winner = user1;
                    loser = user2;
                } else {
                    winner = user2;
                    loser = user1;
                }

                return {
                    ...workout,
                    winner: winner.userName,
                    loser: loser.userName,
                    isTie: user1.totalVolume === user2.totalVolume
                };
            });
        }
    },

    methods: {

        formatDate(date) {
            return dayjs(date).format('LL');
        },

        startMatchupWorkout(workoutID, matchupWorkoutID) {
            this.$router.push({
                name: "active-workout",
                params: { workoutID: workoutID },
                query: { matchup: 'true', matchupWorkoutID: matchupWorkoutID }
            });
        },

        viewCompletedMatchupResults(completedMatchupWorkoutID) {
            this.$router.push({
                name: 'matchup-workout',
                params: { completedMatchupWorkoutID: completedMatchupWorkoutID }
            })
            console.log(completedMatchupWorkoutID)
        },


        //API CALLS
        async getUserMatchupWorkouts() {
            // Fetch the initial data
            let workouts = await API.getMatchupWorkoutsByUserID(this.$store.state.user.uid, true);

            // Function to fetch user names and augment the workout data
            const augmentWorkoutDataWithUserNames = async (workout) => {
                // Fetch user names for each userWorkoutData in parallel
                const augmentedUserWorkoutData = await Promise.all(workout.userWorkoutData.map(async (userData) => {
                    const userName = await this.getUserNames(userData.userID);
                    return { ...userData, userName }; // Augment the userData with userName
                }));

                return { ...workout, userWorkoutData: augmentedUserWorkoutData };
            };

            // Augment each workout in the workouts array
            this.userMatchupWorkouts = await Promise.all(workouts.map(augmentWorkoutDataWithUserNames));

            console.log("Active Workouts: " + this.userMatchupWorkouts);
        },

        async getUserCompletedMatchupWorkouts() {
            let workouts = await API.getCompletedMatchupWorkoutsByUserID(this.$store.state.user.uid)

            const augmentWorkoutDataWithUserNames = async (workout) => {
                // Fetch user names for each userWorkoutData in parallel
                const augmentedUserWorkoutData = await Promise.all(workout.userWorkoutData.map(async (userData) => {
                    const userName = await this.getUserNames(userData.userID);
                    return { ...userData, userName }; // Augment the userData with userName
                }));

                return { ...workout, userWorkoutData: augmentedUserWorkoutData };
            };

            // Augment each workout in the workouts array
            this.userCompletedMatchupWorkouts = await Promise.all(workouts.map(augmentWorkoutDataWithUserNames));

            console.log("Completed Workouts: " + this.userCompletedMatchupWorkouts)
        },

        async getUserNames(userID) {
            let UserInfo = await API.getUserFriends(userID)
            let userName = UserInfo[0].userName
            return userName
        },

    },
    mounted() {
        this.getUserMatchupWorkouts()
        this.getUserCompletedMatchupWorkouts()
    }
}
</script>