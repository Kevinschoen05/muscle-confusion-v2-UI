<template>
<div v-if="this.$store.state.userLoggedIn" class="bg-gray-900 py-3 px-6 shadow-2 flex align-items-center justify-content-between relative lg:static border-bottom-1 border-gray-800" style="min-height: 84px">
    <a v-ripple class="cursor-pointer block lg:hidden text-gray-400 mt-1 p-ripple"
        v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
        <i class="pi pi-bars text-4xl"></i>
    </a>
    <div class="align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full bg-gray-900 left-0 top-100 z-1 shadow-2 lg:shadow-none border-1 lg:border-none border-gray-800">
        <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row">
            <li>
                <a @click="$router.push('/')" v-ripple class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-gray-400 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
                    <i class="pi pi-home mr-2"></i>
                    <span>Home</span>
                </a>
            </li>
            <li>
                <a @click="$router.push('/dashboard')" v-ripple class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-gray-400 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
                    <span>Dashboard</span>
                </a>
            </li>
            <li>
                <a @click="$router.push('/workoutbuilder')" v-ripple class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-gray-400 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
                    <i class="pi pi-calendar mr-2"></i>
                    <span>Workout Builder</span>
                </a>
            </li>
            <li>
                <a v-ripple class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-gray-400 hover:text-white hover:bg-gray-800 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple">
                    <i class="pi pi-chart-line mr-2"></i>
                    <span>Stats</span>
                </a>
            </li>
        </ul>
    </div>
</div>
<router-view :key="$route.fullPath"/>
</template>

  <script>
export default {
    data() {
        return {
            value1: null,

        }
    }
}
</script>


<style>

body  { 
  margin: 0;
  padding: 0;
}
</style>