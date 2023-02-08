<template>
    <li class="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
        <div class="flex align-items-start mr-0 lg:mr-5">
            <div>
                <span class="text-900 font-medium block mb-2">{{ workoutTitle }}</span>
                <div class="text-700 mb-2">Completed by: {{ userEmail }}</div>
                <a class="text-blue-500 cursor-pointer">
                    <i class="pi pi-github text-sm mr-2"></i>
                    <span>Issue #1185</span>
                </a>
            </div>
        </div>
        <span class="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">{{relativeTime
        }}</span>
    </li>
</template>
  
<script>

export default {
    name: 'ActivityFeed',

    props: {
        workoutTitle: String,
        userEmail: String,
        workoutID: String,
        relativeTime: String
    },

    data() {
        return {
        }
    },

    watch: {

    },
    methods: {

    },
    mounted() {

    }

}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

  