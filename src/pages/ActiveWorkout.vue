<template>
    <section class="timer">
        <div class="stopwatch__time">
            <h1 class="stopwatch__time-show">
                <span class="minutes">00</span>:<span class="seconds">00</span>.<span class="milliseconds">00</span>
            </h1>
        </div>
        <div class="stopwatch__btns">
            <button class="stopwatch__btns-b stopwatch__btns-reset">Reset</button>
            <button class="stopwatch__btns-b stopwatch__btns-start">Start</button>
            <button class="stopwatch__btns-b stopwatch__btns-stop hidden">
                Stop
            </button>
            <button class="stopwatch__btns-b stopwatch__btns-resume hidden">
                Resume
            </button>
        </div>
    </section>
    <section class="workouts">
        <ExerciseCard v-for="exercise in exercises" :key="exercise" 
        :exerciseName=exercise.exerciseName
        :primaryMuscleGroup="exercise.primaryMuscleGroup"
        :secondaryMuscleGroups="exercise.secondaryMuscleGroups"
        :targetSets="exercise.targetSets"
        :targetSetReps="exercise.targetSetReps"
        :actualSets="exercise.actualSets"
        :actualSetReps="exercise.actualSetReps"
        ></ExerciseCard>
    </section>
    <button @click="debug()">debug</button>

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
            activeWorkout: {},
            exercises: [],
        }
    },
    methods: {
        async getActiveWorkout() {
            this.activeWorkout = await API.getWorkoutsByWorkoutID(this.$route.params.workoutID)
            this.exercises = this.activeWorkout[0].exercises
        },
        debug() {
            console.log(this.exercises[0])
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
    color: #ff4a4a;
    box-shadow: rgba(50, 50, 93, 0.35) 0px 2px 5px -1px, rgba(0, 0, 0, 0.5) 0px 1px 3px -1px;
}

.stopwatch__btns-resume {
    background-color: #ffffff;
    color: #3ab0ff;
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