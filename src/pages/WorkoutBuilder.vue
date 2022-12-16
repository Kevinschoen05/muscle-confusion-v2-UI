<template>
    <div class="container">
        <div class="workoutBuilder">
            <h1>Create New Workout</h1>
            <div class="title-input">
                <span class="p-float-label">
                    <InputText id="workout-title" type="text" v-model="draftWorkoutTitle" />
                    <label for="workout-title">Enter Workout Title </label>
                </span>
            </div>
            <Dropdown v-model="selectedMuscleGroup" :options="muscleGroups" placeholder="Select Muscle Group"
                @change="this.muscleGroupSelected = true" />
            <div class="exercise-selector" v-show="muscleGroupSelected">
                <Dropdown v-model="selectedExercise" :options="muscleGroupExercises" placeholder="Select Exercise"
                    @change="this.muscleGroupSelected = true" />
            </div>
            <br>
            <div class='set-reps'>
                <label for="set-number">Number of Sets</label>
                <InputNumber id="set-number" v-model="draftExercise.targetSets" @focusout="generateSets()" :step="1" showButtons />
                <ul class="exercise-sets">
                    <li v-for="set in draftExercise.targetSetReps" :key="set">
                        <label for="set-rep-number">Reps: </label>
                        <InputNumber id="set-rep-number" v-model="set.reps" :step="1" showButtons />
                    </li>
                </ul>
            </div>
            <Button label="Save Exercise" @click="updateDraftExercise()" />
        </div>
        <div class="finalWorkout">
            <h1>{{ finalWorkout.workoutTitle }}</h1>
            <div class="finalWorkoutExercise" v-for="exercise in finalWorkout.exercises" :key="exercise">
                <p>{{ exercise.exerciseName }}</p>
                <ul>
                    <li v-for="set in exercise.targetSetReps" :key="set">
                        <p>Reps:{{ set.reps }}</p>
                    </li>
                </ul>
            </div>
            <Button label="Save Workout" @click="saveFinalWorkout()" />
        </div>
    </div>
</template>
<script>
import API from "../api";

export default {
    data() {
        return {

            //query needs to be run on mount to pull full list of potential muscle groups
            muscleGroups: ['Chest', 'Back', 'Shoulders', 'Legs'],
            muscleGroupSelected: false,
            selectedMuscleGroup: '',
            selectedExercise: '',

            //once muscleGroup is selected from dropdown, all potential exercises need to be gathered for that exercise //@change also needs to call a function to re-pull exercise list
            muscleGroupExercises: ['Barbell Bench Press', 'Cable Fly'],

            draftWorkoutTitle: '',
            draftExercise: {
                exerciseName: '',
                targetSets: 0,
                targetSetReps: [

                ]
            },


            finalWorkout: {
                exercises: []
            }

        }
    },
    methods: {
        generateSets() {
            for (let i = 0; i < this.draftExercise.targetSets; i++)
                this.draftExercise.targetSetReps.push({ 'reps': 0, 'weight': 0 })
        },

        saveData() {
            this.finalWorkout.workoutTitle = this.draftWorkoutTitle
            this.finalWorkout.exercises.push(this.draftExercise)
            this.draftExercise = {
                exerciseName: '',
                targetSets: 0,
                targetSetReps: [

                ]
            }
            console.log(this.finalWorkout)
        },

        //when user saves the exercise, update pre-created draft exercise structure with completed values
        updateDraftExercise() {
            this.draftExercise.exerciseName = this.selectedExercise
            console.log(this.draftExercise.targetSets)
            console.log(this.draftExercise.targetSetReps)
            this.saveData()
        },

        async saveFinalWorkout() {
            await API.addWorkout(this.finalWorkout);
        },

        testLog() {
            console.log("saved workout title: " + this.finalWorkout.workoutTitle)
            console.log(this.draftExercise)
            console.log("final workout: " + this.finalWorkout.exercises[1].exerciseName)
        }
    }
}


//TODO - add button to the final workout div to 'complete workout' and trigger POST to API call
// 

</script>
<style scoped>
.container {
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
}

.workoutBuilder {
    width: 100%
}

.finalWorkout {
    width: 100%;
}

#workout-title {
    width: 80%
}

.finalWorkoutExercise {
    width: 100px;
    height: 150px;
    background-color: blanchedalmond;
}
</style>