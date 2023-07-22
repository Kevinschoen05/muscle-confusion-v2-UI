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
    <div class=" xs:w-full sm:w-full md:w-4 lg:w-4">
        <label for="exercise-type" class="font-medium text-900 ">Type of Exercise</label>
        <div class='flex field w-full mt-2 mb-4'>
            <ToggleButton id="exercise-type" v-model="exerciseType" off-label="Resistance" on-label="Timed"></ToggleButton>
        </div>
    </div>
    <div class='set-reps field mb-4 col-12 pl-0 pr-0'>
        <label for="set-number" class="font-medium text-900">Number of Sets</label>
        <div class='flex field mb-4'>
            <InputNumber pt:inputmode="numeric" id="set-number" v-model="draftExercise.targetSets" :min="1" :step="1"
                pattern="\d*" showButtons />
            <Button class="p-button-icon-only ml-1" label="Save" @click="generateSets()">
                <span class="pi pi-check p-button-icon"></span> </Button>
        </div>
        <ul class="exercise-sets">
            <li v-for="set in draftExercise.sets" :key="set">
                <div v-if="exerciseType === false">
                    <label for="set-rep-number"> Reps: </label>
                    <InputNumber pt:inputmode="numeric" id="set-rep-number" v-model="set.target_reps" :min="1" :step="1"
                        pattern="\d*" showButtons />
                </div>
                <div v-else>
                    <label for="set-duration">Target Duration: </label>
                    <div id="set-duration" class="grid mt-2">
                        <div class="col w-full">
                            <label for="set-duration-mins">Minutes:</label>
                            <InputNumber class="w-full" id="set-duration-mins" v-model="set.target_duration_mins" :min="1"
                                :step="1" pattern="\d*" showButtons>
                            </InputNumber>
                        </div>
                        <div class="col w-full">
                            <label for="set-duration-seconds">Seconds:</label>
                            <InputNumber class="w-full" id="set-duration-secs" v-model="set.target_duration_secs" :min="0"
                                :max="50" :step="10" pattern="\d*" showButtons>
                            </InputNumber>
                        </div>

                    </div>


                </div>
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
            exerciseType: false,

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
                if (this.exerciseType === false) {
                    this.draftExercise.sets.push({ 'index': i, target_reps: 0, actual_reps: 0, target_weight: 0, actual_weight: 0, completed: false, success: false })
                }
                else {
                    this.draftExercise.sets.push({ 'index': i, target_duration_mins: 0, target_duration_secs: 0, actual_duration: '00:00:00', target_weight: 0, actual_weight: 0, completed: false, success: false })

                }
            }
        },

        updateDraftExercise() {
            this.draftExercise.id = this.selectedExercise._id
            this.draftExercise.exerciseName = this.selectedExercise.exerciseName
            this.draftExercise.primaryMuscleGroup = this.selectedExercise.primaryMuscleGroup
            this.draftExercise.secondaryMuscleGroups = this.selectedExercise.secondaryMuscleGroups
            if (this.exerciseType === false) {
                this.draftExercise.exerciseType = 'Resistance'
            }
            else {
                this.draftExercise.exerciseType = 'Timed'
                this.draftExercise.sets.forEach((set) => {
                    set.target_duration_mins = this.formatAmount(set.target_duration_mins)
                    set.target_duration_secs = this.formatAmount(set.target_duration_secs)
                })
            }
        },

        addExercise(draftExercise) {
            this.updateDraftExercise()
            console.log(draftExercise)
            this.$emit('addExercise', { draftExercise: draftExercise })
        },

        formatAmount(value) {
            // Add leading zero if value is less than 10
            if (value < 10) {
                value = '0' + value;
            }
            return value
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