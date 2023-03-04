<template>
    <div v-if="this.$store.state.user"
        class="bg-gray-900 py-3 px-6 shadow-2 flex align-items-center justify-content-between relative lg:static border-bottom-1 border-gray-800 z-3"
        style="min-height: 84px">
        <a v-ripple class="cursor-pointer block lg:hidden text-gray-400 mt-1 p-ripple z-3"
            v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
            <i class="pi pi-bars text-4xl"></i>
        </a>
        <div
            class="align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full bg-gray-900 left-0 top-100 z-1 shadow-2 lg:shadow-none border-1 lg:border-none border-gray-800">
            <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row">
                <li>
                    <a @click="$router.push('/home')" v-ripple
                        class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-gray-400 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
                        <i class="pi pi-home mr-2"></i>
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a @click="$router.push('/dashboard')" v-ripple
                        class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-gray-400 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
                        <i class="pi pi-globe mr-2"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a @click="$router.push('/workoutbuilder')" v-ripple
                        class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-gray-400 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
                        <i class="pi pi-calendar mr-2"></i>
                        <span>Workout Builder</span>
                    </a>
                </li>
                <li>
                    <a v-ripple
                        class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-gray-400 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
                        <i class="pi pi-chart-line mr-2"></i>
                        <span>Stats</span>
                    </a>
                </li>
            </ul>
        </div>
        <ul class="list-none p-0 m-0  flex lg:align-items-center justify-content-end  select-none flex-row">
            <li>
                <a v-ripple @click="debug()"
                    class="flex  p-3 px-3 py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
                    <i class="pi pi-bell text-base lg:text-2xl mr-2 mr-0" v-badge.danger></i>
                </a>
            </li>
            <li>
                <a v-ripple @click="visible2 = true"
                    class="flex p-3 px-3 py-2 align-items-center text-gray-400 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
                    <i class="pi pi-user text-base lg:text-2xl mr-2 mr-0"></i>
                    <span>{{ displayName }}</span>
                </a>
            </li>
        </ul>
    </div>
    <router-view :key="$route.fullPath" />
    <Dialog v-model:visible="visible2" appendTo="body" :modal="true">
        <div v-if="displayName === null || displayName === '' ">
            <label for="email1" class="block text-900 font-medium mb-2">Set Username</label>
            <InputText id="email1" type="text" class="w-full mb-3" v-model="newUsername" />
            <Button class="mr-1" icon="pi pi-check " label="Save" @click="updateUsername()"></Button>
            <Button class="p-button-danger" icon="pi pi-sign-out " label="Logout" @click="logout()"></Button>

        </div>
        <div v-else>
            <Button icon="pi pi-sign-out
     " class="p-button-danger" label="Logout" @click="logout()"></Button>

        </div>

</Dialog>
</template>

<script>
//import { getAuth, updateProfile } from "firebase/auth";


export default {
    data() {
        return {
            visible2: false,
            newUsername: '',
            //displayName: this.$store.state.user.providerData[0].displayName
        }
    },
    methods: {
        debug() {
            console.log(this.displayName)
        },

       /* updateUsername() {
            const auth = getAuth();
            console.log(auth.currentUser)
            updateProfile(auth.currentUser, {
                displayName: this.username,
            })
            this.visible2 = false;
        },
        */
        async logout() {
            try {
                await this.$store.dispatch('logout', {
                })
                this.$router.push('/login')
            }
            catch (err) {
                this.error = err.message
            }
            this.visible2 = false
            this.displayName = ''
        }
    }

}
</script>


<style>
body {
    margin: 0;
    padding: 0;
}
</style>