<template>
    <Toast />
    <div class="surface-border border-round surface-0">
        <div class="p-4">
            <div class="flex align-items-center">
                <span class="inline-flex border-circle align-items-center justify-content-center bg-green-100 mr-3"
                    style="width: 38px; height: 38px">
                    <i class="fa-solid fa-medal text-xl text-green-600"></i>
                </span>
                <span class="text-900 font-medium text-2xl">{{ senderUserName }}</span>
            </div>
            <div class="text-900 my-3 text-xl font-medium">{{ messageType }}</div>
            <p class="mt-0 mb-3 text-700 line-height-3">{{ senderUserName }} wants to compete head to head using the Preset
                Workout: {{ matchupWorkoutName }} </p>
        </div>
        <div class="px-4 py-3 surface-100 text-right">
            <Button v-if="messageRead === false && messageUpdated === false" icon="pi pi-check" iconPos="right"
                label="Accept" class="p-button-rounded p-button mr-2" @click="initializeChallenge()"></Button>
            <Button v-if="messageRead === false && messageUpdated === false" icon="pi pi-times" iconPos="right"
                label="Reject" class="p-button-rounded p-button-danger" @click="rejectFriendRequest()"></Button>
        </div>
    </div>
</template>

<script>
import API from '../../api'
export default {
    name: 'ExcerciseCard',

    props: {
        messageID: String,
        receiverUserID: String,
        receiverUserName: String,
        senderUserID: String,
        senderUserName: String,
        messageType: String,
        messageContent: String,
        messageRead: Boolean,
        messageAccepted: Boolean,
        timeStamp: Date
    },

    data() {
        return {
            messageUpdated: false,
            matchupWorkoutName: '',
            matchupWorkoutExercises: [],
        }
    },

    methods: {


        showSuccess() {
            this.$toast.add({ severity: 'success', summary: 'Workout Challenge Accepted', detail: 'Head to your Matchup Dashboard to complete your part of the challenge. ', life: 5000 });
        },


        showReject() {
            this.$toast.add({ severity: 'error', summary: 'Workout Challenge Rejected', detail: "Your friend will be notified you're not ready to compete. ", life: 5000 });
        },

        async initializeChallenge() {
            let messageAccepted = true
            console.log("Matchup request accepted!")
            await API.updateMessageByMessageID(this.messageID, messageAccepted)

            let workoutID = this.messageContent;
            let workoutTitle = this.matchupWorkoutName;
            let senderUser = {
                userID: this.senderUserID,
                workoutDuration: '00:00',
                totalVolume: 0,
                completionDate: '',
                exercises: this.matchupWorkoutExercises
            }
            let receiverUser = {
                userID: this.receiverUserID,
                workoutDuration: '00:00',
                totalVolume: 0,
                completionDate: '',
                exercises: this.matchupWorkoutExercises
            }

            let matchupWorkout = {
                workoutID: workoutID,
                workoutTitle: workoutTitle,
                userWorkoutData: [senderUser, receiverUser]
            }

            await API.createMatchupWorkout(matchupWorkout)

            this.messageUpdated = true
            this.showSuccess()
        },

        async rejectFriendRequest() {
            let messageAccepted = false
            console.log("Matchup request rejected!")
            await API.updateMessageByMessageID(this.messageID, messageAccepted)

            this.messageUpdated = true
            this.showReject()

        },

        async getMatchupWorkoutDetails() {
            let workoutByID = await API.getWorkoutsByWorkoutID(this.messageContent)
            console.log(workoutByID)
            this.matchupWorkoutName = workoutByID[0].workoutTitle
            this.matchupWorkoutExercises = workoutByID[0].exercises

        }

    },
    mounted() {
        this.getMatchupWorkoutDetails()
    }
}

</script>