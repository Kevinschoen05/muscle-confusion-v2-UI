<template>
    <div class="surface-section px-4 py-5 md:px-6 lg:px-8">
        <div class="text-3xl font-medium text-900 mb-4">User Inbox</div>
        <div class="text-3xl font-medium text-900 mb-4">{{  }}</div>
    </div>

</template>

<script>
//import API from '../api'
export default {
    data() {
        return {
            userMessages: [],
        }
    },
    methods: {
        test(){
            console.log(this.userMesages)
        },

        //API Calls
        async getUserMessages(){

        }
    },
    mounted(){
        this.getUserMessages()
    }
}

</script>

