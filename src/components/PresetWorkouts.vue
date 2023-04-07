<template>
    <li class="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
        <div class="flex align-items-start mr-0 lg:mr-5">
            <div>
                <span class="text-900 font-medium block mb-2">{{ workoutTitle }}</span>
                <div class="text-700 mb-2"> {{ totalExercises }} Total Exercises</div>
                <a class="text-blue-500 cursor-pointer">
                    <i class="pi pi-github text-sm mr-2"></i>
                    <span>Chip Row</span>
                </a>
            </div>
        </div>
        <div class="mt-3 lg:mt-0">
            <Button @click="startActiveWorkout(workoutID)" icon="pi pi-play"
                class="p-button-rounded p-button-success mr-2"></Button>
            <Button @click="editPresetWorkout(workoutID)" icon="pi pi-pencil" class="p-button-rounded p-button mr-2"></Button>
        </div>
    </li>
</template>
  
<script>

export default {
    name: 'PresetWorkouts',

    props: {
        workoutTitle: String, 
        totalExercises: Number,
        workoutID: String
    },

    data() {
        return {
        }
    },

    watch: {

    },
    methods: {
        startActiveWorkout(workoutID) {
            this.$router.push({
                name: "active-workout",
                link: "/activeworkout/",
                params: { workoutID: workoutID },
            });
        },
        editPresetWorkout(workoutID) {
            this.$router.push({
                name: "edit-workout",
                link: "/workoutbuilder/edit/",
                params: { workoutID: workoutID },
            });
        },
    },
    mounted() {

    }

}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

  