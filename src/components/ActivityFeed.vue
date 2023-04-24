<template>
    <li
        class="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
        <div class="flex align-items-start mr-0 lg:mr-5">
            <div>
                <span class="text-900 font-medium block mb-2">{{ workoutTitle }}</span>
                <div class="text-700 mb-2">Completed by: {{ userEmail }}</div>
                <a class="text-blue-500 cursor-pointer" @click="visible2 = true, getCompletedWorkoutByID(completedWorkoutID)" >
                    <i class="pi 
            pi-plus-circle text-sm mr-2"></i>
                    <span>See Results</span>
                </a>
            </div>
        </div>
        <span class="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">{{ relativeTime
        }}</span>
        <Dialog v-model:visible="visible2" appendTo="body" :modal="true">

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
            visible2: false 
        }
    },

    watch: {

    },
    methods: {

        async getCompletedWorkoutByID(completedWorkoutID){
            let completedWorkoutResults = await API.getCompletedWorkoutByID(completedWorkoutID)
            console.log(completedWorkoutResults)
        }

    },
    mounted() {

    }

}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

  