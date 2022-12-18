<template>
    <div class="container">
        <div class="workoutBuilder">
            <h1>Create New Workout</h1>
            <p class="m-0 mb-4 p-0 text-600 line-height-3 mr-3">Create a new preset workout by choosing a Muscle Group
                to focus on
                and selecting an exercise. Set your target number of sets and reps, and repeat until your workout is
                complete.
            </p>
            <div class="surface-card p-4 shadow-2 border-round">
                <div class="grid formgrid p-fluid">
                    <div class="field mb-4 col-12">
                        <label for="workout-title" class="font-medium text-900">Enter Workout Title</label>
                        <InputText id="workout-title" type="text" v-model="draftWorkoutTitle" />
                    </div>
                    <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
                    <Dropdown class="field col" v-model="selectedMuscleGroup" :options="muscleGroups"
                        placeholder="Select Muscle Group" @change="this.muscleGroupSelected = true" />
                    <div class="exercise-selector field col" v-show="muscleGroupSelected">
                        <Dropdown v-model="selectedExercise" :options="muscleGroupExercises" optionLabel="exerciseName"
                            placeholder="Select Exercise" @change="this.muscleGroupSelected = true" />
                    </div>
                    <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
                    <br>
                    <div class='set-reps field mb-4 col-12'>
                        <label for="set-number" class="font-medium text-900">Number of Sets</label>
                        <InputNumber id="set-number" v-model="draftExercise.targetSets" @focusout="generateSets()"
                            :step="1" showButtons />
                        <ul class="exercise-sets">
                            <li v-for="set in draftExercise.targetSetReps" :key="set">
                                <label for="set-rep-number"> Reps: </label>
                                <InputNumber id="set-rep-number" v-model="set.reps" :step="1" showButtons />
                            </li>
                        </ul>
                    </div>
                    <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
                    <div class="col-12">
                        <Button label="Save Exercise" class="w-auto mt-3" @click="updateDraftExercise()"></Button>
                    </div>
                </div>
            </div>
        </div>
        <Divider layout="vertical" />
        <div class="surface-card p-4 shadow-2 border-round">
            <div class="font-medium text-3xl text-900 mb-3" v-if="draftWorkoutTitle">{{ draftWorkoutTitle }}</div>
            <div class="font-medium text-3xl text-900 mb-3" v-else>Untitled Workout</div>
            <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
            <Accordion>
                <AccordionTab v-for="exercise in finalWorkout.exercises" :key="exercise">
                    <template #header>
                        <p>{{ exercise.exerciseName }}</p>
                    </template>
                    <div class="chip-row">
                        <Chip class="mr-2 mb-2 custom-chip-primary">
                            {{ exercise.primaryMuscleGroup }}
                        </Chip>
                        <Chip v-for="musclegroup in exercise.secondaryMuscleGroups" :key="musclegroup"
                            class="mr-2 mb-2 custom-chip-secondary">
                            {{ musclegroup }}
                        </Chip>
                    </div>
                    <DataTable :value="exercise.targetSetReps">
                        <Column field="index" header="Sets"></Column>
                        <Column field="reps" header="Reps"></Column>
                    </DataTable>


                </AccordionTab>
            </Accordion>
            <div class="surface-border border-top-1 opacity-50 mb-3 col-12" v-if="finalWorkout.exercises.length > 0">
            </div>
            <Button v-if="finalWorkout.exercises.length > 0" label="Save Workout" class="w-auto mt-3"
                @click="saveFinalWorkout()"></Button>
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
            muscleGroupExercises: [{
                exerciseName: 'Barbell Bench Press',
                primaryMuscleGroup: 'Chest',
                secondaryMuscleGroups: ['Triceps', 'Biceps', 'Shoulders']
            },
            {
                exerciseName: 'Cable Fly',
                primaryMuscleGroup: 'Chest',
                secondaryMuscleGroups: ['Triceps', 'Biceps', 'Shoulders']
            },
            {
                exerciseName: 'Deadlift',
                primaryMuscleGroup: 'Legs',
                secondaryMuscleGroups: ['Back', 'Biceps', 'Shoulders']
            },

            ],

            draftWorkoutTitle: '',
            draftExercise: {
                exerciseName: '',
                primaryMuscleGroup: '',
                secondaryMuscleGroups: [],
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
            for (let i = 1; i < this.draftExercise.targetSets + 1; i++)
                this.draftExercise.targetSetReps.push({ 'index': i, 'reps': 0, 'weight': 0 })
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
            this.draftExercise.exerciseName = this.selectedExercise.exerciseName
            this.draftExercise.primaryMuscleGroup = this.selectedExercise.primaryMuscleGroup
            this.draftExercise.secondaryMuscleGroups = this.selectedExercise.secondaryMuscleGroups
            console.log(this.draftExercise.targetSets)
            console.log(this.draftExercise.targetSetReps)
            this.saveData()
        },


        //API CALLS
        async saveFinalWorkout() {
            await API.addWorkout(this.finalWorkout);
        },
    }
}

</script>
<style scoped>
.container {
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    background-color: var(--surface-ground);
    padding: 3rem
}

.exercise-sets {
    list-style: none;
    padding-left: 1rem;
}

#set-rep-number {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.finalWorkoutSetReps {
    list-style: none;
    column-count: 2;
}

/* CHIPS */
.p-chip.custom-chip-primary {
    background: var(--primary-color);
    color: var(--primary-color-text);
    line-height: 1.5;
    margin-top: 0.375rem;
    margin-bottom: 0.375rem;
}

.p-chip.custom-chip-secondary {
    line-height: 1.5;
    margin-top: 0.375rem;
    margin-bottom: 0.375rem;
}
</style>