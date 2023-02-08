<template>
    <div class=" border-bottom-1  md:border-left-1 md:border-right-1 md:border-bottom-none surface-border flex-auto p-3">
        <div class="flex align-items-center mb-3">
            <span class="text-500 font-medium">{{ date }}</span>
        </div>
        <span class="block text-900 font-medium mb-4 text-xl">{{ workoutTitle }}</span>
        <div class="flex align-items-center">
            <Button v-if="!workoutID" label="Set Workout"></Button>
            <Button v-else label="Update Workout"></Button>
        </div>
    </div>
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

  