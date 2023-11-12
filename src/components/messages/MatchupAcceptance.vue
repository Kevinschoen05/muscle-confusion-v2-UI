<template>
    <Toast />
    <div class="surface-border border-round surface-0">
        <div class="p-4">
            <div class="flex align-items-center">
                <span class="inline-flex border-circle align-items-center justify-content-center bg-green-100 mr-3"
                    style="width: 38px; height: 38px">
                    <i class="pi pi-user text-xl text-green-600"></i>
                </span>
                <span class="text-900 font-medium text-2xl">{{ senderUserName }}</span>
            </div>
            <div class="text-900 my-3 text-xl font-medium">{{ messageType }}</div>
            <p class="mt-0 mb-3 text-700 line-height-3">{{ messageContent }}</p>
        </div>
        <div class="px-4 py-3 surface-100 text-right">
            <Button v-if="messageAccepted === true" icon="pi pi-play" iconPos="right"
                label="Start Challenge " class="p-button-rounded p-button-success mr-2"
                @click="viewMatchupWorkouts()"></Button>
        </div>
    </div>
</template>

<script>
import API from '../../api'
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

    data() {
        return {
            messageUpdated: false
        }
    },

    methods: {

        async viewMatchupWorkouts() {
            this.markRead()

            this.$router.push({
                name: "matchup-workouts",
                link: "/matchupWorkouts",
            });
        },

        async markRead() {
            let messageAccepted = true
            console.log("Message Read")
            await API.updateMessageByMessageID(this.messageID, messageAccepted)

            this.messageUpdated = true
        },
    }
}

</script>