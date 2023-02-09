<template>
    <div class=" border-bottom-1  md:border-left-1 md:border-right-1 md:border-bottom-none surface-border flex-auto p-3">
        <div class="flex align-items-center mb-3">
            <span class="text-500 font-medium">{{ date }}</span>
        </div>
        <span v-if="!workoutID" class="block text-900 font-medium mb-4 text-xl">Rest Day</span>
        <span v-else class="block text-900 font-medium mb-4 text-xl">{{ workoutTitle }}</span>
        <div class="flex align-items-bottom">
            <Button v-if="!workoutID" label="Set Workout" @click="visible2 = true"></Button>
            <Button v-else label="Update Workout" @click="visible2 = true"></Button>
        </div>
    </div>
    <Dialog v-model:visible="visible2" appendTo="body" :modal="true" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '40vw'}" :closable="false" :showHeader="false">
    <div class="flex flex-column align-items-center my-4">
        <span class="flex align-items-center justify-content-center bg-cyan-100 text-cyan-800 mr-3 border-circle mb-3" style="width:64px;height:64px">
            <i class="pi pi-check text-5xl"></i>
        </span>
        <div class="font-medium text-2xl text-900">Choose Workout</div>
    </div>
    <p class="line-height-3 p-0 m-0">
        Sagittis eu volutpat odio facilisis mauris sit amet. Sed velit dignissim sodales ut eu sem integer. 
        Sed risus pretium quam vulputate. At tellus at urna condimentum mattis pellentesque.
    </p>
    <template #footer>
        <div class=" border-top-1 surface-border pt-3 flex">
            <Button icon="pi pi-times" @click="visible2 = false" label="Cancel" class="p-button-outlined w-6 mr-2"></Button>
            <Button icon="pi pi-check" @click="visible2 = false" label="Save" class="w-6 ml-2"></Button>
        </div>
    </template>
</Dialog>
</template>
  
<script>

export default {
    name: 'ScheduleCard',

    components: {
    },
    props: {

        date: String,
        today: String,
        workoutTitle: String,
        workoutID: String

    },

    data() {
        return {
            visible2: false
        }
    },

    watch: {

    },
    methods: {
        
    },
    mounted() {

    }

}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

  