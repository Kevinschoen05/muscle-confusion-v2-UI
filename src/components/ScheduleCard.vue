<template>
    <div class=" border-bottom-1  md:border-left-1 md:border-right-1 md:border-bottom-none surface-border flex-auto p-3">
        <div class="flex align-items-center mb-3">
            <span class="text-500 font-medium">{{ date }}</span>
        </div>
        <span v-if="!workoutID" class="block text-900 font-medium mb-4 text-xl">Rest Day</span>
        <span v-else class="block text-900 font-medium mb-4 text-xl">{{ workoutTitle }}</span>
        <div v-if="!completed" class="flex align-items-bottom">
            <Button v-if="!workoutID" label="Set Workout" @click="visible2 = true" class="p-button-sm p-button"></Button>
            <Button v-else label="Update Workout" @click="visible2 = true" class="p-button-sm p-button"></Button>
            <Button v-if="workoutID" @click="this.startActiveWorkout(workoutID)" icon="pi pi-play"
                class="p-button-success ml-3"></Button>
        </div>
        <div v-else class="flex align-content-center">
            <img class="success-icon" aria-hidden="true" loading="lazy" decoding="async"
                src="../assets/check-circle-success.svg" alt="check mark">
                <span class="text-500 font-medium">Workout Completed</span>
            </div>
    </div>
    <Dialog v-model:visible="visible2" appendTo="body" :modal="true" :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
        :style="{ width: '40vw' }" :closable="false" :showHeader="false">
        <div class="flex flex-column align-items-center my-4">
            <span class="flex align-items-center justify-content-center bg-cyan-100 text-cyan-800 mr-3 border-circle mb-3"
                style="width:64px;height:64px">
                <i class="pi pi-check text-5xl"></i>
            </span>
            <div class="font-medium text-2xl text-900">Choose Workout</div>
        </div>
        <ul>
            <li class="py-3 border-bottom-1 surface-border flex md:align-items-center md:justify-content-between flex-column md:flex-row"
                v-for="workout in presetWorkouts" :key="workout._id">
                <div class="flex align-items-start mr-0 lg:mr-5">
                    <div>
                        <span class="text-900 font-medium block mb-2">{{ workout.workoutTitle }}</span>
                    </div>
                </div>
                <div class="mt-3 lg:mt-0">
                    <Button icon="pi pi-check"
                        @click="visible2 = false, updateUserSchedule(date, workout._id, workout.workoutTitle)"
                        label="Select"></Button>
                </div>
            </li>
        </ul>
        <template #footer>
            <div>
                <Button icon="pi pi-times" @click="visible2 = false" label="Cancel"
                    class="p-button-outlined w-full"></Button>
            </div>
        </template>
    </Dialog>
</template>
  
<script>

export default {
    name: 'ScheduleCard',

    emits: ["updateSchedule"],

    props: {

        date: String,
        today: String,
        workoutTitle: String,
        workoutID: String,
        presetWorkouts: Array,
        completed: Boolean

    },

    data() {
        return {
            visible2: false,
        }
    },
    methods: {
        updateUserSchedule(date, workoutID, workoutTitle) {
            console.log("from component: " + workoutID)
            this.$emit("updateSchedule", { date: date, workoutID: workoutID, workoutTitle: workoutTitle })

        },
        startActiveWorkout(workoutID) {
            this.$router.push({
                name: "active-workout",
                link: "/activeworkout/",
                params: { workoutID: workoutID },
                query: { userSchedule: 'true' }

            });
        },
    },
    mounted() {
        console.log("preset workouts prop from schedule card " + this.presetWorkouts)
    }
}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.success-icon {
    align-self: center;
    width: 1.25em;
    height: 1.25em;
    margin-right: .5em;
    padding-right : 0;
}
</style>

  