<template>
    <div class="container">
        <div class="header-bar">
            <div class="exercise-header">
                <p class="exercise-name">Barbell Bench Press</p>
                <muscle-badge title="Chest" primary></muscle-badge>
                <muscle-badge title="Triceps"></muscle-badge>
            </div>
            <div class="output">
                <p class="output-value">{{ sets.length }} Sets</p>
                <p class="output-value">{{ reps }} Reps</p>
            </div>
        </div>
        <div class="set-table">
            <table class="set-list" v-for="set in sets" :key="set.index">
                <thead class="header">
                    <th class="header-item">Results</th>
                    <th class="header-item">Reps</th>
                    <th class="header-item">Weight</th>
                    <th></th>
                </thead>
                <tr class="set">
                    <td class="set-index">Target</td>
                    <td class="set-item">{{ set.target_reps }}</td>
                    <td class="set-item"> <input v-if="!set.completed" class="set-input" type="number" step=5
                            v-model="set.target_weight">
                        <p v-else class="set-value">{{ set.target_weight }}</p>
                    </td>
                    <td class="success-icon"></td>
                </tr>
                <tr class="set">
                    <td class="set-index">Actual</td>
                    <td class="set-item"><input v-if="!set.completed" class="set-input" type="number" step=5
                            v-model="set.actual_reps">
                        <p v-else class="set-value"
                            v-bind:class="{ 'set-success': (set.success && set.completed), 'set-failure': (!set.success && set.completed) }">
                            {{ set.actual_reps }}</p>
                    </td>
                    <td class="set-item"><input v-if="!set.completed" class="set-input" type="number" step=5
                            v-model="set.actual_weight">
                        <p v-else class="set-value"
                            v-bind:class="{ 'set-success': (set.success && set.completed), 'set-failure': (!set.success && set.completed) }">
                            {{ set.actual_weight }}</p>
                    </td>
                    <td class="success-icon"> <img v-if="(set.success && set.completed)" class="success-icon"
                            aria-hidden="true" loading="lazy" decoding="async" src="../assets/check-circle-success.svg"
                            alt="check mark">

                        <img v-else-if="(!set.success && set.completed)" class="failure-icon" aria-hidden="true"
                            loading="lazy" decoding="async" src="../assets/slash-circle.svg" alt="check mark">
                    </td>
                </tr>
                <tr class="button">
                    <button v-if="!set.completed" class="set-button"
                        @click="completeSet(set, set.target_weight, set.target_reps, set.actual_weight, set.actual_reps)">Complete
                        Set</button>
                    <button v-else class="secondary-set-button" @click="completeSet(set)">Update Set</button>

                </tr>
            </table>
        </div>

    </div>
</template>
  
<script>
import MuscleBadge from './MuscleBadge.vue'
//import ProgressBar from './ProgressBar.vue'
export default {
    name: 'ExcerciseCard',

    components: {
        MuscleBadge,
    },
    data() {
        return {
            sets: [{ index: 1, target_reps: 15, actual_reps: 0, target_weight: 0, actual_weight: 175, completed: false, success: false }, { index: 2, target_reps: 10, actual_reps: 0, target_weight: 135, actual_weight: 210, completed: false, success: false }],
            reps: 25,
            workout: "chest-tris",
            exercises: ['barbell bench press', 'cable fly', 'pushup'],

        }
    },
    methods: {
        completeSet(set, targetWeight, targetReps, actualWeight, actualReps) {
            set.completed = !set.completed

            if (actualWeight >= targetWeight && actualReps >= targetReps) {
                set.success = true;
            }
            else {
                set.success = false;
            }

            console.log(targetWeight, targetReps, actualWeight, actualReps)
            console.log(set.success)
        }
    },
    mounted() {

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
    margin-top: 1.09375em;
    width: 37em;
    height: 45em;
    background: #FFFFFF;
    border: 1px solid #EAECF0;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    border-radius: 16px;
}

.header-bar {
    width: 100%;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    left: 0;
    z-index: 2;
    background: #FFFFFF;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    border-radius: 16px;
    margin-bottom: 1em;
}

.exercise-header {
    display: flex;
    justify-content: left;
    padding-left: 2em;
    align-items: center;
}

.exercise-name {
    font-family: 'roboto';
    font-size: 20px;
    font-weight: bolder;
    color: #101828
}

.output {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;

}

.set-table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

}

.output-value {
    font-family: 'roboto';
    font-size: 48px;
    font-weight: 600;
    color: #1849A9;
    margin: 1em;
}

.set-list {
    width: 80%;
    margin-bottom: 2em;

}

.header {
    background-color: #EAECF0;
}

.header-item {
    font-family: 'roboto';
    font-weight: 600;
    color: #475467;
}

.set,
thead {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 12px 24px;
    gap: 12px;
    width: 100%;
    border-bottom: 1px solid #EAECF0;
    border-radius: 10px;
}

.set-success {
    color: #66C61C !important;
}

.set-failure {
    color: #E62E05 !important;
}

.set-index,
.set-value {
    font-family: 'roboto';
    font-weight: 400;
    color: #475467;
    border: none !important;
}

.set-value {
    margin: 0;
    font-family: 'roboto';
    font-weight: 400;
    color: #475467;
    border: none !important;
}

.set-input {
    width: 3em;
    border: 1px solid #EAECF0;
    border-radius: 5px;
    font-family: 'roboto';
    text-align: center;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);

}

.set-input:focus {
    outline: none !important;
    border: 1px solid #1849A9;
    box-shadow: 0 0 10px #719ECE;
}

.set-item {
    width: 3em;
}


.button {
    display: flex;
    justify-content: center;
    padding-top: 1em;
}

.set-button {
    box-sizing: border-box;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    gap: 8px;
    width: 50%;
    height: 2.6em;
    font-family: 'Roboto';
    color: white;
    background: #1849A9;
    border: 1px solid #1849A9;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
}

.secondary-set-button {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    margin-top: 1em;
    margin-bottom: 1em;
    gap: 8px;
    width: 50%;
    height: 2.6em;
    font-family: 'Roboto';
    color: #1849A9;
    background: white;
    border: 1px solid #1849A9;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
}

.success-icon {
    width: 1.25em;
    height: 1.25em;
    margin: 0;
    padding: 0;
}

.failure-icon {
    width: 1.25em;
    height: 1.25em;
    margin: 0;
    padding: 0;
    color: #E62E05;
}
</style>

  