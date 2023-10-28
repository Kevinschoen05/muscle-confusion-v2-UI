<template>
    <li
        class="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
        <div class="flex align-items-start mr-0 lg:mr-5">
            <div>
                <span class="text-900 font-medium block mb-2">{{ workoutTitle }}</span>
                <div class="text-700 mb-2"> {{ totalExercises }} Total Exercises</div>
                <div class="text-700 mb-2 "> Created By: {{ userName }} </div>
            </div>
        </div>
        <div class="mt-3 lg:mt-0">
            <Button @click="startActiveWorkout(workoutID)" icon="pi pi-play"
                class="p-button-rounded p-button-success mr-2"></Button>
            <Button @click="visible2 = true, getAllUsers()" icon="pi pi-users" class="p-button-rounded p-button-warning mr-2"></Button>
            <Button v-if="userID === this.$store.state.user.uid" @click="editPresetWorkout(workoutID)" icon="pi pi-pencil"
                class="p-button-rounded p-button mr-2"></Button>
        </div>
    </li>
    <Dialog v-model:visible="visible2" appendTo="body" :modal="true">
        <section class="flex flex-column w-full mt-4">
            <div class="flex w-full justify-content-between mb-4">
                <span class="w-4rem h-4rem border-circle flex justify-content-center align-items-center bg-blue-100"><i
                        class="fa-solid fa-medal text-blue-700 text-4xl"></i></span>
            </div>
            <p class="font-semibold text-xl mt-0 mb-2 text-900">Challenge A Friend</p>
            <p class="font-normal text-base mt-0 mb-3 text-600">Choose a friend and challenge them to compete with this workout.</p>
        </section>
        <ul class="list-none p-0 m-0">
            <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
                v-for="user in inviteUserList" :key="user.userID">
                <div class="flex">
                    <div class="mr-0 md:mr-8">
                        <span class="block text-900 font-medium mb-1">{{ user.userName }}</span>
                        <div class="text-600">{{ user.userID }}</div>
                    </div>
                </div>
                <div class="mt-2 md:mt-0 flex flex-nowrap">
                    <Button
                        @click="visible2 = false, visible3 = true, this.invitedUserID = user.userID, this.invitedUserName = user.userName"
                        label="Invite" class="flex-grow-1"></Button>
                </div>
            </li>
        </ul>
        <template #footer>
            <div class="pt-3 flex">
                <Button @click="visible2 = false" label="Cancel" class="p-button-text flex-grow-1"></Button>
            </div>
        </template>
    </Dialog>
</template>
  
<script>
import API from '../api'

export default {
    name: 'PresetWorkouts',

    props: {
        workoutTitle: String,
        totalExercises: Number,
        userID: String,
        workoutID: String
    },

    data() {
        return {
            userName: '',
            invitedUserID: '',
            invitedUserName: '',
            userFriendsData: [],
            userFriendsList: [],
            inviteUserList: [],
            userList: [],

            visible2: false
        }
    },

    watch: {

    },
    methods: {
        startActiveWorkout(workoutID) {
            this.$router.push({
                name: "active-workout",
                link: "/activeworkout/",
                params: { workoutID: workoutID },
            });
        },
        editPresetWorkout(workoutID) {
            this.$router.push({
                name: "edit-workout",
                link: "/workoutbuilder/edit/",
                params: { workoutID: workoutID },
            });
        },

        getInviteUserList(friendIDs, listOfUsers) {
            const idsToRemove = friendIDs;

            const updatedUserList = listOfUsers.filter(obj => !idsToRemove.includes(obj.userID));

            this.inviteUserList = updatedUserList;
            console.log(this.inviteUserList)

        },
        async getUserNameFromID() {
            let userObject = await API.getUserFriendsDetails(this.userID)
            console.log(userObject)
            this.userName = userObject[0].userName
        },

        async getUserFriends() {
            let userObject = await API.getUserFriends(this.$store.state.user.uid)
            this.currentUserName = userObject[0].userName
            this.userFriendsList = userObject[0].friends;
            console.log(this.userFriendsList)
            await this.getUserFriendsDetails(this.userFriendsList)

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
            await this.getInviteUserList(this.userFriendsList, this.userList)
        }
    },
    mounted() {
        this.getUserNameFromID()

    }

}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

  