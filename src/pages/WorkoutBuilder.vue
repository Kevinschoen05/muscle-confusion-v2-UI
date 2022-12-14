<template>
    <div class="container">
        <h1>Create New Workout</h1>
        <div class="title-input">
            <input type="text" placeholder="Enter Workout Title" v-model="draftWorkoutTitle">
        </div>

        <div class="workoutBuilder">
            <label for="muscle-group">Select Muscle Group</label>
            <select id="muscle-group" name="muscle-group" @change="this.muscleGroupSelected = true">
                <option value="Select Muscle Group" selected disabled hidden> Select Muscle Group</option>
                <option v-for="muscleGroup in muscleGroups" :key="muscleGroup" :value="muscleGroup">
                    {{ muscleGroup }}</option>
            </select>
            <br>
            <div class="exercise-selector" v-show="muscleGroupSelected">
                <label for="exercise-selector">Select Exercise</label>
                <select id="exercise-selector" name="exercise-selector" v-model="selectedExercise">
                    <option value="Select Exercise" selected disabled hidden> Select Exercise</option>
                    <option v-for="muscleGroupExercise  in muscleGroupExercises" :key="muscleGroupExercise"
                        :value="muscleGroupExercise">{{ muscleGroupExercise }}</option>
                </select>
            </div>
            <br>
            <div class='set-reps'>
                <label for="set-number">Number of Sets</label>
                <input type="number" name="set-number" v-model="draftExercise.targetSets" @focusout="generateSets()" >
                <br>
                <ul class="exercise-sets">
                    <li v-for="set in draftExercise.targetSetReps" :key="set">
                        <label for="set-rep-number">Reps: </label>
                        <input type="number" name="set-rep-number" v-model="set.reps">
                    </li>
                </ul>
            </div>

            <br>
            <button @click="updateDraftExercise()">Save Exercise</button>
                </div>
        <div class="finalWorkout">
            <h1>{{finalWorkout.workoutTitle}}</h1>
            <div class="finalWorkoutExercise" v-for="exercise in finalWorkout.exercises" :key="exercise">
                <p>{{exercise.exerciseName}}</p>
                <ul>
                    <li v-for="set in exercise.targetSetReps" :key="set">
                        <p>Reps:{{set.reps}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <button @click="testLog()">Test</button>
    </div>
</template>
<script>
export default {
    data() {
        return {

            //query needs to be run on mount to pull full list of potential muscle groups
            muscleGroups: ['Chest', 'Back', 'Shoulders'],
            muscleGroupSelected: false,
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
            for(let i = 0; i < this.draftExercise.targetSets; i++)
            this.draftExercise.targetSetReps.push({'reps': 0 , 'weight': 0})
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

.finalWorkoutExercise {
    width: 100px;
    height: 150px;
    background-color: blanchedalmond;
}

</style>