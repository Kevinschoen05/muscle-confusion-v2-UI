<template>
    <div class="container shadow-2 border-round surface-card  w-24rem mb-3 flex-column justify-content-between flex">
        <div class="header-bar">
            <div class="exercise-header">
                <p class="exercise-name">{{ exerciseName }}</p>
                <Button icon="fa-solid fa-shuffle" class="p-button-text p-button-plain p-button-rounded justify-self-right"
                    @click="getSwapExercises(), visible2 = true"></Button>
                <Dialog v-model:visible="visible2" appendTo="body" :modal="true">
                    <div class="text-900 font-medium mb-3 text-xl">Choose an Exercise to Swap</div>
                    <ul class="list-none p-0 m-0">
                        <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
                            v-for="exercise in swapExercises" :key="exercise._id">
                            <div class="flex">
                                <div class="mr-0 md:mr-8">
                                    <span class="block text-900 font-medium mb-1">{{ exercise.exerciseName }}</span>
                                </div>
                            </div>
                            <div class="mt-2 md:mt-0 flex flex-nowrap">
                                <Button @click="visible2 = false, completeExerciseSwap(exercise._id)" label="Select"
                                    class="flex-grow-1"></Button>
                            </div>
                        </li>
                    </ul>
                </Dialog>
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
            <div v-if="exerciseType === 'Resistance'" class="flex align-items-center autofill w-full ml-4 ">
                <p>Complete Exercise</p>
                <input-switch class="ml-2" v-model="autofillComplete" @click="visible = true"></input-switch>
            </div>
            <Dialog v-model:visible="visible" appendTo="body" :modal="true">
                <p>Actual Weight: </p>
                <div class="flex flex-column align-items-center">
                    <InputNumber class="w-auto" v-model="autofillValue" :min="1" :step="1" pattern="\d*" showButtons />
                    <Button class="mt-2" @click="visible = false, autofillExercise(sets, this.autofillValue)">Autofill
                        Sets</Button>
                </div>
            </Dialog>
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
                        <td class="set-item">
                            <VueScrollPicker v-if="!set.completed" v-model="set.target_weight" :height="180"
                                :itemHeight="36" :options="numbers"></VueScrollPicker>
                            <p v-else class="set-value">{{ set.target_weight }}</p>
                        </td>
                        <td class="success-icon"></td>
                    </tr>
                    <tr class="set">
                        <td class="set-index">Actual</td>
                        <td class="set-item">
                            <VueScrollPicker class="scroll-picker" v-if="!set.completed" v-model="set.actual_reps"
                                :options="numbers"></VueScrollPicker>
                            <p v-else class="set-value"
                                :class="{ 'set-success': (set.success && set.completed), 'set-failure': (!set.success && set.completed) }">
                                {{ set.actual_reps }}</p>
                        </td>
                        <td class="set-item">
                            <VueScrollPicker v-if="!set.completed" v-model="set.actual_weight" :height="180"
                                :itemHeight="36" :options="numbers"></VueScrollPicker>
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
import API from '../api'
export default {
    name: 'ExcerciseCard',

    components: {
        MuscleBadge,
        Timer,
    },
    props: {
        exerciseID: String,
        exerciseName: String,
        exerciseType: String,
        primaryMuscleGroup: String,
        secondaryMuscleGroups: Array,
        targetSets: Number,
        sets: Array

    },

    data() {
        return {
            //values for picker 
            numbers: [],
            selectedValue: 500,

            totalTargetReps: 0,
            setTotal: 0,
            completedCounter: 0,
            visible: false,
            visible2: false,
            autofillComplete: false,
            autofillValue: 0,

            swapExercises: [],
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

        prepareNumbers() {
            // Fill the numbers array with values from 1 to 1000 in increments of 5
            for (let i = 0; i <= 800; i += 5) {
                this.numbers.push(i);
            }
        },

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
        autofillExercise(sets, autofillValue) {
            for (let i = 0; i < sets.length; i++) {
                sets[i] = {
                    index: i,
                    target_reps: sets[i].target_reps,
                    actual_reps: sets[i].target_reps,
                    target_weight: autofillValue,
                    actual_weight: autofillValue,
                    completed: true,
                    success: true

                }
            }
        },

        handleTimerComplete(set) {
            set.completed = true;
            set.success = true;
            set.actual_duration = "00:" + ":" + set.target_duration_mins + ":" + set.target_duration_secs
            console.log(set)
            console.log("Timer completed successfully!");
        },

        completeExerciseSwap(swapExerciseID) {
            // Replace this with your actual data
            const originalExercise = this.exerciseID; // Assuming this.exerciseID is defined correctly
            const selectedSwapExercise = swapExerciseID; // Replace with the actual ID you want to swap to

            this.$emit("swap-exercises", { originalExercise, selectedSwapExercise });
        },

        handleValueChange(newValue) {
            this.parentSelectedValue = newValue;
        },

        //API Calls

        async getSwapExercises() {
            this.swapExercises = await API.getExercisesByMuscleGroup(this.primaryMuscleGroup)
            console.log(this.swapExercises)
        }


    },
    mounted() {
        this.calculateTotalReps()
        this.prepareNumbers()
        console.log(this.exerciseID)
    }

}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
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

  