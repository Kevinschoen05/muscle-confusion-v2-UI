<template>
    <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
        <Toast />
        <div class="text-900 font-medium text-xl mb-3">Create New Exercise</div>
        <p class="m-0 mb-4 p-0 text-600 line-height-3 mr-3">Add New Exercise that will be available to use in any
            workout.</p>
        <div class="surface-card p-4 shadow-2 border-round">
            <div class="grid formgrid p-fluid">
                <div class="field mb-4 col-12">
                    <label for="exerciseName" class="font-medium text-900">Exercise Name</label>
                    <InputText id="exerciseName" type="text" v-model="exerciseName" />
                </div>
                <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
                <div class="field mb-4 col-12 md:col-12">
                    <label for="country2" class="font-medium text-900">Primary Muscle Group</label>
                    <Dropdown id="primaryMuscleGroup" v-model="primaryMuscleGroup" :options="muscleGroups"
                        placeholder="Assign a Primary Muscle Group">
                    </Dropdown>
                </div>
                <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
                <div class="field mb-4 col-12 ">
                    <label class="font-medium text-900">Secondary Muscle Groups</label>
                    <div class="flex align-items-center mb-4" v-for="muscle in selectedSecondaryMuscleGroups"
                        :key="muscle.name">
                        <InputSwitch v-model="muscle.selected"></InputSwitch>
                        <span class="ml-2">{{ muscle.name }}</span>

                    </div>
                </div>
                <div class="">
                    <label class=" col-12 font-medium text-900">Required Equipment</label>
                    <div class="md:flex flex-wrap justify-content-center">
                        <div class="flex align-items-center p-2">
                            <RadioButton v-model="equipment" inputId="equipment1" value="Bodyweight" />
                            <label for="equipment1" class="ml-2">Bodyweight</label>
                        </div>
                        <div class="flex align-items-center p-2">
                            <RadioButton v-model="equipment" inputId="equipment2" value="Dumbbells Only" />
                            <label for="equipment2" class="ml-2">Dumbbells Only</label>
                        </div>
                        <div class="flex align-items-center p-2">
                            <RadioButton v-model="equipment" inputId="equipment3" value="Dumbbells/Barbell Only" />
                            <label for="equipment3" class="ml-2">Dumbbells/Barbell Only</label>
                        </div>
                        <div class="flex align-items-center p-2">
                            <RadioButton v-model="equipment" inputId="equipment4" value="Full Gym" />
                            <label for="equipment4" class="ml-2">Full Gym</label>
                        </div>
                    </div>
                </div>
                <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
                <div class="col-12">
                    <Button label="Add Exercise" class="w-auto mt-3" @click="addNewExercise()"></Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import API from "../api";

export default {
    data() {
        return {
            exerciseName: ' ',
            primaryMuscleGroup: '',
            secondaryMuscleGroups: [],
            muscleGroups: [],
            selectedSecondaryMuscleGroups: [],
            equipment: ''

        }
    },
    methods: {
        debug() {
            console.log(this.selectedSecondaryMuscleGroups)
        },

        showSuccess() {
            this.$toast.add({ severity: 'success', summary: 'Exercise Added', detail: 'Excercise can now be added to saved workouts', life: 5000 });
        },

        async getMuscleGroups() {
            this.muscleGroups = await API.getMuscleGroups()
            for (var i = 0; i < this.muscleGroups.length; i++) {
                this.selectedSecondaryMuscleGroups.push({
                    name: this.muscleGroups[i],
                    selected: false
                })
            }

        },

        async addNewExercise() {
            for (var i = 0; i < this.selectedSecondaryMuscleGroups.length; i++) {
                if (this.selectedSecondaryMuscleGroups[i].selected === true) {
                    this.secondaryMuscleGroups.push(this.selectedSecondaryMuscleGroups[i].name)
                }
            }

            let finalExercise = {
                exerciseName: this.exerciseName,
                primaryMuscleGroup: this.primaryMuscleGroup,
                secondaryMuscleGroups: this.secondaryMuscleGroups,
                equipment: this.equipment
            }

            await API.addExercise(finalExercise)

            this.exerciseName = '',
                this.primaryMuscleGroup = '',
                this.secondaryMuscleGroups = [],
                this.showSuccess()
        }

    },
    mounted() {
        this.getMuscleGroups()
    }

}
</script>
<style scoped></style>