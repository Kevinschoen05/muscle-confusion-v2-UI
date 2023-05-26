<template>
    <h1>Preset Workout Historical Results</h1>
    <Dropdown class="field col-12" v-model="selectedWorkout" :options="presetWorkouts" optionLabel="workoutTitle"
        placeholder="Select Preset Workout" @change="this.getPresetWorkoutData(selectedWorkout._id)" />
    <div v-if='selectedWorkout' class="grid">
        <div class="col-12 md:col-6 lg:col-3 p-3">
            <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                    style="width:49px; height: 49px">
                    <i class="pi pi-info-circle text-xl text-white"></i>
                </span>
                <div class="text-2xl font-medium text-white mb-2">123K</div>
                <span class="text-blue-100 font-medium">Messages</span>
            </div>
        </div>
        <div class="col-12 md:col-6 lg:col-3 p-3">
            <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                    style="width:49px; height: 49px">
                    <i class="pi pi-info-circle text-xl text-white"></i>
                </span>
                <div class="text-2xl font-medium text-white mb-2">123K</div>
                <span class="text-blue-100 font-medium">Messages</span>
            </div>
        </div>
</div>
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
        async getUserPresetWorkouts() {
            this.presetWorkouts = await API.getWorkoutsByUserID(this.$store.state.user.uid)
        },

        async getPresetWorkoutData(workoutID) {
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