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
                    <Button v-if="!clicked" class="ml-full" @click="clicked = !clicked"> View Detailed Results</Button>

                    <div class="surface-section" v-if="clicked">
                        <div class="font-medium text-3xl text-900 mb-3">Workout Details</div>
                        <ul class="list-none p-0 m-0">
                            <li v-for="exercise in workout.exercises" :key="exercise.index"
                                class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-500 w-6 md:w-2 font-medium">Exercise</div>
                                <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{{ exercise.exerciseName }}
                                </div>
                                <ul class="list-none">
                                    <li v-for="set in exercise.sets" :key="set.index">
                                        <span class="mr-0"> Set: {{ set.index }}</span> 
                                        <span class="text-500 ml-2">Target Reps: </span>
                                        <span class="text-900 ">{{set.target_reps }}</span>
                                        <span class="text-500 ml-2"> Target Weight: </span>
                                        <span class="text-900 ">{{set.target_weight }} lbs</span>
                                        <span class="text-500 ml-2 ">Actual Reps: </span>
                                        <span class="text-900 ">{{set.actual_reps }}</span>
                                        <span class="text-500 ml-2"> Actual Weight: </span>
                                        <span class="text-900 ">{{set.actual_weight }} lbs</span>
                                        <span class="text-500 ml-2"> Success </span>
                                        <span class="text-900 ">{{set.success }}</span>

                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
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

            clicked: false

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