<template>
    <div class="container">
        <h1>Create New Workout</h1>
        <div class="title-input">
            <input type="text" placeholder="Enter Workout Title" v-model="draftWorkoutTitle" @focusout="saveData()">
        </div>
        <div class="exercises">
                <button @click="addExercise()">Add Exercise</button> 
                <ul>
                    <li v-for="exercise in draftExerciseList" :key="exercise">
                        <label for="muscle-group">Select Muscle Group</label>
                        <select id="muscle-group" name="muscle-group" @change="this.muscleGroupSelected = true">
                            <option value="Select Muscle Group" selected disabled hidden> Select Muscle Group</option>
                            <option v-for="muscleGroup in muscleGroups" :key="muscleGroup" :value="muscleGroup">
                                {{ muscleGroup }}</option>
                        </select>
                        <select v-show="muscleGroupSelected" id="exercise-selector" name="exercise-selector" v-model="selectedExercise">
                            <option value="Select Exercise" selected disabled hidden> Select Exercise</option>
                            <option v-for="muscleGroupExercise  in muscleGroupExercises" :key="muscleGroupExercise"
                                :value="muscleGroupExercise">{{ muscleGroupExercise }}</option>
                        </select>
                        <button @click="updateDraftExercise(exercise, this.selectedExercise)">Save Exercise</button> 
                    </li>
                </ul>
            </div>
        <button @click="saveData()">Save Workout</button>
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
            draftExerciseList: [],
            draftExercise: {
                exerciseName: '',
                targetSets: 0,
                targetSetReps: [

                ]
            },


            finalWorkout: {
                workoutTitle: '',
                exercises: [
                    {
                        exerciseName: '',
                        targetSets: 0,
                        targetSetReps: [

                        ]
                    }
                ]
            }

        }
    },
    methods: {
        saveData() {
            this.finalWorkout.workoutTitle = this.draftWorkoutTitle
            this.finalWorkout.exercises.push(this.draftExerciseList)

        },

        addExercise() {
            this.draftExerciseList.push(this.draftExercise)
            this.draftExercise = { 
                exerciseName: '',
                targetSets: 0,
                targetSetReps: [

                ]
            }
        },

        //when user saves the exercise, update pre-created draft exercise structure with completed values
        updateDraftExercise(draftExercise, selectedExercise){
            draftExercise.exerciseName = selectedExercise

        },

        testLog() {
            console.log("saved workout title: " + this.finalWorkout.workoutTitle)
            console.log(this.draftExerciseList)
            console.log("final workout: " + this.finalWorkout)
        }
    }
}


//TODO - Figure out once muscle group and exercises are selected, how to update draft exercise array with the data. the draft exercise object is created
// with the 'Add Exercise' button, but it is blank - when the values are selected, this object needs to be updated before the draft exercise list is pushed to the final workout
// array

</script>
<style scoped>

</style>