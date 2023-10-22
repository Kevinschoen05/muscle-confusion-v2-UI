<template>
    <div class="surface-border border-round surface-0">
        <div class="p-4">
            <div class="flex align-items-center">
                <span class="inline-flex border-circle align-items-center justify-content-center bg-green-100 mr-3"
                    style="width: 38px; height: 38px">
                    <i class="pi pi-envelope text-xl text-green-600"></i>
                </span>
                <span class="text-900 font-medium text-2xl">{{ senderUserName }}</span>
            </div>
            <div class="text-900 my-3 text-xl font-medium">{{ messageType }}</div>
        </div>
        <div class="px-4 py-3 surface-100 text-right">
            <Button icon="pi pi-check" iconPos="right" label="View Summary" class="p-button-rounded p-button mr-2"
                @click=" visible2 = true, viewSummary()"></Button>
        </div>
        <Dialog v-model:visible="visible2" appendTo="body" :modal="true">
            <div class="text-900 font-medium mb-3 text-xl">{{ workoutTitle }}</div>
            <div class="flex mb-4 flex-column lg:flex-row">
                <div class="surface-50 p-3 flex-auto">
                    <div class="text-600 mb-3">Total Sets</div>
                    <span class="text-blue-600 font-medium text-xl">{{ completedWorkoutSetTotal }}</span>
                </div>
                <div class="surface-50 p-3 flex-auto mx-0 my-3 lg:my-0 lg:mx-3">
                    <div class="text-600 mb-3">Duration</div>
                    <span class="text-blue-600 font-medium text-xl">{{ completedWorkoutDuration }}</span>
                </div>
                <div class="surface-50 p-3 flex-auto mx-0 mb-3 lg:my-0 lg:mr-3">
                    <div class="text-600 mb-3">Total Volume</div>
                    <span class="text-blue-600 font-medium text-xl">{{ completedWorkoutTotalVolume }} lbs</span>
                </div>
                <div class="surface-50 p-3 flex-auto">
                    <div class="text-600 mb-3">Successful Sets </div>
                    <span class="text-blue-600 font-medium text-xl">{{ successfulSetPercent }} %</span>
                </div>
            </div>
        </Dialog>
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
            visible2: false,
            workoutTitle: '',
            completedWorkoutResults: [],
            completedWorkoutSetTotal: 0,
            completedWorkoutDuration: '',
            completedWorkoutTotalVolume: 0,
            successfulSetPercent: 0

        }
    },

    methods: {

        calculateSuccessPercentage(obj) {
            let totalSets = 0;
            let successfulSets = 0;
            obj.exercises.forEach((exercise) => {
                exercise.sets.forEach((set) => {
                    totalSets++;
                    if (set.success) {
                        successfulSets++;
                    }
                });
            });
            const successPercentage = (successfulSets / totalSets) * 100;
            this.completedWorkoutSetTotal = totalSets;
            this.successfulSetPercent = Math.round(successPercentage * 100) / 100;
        },

        async getCompletedWorkoutByID(completedWorkoutID) {
            let results = await API.getCompletedWorkoutByID(completedWorkoutID)
            console.log(results)
            this.workoutTitle = results[0].workoutTitle
            this.completedWorkoutResults = results;
            this.completedWorkoutDuration = results[0].workoutDuration
            this.completedWorkoutTotalVolume = results[0].totalVolume
            this.calculateSuccessPercentage(results[0])
        },

        async viewSummary() {
            let messageAccepted = true
            await API.updateMessageByMessageID(this.messageID, messageAccepted)
            this.getCompletedWorkoutByID(this.messageContent)

        },


    }
}

</script>