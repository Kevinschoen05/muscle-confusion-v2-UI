<template>
   
<div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
    <div class="text-900 font-medium text-xl mb-3">Create New Exercise</div>
    <p class="m-0 mb-4 p-0 text-600 line-height-3 mr-3">Add New Exercise that will be available to use in any workout.</p>
    <div class="surface-card p-4 shadow-2 border-round">
        <div class="grid formgrid p-fluid">
            <div class="field mb-4 col-12">
                <label for="exerciseName" class="font-medium text-900">Exercise Name</label>
                <InputText id="exerciseName" type="text" v-model="exerciseName" />
            </div>
            <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
            <div class="field mb-4 col-12 md:col-6">
                <label for="country2" class="font-medium text-900">Primary Muscle Group</label>
                <Dropdown id="primaryMuscleGroup" v-model="primaryMuscleGroup" :options="countries" optionLabel="name" :filter="true" filterBy="name" :showClear="true" placeholder="Select a Primary Muscle Group">
                </Dropdown>
            </div>
            <div class="field mb-4 col-12 md:col-6">
                <label for="email2" class="font-medium text-900">Email</label>
                <InputText id="email2" type="text" />
            </div>
            <div class="field mb-4 col-12 md:col-6">
                <label for="city2" class="font-medium text-900">City</label>
                <InputText id="city2" type="text" />
            </div>
            <div class="field mb-4 col-12 md:col-6">
                <label for="state2" class="font-medium text-900">State</label>
                <InputText id="state2" type="text" />
            </div>
            <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
            <div class="field mb-4 col-12">
                <label for="website2" class="font-medium text-900">Website</label>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">www</span>
                    <InputText id="website2" type="text" />
                </div>
            </div>
            <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
            <div class="field mb-4 col-12">
                <label for="privacy2" class="font-medium text-900">Privacy</label>
                <div class="flex align-items-center">
                    <InputSwitch id="privacy2" v-model="checked2"></InputSwitch>
                    <span class="ml-2">Share my data with contacts</span>
                </div>
            </div>
            <div class="surface-border border-top-1 opacity-50 mb-3 col-12"></div>
            <div class="col-12">
                <Button label="Add Exercise" class="w-auto mt-3" @click="debug()"></Button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
//import API from "../api";

export default {
    data() {
        return {
            exerciseName: ' ',

            selectedCountry2: []
        }
    },
    methods: {
        debug(){
            console.log(this.exerciseName)
        }
}
}
</script>
<style scoped>

</style>