<template>
    <h1>Add Exercise</h1>
    <p class="m-0 mb-4 p-0 text-900 line-height-3 mr-3">This Exercise will be saved to your Completed Workout, but won't be
        saved to your Preset Workout
    </p>
    <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
    <Dropdown class="field col-12" v-model="selectedMuscleGroup" :options="muscleGroups" placeholder="Select Muscle Group"
        @change="this.muscleGroupSelected = true, this.getExercises(selectedMuscleGroup)" />
    <Dropdown class="field col-12" v-show="muscleGroupSelected" v-model="selectedExercise" :options="muscleGroupExercises"
        optionLabel="exerciseName" placeholder="Select Exercise" @change="this.muscleGroupSelected = true" />
    <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
    <br>
    <div class='set-reps field mb-4 col-12 pl-0 pr-0'>
        <label for="set-number" class="font-medium text-900">Number of Sets</label>
        <div class='flex field mb-4'>
            <InputNumber pt:inputmode="numeric" id="set-number" v-model="draftExercise.targetSets" :min="1" :step="1" pattern="\d*"
                showButtons />
            <Button class="p-button-icon-only ml-1" label="Save" @click="generateSets()">
                <span class="pi pi-check p-button-icon"></span> </Button>
        </div>
        <ul class="exercise-sets">
            <li v-for="set in draftExercise.sets" :key="set">
                <label for="set-rep-number"> Reps: </label>
                <InputNumber pt:inputmode="numeric" id="set-rep-number" v-model="set.target_reps" :min="1" :step="1" pattern="\d*" showButtons />
            </li>
        </ul>
    </div>
    <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
    <div class="col-12">
        <Button label="Add Exercise" class="w-auto mt-3" @click="addExercise(this.draftExercise)"></Button>
</div>
</template>

<script>
import API from '../api'

export default {

    emits: ['addExercise'],
    data() {
        return {
            muscleGroups: [],
            muscleGroupExercises: [],
            selectedMuscleGroup: '',
            muscleGroupSelected: false,
            selectedExercise: '',

            draftExercise: {
                exerciseName: '',
                primaryMuscleGroup: '',
                secondaryMuscleGroups: [],
                targetSets: 0,
                sets: []
            },
        }
    },

    methods: {

        generateSets() {
            for (let i = 1; i < this.draftExercise.targetSets + 1; i++) {
                this.draftExercise.sets.push({ 'index': i, target_reps: 0, actual_reps: 0, target_weight: 0, actual_weight: 0, completed: false, success: false })
            }
        },

        updateDraftExercise() {
            this.draftExercise.id = this.selectedExercise._id
            this.draftExercise.exerciseName = this.selectedExercise.exerciseName
            this.draftExercise.primaryMuscleGroup = this.selectedExercise.primaryMuscleGroup
            this.draftExercise.secondaryMuscleGroups = this.selectedExercise.secondaryMuscleGroups
        },

        addExercise(draftExercise) {
            this.updateDraftExercise()
            console.log(draftExercise)
            this.$emit('addExercise', { draftExercise: draftExercise })
        },

        //API CALLS
        async getMuscleGroups() {
            this.muscleGroups = await API.getMuscleGroups()
        },

        async getExercises(muscleGroup) {
            this.muscleGroupExercises = await API.getExercisesByMuscleGroup(muscleGroup)
        },
    },

    mounted() {
        this.getMuscleGroups()
    }


}


</script>

<style scopes>
.exercise-sets {
    list-style: none;
    padding-left: 1rem;
}
</style>