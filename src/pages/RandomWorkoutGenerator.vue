<template>
    <div class="min-h-screen flex relative lg:static surface-ground">
        <div class="p-5 flex flex-column flex-auto">
            <div>
                <div class="text-900 font-medium text-xl mb-3">Random Workout Generator</div>
                <p class="m-0 mb-4 p-0 text-600 line-height-3 mr-3">Enter your parameters and automatically generate a
                    custom workout.</p>
                <div class="surface-card p-4 shadow-2 border-round">
                    <div class="grid formgrid p-fluid">
                        <div>
                            <Label class="font-medium text-900 ">Minimum Target Sets</Label>
                            <InputText v-model.number="this.minSets" />
                            <Slider :min="1" :max="10" :step="1" v-model="this.minSets" />
                        </div>
                        <div class="ml-4">
                            <Label class="font-medium text-900 ">Maximum Target Sets</Label>
                            <InputText v-model.number="this.maxSets" />
                            <Slider :min="1" :max="10" :step="1" v-model="this.maxSets" />
                        </div>
                        <div class="field mb-4 col-12">
                        </div>
                        <div class="surface-100 mb-3 col-12" style="height:2px"></div>
                        <div class="surface-100 mb-3 col-12" style="height:2px"></div>
                        <div class="col-12">
                            <Button label="Start Workout" class="w-auto mt-3"></Button>
                        </div>
                    </div>
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
            desiredExerciseCount: 0,
            minSets: 1,
            maxSets: 1,
            minReps: 1,
            maxReps: 1,
            muscleGroups: [],
            selectedMuscleGroups: []
        }
    },
    methods: {
        async getMuscleGroups() {
            this.muscleGroups = await API.getMuscleGroups()
            for (var i = 0; i < this.muscleGroups.length; i++) {
                this.selectedMuscleGroups.push({
                    name: this.muscleGroups[i],
                    selected: false
                })
            }

        },
    },

    mounted() {
        this.getMuscleGroups()
    }
}
</script>