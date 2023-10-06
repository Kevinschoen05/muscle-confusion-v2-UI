<template>
    <div class="surface-section px-4 py-5 md:px-6 lg:px-8">
        <div class="text-3xl font-medium text-900 mb-4">User Inbox</div>
    </div>
    <ul class="list-none p-3 m-0">
        <li v-for="message in userMessages" :key="message" class="surface-card m-2 shadow-2 border-round">
            <div class="surface-border border-round surface-0">
                <div class="p-4">
                    <div class="flex align-items-center">
                        <span class="inline-flex border-circle align-items-center justify-content-center bg-green-100 mr-3"
                            style="width: 38px; height: 38px">
                            <i class="pi pi-envelope text-xl text-green-600"></i>
                        </span>
                        <span class="text-900 font-medium text-2xl">{{ message.senderUserID }}</span>
                    </div>
                    <div class="text-900 my-3 text-xl font-medium">{{ message.messageType }}</div>
                    <p class="mt-0 mb-3 text-700 line-height-3">{{ message.messageContent }}</p>
                </div>
                <div class="px-4 py-3 surface-100 text-right">
                    <Button icon="pi pi-check" iconPos="right" label="Accept" class="p-button-rounded p-button mr-2"></Button>
                    <Button icon="pi pi-times" iconPos="right" label="Reject"
                        class="p-button-rounded p-button-danger"></Button>
                </div>
            </div>
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

