<template>
    <li
        class="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
        <div class="flex align-items-start mr-0 lg:mr-5">
            <div>
                <span class="text-900 font-medium block mb-2">{{ workoutTitle }}</span>
                <div class="text-700 mb-2">Completed by: {{ userEmail }}</div>
                <a class="text-blue-500 cursor-pointer"
                    @click="visible2 = true, getCompletedWorkoutByID(completedWorkoutID)">
                    <i class="pi 
                            pi-plus-circle text-sm mr-2"></i>
                    <span>See Results</span>
                </a>
            </div>
        </div>
        <span class="block text-500 font-medium  xs:ml-0 sm:ml-0 ml-7 md:ml-5 mt-2 md:mt-0">{{ relativeTime
        }}</span>
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
</li>
</template>
  
<script>
import API from '../api'
export default {
    name: 'ActivityFeed',

    props: {
        workoutTitle: String,
        userEmail: String,
        workoutID: String,
        relativeTime: String,
        completedWorkoutID: String
    },

    data() {
        return {
            visible2: false,
            completedWorkoutResults: [],
            completedWorkoutSetTotal: 0,
            completedWorkoutDuration: '',
            completedWorkoutTotalVolume: 0,
            successfulSetPercent: 0

        }
    },

    watch: {

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
           this.successfulSetPercent =  Math.round(successPercentage * 100) / 100;
        },

        async getCompletedWorkoutByID(completedWorkoutID) {
            let results = await API.getCompletedWorkoutByID(completedWorkoutID)
            console.log(results)
            this.completedWorkoutResults = results;
            this.completedWorkoutDuration = results[0].workoutDuration
            this.completedWorkoutTotalVolume = results[0].totalVolume
            this.calculateSuccessPercentage(results[0])
        }


    },
    mounted() {

    }

}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

  