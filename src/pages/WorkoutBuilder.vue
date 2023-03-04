<template>
    <div class="container">
        <div class=" p-5 flex flex-column flex-auto">
            <h1>Create New Workout</h1>
            <p class="m-0 mb-4 p-0 text-900 line-height-3 mr-3">Create a new preset workout by choosing a Muscle Group
                to focus on
                and selecting an exercise. Set your target number of sets and reps, and repeat until your workout is
                complete.
            </p>
            <div class="grid">
                <div class="col-12 lg:col-6">
                    <div class="surface-card shadow-2 border-round p-4 h-full">
                        <div class="grid formgrid p-fluid">
                            <div class="field mb-4 col-12 pl-0 pr-0">
                                <label for="workout-title" class="font-medium text-900">Enter Workout Title</label>
                                <InputText id="workout-title" type="text" v-model="draftWorkoutTitle" />
                            </div>
                            <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
                            <Dropdown class="field col-12" v-model="selectedMuscleGroup" :options="muscleGroups"
                                placeholder="Select Muscle Group"
                                @change="this.muscleGroupSelected = true, this.getExercises(selectedMuscleGroup)" />
                            <Dropdown class="field col-12" v-show="muscleGroupSelected" v-model="selectedExercise"
                                :options="muscleGroupExercises" optionLabel="exerciseName" placeholder="Select Exercise"
                                @change="this.muscleGroupSelected = true" />
                            <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
                            <br>
                            <div class='set-reps field mb-4 col-12 pl-0 pr-0'>
                                <label for="set-number" class="font-medium text-900">Number of Sets</label>
                                <div class='flex field mb-4'>
                                    <InputNumber class="" id="set-number" v-model="draftExercise.targetSets"
                                       :min="1" :step="1" pattern="\d*" showButtons />
                                    <Button class="p-button-icon-only ml-1" label="Save" @click="generateSets()">
                                        <span class="pi pi-check p-button-icon"></span> </Button>
                                </div>
                                <ul class="exercise-sets">
                                    <li v-for="set in draftExercise.sets" :key="set">
                                        <label for="set-rep-number"> Reps: </label>
                                        <InputNumber id="set-rep-number" v-model="set.target_reps" :min="1" :step="1"
                                        pattern="\d*"   showButtons />
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
                <Toast />
                <div class="col-12 lg:col-6">
                    <div class="surface-card shadow-2 border-round p-4 h-full">
                        <div class="font-medium text-3xl text-900 mb-3" v-if="draftWorkoutTitle">{{ draftWorkoutTitle }}
                        </div>
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
                                <ul>
                                    <WorkoutBuilderTable v-for="set in exercise.sets" :key="set" :set="set.index"
                                        :reps="set.target_reps" :exerciseID="exercise.id" @delete-set="handleDeleteSet">

                                    </WorkoutBuilderTable>
                                </ul>
                                <Button label="Delete Exercise" class=" p-button-danger w-auto mt-3"
                                    @click="deleteExercise(exercise.id)"></Button>
                            </AccordionTab>
                        </Accordion>
                        <div class="surface-border border-top-1 opacity-50 mb-3 col-12"
                            v-if="finalWorkout.exercises.length > 0">
                        </div>
                        <Button v-if="finalWorkout.exercises.length > 0" label="Save Workout" class="w-auto mt-3"
                            @click="saveFinalWorkout()"></Button>
                    </div>
                </div>

            </div>
        </div>
</div>
</template>
<script>
import API from "../api";
import WorkoutBuilderTable from "@/components/WorkoutBuilderTable";

export default {
    components: {
        WorkoutBuilderTable
    },
    data() {
        return {

            //query needs to be run on mount to pull full list of potential muscle groups
            muscleGroups: ['Chest', 'Back', 'Shoulders', 'Legs'],
            muscleGroupSelected: false,
            selectedMuscleGroup: '',
            selectedExercise: '',

            //once muscleGroup is selected from dropdown, all potential exercises need to be gathered for that exercise //@change also needs to call a function to re-pull exercise list
            muscleGroupExercises: [

            ],

            draftWorkoutTitle: '',
            draftExercise: {
                exerciseName: '',
                primaryMuscleGroup: '',
                secondaryMuscleGroups: [],
                targetSets: 0,
                sets: []
            },


            finalWorkout: {
                users: [],
                exercises: []
            }

        }
    },
    methods: {

        showSuccess() {
            this.$toast.add({ severity: 'success', summary: 'Workout Added', detail: 'Access your workouts in your dashboard', life: 5000 });
        },

        generateSets() {
            for (let i = 1; i < this.draftExercise.targetSets + 1; i++) {
                this.draftExercise.sets.push({ 'index': i, target_reps: 0, actual_reps: 0, target_weight: 0, actual_weight: 0, completed: false, success: false })
            }
        },

        saveData() {
            this.finalWorkout.workoutTitle = this.draftWorkoutTitle
            this.finalWorkout.exercises.push(this.draftExercise)
            this.draftExercise = {
                exerciseName: '',
                targetSets: 0,
                sets: []
            }
            console.log(this.$store.state.user)
            console.log(this.finalWorkout)
        },

        //when user saves the exercise, update pre-created draft exercise structure with completed values
        updateDraftExercise() {
            this.draftExercise.id = this.selectedExercise._id
            this.draftExercise.exerciseName = this.selectedExercise.exerciseName
            this.draftExercise.primaryMuscleGroup = this.selectedExercise.primaryMuscleGroup
            this.draftExercise.secondaryMuscleGroups = this.selectedExercise.secondaryMuscleGroups
            console.log(this.draftExercise.targetSets)
            console.log(this.draftExercise.targetSetReps)
            this.saveData()
        },

        deleteExercise(exerciseID) {
            for (var i = 0; i < this.finalWorkout.exercises.length; i++) {
                if (this.finalWorkout.exercises[i].id === exerciseID) {
                    let index = this.finalWorkout.exercises.indexOf(this.finalWorkout.exercises[i])
                    this.finalWorkout.exercises.splice(index, 1)
                    console.log(this.finalWorkout)
                }
            }
        },

        //COMPONENT HANDLERS

        handleDeleteSet({ exerciseID, set }) {

            console.log("ignore, WIP" + exerciseID + set)
        },


        //API CALLS
        async getExercises(muscleGroup) {
            this.muscleGroupExercises = await API.getExercisesByMuscleGroup(muscleGroup)
        },

        async saveFinalWorkout() {
            await API.addWorkout(this.finalWorkout);
            this.showSuccess();
        },

        async getMuscleGroups() {
            this.muscleGroups = await API.getMuscleGroups()
        },

    },
    mounted() {
        this.finalWorkout.users.push(this.$store.state.user.uid)
        this.getMuscleGroups()
    }
}

</script>
<style scoped>
.container {
    height: 100vh;
    padding: 2rem
}

.exercise-sets {
    list-style: none;
    padding-left: 1rem;
}

.p-accordion-tab {
    margin-bottom: 1rem;
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