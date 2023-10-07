<template>
    <div class="surface-border border-round surface-0">
        <div class="p-4">
            <div class="flex align-items-center">
                <span class="inline-flex border-circle align-items-center justify-content-center bg-green-100 mr-3"
                    style="width: 38px; height: 38px">
                    <i class="pi pi-envelope text-xl text-green-600"></i>
                </span>
                <span class="text-900 font-medium text-2xl">{{ senderUserName }}</span>
            </div>
            <div class="text-900 my-3 text-xl font-medium">{{ messageType }}</div>
            <p class="mt-0 mb-3 text-700 line-height-3">{{ messageContent }}</p>
        </div>
        <div class="px-4 py-3 surface-100 text-right">
            <Button icon="pi pi-check" iconPos="right" label="Accept" class="p-button-rounded p-button mr-2" @click="acceptFriendRequest()"></Button>
            <Button icon="pi pi-times" iconPos="right" label="Reject" class="p-button-rounded p-button-danger"></Button>
        </div>
    </div>
</template>

<script>
import API from '../api'
export default {
    name: 'ExcerciseCard',

    props: {
        messageID: String,
        receiverUserID: String,
        receiverUserName: String,
        senderUserID: String,
        senderUserName: String,
        messageType: String,
        messageContent: String,
        messageRead: Boolean,
        messageAccepted: Boolean,
        timeStamp: Date
    },

    methods: {
        
        async acceptFriendRequest() {
            let messageAccepted = true 
            console.log("friend request accepted!")
            await API.updateMessageByMessageID(this.messageID, messageAccepted)
        },

        async rejectFriendRequest() {
            let messageAccepted = false
            console.log("friend request rejected!")
            await API.updateMessageByMessageID(this.messageID, messageAccepted)

        },

    }
}

</script>