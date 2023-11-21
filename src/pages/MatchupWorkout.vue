<template>
    <div class="flex p-grid w-full align-items-stretch">
        <div class="p-col w-full flex flex-column ">
            <div class="header card bg-gray-900 ">
                <h3 class="m-0 p-2 pt-4 text-white">{{ senderUserName }}</h3>
                <h2 class=" text-white"> {{ senderWorkoutData.totalVolume }} lbs </h2>
                <p class=" p-2 text-white">Completion Date: {{ senderWorkoutData.completionDate }}</p>
            </div>
            <div class=" results card w-full" v-for=" exercise in senderWorkoutData.exercises" :key="exercise.id">
                <Panel toggleable collapsed="true">
                    <template #header>
                        <div>
                            <h4>{{ exercise.exerciseName }}</h4>
                            <p class="font-bold m-0">{{ totalWeight(exercise.sets) }} lbs</p>
                        </div>
                    </template>
                    <ul class="p-0 m-0">
                        <li class="list-none pb-4" v-for="set in exercise.sets" :key="set.index"> Set {{ set.index }} <br>
                            Completed Weight: {{ set.actual_weight }} <br> Completed Reps: {{ set.actual_reps }}</li>
                    </ul>
                </Panel>
            </div>
        </div>
        <div class="card p-col w-full flex flex-column " style="min-width: 50px; max-width: 150px;">
            <!-- Middle Column, Narrower -->
            <div class="header card bg-gray-900">
            </div>
        </div>
        <div class=" p-col w-full flex flex-column">
            <div class="header card bg-gray-900">
                <h3 class="m-0 p-2 pt-4 text-white">{{ receiverUserName }}</h3>
                <h2 class=" text-white"> {{ receiverWorkoutData.totalVolume }} lbs </h2>
                <p class=" p-2 text-white">Completion Date: {{ receiverWorkoutData.completionDate }}</p>
            </div>
            <div class=" results card w-full " v-for=" exercise in receiverWorkoutData.exercises" :key="exercise.id">
                <Panel toggleable collapsed="true">
                    <template #header>
                        <div>
                            <h4>{{ exercise.exerciseName }}</h4>
                            <p class="font-bold m-0">{{ totalWeight(exercise.sets) }} lbs</p>
                        </div>
                    </template>
                    <ul class="p-0 m-0">
                        <li class="list-none pb-4" v-for="set in exercise.sets" :key="set.index"> Set {{ set.index }} <br>
                            Completed Weight: {{ set.actual_weight }} <br> Completed Reps: {{ set.actual_reps }}</li>
                    </ul>
                </Panel>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../api'
export default {

    data() {
        return {
            headerTopPosition: 0,

            matchupWorkout: {},
            senderUserID: '',
            senderUserName: '',
            senderWorkoutData: [],
            receiverUserID: '',
            receiverUserName: '',
            receiverWorkoutData: []

        };
    },
    methods: {

        totalWeight(sets) {
            return sets.reduce((total, set) => total + (set.actual_weight * set.actual_reps), 0);
        },

        //API Calls
        async getCompletedMatchupWorkout() {
            this.matchupWorkout = await API.getCompletedMatchupWorkoutbyID(this.$route.params.completedMatchupWorkoutID)
            console.log(this.matchupWorkout)
            this.getUserData()
        },
        async getUserData() {
            let userIDs = [];
            for (let userData of this.matchupWorkout[0].userWorkoutData) {
                userIDs.push(userData.userID);
            }
            this.senderUserID = userIDs[0];
            this.receiverUserID = userIDs[1];

            let senderUserInfo = await API.getUserFriends(this.senderUserID)
            console.log(senderUserInfo)
            this.senderUserName = senderUserInfo[0].userName
            console.log(this.senderUserName)

            let receiverUserInfo = await API.getUserFriends(this.receiverUserID)
            console.log(receiverUserInfo)
            this.receiverUserName = receiverUserInfo[0].userName
            console.log(this.receiverUserName)

            this.senderWorkoutData = this.matchupWorkout[0].userWorkoutData[0]
            console.log(this.senderWorkoutData)
            this.receiverWorkoutData = this.matchupWorkout[0].userWorkoutData[1]
            console.log(this.receiverWorkoutData)

        },
    },
    mounted() {
        this.getCompletedMatchupWorkout()
    },

};
</script>

<style scoped>
.header {
    text-align: center;
    height: 13rem
}

.exercise {
    height: 250px;
    text-align: center;
    border-color: black;
    border-width: 2px;
}

.results {}
</style>
