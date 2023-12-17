<template>
    <Toast class="z-5" />
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
                        @exercise-complete="handleCompletedExercise(exercise)" @swap-exercises="handleExerciseSwap"
                        :exerciseID="exercise.id" :exerciseName=exercise.exerciseName
                        :primaryMuscleGroup="exercise.primaryMuscleGroup"
                        :secondaryMuscleGroups="exercise.secondaryMuscleGroups" :targetSets="exercise.targetSets"
                        :exerciseType="exercise.exerciseType" :sets="exercise.sets"></ExerciseCard>
                </ul>
            </div>

            <div class=" mb-3 flex flex-column flex-auto align-items-center">

                <Button v-if="!visible1 && !this.$route.query.matchup" icon="pi pi-plus" class="mb-6"
                    @click="visible3 = true"></Button>
                <Button v-if=!visible1 label="Complete Workout" class=" flex align-items-center"
                    @click="this.completeWorkout()"></Button>
            </div>
        </div>
        <Dialog v-model:visible="visible3" appendTo="body" :modal="true">
            <ActiveWorkoutExerciseAdd @add-exercise="handleAddExercise"></ActiveWorkoutExerciseAdd>
        </Dialog>
        <Dialog v-model:visible="visible2" appendTo="body" :modal="true">
            <div class="p-4">
                <div v-if="!this.$route.query.matchup" class="text-900 font-medium mb-3 text-xl">Workout summary</div>
                <div v-else class="text-900 font-medium mb-3 text-xl">Matchup Workout summary</div>

                <p v-if="!this.$route.query.matchup" class="mt-0 mb-4 p-0 line-height-3">Review all your completed workouts
                    from your Dashboard</p>
                <p v-else class="mt-0 mb-4 p-0 line-height-3">Check your Matchup results from the Matchup Dashboard</p>

                <div class="flex mb-4 flex-column lg:flex-row">
                    <div class="surface-50 p-3 flex-auto mx-0 my-3 lg:my-0 lg:mx-3">
                        <div class="text-600 mb-3">Total Volume</div>
                        <span class="text-blue-600 font-medium text-xl">{{ totalVolume }} lbs</span>
                    </div>
                    <div class="surface-50 p-3 flex-auto">
                        <div class="text-600 mb-3">Duration</div>
                        <span class="text-blue-600 font-medium text-xl">{{ totalWorkoutDuration }}</span>
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
                <Button v-if="this.$route.params.workoutID === freestyle" class=" p-button-outlined w-full mt-4"
                    icon="pi pi-bookmark-fill" label="Save as Preset Workout"
                    @click="visible2 = false, visible5 = true"></Button>

                <Button v-if="!this.$route.query.matchup" class="w-full mt-4" icon="pi pi-check" label="Save Workout"
                    @click="saveCompletedWorkout(), visible2 = false"></Button>

                <Button v-else class="w-full mt-4" icon="pi pi-check" label="Complete Matchup Workout"
                    @click="updateMatchupWorkout(), visible2 = false"></Button>

                <Button v-if="!this.$route.query.matchup" class=" w-full mt-4" icon="pi pi-send"
                    label="Save & Share Results"
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
        <Dialog v-model:visible="visible5" appendTo="body" :modal="true">
            <div class="p-2">
                <div class="text-900 font-medium mb-3 text-xl">Save as a Preset Workout</div>
                <p class="mt-0 mb-4 p-0 line-height-3">Save this Freestyle Workout to your Dashboard so it can be used
                    again. </p>
                <div class="field mb-4 col-12 pl-0 pr-0">
                    <label for="freestyle-workout-title" class="font-medium text-900">Enter Workout Title</label>
                    <InputText id="freestyle-workout-title" type="text" v-model="freestyleWorkoutTitle" />
                </div>
                <Button label="Save Preset Workout" @click="visible5 = false, saveFreestyleWorkoutasPreset()"></Button>
            </div>
        </Dialog>
        <Dialog v-model:visible="showContinueWorkoutPrompt" appendTo="body" :modal="true">
            <div clas="p-2">
            <div class="text-900 font-medium mb-3 text-xl">Continue Workout</div>
            <p class="mt-0 mb-4 p-0 line-height-3">You had a workout in progress. Continue where you left off?</p>
            <Button label="Yes" @click="continueSavedWorkout(), startTimer(), visible1 = false"></Button>
            <Button class=" ml-2" label="No" @click="showContinueWorkoutPrompt = false"></Button>
            </div>
        </Dialog>
    </div>
</template>

<script>
import API from '../api'
import dayjs from 'dayjs'
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
            visible5: false,
            showContinueWorkoutPrompt: false,
            activeWorkout: {},
            workoutTitle: '',
            freestyleWorkoutTitle: '',
            workoutID: this.$route.params.workoutID,
            exercises: [],
            completedExercises: [],
            completedWorkoutID: '',
            externalities: [],
            totalVolume: 0,
            totalSets: 0,
            storedWorkoutDuration: '',
            totalWorkoutDuration: '',

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
            console.log(this.exercises)
        },

        stopTimer() {
            this.endTime = Date.now();
            this.elapsedTime = this.endTime - this.startTime;
        },

        padZero(num) {
            return num.toString().padStart(2, '0');
        },

        timeStringToMillis(timeString) {
            const [hours, minutes, seconds] = timeString.split(':').map(Number);
            return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
        },

        calculateTotalDuration(formattedElapsedTime, storedDuration) {
            if (!storedDuration) {
                this.totalWorkoutDuration = formattedElapsedTime;
                return formattedElapsedTime;
            }

            const elapsedTimeMillis = this.timeStringToMillis(formattedElapsedTime);
            const storedDurationMillis = storedDuration ? this.timeStringToMillis(storedDuration) : 0;
            const totalDurationMillis = elapsedTimeMillis + storedDurationMillis;

            console.log("Elapsed Time in Millis: ", elapsedTimeMillis);
            console.log("Stored Duration in Millis: ", storedDurationMillis);
            console.log("Total Duration in Millis: ", totalDurationMillis);

            const totalHours = Math.floor(totalDurationMillis / (1000 * 60 * 60));
            const totalMinutes = Math.floor((totalDurationMillis / (1000 * 60)) % 60);
            const totalSeconds = Math.floor((totalDurationMillis / 1000) % 60);

            this.totalWorkoutDuration = `${this.padZero(totalHours)}:${this.padZero(totalMinutes)}:${this.padZero(totalSeconds)}`;
            console.log("Total Workout Duration: ", this.totalWorkoutDuration);
            return this.totalWorkoutDuration;

        },

        showSuccess() {
            this.$toast.add({ severity: 'success', summary: 'Workout Complete', detail: 'You Can Review your Completed Workouts in your Dashboard.', life: 5000 });
        },

        showWorkoutStart() {
            this.$toast.add({ severity: 'success', summary: 'Workout Started', detail: 'Workout Duration will be tracked.', life: 5000 });
        },

        showFreestyleWorkoutSaved() {
            this.$toast.add({ severity: 'success', summary: 'Freestyle Workout Saved', detail: 'Freestyle Workout successfully saved to your Dashboard', life: 5000 });

        },

        continueSavedWorkout() {
            this.showContinueWorkoutPrompt = false;
            // Now call the function to load data from local storage
            this.continueWorkoutFromLocalStorage(this.$route.params.workoutID);
        },

        clearWorkoutSessionData() {
            localStorage.removeItem('completedExercises');
            localStorage.removeItem('workoutDuration');
            localStorage.removeItem('workoutID');

            console.log("Workout session data cleared from local storage.");
        },


        completeWorkout() {
            console.log("Complete Workout Method Called");
            this.visible2 = true;
            this.calculateTotalVolume();
            this.stopTimer();
            this.calculateTotalDuration(this.formattedElapsedTime, this.storedWorkoutDuration);
        },

        handleCompletedExercise(exercise) {
            this.completedExercises.push(exercise)

            const currentTime = Date.now();
            const currentElapsedTime = currentTime - this.startTime;

            // Format the current elapsed time
            const hours = Math.floor(currentElapsedTime / (1000 * 60 * 60));
            const minutes = Math.floor((currentElapsedTime / (1000 * 60)) % 60);
            const seconds = Math.floor((currentElapsedTime / 1000) % 60);
            const formattedCurrentElapsedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;

            localStorage.setItem('workoutID', this.$route.params.workoutID)
            localStorage.setItem('completedExercises', JSON.stringify(this.completedExercises));
            localStorage.setItem('workoutDuration', formattedCurrentElapsedTime);


            console.log("completed exercises array: " + this.completedExercises)
        },

        handleAddExercise({ draftExercise }) {
            console.log(this.exercises)
            console.log(draftExercise)
            this.exercises.push(draftExercise)
            this.visible3 = false
        },
        async handleExerciseSwap({ originalExercise, selectedSwapExercise }) {
            console.log("Received data: " + '' + originalExercise + ' ' + selectedSwapExercise);

            try {
                // Make the API call to retrieve the exercise data based on selectedSwapExercise
                const swapExerciseObject = await API.getExerciseByExerciseID(selectedSwapExercise);

                if (swapExerciseObject) {
                    // Find the index of the original exercise in the 'exercises' array
                    const originalIndex = this.exercises.findIndex(exercise => exercise.id === originalExercise);

                    if (originalIndex !== -1) {
                        // Create a new exercise object with the updated properties
                        const updatedExercise = {
                            ...this.exercises[originalIndex], // Copy existing properties
                            id: swapExerciseObject[0]._id,
                            exerciseName: swapExerciseObject[0].exerciseName,
                            primaryMuscleGroup: swapExerciseObject[0].primaryMuscleGroup,
                            secondaryMuscleGroups: swapExerciseObject[0].secondaryMuscleGroups,
                            // You can add more updated properties here
                        };

                        // Replace the exercise at originalIndex with the new exercise
                        this.exercises.splice(originalIndex, 1, updatedExercise);
                    }
                }
            } catch (error) {
                console.error("Error while fetching exercise data: " + error);
            }
            console.log(this.exercises)
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
                workoutDuration: this.calculateTotalDuration(this.formattedElapsedTime, this.storedWorkoutDuration),
                totalVolume: this.totalVolume,
                users: finalUsers,
                exercises: this.completedExercises,
                externalities: this.externalities
            }

            if (this.$route.query.userSchedule === "true") {
                console.log("user Schedule update logic hit");
                await API.updateUserScheduleAsComplete(this.$store.state.user.uid, this.$route.params.workoutID)
            }

            this.clearWorkoutSessionData()


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

        async saveFreestyleWorkoutasPreset() {
            let workoutTitle = this.freestyleWorkoutTitle
            let users = []
            users.push(this.$store.state.user.uid)

            let finalFreestyleWorkout = {
                workoutTitle: workoutTitle,
                users: users,
                exercises: this.exercises
            }

            await API.addWorkout(finalFreestyleWorkout);
            this.showFreestyleWorkoutSaved()
        },

        async updateMatchupWorkout() {
            let completionDate = dayjs().format();
            let workoutDuration = this.formattedElapsedTime;

            // Fetch the current matchupWorkout data
            let matchupWorkout = await API.getMatchupWorkoutByMatchupWorkoutID(this.$route.query.matchupWorkoutID);

            // Find the userWorkout that matches the current user
            const userWorkout = matchupWorkout[0].userWorkoutData.find(workout => workout.userID === this.$store.state.user.uid);

            if (userWorkout) {
                // Merge completedExercises with the existing exercises in the userWorkout
                const updatedExercises = userWorkout.exercises.map(exercise => {
                    const completedExercise = this.completedExercises.find(ce => ce.id === exercise.id);
                    return completedExercise || exercise;
                });

                // Update the exercises in the userWorkout with the merged data
                userWorkout.exercises = updatedExercises;

                // Include this updated userWorkout in the API call
                await API.updateMatchupWorkout(
                    this.$route.query.matchupWorkoutID,
                    this.$store.state.user.uid,
                    this.totalVolume,
                    completionDate,
                    workoutDuration,
                    userWorkout.exercises
                );

                await this.completeMatchupWorkout();

                await this.$router.push({
                    name: "matchup-workouts",
                    link: "/matchupWorkouts",
                });
            } else {
                console.log("No workout data found for the current user.");
            }
        },

        async completeMatchupWorkout() {
            let matchupWorkout = await API.getMatchupWorkoutByMatchupWorkoutID(this.$route.query.matchupWorkoutID);
            console.log("Original matchupWorkout:", matchupWorkout);

            // Iterate through each object in the userWorkoutData array
            for (let workout of matchupWorkout[0].userWorkoutData) {
                // Check if the completionDate is not populated
                if (!workout.completionDate || workout.completionDate.trim() === "") {
                    console.log("One or more workouts lack a completion date. Exiting function.");
                    return; // Exit the function early
                }
            }
            console.log("All workouts have a completion date. Executing additional logic.");

            // Additional logic to update exercises array for the matching user
            const currentUserUID = this.$store.state.user.uid;
            let userWorkout = matchupWorkout[0].userWorkoutData.find(workout => workout.userID === currentUserUID);

            if (userWorkout) {
                // Update only the exercises that are present in the completedExercises array
                userWorkout.exercises.forEach((exercise, index, exercises) => {
                    let completedExercise = this.completedExercises.find(ce => ce.id === exercise.id);
                    if (completedExercise) {
                        exercises[index] = completedExercise;
                    }
                    // If no matching exercise is found in completedExercises, the original exercise remains unchanged
                });
                console.log("Exercises updated for the current user.");
            } else {
                console.log("No workout data found for the current user.");
            }

            // Log the final state of the matchupWorkout object
            console.log("Final matchupWorkout:", matchupWorkout);

            try {
                const saveResponse = await API.createCompletedMatchupWorkout(matchupWorkout);
                console.log("Matchup Workout saved successfully:", saveResponse);
            } catch (error) {
                console.error("Error saving the matchup workout:", error);
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

        continueWorkoutFromLocalStorage(routeWorkoutID) {
            // Retrieve workoutID from local storage
            const storedWorkoutID = localStorage.getItem('workoutID');

            // Check if the stored workoutID matches the route parameter workoutID
            if (storedWorkoutID === routeWorkoutID) {
                // Retrieve and assign completedExercises from local storage
                const storedExercises = localStorage.getItem('completedExercises');
                if (storedExercises) {
                    this.completedExercises = JSON.parse(storedExercises);
                    this.updateExercisesWithCompletedData(this.completedExercises)

                }
                // Retrieve and assign workoutDuration from local storage
                const storedDuration = localStorage.getItem('workoutDuration');
                if (storedDuration) {
                    this.storedWorkoutDuration = storedDuration;
                }

                console.log("Continuing workout from saved session.");
            } else {
                console.log("No matching workout session found in local storage.");
            }
        },
        updateExercisesWithCompletedData(completedExercises) {
            this.exercises.forEach(exercise => {
                const completedExercise = completedExercises.find(e => e.id === exercise.id);

                if (completedExercise) {
                    exercise.sets = completedExercise.sets; // Make sure the structure matches
                    console.log("Updated Exercise:", exercise);
                }
            });
        }


    },
    mounted() {
        const storedWorkoutID = localStorage.getItem('workoutID');
        if (this.$route.params.workoutID) {
            this.getActiveWorkout(this.$route.params.workoutID)

        }

        if (this.$route.params.workoutID && this.$route.params.workoutID === storedWorkoutID) {
            this.showContinueWorkoutPrompt = true
        }
    }
}

</script>
