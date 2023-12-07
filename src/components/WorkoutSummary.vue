<template>
    <div class="surface-card border-round shadow-2 p-4">
        <div class="text-900 font-medium mb-3 text-xl">Today's Scheduled Workout</div>
        <p class="mt-0 mb-4 p-0 line-height-3"> {{ workoutTitle }}</p>
        <ul>
            <li v-for="exercise in exercises" :key="exercise.id"> <img aria-hidden="true" loading="lazy" decoding="async"
                    src="../assets/check-circle.svg" alt="check mark" width="20" height="20">{{
                        exercise.exerciseName
                    }}</li>
        </ul>
        <div class="flex">
            <Button class="mr-1" label="Start Workout" @click="startActiveWorkout(workout)"></Button>
            <Button class="p-button-outlined" @click="startWorkoutBuilder" label="Build New Workout"></Button>
        </div>
        <div class="flex flex-wrap align-items-center justify-content-center gap-3">
            <Button class="mt-3" label="Freestyle Workout" @click="startFreestyleWorkout"></Button>
        </div>
</div>
</template>
  
<script>
import API from "../api"
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advanced from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat"


dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(advanced)
dayjs.extend(localizedFormat)
dayjs.tz.setDefault('America/New_York');

export default {
    name: 'WorkoutSummary',
    data() {
        return {
            today: dayjs().tz().format('LL'),
            workout: [],
            exercises: [],
            userSchedule: [],
            workoutTitle: ''
        }
    },
    watch: {
        workout: {
            handler() {
                this.getWorkoutDetails()
            }
        }
    },
    methods: {


        getTodaysWorkout() {
            for (var i = 0; i < this.userSchedule.length; i++) {
                if (this.userSchedule[i].date === this.today) {
                    this.workout = this.userSchedule[i].workoutID
                    console.log(this.today)
                    console.log(this.userSchedule[i].date)
                    console.log(this.workout)
                }
            }
        },

        startActiveWorkout(workoutID) {
            this.$router.push({
                name: "active-workout",
                link: "/activeworkout/",
                params: { workoutID: workoutID },
            });
        },

        startFreestyleWorkout(){
            this.$router.push({
                name: 'freestyle-workout',
                link: "/activeworkout/freestyle",
                params: { workoutID: 'freestyle' }
            })
        },

        startWorkoutBuilder() {
            this.$router.push({
                name: "workout-builder",
                link: "/workoutbuilder"
            });
        },

        //API CALLS
        async getUserSchedule() {
            let scheduleObject = await API.getUserSchedule(this.$store.state.user.uid)
            console.log(scheduleObject);
            console.log(this.today)
            this.userSchedule = scheduleObject[0].schedule
            this.getTodaysWorkout()

        },

        async getWorkoutDetails() {
            let workoutObject = await API.getWorkoutsByWorkoutID(this.workout)
            console.log(workoutObject)
            this.exercises = workoutObject[0].exercises
            this.workoutTitle = workoutObject[0].workoutTitle

        }


        /* getWorkoutImage(workout){
             return require('../assets/workout-images/'+ workout  +'.png')
        }
        */

    },
    mounted() {
        //this.getWorkoutImage(this.workout)
        this.getUserSchedule()
        console.log(this.workout)
    }

}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 2em;
    margin-top: 1.09375em;
    width: 25em;
    height: 37em;
    background: #FFFFFF;
    border: 1px solid #70707B;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    border-radius: 16px;
}

h1 {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 36px;
    font-weight: 600;
    color: #101828;
    margin-bottom: 10px;
}

h2 {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #101828;
}

ul {
    padding-left: 0em;
    margin-bottom: 1.25em;
}

ul li {
    list-style: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    padding-bottom: .5em;
}

ul li img {
    margin-right: 0.625em;
}

.divider {
    width: 90%;
    height: 1px;
    background-color: #B2DDFF;
}

.primary-button {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    gap: 8px;
    width: 90%;
    height: 2.6em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: white;
    background: #1849A9;
    border: 1px solid #1849A9;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.secondary-button {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    margin-top: 1em;
    margin-bottom: 1em;
    gap: 8px;
    width: 90%;
    height: 2.6em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #1849A9;
    background: white;
    border: 1px solid #1849A9;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.diagram-container {
    display: flex;
    justify-content: center;
    font-size: 20px;
    width: 100%;
    height: 100%;
}

#diagram {
    height: 10em;
    width: 10em;
    padding-right: 2em;
}
</style>
  