<template>
    <div class="surface-section px-4 py-5 md:px-6 lg:px-8">
        <div class="text-3xl font-medium text-900 mb-4">User Inbox</div>
    </div>
    <ul class="list-none p-3 m-0">
        <li v-for="message in userMessages" :key="message" class="surface-card m-2 shadow-2 border-round">
            <InboxMessage :senderUserName="message.senderUserName" :messageType="message.messageType" :messageContent="message.messageContent"></InboxMessage>
        </li>
    </ul>
</template>

<script>

import API from '../api'
import InboxMessage from '../components/InboxMessage.vue'
export default {
    components: {
        InboxMessage
    },
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

