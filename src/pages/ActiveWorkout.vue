<template>
    <Toast />
    <div class="surface-ground">
        <div class="grid">
            <ActiveWorkoutSummary :workoutID="this.workoutID" :workoutTitle="this.workoutTitle" :totalSets="this.totalSets"
                class="timer flex flex-column flex-auto align-items-center">
            </ActiveWorkoutSummary>
            <div class="col-12 p-3 flex flex-column flex-auto align-items-center">
                <Button v-if="visible1" label="Start Workout" class=" flex align-items-center" @click="startTimer(), visible1 = false"></Button>

                <ul  v-if=!visible1 class="list-none p-0 m-0">
                    <ExerciseCard v-for="exercise in exercises" :key="exercise"
                        @exercise-complete="handleCompletedExercise(exercise)" :exerciseName=exercise.exerciseName
                        :primaryMuscleGroup="exercise.primaryMuscleGroup"
                        :secondaryMuscleGroups="exercise.secondaryMuscleGroups" :targetSets="exercise.targetSets"
                        :sets="exercise.sets"></ExerciseCard>
                </ul>
            </div>
            <div class=" mb-3 flex flex-column flex-auto align-items-center">
                <Button v-if=!visible1 label="Complete Workout" class=" flex align-items-center"
                    @click="visible2 = true, this.calculateTotalVolume(), stopTimer()"></Button>
            </div>
        </div>
        <Dialog v-model:visible="visible2" appendTo="body" :modal="true">
            <div class="p-4">
                <div class="text-900 font-medium mb-3 text-xl">Workout summary</div>
                <p class="mt-0 mb-4 p-0 line-height-3">Review all your completed workouts from your Dashboard</p>
                <div class="flex mb-4 flex-column lg:flex-row">
                    <div class="surface-50 p-3 flex-auto mx-0 my-3 lg:my-0 lg:mx-3">
                        <div class="text-600 mb-3">Total Volume</div>
                        <span class="text-blue-600 font-medium text-xl">{{ totalVolume }} lbs</span>
                    </div>
                    <div class="surface-50 p-3 flex-auto">
                        <div class="text-600 mb-3">Duration</div>
                        <span class="text-blue-600 font-medium text-xl">{{ formattedElapsedTime }}</span>
                    </div>
                </div>
                <Button icon="pi pi-check" label="Save Workout" @click="saveCompletedWorkout(), visible2 = false"></Button>
            </div>

        </Dialog>
</div>
</template>

<script>
import API from '../api'
import ExerciseCard from '../components/ExerciseCard.vue'
import ActiveWorkoutSummary from '../components/ActiveWorkoutSummary.vue'

export default {
    components: {
        ExerciseCard,
        ActiveWorkoutSummary
    },
    data() {
        return {
            visible1: true, 
            visible2: false,
            activeWorkout: {},
            workoutTitle: '',
            workoutID: this.$route.params.workoutID,
            exercises: [],
            completedExercises: [],
            totalVolume: 0,
            totalSets: 0,

            startTime: null,
            endTime: null,
            elapsedTime: 0,

        }
    },
    computed: {
        formattedElapsedTime() {
            const hours = Math.floor(this.elapsedTime / (1000 * 60 * 60));
            const minutes = Math.floor((this.elapsedTime / (1000 * 60)) % 60);
            const seconds = Math.floor((this.elapsedTime / 1000) % 60);
            return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
        },
    },

    methods: {
        startTimer() {
            this.startTime = Date.now();
            this.showWorkoutStart();

        },

        stopTimer() {
            this.endTime = Date.now();
            this.elapsedTime = this.endTime - this.startTime;
        },

        padZero(num) {
            return num.toString().padStart(2, '0');
        },


        showSuccess() {
            this.$toast.add({ severity: 'success', summary: 'Workout Complete', detail: 'You Can Review your Completed Workouts in your Dashboard.', life: 5000 });
        },

        showWorkoutStart() {
            this.$toast.add({ severity: 'success', summary: 'Workout Started', detail: 'Workout Duration will be tracked.', life: 5000 });
        },


        handleCompletedExercise(exercise) {
            this.completedExercises.push(exercise)
            console.log("completed exercises array: " + this.completedExercises)
        },

        calculateTotalVolume() {
            let volume = 0;
            for (var i = 0; i < this.completedExercises.length; i++) {
                for (var k = 0; k < this.completedExercises[i].sets.length; k++) {
                    volume += (this.completedExercises[i].sets[k].actual_weight * this.completedExercises[i].sets[k].actual_reps)

                }
            }
            this.totalVolume = volume
            console.log(volume)
        },

        calculateTotalSets() {
            for (let i = 0; i < this.exercises.length; i++) {
                this.totalSets += this.exercises[i].targetSets
            }
            console.log(this.totalSets)
        },

        async getActiveWorkout() {
            this.activeWorkout = await API.getWorkoutsByWorkoutID(this.$route.params.workoutID)
            this.exercises = this.activeWorkout[0].exercises
            this.workoutTitle = this.activeWorkout[0].workoutTitle
            this.workoutID = this.activeWorkout[0].workoutID
            this.calculateTotalSets()
        },

        async saveCompletedWorkout() {
            let completedWorkout = {
                workoutID: this.activeWorkout[0]._id,
                workoutTitle: this.activeWorkout[0].workoutTitle,
                workoutDuration: this.formattedElapsedTime,
                totalVolume: this.totalVolume,
                users: this.activeWorkout[0].users,
                exercises: this.completedExercises
            }

            await API.addCompletedWorkout(completedWorkout)
            this.showSuccess()
            this.$router.push({
                name: "user-dashboard",
                link: "/dashboard",
            });
        },


        debug() {
            console.log(this.exercises)
            console.log(this.completedExercises)
            this.calculateTotalVolume()
        }
    },
    mounted() {
        this.getActiveWorkout();
    }
}

</script>
