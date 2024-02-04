<template>
    <div class="min-h-screen flex relative lg:static surface-ground">
        <div class="p-5 flex flex-column flex-auto">
            <div>
                <div class="text-900 font-medium text-xl mb-3">Random Workout Generator</div>
                <p class="m-0 mb-4 p-0 text-600 line-height-3 mr-3">Enter your parameters and automatically generate a
                    custom workout.</p>
                <div class="surface-card p-4 shadow-2 border-round">

                    <div class="grid formgrid p-fluid">
                        <div class="mb-3 ">
                            <label class="font-medium text-900 ">Total Exercises </label>
                            <InputText v-model.number="this.desiredExerciseCount" />
                            <Slider :min="1" :max="10" :step="1" v-model="this.desiredExerciseCount" />
                        </div>
                        <div class="surface-100 mb-3 col-12" style="height:2px"></div>
                        <label class=" col-12 font-medium text-900 ">Possible Muscle Groups</label>
                        <div class="flex flex-wrap justify-content-center gap-3 p-3">
                            <div v-for="(muscleGroup, index) in selectedMuscleGroups" :key="muscleGroup.name"
                                class="col-12 flex align-items-center">
                                <Checkbox v-model="muscleGroup.selected" :value="true" :false-value="false" />
                                <label :for="`muscleGroup-${index}`" class="ml-2">{{ muscleGroup.name }}</label>
                            </div>
                        </div>
                        <div class="surface-100 mb-3 col-12" style="height:2px"></div>
                        <div>
                            <label class="font-medium text-900 ">Minimum Target Sets</label>
                            <InputText v-model.number="this.minSets" />
                            <Slider :min="1" :max="10" :step="1" v-model="this.minSets" />
                        </div>
                        <div class="pt-3 md:ml-4 md:pt-0">
                            <label class="font-medium text-900 ">Maximum Target Sets</label>
                            <InputText v-model.number="this.maxSets" />
                            <Slider :min="1" :max="10" :step="1" v-model="this.maxSets" />
                        </div>
                        <div class="surface-100 mb-3 col-12" style="height:2px"></div>
                        <div>
                            <label class="font-medium text-900 ">Minimum Target Reps</label>
                            <InputText v-model.number="this.minReps" />
                            <Slider :min="1" :max="10" :step="1" v-model="this.minReps" />
                        </div>
                        <div class="pt-3 md:ml-4 md:pt-0">
                            <label class="font-medium text-900 ">Maximum Target Reps</label>
                            <InputText v-model.number="this.maxReps" />
                            <Slider :min="1" :max="25" :step="1" v-model="this.maxReps" />
                        </div>
                        <div class="surface-100 mb-3 col-12" style="height:2px"></div>
                        <div v-if="desiredExerciseCount > 0" class="col-12">
                            <Button @click="getWorkoutExercises(), workoutGenerated = true" label="Generate Workout" class="w-auto mt-3"></Button>
                        </div>
                    </div>
                </div>
                <div v-if="workoutGenerated" class="surface-card mt-2 p-4 shadow-2 border-round">
                    <div class="font-medium text-3xl text-900 mb-3">Random Workout </div>
                    <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
                    <Accordion>
                        <AccordionTab v-for="exercise in workoutExercises" :key="exercise.exerciseName">
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
                                    :exerciseType="false" :reps="set.target_reps" :durationMins="set.target_duration_mins"
                                    :durationSeconds="set.target_duration_secs" :exerciseID="exercise.id"
                                    @delete-set="handleDeleteSet" @update-set="handleUpdateSet">

                                </WorkoutBuilderTable>
                            </ul>
                            <Button label="Delete Exercise" class=" p-button-danger w-auto mt-3 mr-1"
                                @click="deleteExercise(exercise.id)"></Button>
                            <Button label="Add New Set" class=" p-button w-auto mt-3"
                                @click="addSetToExercise(exercise.id)"></Button>
                        </AccordionTab>
                    </Accordion>
                    <Button v-if="workoutExercises.length === desiredExerciseCount" label="Start Workout"
                        class="w-auto mt-3"></Button>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from "../api";
import WorkoutBuilderTable from "@/components/WorkoutBuilderTable.vue";

export default {
    components: {
        WorkoutBuilderTable
    },

    data() {
        return {
            workoutGenerated: false, 
            desiredExerciseCount: 0,
            minSets: 1,
            maxSets: 1,
            minReps: 1,
            maxReps: 1,
            muscleGroups: [],
            selectedMuscleGroups: [],
            workoutExercises: []
        }
    },
    methods: {

        //Add Set or Delete Exerices

        deleteExercise(exerciseID) {
            console.log(exerciseID)

            // Filter out the exercise with the given ID and update the original array reference
            const filteredExercises = this.workoutExercises.filter(exercise => exercise.id !== exerciseID);
            this.workoutExercises.length = 0; // Clear the original array
            filteredExercises.forEach(exercise => this.workoutExercises.push(exercise)); // Copy the filtered elements back
        },

        addSetToExercise(exerciseID) {
            console.log(exerciseID)

            const exercise = this.workoutExercises.find(exercise => exercise.id === exerciseID);
            if (exercise) {
                // Calculate the new index value
                const newIndex = exercise.sets.length + 1;
                // Create the new set object
                const newSet = {
                    index: newIndex,
                    target_reps: 0,
                    actual_reps: 0,
                    target_weight: 0,
                    actual_weight: 0,
                    completed: false,
                    success: false
                };
                // Add the new set to the sets array of the found exercise
                exercise.sets.push(newSet);
            }

        },


        //COMPONENT HANDLERS - Delete and Update Sets

        handleDeleteSet({ exerciseID, set }) {
            let exerciseArray = this.workoutExercises
            for (let i = 0; i < exerciseArray.length; i++) {
                const obj = exerciseArray[i]

                if (obj.id === exerciseID) {
                    for (let j = 0; j < obj.sets.length; j++) {
                        if (obj.sets[j].index === set) {
                            obj.sets.splice(j, 1);
                        }
                    }
                }
            }
        },

        handleUpdateSet({ exerciseID, set, newReps, newDurationMins, newDurationSecs }) {
            let exerciseArray = this.workoutExercises
            let exerciseType = false; //hardcoding this until I need to make this work for timed workouts. 
            if (exerciseType === false) {
                for (let i = 0; i < exerciseArray.length; i++) {
                    const obj = exerciseArray[i]

                    if (obj.id === exerciseID) {
                        for (let j = 0; j < obj.sets.length; j++) {
                            if (obj.sets[j].index === set) {
                                console.log(newReps)
                                obj.sets[j].target_reps = newReps;
                            }
                        }
                    }
                }
            }
            else {
                for (let i = 0; i < exerciseArray.length; i++) {
                    const obj = exerciseArray[i]

                    if (obj.id === exerciseID) {
                        for (let j = 0; j < obj.sets.length; j++) {
                            if (obj.sets[j].index === set) {
                                obj.sets[j].target_duration_mins = this.formatAmount(newDurationMins);
                                obj.sets[j].target_duration_secs = this.formatAmount(newDurationSecs);
                            }
                        }
                    }
                }
            }
        },

        formatAmount(value) {
            // Add leading zero if value is less than 10
            if (value < 10) {
                value = '0' + value;
            }
            return value
        },

        async getMuscleGroups() {
            this.muscleGroups = await API.getMuscleGroups()
            for (var i = 0; i < this.muscleGroups.length; i++) {
                this.selectedMuscleGroups.push({
                    name: this.muscleGroups[i],
                    selected: false
                })
            }

        },
        async getWorkoutExercises() {
            const muscleGroupParams = this.selectedMuscleGroups
                .filter(muscleGroup => muscleGroup.selected !== false)
                .map(muscleGroup => muscleGroup.name);
            console.log(muscleGroupParams)
            this.workoutExercises = await API.getRandomExercises(this.desiredExerciseCount, this.minSets, this.maxSets, this.minReps, this.maxReps, muscleGroupParams)
            console.log(this.workoutExercises)
        }
    },

    mounted() {
        this.getMuscleGroups()
    }
}
</script>