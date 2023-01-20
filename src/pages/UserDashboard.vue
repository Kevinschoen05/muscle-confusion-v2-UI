<template>
    <div class="settings-row">
        <section class="settings-header">
            <h1 class="settings-title">Set This Week's Schedule</h1>
            <p class="settings-subtitle">Week of November 27th, 2022</p>
            <div class="weekly-schedule">


            </div>
        </section>
        <section class="preset-workouts">
            <h1 class="settings-title">Customize Preset Workouts</h1>
            <p class="settings-subtitle">Choose Workout to Edit</p>
            <table v-for='preset in presets' :key="preset.WorkoutTitle">
                <preset-workouts :WorkoutTitle="preset.workoutTitle"></preset-workouts>
            </table>
        </section>
    </div>
</template>

<script>
import PresetWorkouts from '../components/PresetWorkouts.vue'
import API  from '../api';

export default {
    components: {
        PresetWorkouts
    },

    data() {
        return {
            presets: [

            ]
        }
    },
    methods: { 
        async getUserPresetWorkouts(){
          this.presets = await API.getWorkoutsByUserID(this.$store.state.user.uid)
        }
    }, 

    mounted(){
        this.getUserPresetWorkouts()
    }
}


</script>

<style>
body {
    background-color: #f5f5f5;
}

.settings-row {
    display: flex;
    justify-content: space-around;
}

.settings-header,
.preset-workouts {
    background-color: #fff;
    width: 30%;
    margin-top: 5em;
    border: 1px solid #EAECF0;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    border-radius: 16px;
}

.settings-title {
    font-family: 'Roboto';
    font-size: 30px;
    font-weight: 600;
    line-height: 38px;
    color: #101828;
    margin-left: 2em;
}

.settings-subtitle {
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    color: #475467;
    margin-left: 4em;


}

#primevue {
    margin-top: 2rem;
}
</style>