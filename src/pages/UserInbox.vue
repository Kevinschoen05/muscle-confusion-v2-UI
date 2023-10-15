<template>
    <div class="surface-section px-4 py-5 md:px-6 lg:px-8">
        <div class="text-3xl font-medium text-900 mb-4">User Inbox</div>
        <div>
            <InputSwitch v-model="unread"></InputSwitch>
            <p class="font-medium text-500 mb-3 text-sm">Unread Only</p>
        </div>

    </div>
    <ul v-if="unread === false" class="list-none p-3 m-0">
        <li v-for="message in userMessages" :key="message" class="surface-card m-2 shadow-2 border-round">
            <InboxMessage :messageID="message._id" :receiverUserID="message.receiverUserID"
                :receiverUserName="message.receiverUserName" :senderUserID="message.senderUserID"
                :senderUserName="message.senderUserName" :messageType="message.messageType"
                :messageContent="message.messageContent" :messageRead="message.messageRead"
                :messageAccepted="message.messageAccepted" :timestamp="message.timestamp"></InboxMessage>
        </li>
    </ul>
    <ul v-else class="list-none p-3 m-0">
        <li v-for="message in userUnreadMessages" :key="message" class="surface-card m-2 shadow-2 border-round">
            <InboxMessage :messageID="message._id" :receiverUserID="message.receiverUserID"
                :receiverUserName="message.receiverUserName" :senderUserID="message.senderUserID"
                :senderUserName="message.senderUserName" :messageType="message.messageType"
                :messageContent="message.messageContent" :messageRead="message.messageRead"
                :messageAccepted="message.messageAccepted" :timestamp="message.timestamp"></InboxMessage>
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
            userUnreadMessages: [],
            unread: true
        }
    },
    methods: {
        test() {
            console.log(this.userMessages)
        },

        filterUnreadMessages() {
            this.userUnreadMessages = this.userMessages.filter(message => !message.messageRead);

        },

        //API Calls
        async getUserMessages() {
            this.userMessages = await API.getUserMessages(this.$store.state.user.uid)
            await this.filterUnreadMessages()
            await console.log(this.userMessages)
            await console.log(this.userUnreadMessages)
        }
    },
    mounted() {
        this.getUserMessages()
    }
}

</script>

