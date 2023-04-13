<template>
    <li
        class="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
        <div class="flex align-items-start mr-0 lg:mr-5">
            <div >
                <span class="text-900 font-medium block mb-2">Set: {{ set }}</span>
                <div v-if="editSet === false" class="text-700 mb-2"> Target Reps: {{ reps }} </div>
                <div v-else> 
                    <InputNumber  id="set-number" v-model="newReps" :min="1" :step="1" pattern="\d*" showButtons buttonLayout="vertical" style="width: 4rem"/>
                    <Button class="p-button-icon-only ml-1" label="Save" @click="updateSet(exerciseID, set, newReps)">
                        <span class="pi pi-check p-button-icon"></span> </Button>
                </div>

            </div>
        </div>
        <div class="mt-3 lg:mt-0">
            <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button mr-2"
                @click="deleteSet(exerciseID, set)"></Button>
            <Button icon="pi pi-pencil" class="p-button-rounded p-button mr-2" @click="editSet = true"></Button>
        </div>
</li>
</template>
  
<script>

export default {
    name: 'PresetWorkouts',

    props: {
        set: Number,
        reps: Number,
        exerciseID: String
    },

    data() {
        return {
            editSet: false,
            newReps: 0
        }
    },

    methods: {
        deleteSet(exerciseID, set) {
            this.$emit('deleteSet', { exerciseID: exerciseID, set: set })
            console.log(set)
            console.log(" delete from component:" + exerciseID + " " + set)
        },

        updateSet(exerciseID, set, newReps) {
            this.$emit('updateSet', { exerciseID: exerciseID, set: set, newReps: newReps })
            console.log(" update from component:" + exerciseID + " " + set + " " + newReps)
            this.editSet = false
        }

    },
    mounted() {

    }

}

</script>
  
<style scoped>
.mobile-set-input .p-inputnumber-input {
  max-width: 100px !important;
}
</style>

  