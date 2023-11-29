<template>
    <div class="surface-section px-4 py-5 md:px-6 lg:px-8">
        <div class="text-3xl font-medium text-900 mb-4">User Profile</div>
        <div class="text-3xl font-medium text-900 mb-4">{{ userData.userName }}</div>

        <TabMenu :model="items"></TabMenu>
    </div>
    <RouterView></RouterView>

</template>

<script>
import API from '../api'
export default {
    data() {
        return {
            userData: '',
            items: [
            {
                label: 'Biometrics',
                icon: 'fa-solid fa-address-card',
                command: () => {
                    this.$router.push('/profile/biometrics');
                }
            },
            {
                label: 'Friends',
                icon: 'fa-solid fa-user-group',
                command: () => {
                    this.$router.push('/profile/friends');
                }
            }
        ]
        }
    },
    methods: {
        test(){
            console.log(this.userData)
        },

        //API Calls
        async getUserData(){
            let userObject = await API.getUserFriends(this.$store.state.user.uid)
            this.userData = userObject[0]
            this.test()
        }
    },
    mounted(){
        this.getUserData()
    }
}

</script>

