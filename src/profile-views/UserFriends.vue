<template>
    <div class="surface-card shadow-2 border-round p-4">
        <div class="flex justify-content-between align-items-center mb-5">
            <span class="text-xl text-900 font-medium">Friends List</span>
        </div>
        <ul class="list-none p-0 m-0">
            <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                <div class="flex">
                    <img src="images/blocks/avatars/circle/avatar-f-1.png" class="mr-3" style="width: 45px; height: 45px" />
                    <div class="mr-0 md:mr-8">
                        <span class="block text-900 font-medium mb-1">Janette Hudson</span>
                        <div class="text-600">UI/UX Designer</div>
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
import API from  '../api'
export default {
    data() {
        return {
            userFriendsList: ''
        }
    },
    methods: {
        test(){
            console.log(this.userFriendsList)
        },

        //API Calls
        async getUserFriends(){
            let userObject = await API.getUserFriends(this.$store.state.user.uid)
            this.userFriendsList = userObject[0].friends
            this.test()
        }
    },
    mounted(){
        this.getUserFriends()
    }
}

</script>