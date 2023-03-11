<template>
    <div class="surface-ground">
        <div class="grid">
            <section class="timer flex flex-column flex-auto align-items-center">
                <div class="stopwatch__time">
                    <h1 class="stopwatch__time-show">
                        <span class="hours">{{ timerHours }}</span>:<span class="minutes">{{ timerMinutes
                        }}</span>:<span class="seconds">{{ timerSeconds
}}</span>.<span class="milliseconds">{{ timerMilliseconds }}</span>
                    </h1>
                </div>
                <div class="stopwatch__btns">
                    <button class="stopwatch__btns-b stopwatch__btns-start" @click="startTimer()">Start</button>
                    <button class="stopwatch__btns-b stopwatch__btns-stop " @click="stopTimer()">
                        Stop
                    </button>
                </div>
            </section>
            <div class="col-12 p-3 flex flex-column flex-auto align-items-center">
                <ul class="list-none p-0 m-0">
                    <ExerciseCard v-for="exercise in exercises" :key="exercise"
                        @exercise-complete="handleCompletedExercise(exercise)" :exerciseName=exercise.exerciseName
                        :primaryMuscleGroup="exercise.primaryMuscleGroup"
                        :secondaryMuscleGroups="exercise.secondaryMuscleGroups" :targetSets="exercise.targetSets"
                        :sets="exercise.sets"></ExerciseCard>
                </ul>
            </div>
            <div class=" mb-3 flex flex-column flex-auto align-items-center">
                <Button label="Complete Workout" class=" flex align-items-center" @click="visible2 = true, this.calculateTotalVolume()"></Button>
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
                        <span class="text-blue-600 font-medium text-xl">{{ this.timerMinutes + ":" + this.timerSeconds + ":"
                            + this.timerMilliseconds }}</span>
                    </div>
                </div>
                <Button icon="pi pi-check" label="Save Workout"></Button>
            </div>

        </Dialog>
</div>
</template>

<script>
import API from '../api'
import ExerciseCard from '../components/ExerciseCard.vue'

export default {
    components: {
        ExerciseCard
    },
    data() {
        return {
            visible2: false,
            activeWorkout: {},
            exercises: [],
            completedExercises: [],
            totalVolume: 0,

            timerHours: 0,
            timerMilliseconds: 0,
            timerSeconds: 0,
            timerMinutes: 0,
            interval: null
        }
    },

    methods: {
        startTimer() {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            this.interval = setInterval(this.calculateTimer, 10);
        },

        stopTimer() {
            clearInterval(this.interval);
        },

        calculateTimer() {
            this.timerMilliseconds += 10;
            if (this.timerMilliseconds == 1000) {
                this.timerMilliseconds = 0;
                this.timerSeconds++;
                if (this.timerSeconds == 60) {
                    this.timerSeconds = 0;
                    this.timerMinutes++;
                    if (this.timerMinutes == 60) {
                        this.timerMinutes = 0;
                        this.timerHours++;
                    }
                }
            }
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

        async getActiveWorkout() {
            this.activeWorkout = await API.getWorkoutsByWorkoutID(this.$route.params.workoutID)
            this.exercises = this.activeWorkout[0].exercises
        },

        async saveCompletedWorkout(completedExercises) {
            let completedWorkout = {
                workoutID: this.activeWorkout[0]._id,
                workoutTitle: this.activeWorkout[0].workoutTitle,
                workoutDuration: this.timerMinutes + ":" + this.timerSeconds + ":" + this.timerMilliseconds,
                totalVolume: this.totalVolume,
                users: this.activeWorkout[0].users,
                exercises: completedExercises
            }

            await API.addCompletedWorkout(completedWorkout)
        },


        debug() {
            console.log(this.exercises)
            console.log(this.completedExercises)
            this.calculateTotalVolume()
        }
    },
    mounted() {
        this.getActiveWorkout()
    }
}

</script>
<style scoped>
.stopwatch {
    width: 80%;
    height: 25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.stopwatch__time-show {
    font-size: 5rem;
    font-weight: 300;
}

.stopwatch__btns {
    width: 300px;
    display: flex;
    justify-content: space-around;
}

.stopwatch__btns-b {
    border: none;
    cursor: pointer;
    color: #323232;
    font-size: 1.75rem;
    background-color: #ffffff;
    padding: 10px 30px;
    border-radius: 25px;
    font-weight: 600;
    box-shadow: 19px 19px 32px #d0d0d0, -19px -19px 32px #ffffff;
}

.stopwatch__btns-stop {
    background-color: #ffffff;
    color: #E62E05;
    box-shadow: rgba(50, 50, 93, 0.35) 0px 2px 5px -1px, rgba(0, 0, 0, 0.5) 0px 1px 3px -1px;
}

.stopwatch__btns-resume {
    background-color: #ffffff;
    color: #1849A9;
    box-shadow: rgba(50, 50, 93, 0.35) 0px 2px 5px -1px, rgba(0, 0, 0, 0.5) 0px 1px 3px -1px;
}

.resume-active {
    background-color: #3ab0ff;
    color: #ffffff;
    transition: all 0.35s ease;
}

.stop-active {
    background: #ff4a4a;
    color: white;
    transition: all 0.35s ease;
}

.reset-new {
    background-color: #3ab0ff;
    color: #ffffff;
    box-shadow: rgba(50, 50, 93, 0.5) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.active {
    display: inline-block;
}

.hidden {
    display: none;
}
</style>