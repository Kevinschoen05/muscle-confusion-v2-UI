<template>
    <div class="surface-card shadow-2 border-round p-4">
        <div class="flex justify-content-between align-items-center mb-5">
            <span class="text-xl text-900 font-medium">Friends List</span>
        </div>
        <ul class="list-none p-0 m-0">
            <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4" v-for="friend in userFriendsData" :key="friend.userID">
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
        <button @click="test()"></button>
    </div>
</template>
<script>
import API from '../api'
export default {
    data() {
        return {
            userFriendsData: []
        }
    },
    methods: {
        test() {
            console.log(this.userFriendsData)
        },

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

        }
    },
    mounted() {
        this.getUserFriends()

    }
}

</script>