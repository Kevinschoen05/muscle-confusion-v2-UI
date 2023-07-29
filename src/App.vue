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
                    <a @click="$router.push('/stats')" v-ripple
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
                    class="flex p-3 px-3 py-3 align-items-center text-600 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
                    <i class="pi pi-bell text-base lg:text-2xl mr-2 mr-0" v-badge.danger></i>
                </a>
            </li>
            <li>
                <a v-ripple @click="visible2 = true"
                    class="flex p-3 px-3 py-2 align-items-center text-600 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
                    <i class="pi pi-user text-base lg:text-2xl mr-2 mr-0"></i>
                    <p>{{ }}</p>
                </a>
            </li>
        </ul>
    </div>
    <router-view :key="$route.fullPath" />
    <Dialog v-model:visible="visible2" appendTo="body" :modal="true">
        <div class="flex flex-column">
            <Button icon="pi pi-cog" class="p-button m-2" label="Profile" @click="$router.push('/profile'), this.visible2 = false" v-ripple></Button>
            <Button icon="pi pi-sign-out
         " class="p-button-danger m-2" label="Logout" @click="logout()"></Button>

        </div>

    </Dialog>
</template>

<script>
import { getAuth, updateProfile } from "firebase/auth";


export default {
    data() {
        return {
            visible2: false,
            newUsername: '',
        }
    },
    methods: {
        debug() {
            console.log(this.displayName)
        },

        updateUsername() {
            const auth = getAuth();
            console.log(auth.currentUser)
            updateProfile(auth.currentUser, {
                displayName: this.username,
            })
            this.visible2 = false;
        },

        async logout() {
            try {
                await this.$store.dispatch('logout', {
                })
            }
            catch (err) {
                this.error = err.message
            }
            this.visible2 = false
            this.$router.push({
                name: "login",
                link: "/login",
            })
        },


    },


}
</script>


<style>
body {
    margin: 0;
    padding: 0;
}
</style>