<template>
    <Toast />
    <div class="surface-ground">
        <div class="grid">
            <ActiveWorkoutSummary v-if="this.$route.params.workoutID" :workoutID="this.workoutID"
                :workoutTitle="this.workoutTitle" :totalSets="this.totalSets"
                class="timer flex flex-column flex-auto align-items-center">
            </ActiveWorkoutSummary>
            <div v-else class="p-5 flex flex-column flex-auto">
                <h1>Build a Workout as You Go</h1>
                <p class="m-0 mb-4 p-0 text-900 line-height-3 mr-3">Build and track a standalone workout. You can view your
                    results from your dashboard just like any other preset workout.
                </p>
            </div>
            <div class="col-12 p-3 flex flex-column flex-auto align-items-center">
                <Button v-if="visible1" label="Start Workout" class=" flex align-items-center"
                    @click="startTimer(), visible1 = false"></Button>

                <ul v-if=!visible1 class="list-none p-0 m-0">
                    <ExerciseCard v-for="exercise in exercises" :key="exercise"
                        @exercise-complete="handleCompletedExercise(exercise)" :exerciseName=exercise.exerciseName
                        :primaryMuscleGroup="exercise.primaryMuscleGroup"
                        :secondaryMuscleGroups="exercise.secondaryMuscleGroups" :targetSets="exercise.targetSets"
                        :exerciseType="exercise.exerciseType" :sets="exercise.sets"></ExerciseCard>
                </ul>
            </div>

            <div class=" mb-3 flex flex-column flex-auto align-items-center">

                <Button v-if=!visible1 icon="pi pi-plus" class="mb-6" @click="visible3 = true"></Button>
                <Button v-if=!visible1 label="Complete Workout" class=" flex align-items-center"
                    @click="visible2 = true, this.calculateTotalVolume(), stopTimer()"></Button>
            </div>
        </div>
        <Dialog v-model:visible="visible3" appendTo="body" :modal="true">
            <ActiveWorkoutExerciseAdd @add-exercise="handleAddExercise"></ActiveWorkoutExerciseAdd>
        </Dialog>
        <Dialog v-model:visible="visible2" appendTo="body" :modal="true">
            <div class="p-4">
                <div class="text-900 font-medium mb-3 text-xl">Workout summary</div>
                <p class="mt-0 mb-4 p-0 line-height-3">Review all your completed workouts from your Dashboard</p>
                <div class="flex mb-4 flex-column lg:flex-row">
                    <div class="surface-50 p-3 flex-auto mx-0 my-3 lg:my-0 lg:mx-3">
                        <div class="text-600 mb-3">Total Volume</div>
                        <span class="text-blue-600 font-medium text-xl">{{ totalVolume }} lbs</span>
                    </div>
                    <div class="surface-50 p-3 flex-auto">
                        <div class="text-600 mb-3">Duration</div>
                        <span class="text-blue-600 font-medium text-xl">{{ formattedElapsedTime }}</span>
                    </div>
                </div>
                <div>
                    <div class="text-900 font-medium mb-3 text-xl">Capture Externalities</div>
                    <p class="mt-0 mb-4 p-0 line-height-3">Track positive and negative factors that can effect your workout
                    </p>
                    <div class="flex flex-column gap-2">
                        <label for="sleep">Previous Night's Sleep</label>
                        <InputNumber v-model="userSleep" inputId="sleep" suffix=" hours" :min="0" showButtons></InputNumber>
                    </div>
                    <div class=" mt-2 flex flex-column gap-2">
                        <label for="stress">Self-Reported Nutrition Quality</label>
                        <InputNumber v-model="userNutrition" inputId="stress" suffix=" out of 10" :min="0" :max="10"
                            showButtons></InputNumber>
                    </div>
                    <div class=" mt-2 flex flex-column gap-2">
                        <label for="stress">Self-Reported Stress Level</label>
                        <InputNumber v-model="userStress" inputId="stress" suffix=" out of 10" :min="0" :max="10"
                            showButtons></InputNumber>
                    </div>
                    <div class=" mt-2 flex flex-column gap-2">
                        <label for="stress">Preworkout Taken</label>
                        <InputSwitch v-model="userPreworkout" inputId="preworkout"></InputSwitch>
                    </div>

                </div>
                <Button class="w-full mt-4" icon="pi pi-check" label="Save Workout"
                    @click="saveCompletedWorkout(), visible2 = false"></Button>
                <Button class=" w-full mt-4" icon="pi pi-send" label="Save & Share Results"
                    @click="getUserFriends(), visible2 = false, visible4 = true, shareWorkout = true"></Button>
            </div>
        </Dialog>
        <Dialog v-model:visible="visible4" appendTo="body" :modal="true">
            <div class="p-2">
                <div class="flex w-full justify-content-between mb-4">
                    <span class="w-4rem h-4rem border-circle flex justify-content-center align-items-center bg-blue-100"><i
                            class="pi pi-users text-blue-700 text-4xl"></i></span>
                </div>
                <div class="text-900 font-medium mb-3 text-xl">Send Results</div>
                <p class="mt-0 mb-4 p-0 line-height-3">Select Friends to Share Your Workout Details </p>
                <ul class="list-none p-0 m-0">
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
                        v-for="friend in userFriendsData" :key="friend.userID">
                        <div class="flex">
                            <Checkbox v-model="selectedFriends" :inputId="friend.userID" name="Friends"
                                :value="friend.userID"></Checkbox>
                            <label :for="friend.userID">{{ friend.userName }}</label>
                        </div>
                    </li>
                </ul>
                <Button @click="sendWorkoutSummary()" label="Send"></Button>
            </div>

        </Dialog>
    </div>
</template>

<script>
import API from '../api'
import ExerciseCard from '../components/ExerciseCard.vue'
import ActiveWorkoutSummary from '../components/ActiveWorkoutSummary.vue'
import ActiveWorkoutExerciseAdd from '../components/ActiveWorkoutExerciseAdd.vue'

export default {
    components: {
        ExerciseCard,
        ActiveWorkoutSummary,
        ActiveWorkoutExerciseAdd
    },
    data() {
        return {
            visible1: true,
            visible2: false,
            visible3: false,
            visible4: false,
            activeWorkout: {},
            workoutTitle: '',
            workoutID: this.$route.params.workoutID,
            exercises: [],
            completedExercises: [],
            completedWorkoutID: '',
            externalities: [],
            totalVolume: 0,
            totalSets: 0,

            //User Info & Sharing
            currentUserName: '',
            userFriendsList: '',
            userFriendsData: [],
            selectedFriends: [],
            shareWorkout: false,


            //externalities
            userSleep: 0,
            userNutrition: 0,
            userStress: 0,
            userPreworkout: false,


            //duration
            startTime: null,
            endTime: null,
            elapsedTime: 0,

        }
    },
    computed: {
        formattedElapsedTime() {
            const hours = Math.floor(this.elapsedTime / (1000 * 60 * 60));
            const minutes = Math.floor((this.elapsedTime / (1000 * 60)) % 60);
            const seconds = Math.floor((this.elapsedTime / 1000) % 60);
            return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
        },
    },

    methods: {
        startTimer() {
            this.startTime = Date.now();
            this.showWorkoutStart();

        },

        stopTimer() {
            this.endTime = Date.now();
            this.elapsedTime = this.endTime - this.startTime;
        },

        padZero(num) {
            return num.toString().padStart(2, '0');
        },


        showSuccess() {
            this.$toast.add({ severity: 'success', summary: 'Workout Complete', detail: 'You Can Review your Completed Workouts in your Dashboard.', life: 5000 });
        },

        showWorkoutStart() {
            this.$toast.add({ severity: 'success', summary: 'Workout Started', detail: 'Workout Duration will be tracked.', life: 5000 });
        },


        handleCompletedExercise(exercise) {
            this.completedExercises.push(exercise)
            console.log("completed exercises array: " + this.completedExercises)
        },

        handleAddExercise({ draftExercise }) {
            console.log(this.exercises)
            console.log(draftExercise)
            this.exercises.push(draftExercise)
            this.visible3 = false
        },

        calculateTotalVolume() {
            let volume = 0;
            for (var i = 0; i < this.completedExercises.length; i++) {
                for (var k = 0; k < this.completedExercises[i].sets.length; k++) {
                    volume += (this.completedExercises[i].sets[k].actual_weight * this.completedExercises[i].sets[k].actual_reps)

                }
            }
            this.totalVolume = volume
            console.log(volume)
        },

        calculateTotalSets() {
            for (let i = 0; i < this.exercises.length; i++) {
                this.totalSets += this.exercises[i].targetSets
            }
            console.log(this.totalSets)
        },


        async getActiveWorkout() {
            this.activeWorkout = await API.getWorkoutsByWorkoutID(this.$route.params.workoutID)
            this.exercises = this.activeWorkout[0].exercises
            this.workoutTitle = this.activeWorkout[0].workoutTitle
            this.workoutID = this.activeWorkout[0].workoutID
            this.calculateTotalSets()
        },

        async saveCompletedWorkout() {
            let activeFreestyleWorkoutID = 'freestyle';
            let finalWorkoutID = '';
            let finalWorkoutTitle = '';
            let finalUsers = []

            this.externalities.push({
                userSleep: this.userSleep
            }, {
                userNutrition: this.userNutrition
            }, {
                userStress: this.userStress
            }, {
                userPreworkout: this.userPreworkout
            }
            )

            if (this.$route.params.workoutID) {
                finalWorkoutID = this.activeWorkout[0]._id;
                finalWorkoutTitle = this.activeWorkout[0].workoutTitle
                finalUsers = this.$store.state.user.uid
            }
            else {
                finalWorkoutID = activeFreestyleWorkoutID
                finalWorkoutTitle = "Freestyle Workout"
                finalUsers.push(this.$store.state.user.uid)
            }

            let completedWorkout = {
                workoutID: finalWorkoutID,
                workoutTitle: finalWorkoutTitle,
                workoutDuration: this.formattedElapsedTime,
                totalVolume: this.totalVolume,
                users: finalUsers,
                exercises: this.completedExercises,
                externalities: this.externalities
            }

            await API.addCompletedWorkout(completedWorkout)
            this.showSuccess()
            if (this.shareWorkout === false) {
                this.$router.push({
                    name: "user-dashboard",
                    link: "/dashboard",
                });
            }
            else {
                let completedWorkouts = await API.getCompletedWorkoutsByUserID(this.$store.state.user.uid)
                let lastCompletedWorkoutID = completedWorkouts[completedWorkouts.length - 1]._id
                this.completedWorkoutID = lastCompletedWorkoutID
                console.log(this.completedWorkoutID)
            }

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

        async sendWorkoutSummary() {
            console.log(this.selectedFriends)
            await this.saveCompletedWorkout();

            for (let i = 0; i < this.selectedFriends.length; i++) {
                let senderUserID = this.$store.state.user.uid;
                let senderUserName = this.currentUserName;
                let receiverUserID = this.selectedFriends[i];
                let receiverUserName = '';
                let messageType = 'Workout Summary'
                let messageContent = this.completedWorkoutID;
                let messageRead = false;
                let messageAccepted = false;

                await API.createMessage({
                    senderUserID: senderUserID,
                    senderUserName: senderUserName,
                    receiverUserID: receiverUserID,
                    receiverUserName: receiverUserName,
                    messageType: messageType,
                    messageContent: messageContent,
                    messageRead: messageRead,
                    messageAccepted: messageAccepted

                })
            }
            this.showSuccess()
            this.$router.push({
                name: "user-dashboard",
                link: "/dashboard",
            });

        },

        debug() {
            console.log(this.activeWorkout[0])
            console.log(this.currentUserName)
            console.log(this.activeWorkout[0].users)
        }
    },
    mounted() {
        if (this.$route.params.workoutID) {
            this.getActiveWorkout();
        }
    }
}

</script>
