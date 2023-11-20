<template>
    <div class="flex p-grid w-full align-items-stretch">
        <div class="p-col w-full flex flex-column ">
            <div class="header card bg-gray-900 ">
                <h3 class="m-0 p-2 pt-4 text-white">{{ senderUserName }}</h3>
                <h2 class=" text-white"> {{ senderWorkoutData.totalVolume }} lbs </h2>
                <p class=" p-2 text-white">Completion Date: {{ senderWorkoutData.completionDate }}</p>
            </div>
            <div class=" results card w-full">
                <Panel toggleable>
                    <template #header>
                        <p class="font-bold m-0">10000</p>
                    </template>
                    <p class="m-0">

                    </p>
                </Panel>
            </div>
        </div>
        <div class="card p-col w-full flex flex-column " style="min-width: 100px; max-width: 300px;">
            <!-- Middle Column, Narrower -->
            <div class="header card bg-gray-900">
                <h3 class=" m-0 p-2 pt-8 text-white ">Exercise</h3>
                <h2 class=" text-white"></h2>
                <p class=" p-2 text-white"></p>
            </div>
            <div class=" exercise card w-full  ">
                <h3>Bench Press</h3>
            </div>
        </div>
        <div class=" p-col w-full flex flex-column">
            <div class="header card bg-gray-900">
                <h3 class="m-0 p-2 pt-4 text-white">{{ receiverUserName }}</h3>
                <h2 class=" text-white"> {{ receiverWorkoutData.totalVolume }} lbs </h2>
                <p class=" p-2 text-white">Completion Date: {{ receiverWorkoutData.completionDate }}</p>
            </div>
            <div class=" results card w-full ">
                <Panel toggleable>
                    <template #header>
                        <span class="font-bold">10000</span>
                    </template>
                    <p class="m-0">
                    </p>
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
    }
};
</script>

<style scoped>
.header {
    text-align: center;
    height: 13rem

}

.exercise {
    text-align: center;
    border-color: black;
    border-width: 1px;
}

.results{
    
}
</style>
