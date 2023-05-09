<template>
    <h1>Recently Completed Workouts</h1>
    <ul class="list-none p-0 m-0 ">
        <li v-for="workout in paginatedWorkouts" :key="workout._id">
            <div class="mb-5 flex">
                <div class="flex flex-column align-items-center" style="width:2rem">
                    <span class="bg-green-500 text-0 flex align-items-center justify-content-center border-circle"
                        style="min-width:2.5rem; min-height: 2.5rem">
                        <i class="pi pi-check"></i>
                    </span>
                    <div class="h-full bg-green-500" style="width: 2px; min-height: 4rem"></div>
                </div>
                <div class="ml-5 surface-card shadow-2 border-round p-3 flex-auto">
                    <div class="mb-2">
                        <span class="text-900 font-medium inline-block mr-3">{{ workout.workoutTitle }}</span>
                    </div>
                    <div class="mb-2">
                        <span class="text-500 text-sm ">{{ workout.completionDate }}</span>
                    </div>

                    <div class="line-height-3 text-700 mb-3">
                        <span class="text-500 text-sm mr-2 "> Total Volume: {{ workout.totalVolume }}</span>
                        <span class="text-500 text-sm mr-2 "> Total Exercises: {{ workout.exercises.length }}</span>
                        <span class="text-500 text-sm mr-2 "> Workout Duration: {{ workout.workoutDuration }}</span>
                    </div>
                    <Button class="ml-full"> View Detailed Results</Button>

                </div>
            </div>
        </li>
    </ul>
    <Paginator :totalRecords="completedWorkouts.length" :rows="perPage" :first="currentPage * perPage" @page="onPageChange">
</Paginator>
</template>

<script>
import API from '../api'
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(localizedFormat)
export default {
    data() {
        return {
            perPage: 10,
            currentPage: 0, // Added for tracking current page
            completedWorkouts: [], // Your array of data

            completedWorkoutSetTotal: 0,
            successPercent: 0,

        }
    },
    computed: {
        paginatedWorkouts() {
            const startIndex = this.currentPage * this.perPage;
            return this.completedWorkouts.slice(startIndex, startIndex + this.perPage);
        }
    },

    methods: {
        setPage(page) {
            this.currentPage = page;
        },

        onPageChange(event) {
            this.currentPage = event.page;
            console.log("Page Change")
        },


        //API CALLS
        async getUserCompletedWorkouts() {
            let completedWorkoutsData = await API.getCompletedWorkoutsByUserID(this.$store.state.user.uid)
            completedWorkoutsData.sort((a, b) => {
                // convert the `completionDate` strings to Date objects for comparison
                const dateA = new Date(a.completionDate);
                const dateB = new Date(b.completionDate);

                // sort in descending order (most recent first)
                return dateB - dateA;
            });
            this.completedWorkouts = completedWorkoutsData;
            for (var i = 0; i < this.completedWorkouts.length; i++) {
                this.completedWorkouts[i].completionDate = dayjs(this.completedWorkouts[i].completionDate).format('LL')
            }
        },
    },

    mounted() {
        this.getUserCompletedWorkouts()
    }
}


</script>