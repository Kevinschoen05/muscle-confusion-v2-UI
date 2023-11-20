<template>
<div>
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