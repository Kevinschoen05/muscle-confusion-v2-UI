<template>
    <div class="surface-card border-round shadow-2 p-4">
        <div class="text-900 font-medium mb-3 text-xl">{{ workoutTitle }}</div>
        <div class="flex mb-4 flex-column lg:flex-row">
            <div class="surface-50 p-3 flex-auto">
                <div class="text-600 mb-3">Total Sets</div>
                <span class="text-blue-600 font-medium text-xl">{{ totalSets }}</span>
            </div>
            <div class="surface-50 p-3 flex-auto mx-0 my-3 lg:my-0 lg:mx-3">
                <div class="text-600 mb-3">Last Completed</div>
                <span class="text-blue-600 font-medium text-xl">{{ lastCompletionDate }}</span>
            </div>
            <div class="surface-50 p-3 flex-auto mx-0 mb-3 lg:my-0 lg:mr-3">
                <div class="text-600 mb-3">Average Total Volume</div>
                <span class="text-blue-600 font-medium text-xl">0000 lbs</span>
            </div>
            <div class="surface-50 p-3 flex-auto">
                <div class="text-600 mb-3">Average Duration</div>
                <span class="text-blue-600 font-medium text-xl">14:30</span>
            </div>
        </div>
        <Button label="Start Workout"></Button>
</div>
</template>

<script>
import API from '../api'
export default {
    name: 'ActiveWorkoutSummary',

    props: {
        workoutID: String,
        workoutTitle: String,
        totalSets: Number

    },

    data() {
        return {
            previousCompletedWorkouts: [],
            lastCompletionDate: ''
        }
    },

    watch: {

    },
    methods: {

        getlastCompletionDate() {
            const inputDate = this.previousCompletedWorkouts[0].completionDate
            const dateObj = new Date(inputDate); 
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); 
            const day = dateObj.getDate().toString().padStart(2, '0'); 
            const year = dateObj.getFullYear(); 

            this.lastCompletionDate = `${month}/${day}/${year}`; 

        },

        async getCompletedWorkoutData(workoutID) {
            this.previousCompletedWorkouts = await API.getCompletedWorkoutsByWorkoutID(workoutID)
            this.getlastCompletionDate()
        }

    },
    mounted() {
        this.getCompletedWorkoutData(this.workoutID)
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
