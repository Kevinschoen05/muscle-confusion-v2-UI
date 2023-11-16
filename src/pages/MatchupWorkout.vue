<template>
    <div class="flex ">
        <Card class="w-5 p-0">
            <template #title> Test Card </template>
            <template #content>
                <Card class="w-full">

                </Card>
            </template>
        </Card>
        <Card class="w-3">
            <template #title> Test Card </template>
            <template #content>
            </template>
        </Card>
        <Card class="w-5">
            <template #title> Test Card </template>
            <template #content>
            </template>
        </Card>
    </div>
</template>

<script>
import API from '../api'
export default {
    data() {
        return {
            matchupWorkout: {}
        };
    },
    methods: {

        //API Calls
        async getCompletedMatchupWorkout(){
            this.matchupWorkout = await API.getCompletedMatchupWorkoutbyID(this.$route.params.completedMatchupWorkoutID)
            console.log(this.matchupWorkout)
        }

    },
    mounted (){
        this.getCompletedMatchupWorkout()
    }
};
</script>