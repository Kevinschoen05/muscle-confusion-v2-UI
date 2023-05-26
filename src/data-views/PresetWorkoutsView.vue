<template>
    <h1>Preset Workout Historical Results</h1>
    <Dropdown class="field col-12" v-model="selectedWorkout" :options="presetWorkouts" optionLabel="workoutTitle"  placeholder="Select Preset Workout"
    @change="this.getPresetWorkoutData(selectedWorkout._id)" />
</template>

<script>

import API from '../api'
export default {
    data() {
        return {
            selectedWorkout: '',
            presetWorkouts: [],
            presetWorkoutData: []

        }
    },
    methods: {


        //API Calls
        async getUserPresetWorkouts(){
            this.presetWorkouts = await API.getWorkoutsByUserID(this.$store.state.user.uid)
        }, 

        async getPresetWorkoutData(workoutID){
            console.log(workoutID)
            this.presetWorkoutData = await API.getCompletedWorkoutsByWorkoutID(workoutID)
            console.log(this.presetWorkoutData)
        }
    },
    mounted() {
        this.getUserPresetWorkouts()
    }
}
</script>