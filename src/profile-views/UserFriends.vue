<template>
    <div class="surface-card shadow-2 border-round p-4">
        <div class="flex justify-content-between align-items-center mb-5">
            <span class="text-xl text-900 font-medium">Friends List</span>
            <div>
                <Button icon="pi pi-plus" class="p-button-text p-button-plain p-button-rounded"
                    @click="visible2 = true, getAllUsers()"></Button>
                <Dialog v-model:visible="visible2" appendTo="body" :modal="true">
                    <section class="flex flex-column w-full mt-4">
                        <div class="flex w-full justify-content-between mb-4">
                            <span
                                class="w-4rem h-4rem border-circle flex justify-content-center align-items-center bg-blue-100"><i
                                    class="pi pi-users text-blue-700 text-4xl"></i></span>
                        </div>
                        <p class="font-semibold text-xl mt-0 mb-2 text-900">Invite Friends</p>
                        <p class="font-normal text-base mt-0 mb-3 text-600">Find your friends and send them an invite.</p>
                    </section>
                    <ul class="list-none p-0 m-0">
                        <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
                            v-for="user in userList" :key="user.userID">
                            <div class="flex">
                                <div class="mr-0 md:mr-8">
                                    <span class="block text-900 font-medium mb-1">{{ user.userName }}</span>
                                    <div class="text-600">{{ user.userID }}</div>
                                </div>
                            </div>
                            <div class="mt-2 md:mt-0 flex flex-nowrap">
                                <Button @click="visible2 = false, visible3 = true" label="Invite"
                                    class="flex-grow-1"></Button>
                            </div>
                        </li>
                    </ul>
                    <template #footer>
                        <div class="pt-3 flex">
                            <Button @click="visible2 = false" label="Cancel" class="p-button-text flex-grow-1"></Button>
                        </div>
                    </template>
                </Dialog>
                <Dialog v-model:visible="visible3" appendTo="body" :modal="true">
                    <div class="p-4">
                        <div class="text-900 font-medium mb-4 text-xl">Send Friend Request</div>
                        <span class="p-float-label">
                            <Textarea v-model="messageContent" rows="5" cols="30" />
                            <label>Optional Message</label>
                        </span>
                        <div>
                            <Button class="mr-2" label="Send" @click="visible3 = false "></Button>
                            <Button class=" p-button-danger" label="Cancel" @click="visible3 = false "></Button>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
        <ul class="list-none p-0 m-0">
            <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
                v-for="friend in userFriendsData" :key="friend.userID">
                <div class="flex">
                    <div class="mr-0 md:mr-8">
                        <span class="block text-900 font-medium mb-1">{{ friend.userName }}</span>
                        <div class="text-600">{{ friend.userID }}</div>
                    </div>
                </div>
                <div class="mt-2 md:mt-0 flex flex-nowrap">
                    <Button class="p-button-text p-button-plain p-button-rounded mr-1" icon="pi pi-twitter"></Button>
                    <Button class="p-button-text p-button-plain p-button-rounded mr-1" icon="pi pi-github"></Button>
                    <Button class="p-button-text p-button-plain p-button-rounded mr-1" icon="pi pi-facebook"></Button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import API from '../api'
export default {
    data() {
        return {
            userFriendsData: [],
            userList: [],
            visible2: false,
            visible3: false,
            messageContent: ''
        }
    },
    methods: {

        //API Calls
        async getUserFriends() {
            let userObject = await API.getUserFriends(this.$store.state.user.uid)
            let userFriendsList = userObject[0].friends;
            await this.getUserFriendsDetails(userFriendsList)

        },

        async getUserFriendsDetails(friends) {
            console.log('getting details')
            for (const friend of friends) {
                console.log('Fetching details for friend:', friend); // Debugging log
                const friendData = await API.getUserFriendsDetails(friend);
                console.log('Friend data:', friendData); // Debugging log
                this.userFriendsData.push(...friendData); // Use spread operator to push the individual friendData into the array
            }

        },

        async getAllUsers() {
            this.userList = await API.getAllUsers()
            await console.log(this.userList)
        }

    },
    mounted() {
        this.getUserFriends()
        console.log(this.$store.state.user.uid)

    }
}

</script>