<template>
    <div class="min-h-screen flex relative lg:static surface-ground">
        <div id="app-sidebar"
            class="surface-section h-full lg:h-auto hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
            style="width:280px">
            <div class="flex flex-column h-full ">
                <div class="overflow-y-auto fixed">
                    <ul class="list-none p-3 m-0">
                        <li>
                            <div v-ripple
                                class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
                                v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'slidedown', leaveToClass: 'hidden', leaveActiveClass: 'slideup' }">
                                <span class="font-medium">WORKOUT RESULTS</span>
                                <i class="pi pi-chevron-down ml-3"></i>
                            </div>
                            <ul class="list-none p-0 m-0 overflow-hidden">
                                <li>
                                    <router-link v-ripple
                                        class=" flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                                        to="/stats/completedworkouts">
                                        <i class="pi pi-book mr-2"></i>
                                        <span class="font-medium">
                                            Detailed Workout Results </span>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                                        to="/stats/presetworkouts">
                                        <i class="pi pi-star mr-2"></i>
                                        <span class="font-medium">Preset Workout Data</span>
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="list-none p-3 m-0">
                        <li>
                            <div v-ripple
                                class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
                                v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'slidedown', leaveToClass: 'hidden', leaveActiveClass: 'slideup' }">
                                <span class="font-medium">EXERCISE DATA</span>
                                <i class="pi pi-chevron-down ml-2"></i>
                            </div>
                            <ul class="list-none p-0 m-0 overflow-hidden">
                                <li>
                                    <a v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-folder mr-2"></i>
                                        <span class="font-medium">Detailed Exercise Results</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-ripple
                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-chart-bar mr-2"></i>
                                        <span class="font-medium">Overall Muscle Group Data</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="min-h-screen flex flex-column relative flex-auto">
            <div class="flex lg:hidden xl:hidden">
                <a tabindex="0" class="layout-config-button"
                    v-styleclass="{ selector: '#app-sidebar', enterClass: 'hidden', enterActiveClass: 'fadeinleft', leaveToClass: 'hidden', leaveActiveClass: 'fadeoutleft', hideOnOutsideClick: true }">
                    <i class="pi pi-cog text-4xl"></i>
                </a>
            </div>
            <div class="flex flex-column flex-auto">
                <div class="p-5">
                    <div class="grid">
                        <div class="col-12 lg:col-6 xl:col-3">
                            <div class="surface-card shadow-2 p-3 border-1 border-50 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Total Workouts</span>
                                        <div class="text-900 font-medium text-xl">{{ userTotalWorkouts }}</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-calendar text-blue-500 text-xl"></i>
                                    </div>
                                </div>
                                <span class="text-green-500 font-medium"> </span>
                                <span class="text-500"></span>
                            </div>
                        </div>
                        <div class="col-12 lg:col-6 xl:col-3">
                            <div class="surface-card shadow-2 p-3 border-1 border-50 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Cumulative Volume</span>
                                        <div class="text-900 font-medium text-xl">{{ userTotalVolume }} lbs</div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-chevron-up text-blue-500 text-xl"></i>
                                    </div>
                                </div>
                                <span class="text-green-500 font-medium"> </span>
                                <span class="text-500"></span>
                            </div>
                        </div>
                        <div class="col-12 lg:col-6 xl:col-3">
                            <div class="surface-card shadow-2 p-3 border-1 border-50 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Successful Set % </span>
                                        <div class="text-900 font-medium text-xl">{{ userSuccessfulSetPercentage }} % </div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-check text-blue-500 text-xl"></i>
                                    </div>
                                </div>
                                <span class="text-green-500 font-medium"> </span>
                                <span class="text-500"></span>
                            </div>
                        </div>
                        <div class="col-12 lg:col-6 xl:col-3">
                            <div class="surface-card shadow-2 p-3 border-1 border-50 border-round">
                                <div class="flex justify-content-between mb-3">
                                    <div>
                                        <span class="block text-500 font-medium mb-3">Average Workout Duration</span>
                                        <div class="text-900 font-medium text-xl">{{ userAverageWorkoutDuration }} </div>
                                    </div>
                                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                                        style="width:2.5rem;height:2.5rem">
                                        <i class="pi pi-clock text-blue-500 text-xl"></i>
                                    </div>
                                </div>
                                <span class="text-green-500 font-medium"></span>
                                <span class="text-500"></span>
                            </div>
                        </div>
                        <div class="col-12">
                            <RouterView></RouterView>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script>
import API from '../api'
export default {
    data() {
        return {
            userCompletedWorkouts: [],
            userTotalWorkouts: 0,
            userTotalVolume: 0,
            userSuccessfulSetPercentage: 0,
            userAverageWorkoutDuration: 0
        }
    },
    methods: {

        calcUserSummaryStats() {
            this.userTotalWorkouts = this.userCompletedWorkouts.length

            let volume = 0;
            for (var i = 0; i < this.userCompletedWorkouts.length; i++) {
                volume += this.userCompletedWorkouts[i].totalVolume
            }
            this.userTotalVolume = volume

            this.calculateSuccessPercentage(this.userCompletedWorkouts)
            this.userAverageWorkoutDuration = this.calculateAverageDuration(this.userCompletedWorkouts)

        },

        calculateSuccessPercentage(userCompletedWorkouts) {
            let totalSets = 0;
            let successfulSets = 0;

            userCompletedWorkouts.forEach((workout) => {
                workout.exercises.forEach((exercise) => {
                    exercise.sets.forEach((set) => {
                        totalSets++;
                        if (set.success) {
                            successfulSets++;
                        }
                    });
                });
            });

            if (totalSets === 0) {
                return 0;
            }

            const successPercentage = (successfulSets / totalSets) * 100;
            this.userSuccessfulSetPercentage = Math.round(successPercentage * 100) / 100;

        },

        calculateAverageDuration(userCompletedWorkouts) {
            let totalDurationInSeconds = 0;

            userCompletedWorkouts.forEach((workout) => {
                const [hoursStr, minutesStr, secondsStr] = workout.workoutDuration.split(':');
                const hours = parseInt(hoursStr, 10);
                const minutes = parseInt(minutesStr, 10);
                const seconds = parseInt(secondsStr, 10);

                const durationInSeconds = (hours * 3600) + (minutes * 60) + seconds;
                totalDurationInSeconds += durationInSeconds;
            });

            if (userCompletedWorkouts.length === 0) {
                return '00-00-00';
            }

            const averageDurationInSeconds = Math.round(totalDurationInSeconds / userCompletedWorkouts.length);
            const hours = Math.floor(averageDurationInSeconds / 3600);
            const minutes = Math.floor((averageDurationInSeconds % 3600) / 60);
            const seconds = averageDurationInSeconds % 60;

            return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
        },

        padZero(number) {
            return number.toString().padStart(2, '0');
        },



        //API CALLS
        async getUserCompletedWorkouts() {
            let completedWorkoutsData = await API.getCompletedWorkoutsByUserID(this.$store.state.user.uid)
            completedWorkoutsData.sort((a, b) => {
                // convert the `completionDate` strings to Date objects for comparison
                const dateA = new Date(a.completionDate);
                const dateB = new Date(b.completionDate);

                // sort in descending order (most recent first)
                return dateB - dateA;
            });
            this.userCompletedWorkouts = completedWorkoutsData;
            this.calcUserSummaryStats()
        },
    },
    mounted() {
        this.getUserCompletedWorkouts()
    }

}
</script>
 
<style>
.pi-cog {
    line-height: 52px !important;
}

.layout-config-button {
    display: block;
    position: fixed;
    width: 52px;
    height: 52px;
    line-height: 52px !important;
    background-color: var(--primary-color);
    text-align: center;
    color: var(--primary-color-text);
    top: 270px;
    right: 0px;
    z-index: 100;
    overflow: hidden;
    cursor: pointer;
    outline: 0 none;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    -webkit-box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: none !important;
}
</style>