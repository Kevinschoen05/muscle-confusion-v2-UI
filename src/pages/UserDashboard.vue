<template>
    <div class="p-5 flex flex-column flex-auto">
        <div class="grid">
            <div class="col-12">
                <div class="surface-card shadow-2 border-round flex p-3 flex-column md:flex-row">
                    <div class="border-bottom-1 md:border-right-1 md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <i class="pi pi-shopping-cart text-blue-500 text-xl mr-2"></i>
                            <span class="text-500 font-medium">Orders</span>
                        </div>
                        <span class="block text-900 font-medium mb-4 text-xl">152 New</span>
                        <div class="flex align-items-center">
                            <i class="pi pi-arrow-down text-pink-500 text-xl mr-2"></i>
                            <span class="text-pink-500 font-medium ">-25</span>
                        </div>
                    </div>
                    <div class="border-bottom-1 md:border-right-1 md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <i class="pi pi-shopping-cart text-orange-500 text-xl mr-2"></i>
                            <span class="text-500 font-medium">Revenue</span>
                        </div>
                        <span class="block text-900 font-medium mb-4 text-xl">$1500</span>
                        <div class="flex align-items-center">
                            <i class="pi pi-arrow-up text-green-500 text-xl mr-2"></i>
                            <span class="text-green-500 font-medium ">+15</span>
                        </div>
                    </div>
                    <div class="border-bottom-1 md:border-right-1 md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <i class="pi pi-users text-cyan-500 text-xl mr-2"></i>
                            <span class="text-500 font-medium">Customers</span>
                        </div>
                        <span class="block text-900 font-medium mb-4 text-xl">25100</span>
                        <div class="flex align-items-center">
                            <i class="pi pi-arrow-up text-green-500 text-xl mr-2"></i>
                            <span class="text-green-500 font-medium ">+%12</span>
                        </div>
                    </div>
                    <div class="border-bottom-1 md:border-right-1 md:border-bottom-none surface-border flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <i class="pi pi-users text-cyan-500 text-xl mr-2"></i>
                            <span class="text-500 font-medium">Customers</span>
                        </div>
                        <span class="block text-900 font-medium mb-4 text-xl">25100</span>
                        <div class="flex align-items-center">
                            <i class="pi pi-arrow-up text-green-500 text-xl mr-2"></i>
                            <span class="text-green-500 font-medium ">+%12</span>
                        </div>
                    </div>
                    <div class="flex-auto p-3">
                        <div class="flex align-items-center mb-3">
                            <i class="pi pi-users text-purple-500 text-xl mr-2"></i>
                            <span class="text-500 font-medium">Comments</span>
                        </div>
                        <span class="block text-900 font-medium mb-4 text-xl">72</span>
                        <div class="flex align-items-center">
                            <i class="pi pi-arrow-up text-green-500 text-xl mr-2"></i>
                            <span class="text-green-500 font-medium ">+20</span>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-12 lg:col-6">
                <div class="surface-card shadow-2 border-round p-4 h-full">
                    <div class="flex align-items-center justify-content-between mb-3">
                        <div class="text-900 font-medium text-xl">Team Activity</div>
                        <div>
                            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"
                                @click="$refs.menu1.toggle($event)"></Button>
                        </div>
                    </div>
                    <ul class="list-none p-0 m-0">
                        <li
                            class="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                            <div class="flex align-items-start mr-0 lg:mr-5">
                                <img src="images/blocks/avatars/circle-big/avatar-f-1.png" class="mr-3 w-3rem h-3rem" />
                                <div>
                                    <span class="text-900 font-medium block mb-2">Jane Cooper</span>
                                    <div class="text-700 mb-2">responded to an issue.</div>
                                    <a class="text-blue-500 cursor-pointer">
                                        <i class="pi pi-github text-sm mr-2"></i>
                                        <span>Issue #1185</span>
                                    </a>
                                </div>
                            </div>
                            <span class="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">14 mins ago</span>
                        </li>
                        <li
                            class="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                            <div class="flex align-items-start mr-0 lg:mr-5">
                                <img src="images/blocks/avatars/circle-big/avatar-m-1.png" class="mr-3 w-3rem h-3rem" />
                                <div>
                                    <span class="text-900 font-medium block mb-2">Robert Fox</span>
                                    <div class="text-700">changed team size from <span class="text-900">5</span> to
                                        <span class="text-900">6</span>.
                                    </div>
                                </div>
                            </div>
                            <span class="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">20 mins ago</span>
                        </li>
                        <li
                            class="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                            <div class="flex align-items-start mr-0 lg:mr-5">
                                <img src="images/blocks/avatars/circle-big/avatar-f-2.png" class="mr-3 w-3rem h-3rem" />
                                <div>
                                    <span class="text-900 font-medium block mb-2">Kristin Watson Cooper</span>
                                    <div class="text-700 mb-2">created a Q4 presentation to an issue.</div>
                                    <a class="text-blue-500 cursor-pointer">
                                        <i class="pi pi-file-pdf text-sm mr-2"></i>
                                        <span>q4_presentation.pdf</span>
                                    </a>
                                </div>
                            </div>
                            <span class="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">38 mins ago</span>
                        </li>
                        <li
                            class="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                            <div class="flex align-items-start mr-0 lg:mr-5">
                                <img src="images/blocks/avatars/circle-big/avatar-f-3.png" class="mr-3 w-3rem h-3rem" />
                                <div>
                                    <span class="text-900 font-medium block mb-2">Annette Black</span>
                                    <div class="text-700">added <span class="text-900">Nico Greenberg</span> to <span
                                            class="text-blue-500">Watchlist Tier-1</span>.</div>
                                </div>
                            </div>
                            <span class="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">1 day ago</span>
                        </li>
                        <li class="py-3 flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                            <div class="flex align-items-start mr-0 lg:mr-5">
                                <img src="images/blocks/avatars/circle-big/avatar-m-2.png" class="mr-3 w-3rem h-3rem" />
                                <div>
                                    <span class="text-900 font-medium block mb-2">Floyd Miles</span>
                                    <div class="text-700">has refunded a blue t-shirt for <span
                                            class="text-blue-500">79$</span>.</div>
                                </div>
                            </div>
                            <span class="block text-500 font-medium ml-7 md:ml-5 mt-2 md:mt-0">4 days ago</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-12 lg:col-6">
                <div class="surface-card shadow-2 border-round p-4 h-full">
                    <div class="flex align-items-center justify-content-between mb-3">
                        <div class="text-900 font-medium text-xl">Preset Workouts</div>
                        <div>
                            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"
                                @click="$refs.menu1.toggle($event)"></Button>
                        </div>
                    </div>
                    <ul class="list-none p-0 m-0">
                        <li v-for="workout in presetWorkouts" :key="workout.workoutTitle"
                            class="py-3 border-bottom-1 surface-border flex md:align-items-start md:justify-content-between flex-column md:flex-row">
                            <div class="flex align-items-start mr-0 lg:mr-5">
                                <div>
                                    <span class="text-900 font-medium block mb-2">{{ workout.workoutTitle }}</span>
                                    <div class="text-700 mb-2"> {{ presetWorkouts.length }} Total Exercises</div>
                                    <a class="text-blue-500 cursor-pointer">
                                        <i class="pi pi-github text-sm mr-2"></i>
                                        <span>Chip Row</span>
                                    </a>
                                </div>
                            </div>
                            <div class="mt-3 lg:mt-0">
                                    <Button  @click="this.startActiveWorkout(workout._id)" icon="pi pi-play" class="p-button-rounded mr-2"></Button>
                                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"></Button>
                                </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-12 lg:col-4">
                <div class="surface-card border-round shadow-2 p-4 text-center">
                    <img src="../assets/weightlift.png" alt="Image" class="mx-auto block mb-4 h-3 w-3">
                    <div class="text-900 font-medium mb-3 text-xl">Add New Exercises</div>
                    <p class="mt-0 mb-4 p-0 line-height-3">Add new exercises that can be used in any of your workouts.
                    </p>
                    <Button label="Create Here" icon="pi pi-arrow-right p-button-rounded"></Button>
                </div>
            </div>
            <div class="col-12 lg:col-4">
                <div class="surface-card border-round shadow-2 p-4 text-center">
                    <img src="../assets/rise.png" alt="Image" class="mx-auto block mb-4  h-3 w-3">
                    <div class="text-900 font-medium mb-3 text-xl">Track your Progress</div>
                    <p class="mt-0 mb-4 p-0 line-height-3">View your workout breakdowns</p>
                    <Button label="View Stats" icon="pi pi-arrow-right p-button-rounded"></Button>
                </div>
            </div>
            <div class="col-12 lg:col-4">
                <div class="surface-card border-round shadow-2 p-4 text-center">
                    <img src="../assets/trophy.png" alt="Image" class="mx-auto block mb-4  h-3 w-3">
                    <div class="text-900 font-medium mb-3 text-xl">Compete With Friends</div>
                    <p class="mt-0 mb-4 p-0 line-height-3">View your head to head results</p>
                    <Button label="View Matchups" icon="pi pi-arrow-right p-button-rounded"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../api';

export default {
    components: {

    },

    data() {
        return {
            presetWorkouts: [

            ]
        }
    },
    methods: {
        startActiveWorkout(workoutID){
            this.$router.push({
        name: "active-workout",
        link: "/activeworkout/",
        params: { workoutID: workoutID },
      });
        },
        //API CALLS
        async getUserPresetWorkouts() {
            this.presetWorkouts = await API.getWorkoutsByUserID(this.$store.state.user.uid)
            console.log(this.presetWorkouts)
        }


    },

    mounted() {
        this.getUserPresetWorkouts()
    }
}


</script>

<style>
body {
    background-color: #f5f5f5;
}

.settings-row {
    display: flex;
    justify-content: space-around;
}

.settings-header,
.preset-workouts {
    background-color: #fff;
    width: 30%;
    margin-top: 5em;
    border: 1px solid #EAECF0;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    border-radius: 16px;
}

.settings-title {
    font-family: 'Roboto';
    font-size: 30px;
    font-weight: 600;
    line-height: 38px;
    color: #101828;
    margin-left: 2em;
}

.settings-subtitle {
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    color: #475467;
    margin-left: 4em;


}

#primevue {
    margin-top: 2rem;
}
</style>