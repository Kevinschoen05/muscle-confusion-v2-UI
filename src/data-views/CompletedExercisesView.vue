<template>
    <h1> Completed Exercises View</h1>
</template>

<script>
import API from '../api'

export default {

    watch: {
        /* Watch for changes in the computed property
        presetWorkoutData: function () {
            this.calculateSuccessPercentage(this.presetWorkoutData)
        }
        */
    },
    data() {
        return {
            exerciseData: []
        }
    },
    methods: {

        async getUserCompletedWorkouts() {
            let completedWorkoutsData = await API.getCompletedWorkoutsByUserID(this.$store.state.user.uid)
            completedWorkoutsData.sort((a, b) => {
                // convert the `completionDate` strings to Date objects for comparison
                const dateA = new Date(a.completionDate);
                const dateB = new Date(b.completionDate);

                // sort in descending order (most recent first)
                return dateB - dateA;
            });
            this.userCompletedWorkouts = completedWorkoutsData;
            this.calcUserSummaryStats()
        },
        
        //API CALLS
       async getCompletedExerciseData(){
            this.exerciseData = await API.getCompletedExercisesByExerciseID('63894e8e183aff5cb54f2208', this.$store.state.user.uid)
            console.log(this.exerciseData)
        }

    },
    mounted() {
        this.getCompletedExerciseData()
    }
}


</script>