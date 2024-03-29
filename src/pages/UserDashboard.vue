<template>
    <div class="p-5 flex flex-column flex-auto">
        <div class="grid">
            <div class="col-12">
                <div class="surface-card pl-4 pt-4 pb-4 border-bottom-none">
                    <div class="text-900 font-medium text-xl">Upcoming Schedule</div>
                </div>
                <div
                    class="surface-card   border-top-none border-noround-top border-round flex p-3 flex-column md:flex-row">
                    <ScheduleCard v-for="day in schedule" :key="day.date" :date="day.date"
                        @update-schedule="UserScheduleUpdate" :workoutTitle="day.workoutTitle" :workoutID="day.workoutID"
                        :today="today" :presetWorkouts="presetWorkouts" :completed="day.completed">
                    </ScheduleCard>

                </div>
            </div>
            <div class="col-12 lg:col-6">
                <div class="surface-card shadow-2 border-round h-30rem p-4 overflow-auto">
                    <div class="flex align-items-center justify-content-between mb-3">
                        <div class="text-900 font-medium text-xl">Recent Activity</div>
                        <div>
                            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"
                                @click="toggleMenu1"></Button>
                            <Menu ref="menu1" id="overlay_menu" :model="filterOptions1" :popup="true"></Menu>
                        </div>
                    </div>
                    <ul class="list-none p-0 m-0">
                        <ActivityFeed v-for="workout in paginatedActivity" :key="workout._id"
                            :workoutTitle="workout.workoutTitle" :userID="workout.users[0]"
                            :relativeTime="workout.relativeTime" :completedWorkoutID="workout._id"></ActivityFeed>
                    </ul>
                    <Paginator class="paginator" :totalRecords="completedWorkouts.length" :rows="perPage"
                        :first="currentPageActivityFeed * perPage" @page="onPageChangeActivityFeed"
                        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"></Paginator>
                </div>
            </div>
            <div class="col-12 lg:col-6">
                <div class="surface-card shadow-2 border-round p-4 h-30rem overflow-auto">
                    <div class="flex align-items-center justify-content-between mb-3">
                        <div class="text-900 font-medium text-xl">Preset Workouts</div>
                        <div>
                            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"
                                @click="toggleMenu2"></Button>
                            <Menu ref="menu2" id="overlay_menu" :model="filterOptions2" :popup="true"></Menu>
                        </div>
                    </div>
                    <ul class="list-none p-0 m-0 ">
                        <PresetWorkouts v-for="workout in paginatedPresetWorkouts" :key="workout._id"
                            :workoutTitle="workout.workoutTitle" :totalExercises="workout.exercises.length"
                            :userID="workout.users[0]" :workoutID="workout._id"></PresetWorkouts>
                    </ul>
                    <Paginator class="paginator" :totalRecords="presetWorkouts.length" :rows="perPage"
                        :first="currentPagePresetWorkouts * perPage" @page="onPageChangePresetWorkouts"
                        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"></Paginator>
                </div>
            </div>
            <div class="col-12 lg:col-4">
                <div class="surface-card border-round shadow-2 p-4 text-center">
                    <img src="../assets/weightlift.png" alt="Image" class="mx-auto block mb-4 h-3 w-3">
                    <div class="text-900 font-medium mb-3 text-xl">Add New Exercises</div>
                    <p class="mt-0 mb-4 p-0 line-height-3">Add new exercises
                    </p>
                    <Button label="Create Here" icon="pi pi-arrow-right p-button-rounded"
                        @click="createNewExercise()"></Button>
                </div>
            </div>
            <div class="col-12 lg:col-4">
                <div class="surface-card border-round shadow-2 p-4 text-center">
                    <img src="../assets/rise.png" alt="Image" class="mx-auto block mb-4  h-3 w-3">
                    <div class="text-900 font-medium mb-3 text-xl">Track your Progress</div>
                    <p class="mt-0 mb-4 p-0 line-height-3">View your workout breakdowns</p>
                    <Button label="View Stats" icon="pi pi-arrow-right p-button-rounded" @click="viewStats()"></Button>
                </div>
            </div>
            <div class="col-12 lg:col-4">
                <div class="surface-card border-round shadow-2 p-4 text-center">
                    <img src="../assets/trophy.png" alt="Image" class="mx-auto block mb-4  h-3 w-3">
                    <div class="text-900 font-medium mb-3 text-xl">Compete With Friends</div>
                    <p class="mt-0 mb-4 p-0 line-height-3">View your head to head results</p>
                    <Button label="View Matchups" icon="pi pi-arrow-right p-button-rounded" @click="viewMatchups()"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../api';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import advanced from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import isToday from "dayjs/plugin/isToday"

import ScheduleCard from '../components/ScheduleCard.vue'
import PresetWorkouts from '../components/PresetWorkouts.vue'
import ActivityFeed from '../components/ActivityFeed.vue'


dayjs.extend(relativeTime);
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(advanced)
dayjs.extend(localizedFormat)
dayjs.extend(isSameOrAfter)
dayjs.extend(isToday)
dayjs.tz.setDefault('America/New_York');

export default {
    components: {
        ScheduleCard,
        PresetWorkouts,
        ActivityFeed
    },
    data() {
        return {
            today: dayjs().tz().format('MM/DD/YYYY h:mm:ss z'),

            perPage: 10,
            currentPageActivityFeed: 0,
            currentPagePresetWorkouts: 0, // Added for tracking current page

            userFriends: [

            ],
            schedule: [

            ],
            completedWorkouts: [

            ],
            presetWorkouts: [

            ],
            filterOptions1: [
                {
                    label: 'Only You', icon: 'pi pi-fw pi-user', command: () => {
                        this.getUserCompletedWorkouts([this.$store.state.user.uid])
                    }
                },

                {
                    label: 'All Friends', icon: 'pi pi-fw pi-users', command: () => {
                        this.userFriends.friends.push(this.$store.state.user.uid)
                        this.getUserCompletedWorkouts(this.userFriends.friends)
                    }
                }],
            filterOptions2: [
                {
                    label: 'Only You', icon: 'pi pi-fw pi-user', command: () => {
                        this.getUserPresetWorkouts([this.$store.state.user.uid])
                    }
                },

                {
                    label: 'All Friends', icon: 'pi pi-fw pi-users', command: () => {
                        this.userFriends.friends.push(this.$store.state.user.uid)
                        this.getUserPresetWorkouts(this.userFriends.friends)
                    }
                }]
        }
    },
    computed: {
        paginatedActivity() {
            const startIndex = this.currentPageActivityFeed * this.perPage;
            return this.completedWorkouts.slice(startIndex, startIndex + this.perPage);
        },
        paginatedPresetWorkouts() {
            const startIndex = this.currentPagePresetWorkouts * this.perPage;
            return this.presetWorkouts.slice(startIndex, startIndex + this.perPage);
        }
    },

    methods: {

        debug() {
            console.log(this.schedule)
        },
        toggleMenu1(event) {
            this.$refs.menu1.toggle(event);
        },
        toggleMenu2(event) {
            this.$refs.menu2.toggle(event);
        },

        setPage(page) {
            this.currentPageActivityFeed = page;
        },

        onPageChangeActivityFeed(event) {
            this.currentPageActivityFeed = event.page;
            console.log("Page Change")
        },
        onPageChangePresetWorkouts(event) {
            this.currentPagePresetWorkouts = event.page;
            console.log("Page Change")
        },

        displayUserSchedule() {
            for (var i = 0; i < this.schedule.length; i++) {
                this.schedule[i].date = dayjs(this.schedule[i].date).format('LL')
            }
        },

        startActiveWorkout(workoutID) {
            this.$router.push({
                name: "active-workout",
                link: "/activeworkout/",
                params: { workoutID: workoutID },
            });
        },

        createNewExercise() {
            this.$router.push({
                name: "exercise-builder",
                link: "/exercisebuilder",
            });
        },

        viewStats() {
            this.$router.push({
                name: "stats-home",
                link: "/stats",
            });
        },

        viewMatchups() {
            this.$router.push({
                name: "matchup-workouts",
                link: "/matchupworkouts",
            });
        },

        getActivityFeedRelativeTime() {
            for (var i = 0; i < this.completedWorkouts.length; i++) {
                this.completedWorkouts[i].relativeTime = (dayjs().to(dayjs(this.completedWorkouts[i].completionDate),))
            }
        },

        //component handlers

        UserScheduleUpdate({ date, workoutID, workoutTitle }) {
            console.log("from parent: " + date + workoutID + workoutTitle)
            this.updateUserSchedule(date, workoutID, workoutTitle)
        },

        //API CALLS

        async getUserFriends() {
            let userObject = await API.getUserFriends(this.$store.state.user.uid)
            this.userFriends = userObject[0]
            console.log("User Friends" + this.userFriends)
        },

        async updateUserSchedule(date, workoutID, workoutTitle) {
            for (var i = 0; i < this.schedule.length; i++) {
                if (this.schedule[i].date === date) {
                    this.schedule[i].workoutID = workoutID
                    this.schedule[i].workoutTitle = workoutTitle
                }
            }
            console.log("schedule after update: " + this.schedule)
            let body = this.schedule
            console.log(body)
            await API.updateUserSchedule(this.$store.state.user.uid, body)
        },

        async getUserPresetWorkouts(userIDs) {
            this.presetWorkouts = await API.getWorkoutsByUserID(userIDs)
            console.log("preset Workouts: " + this.presetWorkouts)
        },

        async getUserCompletedWorkouts(userIDs) {
            let completedWorkoutsData = await API.getCompletedWorkoutsByUserID(userIDs)
            completedWorkoutsData.sort((a, b) => {
                // convert the `completionDate` strings to Date objects for comparison
                const dateA = new Date(a.completionDate);
                const dateB = new Date(b.completionDate);

                // sort in descending order (most recent first)
                return dateB - dateA;
            });
            this.completedWorkouts = completedWorkoutsData;
            console.log("completed Workouts: " + this.completedWorkouts)
            this.getActivityFeedRelativeTime()

        },
        async getUserSchedule() {
            let scheduleObject = await API.getUserSchedule(this.$store.state.user.uid)
            console.log("schedule object on getUserSchedule: " + scheduleObject)
            let savedSchedule = scheduleObject[0].schedule
            console.log(savedSchedule)
            let updatedSchedule = [];


            //remove past days from schedule

            for (var i = 0; i < savedSchedule.length; i++) {
                console.log(savedSchedule[i].date)
                if (dayjs(savedSchedule[i].date).isToday() || dayjs(savedSchedule[i].date).isSameOrAfter(this.today)) {
                    updatedSchedule.push(savedSchedule[i])
                }
            }
            //add new placeholder days to end of schedule
            let latestDate = ' '
            if (updatedSchedule.length === 0) {
                latestDate = this.today
            }
            else {
                latestDate = updatedSchedule.at(-1).date
            }
            console.log(updatedSchedule)
            let increment = 1;
            console.log(latestDate)

            while (updatedSchedule.length < 5) {
                updatedSchedule.push({
                    date: dayjs(latestDate).add(increment, 'day'),
                    workoutID: '',
                    workoutTitle: '',
                    completed: false
                })
                increment++
            }

            console.log(updatedSchedule)

            this.schedule = updatedSchedule
            savedSchedule = []
            updatedSchedule = []
            this.displayUserSchedule()


        },


    },
    mounted() {
        this.getUserPresetWorkouts([this.$store.state.user.uid])
        this.getUserCompletedWorkouts([this.$store.state.user.uid])
        this.getUserSchedule()
        this.getUserFriends()
    }
}


</script>

<style>
body {
    background-color: #f5f5f5;
}

#primevue {
    margin-top: 2rem;
}


@media screen and (max-width: 767px) {

    .p-paginator { 
        padding-left: 0rem !important
    }
    /* Adjust the max-width as needed to target your mobile screen size */
    .paginator {
        padding-left: 0% !important;
        width: max-content;
    }
}
</style>