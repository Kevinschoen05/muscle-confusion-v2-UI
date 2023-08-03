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
                        <br>
                        <span class="text-500 text-sm mr-2 "> Total Exercises: {{ workout.exercises.length }}</span>
                        <br>
                        <span class="text-500 text-sm mr-2 "> Workout Duration: {{ workout.workoutDuration }}</span>
                    </div>
                    <Button v-if="!(selectedWorkout === workout._id)"  class="ml-full" @click="showDetails(workout._id)"> View Detailed Results</Button>

                    <div class="surface-section" v-if="selectedWorkout === workout._id">
                        <div class="font-medium text-3xl text-900 mb-3">Workout Details</div>
                        <ul class="list-none p-0 m-0">
                            <li v-for="exercise in workout.exercises" :key="exercise.index"
                                class="flexpy-3 px-2 border-top-1 surface-border flex-wrap">
                                <div class="text-900 w-6 mt-4 font-medium">{{ exercise.exerciseName }}</div>

                                <ul class="set-list list-none m-0 p-0" >
                                    <li class="mb-4" v-for="set in exercise.sets" :key="set.index">
                                        <div class="mr-0 flex align-items-center"> Set: {{ set.index }}
                                            <img v-if="(set.success)" class="ml-2" aria-hidden="true" loading="lazy"
                                                decoding="async" src="../assets/check-circle-success.svg" alt="check mark">
                                            <img v-else-if="(!set.success && set.completed)" class="ml-2" aria-hidden="true"
                                                loading="lazy" decoding="async" src="../assets/slash-circle.svg"
                                                alt="check mark">
                                        </div>
                                        <span class="text-500">Target Reps: </span>
                                        <span class="text-900 ">{{ set.target_reps }}</span>
                                        <br>
                                        <span class="text-500  ">Actual Reps: </span>
                                        <span class="text-900 ">{{ set.actual_reps }}</span>
                                        <br>
                                        <span class="text-500">Target Weight: </span>
                                        <span class="text-900 ">{{ set.target_weight }} lbs</span>
                                        <br>
                                        <span class="text-500">Actual Weight: </span>
                                        <span class="text-900">{{ set.actual_weight }} lbs</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </li>
    </ul>
    <Paginator  :totalRecords="completedWorkouts.length" :rows="perPage" :first="currentPage * perPage" @page="onPageChange" template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink">
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

            clicked: false,
            selectedWorkout: null

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

        showDetails(index) {
            this.selectedWorkout = index;
        },

        //API CALLS
        async getUserCompletedWorkouts() {
            let userIDs = [this.$store.state.user.uid]
            let completedWorkoutsData = await API.getCompletedWorkoutsByUserID(userIDs)
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

<style scoped>
@media screen and (min-width: 576px) {
    .set-list{
        column-count: 2;
}
}
</style>