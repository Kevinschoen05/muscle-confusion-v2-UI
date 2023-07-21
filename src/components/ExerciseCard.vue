<template>
    <div class="container shadow-2 border-round surface-card  w-24rem mb-3 flex-column justify-content-between flex">
        <div class="header-bar">
            <div class="exercise-header">
                <p class="exercise-name">{{ exerciseName }}</p>
            </div>
            <div class=" flex  align-content-center align-items-center w-auto pl-1">
                <muscle-badge :title="primaryMuscleGroup" primary></muscle-badge>
                <muscle-badge v-for="muscleGroups in secondaryMuscleGroups" :key="muscleGroups"
                    :title="muscleGroups"></muscle-badge>
            </div>
            <div class="output" v-if="exerciseType === 'Resistance'">
                <p class="output-value"> {{ targetSets }} Sets</p>
                <p class="output-value"> {{ totalTargetReps }} Reps</p>
            </div>
            <div class="output" v-if="exerciseType === 'Timed'">
                <p class="output-value"> {{ targetSets }} Sets</p>
            </div>
        </div>
        <div class="w-full" v-if="exerciseType === 'Resistance'">
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
                                pattern="\d*" v-model="set.target_weight">
                            <p v-else class="set-value">{{ set.target_weight }}</p>
                        </td>
                        <td class="success-icon"></td>
                    </tr>
                    <tr class="set">
                        <td class="set-index">Actual</td>
                        <td class="set-item"><input v-if="!set.completed" class="set-input" type="number" step=5
                                pattern="\d*" v-model="set.actual_reps">
                            <p v-else class="set-value"
                                :class="{ 'set-success': (set.success && set.completed), 'set-failure': (!set.success && set.completed) }">
                                {{ set.actual_reps }}</p>
                        </td>
                        <td class="set-item"><input v-if="!set.completed" class="set-input" type="number" step=5
                                pattern="\d*" v-model="set.actual_weight">
                            <p v-else class="set-value"
                                :class="{ 'set-success': (set.success && set.completed), 'set-failure': (!set.success && set.completed) }">
                                {{ set.actual_weight }}</p>
                        </td>
                        <td class="success-icon"> <img v-if="(set.success && set.completed)" class="success-icon"
                                aria-hidden="true" loading="lazy" decoding="async" src="../assets/check-circle-success.svg"
                                alt="check mark">

                            <img v-else-if="(!set.success && set.completed)" class="failure-icon" aria-hidden="true"
                                loading="lazy" decoding="async" src="../assets/slash-circle.svg" alt="check mark">
                        </td>
                    </tr>
                    <tr>
                        <div class="button">
                            <button v-if="!set.completed" class="set-button"
                                @click="completeSet(set, set.target_weight, set.target_reps, set.actual_weight, set.actual_reps)">Complete
                                Set</button>
                            <button v-else class="secondary-set-button"
                                @click="completeSet(set, set.target_weight, set.target_reps, set.actual_weight, set.actual_reps)">Update
                                Set</button>
                        </div>
                    </tr>
                </table>
            </div>
        </div>
        <div class="w-full" v-else>
            <div v-for="set in sets" :key="set.index">
                <timer :minutes="set.target_duration_mins" :seconds="set.target_duration_secs"
                    @timer-complete="handleTimerComplete(set)"></timer>
            </div>

        </div>

    </div>
</template>
  
<script>
import MuscleBadge from './MuscleBadge.vue'
import Timer from './TImer.vue'
export default {
    name: 'ExcerciseCard',

    components: {
        MuscleBadge,
        Timer
    },
    props: {
        exerciseName: String,
        exerciseType: String,
        primaryMuscleGroup: String,
        secondaryMuscleGroups: Array,
        targetSets: Number,
        sets: Array

    },

    data() {
        return {
            totalTargetReps: 0,
            setTotal: 0,
            completedCounter: 0,

        }
    },

    watch: {
        sets: {
            handler() {
                this.completeExercise()
            },
            deep: true
        }
    },
    methods: {
        calculateTotalReps() {
            this.sets.forEach(set => {
                this.totalTargetReps += set.target_reps
            })

        },
        completeSet(set, targetWeight, targetReps, actualWeight, actualReps) {
            this.setTotal = this.sets.length;
            set.completed = !set.completed

            if (set.completed === true) {
                this.completedCounter++;
            }
            else {
                this.completedCounter--;
            }

            if (actualWeight >= targetWeight && actualReps >= targetReps) {
                set.success = true;
            }
            else {
                set.success = false;
            }
            console.log("set " + set.completed)
            console.log(targetWeight, targetReps, actualWeight, actualReps)
            console.log(set.success)
            console.log(this.setTotal, this.completedCounter)
        },

        completeExercise() {
            let exerciseComplete = true
            for (let i = 0; i < this.sets.length; i++) {
                if (this.sets[i].completed === false) {
                    exerciseComplete = false
                }
            }

            if (exerciseComplete === true) {
                this.$emit("exerciseComplete", exerciseComplete)
            }
        },

        handleTimerComplete(set) {
            set.completed = true;
            set.success = true;
            set.actual_duration = "00:" + ":" + set.target_duration_mins + ":" + set.target_duration_secs
            console.log(set)
            console.log("Timer completed successfully!");
        },
    },
    mounted() {
        this.calculateTotalReps()
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
    background: #FFFFFF;
    border: 1px solid #EAECF0;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    border-radius: 16px;
}

.header-bar {
    position: sticky;
    position: -webkit-sticky;
    width: 100%;
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
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: bolder;
    color: #101828
}

.output {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 100%
}

.set-table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

}

.output-value {
    font-size: 40px;
    font-weight: 600;
    color: #1849A9;
    margin: .5rem;
    align-self: center;
}

.set-list {
    width: 80%;
    margin-bottom: 2em;

}

.header {
    background-color: #EAECF0;
}

.header-item {
    font-family: Avenir, Helvetica, Arial, sans-serif;
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
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: 400;
    color: #475467;
    border: none !important;
}

.set-value {
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: 400;
    color: #475467;
    border: none !important;
}

.set-input {
    width: 3em;
    border: 1px solid #EAECF0;
    border-radius: 5px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
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
    width: 100%;
    margin-top: 20px;
    align-items: center;
}

.set-button {
    box-sizing: border-box;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 8px;
    width: 100%;
    height: 2.6em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: white;
    background: var(--primary-color);
    border: 1px solid var(--primary-color);
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
}

.secondary-set-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 20px;
    gap: 8px;
    width: 100%;
    height: 2.6em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: var(--primary-color);
    background: white;
    border: 1px solid var(--primary-color);
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

  