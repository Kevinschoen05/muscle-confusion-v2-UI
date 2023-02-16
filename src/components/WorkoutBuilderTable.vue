<template>
    <li class="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
        <div class="flex align-items-start mr-0 lg:mr-5">
            <div>
                <span class="text-900 font-medium block mb-2">Set: {{ set }}</span>
                <div class="text-700 mb-2"> Target Reps:  {{ reps }} </div>

            </div>
        </div>
        <div class="mt-3 lg:mt-0">
            <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button mr-2" @click="deleteSet(exerciseID, set)" ></Button>
            <Button icon="pi pi-pencil" class="p-button-rounded p-button mr-2"></Button>
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
        }
    },

    watch: {

    },
    methods: {
        deleteSet(exerciseID, set){
            this.$emit('deleteSet', {exerciseID: exerciseID, set: set})
            console.log("from component:" + exerciseID + set)
        }
    },
    mounted() {

    }

}

</script>
  
<style scoped>

</style>

  