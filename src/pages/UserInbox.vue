<template>
    <div class="surface-section px-4 py-5 md:px-6 lg:px-8">
        <div class="text-3xl font-medium text-900 mb-4">User Inbox</div>
    </div>
    <ul class="list-none p-3 m-0">
        <li v-for="message in userMessages" :key="message" class="surface-card p-4 m-2 shadow-2 border-round">
            <div class="surface-border border-round surface-0 p-4"></div>
        </li>
    </ul>
</template>

<script>

import API from '../api'
export default {
    data() {
        return {
            userMessages: [],
        }
    },
    methods: {
        test() {
            console.log(this.userMessages)
        },

        //API Calls
        async getUserMessages() {
            this.userMessages = await API.getUserMessages(this.$store.state.user.uid)
            console.log(this.userMessages)
        }
    },
    mounted() {
        this.getUserMessages()
    }
}

</script>

