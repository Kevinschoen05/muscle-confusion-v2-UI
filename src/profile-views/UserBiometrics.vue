<template>
    <Toast />
    <Dialog v-model:visible="visible2" appendTo="body" :modal="true">
        <div class="text-900 font-medium mb-3 text-xl">Update User Birthday</div>
        <Calendar v-model="userNewBirthday"></Calendar>
        <Button @click="addUserBirthday()" label="Save"></Button>
    </Dialog>
    <Dialog v-model:visible="visible3" appendTo="body" :modal="true">
        <div class="text-900 font-medium mb-3 text-xl">Update User Height </div>
        <div class="grid">
            <div class="md:col-6 mt-2">
                <div class="flex flex-column gap-2">
                    <label for="updateHeightFeet">Height Feet: </label>
                    <InputNumber v-model="updateHeightFeet" inputId="updateHeightFeet" :min="0" showButtons></InputNumber>
                </div>
            </div>
            <div class="md:col-6 mt-2">
                <div class="flex flex-column gap-2">
                    <label for="updateHeightInches">Height Inches: </label>
                    <InputNumber v-model="updateHeightInches" inputId="updateHeightInches" :min="0" :minFractionDigits="0"
                        :maxFractionDigits="2" showButtons></InputNumber>
                </div>
            </div>
        </div>
        <Button class="mt-3" @click="addUserHeight()" label="Save"></Button>
    </Dialog>
    <Dialog v-model:visible="visible4" appendTo="body" :modal="true">
        <div class="text-900 font-medium mb-3 text-xl">Update Current Weight </div>
        <div class="flex flex-column gap-2">
            <InputNumber v-model="updateWeight" inputId="updateWeight" :min="0" :minFractionDigits="0"
                :maxFractionDigits="2" showButtons></InputNumber>
            <Button class="w-5" label="Save" @click="addNewUserWeight()"></Button>
        </div>
    </Dialog>
    <Dialog v-model:visible="visible5" appendTo="body" :modal="true">
        <div class="text-900 font-medium mb-3 text-xl">Update Target Weight </div>
        <div class="flex flex-column gap-2">
                    <InputNumber v-model="updateTargetWeight" inputId="updateWeight" :min="0" :minFractionDigits="0"
                        :maxFractionDigits="2" showButtons></InputNumber>
                    <Button class="w-5" label="Save" @click="addNewUserTargetWeight()"></Button>
                </div>
    </Dialog>
    <div class="surface-card shadow-2 border-round p-4">
        <div class="grid">
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-plus text-xl text-white" @click="this.visible2 = true"></i>
                    </span>
                    <div class="text-2xl font-medium text-white mb-2">{{ userCurrentAge }}</div>
                    <span class="text-blue-100 font-medium">Age</span>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-plus text-xl text-white" @click="this.visible5 = true"></i>
                    </span>
                    <div class="text-2xl font-medium text-white mb-2">{{ userCurrentTargetWeight }}</div>
                    <span class="text-blue-100 font-medium">Target Weight</span>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-plus text-xl text-white" @click="this.visible4 = true"></i>
                    </span>
                    <div class="text-2xl font-medium text-white mb-2">{{ userCurrentWeight }} lbs </div>
                    <span class="text-blue-100 font-medium">Current Weight</span>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-info-circle text-xl text-white"></i>
                    </span>
                    <div class="text-2xl font-medium text-white mb-2">{{ userCurrentBMI }} </div>
                    <span class="text-blue-100 font-medium">BMI</span>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-plus text-xl text-white" @click="this.visible3 = true"></i>
                    </span>
                    <div class="text-2xl font-medium text-white mb-2">{{ userCurrentHeightFeet }}'
                        {{ userCurrentHeightInches }}" </div>
                    <span class="text-blue-100 font-medium">Height</span>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-info-circle text-xl text-white"></i>
                    </span>
                    <div class="text-2xl font-medium text-white mb-2">{{ }} </div>
                    <span class="text-blue-100 font-medium">Average Reported Sleep</span>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-info-circle text-xl text-white"></i>
                    </span>
                    <div class="text-2xl font-medium text-white mb-2">{{ }} </div>
                    <span class="text-blue-100 font-medium">Average Reported Stress</span>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-info-circle text-xl text-white"></i>
                    </span>
                    <div class="text-2xl font-medium text-white mb-2">{{ }} </div>
                    <span class="text-blue-100 font-medium">Average Reported Nutrition</span>
                </div>
            </div>
        </div>
        <UserWeightChart :weightsData="userWeights" :targetWeightsData="userTargetWeights"></UserWeightChart>
    </div>
</template>
<script>
import API from '../api'
import UserWeightChart from '../components/charts/UserWeightChart.vue'
import dayjs from 'dayjs'


export default {
    components: {
        UserWeightChart, 
        
    },
    data() {
        return {
            userWeights: [],
            userTargetWeights: [],
            userCurrentTargetWeight: 0,
            userCurrentWeight: 0,
            userCurrentHeightFeet: 0,
            userCurrentHeightInches: 0,
            updateWeight: 0,
            updateTargetWeight: 0,
            updateHeightFeet: 0,
            updateHeightInches: 0,
            userCurrentAge: 0,
            userCurrentBirthday: '',
            userNewBirthday: '',
            userCurrentBMI: 0,
            visible2: false,
            visible3: false,
            visible4: false,
            visible5: false
        }
    },
    methods: {
        showSuccess() {
            this.$toast.add({ severity: 'success', summary: 'Current Weight Updated', detail: "Your Latest Weight Update has been saved.", life: 5000 });
        },

        test() {
            console.log(this.newBirthday)
        },

        async addNewUserWeight() {
            try {
                const weight = this.updateWeight;
                const userID = this.$store.state.user.uid;

                const response = await API.addUserWeight(userID, weight);

                console.log('Weight added successfully', response);
                this.showSuccess()
                this.updateWeight = 0;

            } catch (error) {
                console.error('Error adding new user weight:', error);
            }
            this.calculateUserBMI(this.userCurrentWeight, this.userCurrentHeightFeet, this.userCurrentHeightInches)
            this.visible4 = false
        },

        async addNewUserTargetWeight() {
            try {
                const weight = this.updateTargetWeight;
                const userID = this.$store.state.user.uid;

                const response = await API.addUserTargetWeight(userID, weight);

                console.log('Weight added successfully', response);
                this.showSuccess()
                this.updateTargetWeight = 0;

            } catch (error) {
                console.error('Error adding new user weight:', error);
            }
        },

        async addUserBirthday() {
            try {
                const birthday = this.userNewBirthday;
                const userID = this.$store.state.user.uid;

                const response = await API.addUserBirthday(userID, birthday)
                console.log('Birthday added successfully', response);
            }
            catch (error) {
                console.error('Error adding new user birthday:', error);
            }

            this.calculateUserAge()
            this.visible2 = false
        },

        async addUserHeight() {
            const heightFeet = this.updateHeightFeet;
            const heightInches = this.updateHeightInches;
            const userID = this.$store.state.user.uid;

            try {
                const response = await API.addUserHeight(userID, heightFeet, heightInches);
                console.log("Height added successfully:", response);
                // You can now handle the successful response, maybe update your UI accordingly
            } catch (error) {
                console.error("Failed to add height:", error);
                // Handle any errors here, such as displaying a message to the user
            }
            this.visible3 = false
            this.calculateUserBMI(this.userCurrentWeight, this.userCurrentHeightFeet, this.userCurrentHeightInches)

        },

        async getUserWeights() {
            this.userWeights = await API.getUserWeights(this.$store.state.user.uid)
            console.log(this.userWeights)

            if (this.userWeights && this.userWeights.length > 0) {
                this.userCurrentWeight = this.userWeights[this.userWeights.length - 1].weight;
            } else {
                // Handle the case where there are no weights (optional)
                console.log('No weight records found.');
                this.userCurrentWeight = 0; // Or set a default value
            }
        },

        async getUserTargetWeights() {
            this.userTargetWeights = await API.getUserTargetWeights(this.$store.state.user.uid)
            console.log(this.userTargetWeights)

            if (this.userTargetWeights && this.userTargetWeights.length > 0) {
                this.userCurrentTargetWeight = this.userTargetWeights[this.userTargetWeights.length - 1].weight;
            } else {
                // Handle the case where there are no weights (optional)
                console.log('No weight records found.');
                this.userCurrentTargetWeight = 0; // Or set a default value
            }
        },

        async getUserHeight() {
            const response = await API.getUserHeight(this.$store.state.user.uid)
            this.userCurrentHeightFeet = response[0].heightFeet
            this.userCurrentHeightInches = response[0].heightInches
            console.log("User Height Feet: " + this.userCurrentHeightFeet)
            this.calculateUserBMI(this.userCurrentWeight, this.userCurrentHeightFeet, this.userCurrentHeightInches)

        },

        async calculateUserAge() {
            try {
                const response = await API.getUserBirthday(this.$store.state.user.uid)

                if (!response || !response.birthday) {
                    console.log("No birthday information available. Defaulting age to 0.");
                    this.userCurrentAge = 0;
                    return; // Exit the function early
                }

                this.userCurrentBirthday = response.birthday;

                console.log(this.userCurrentBirthday)
            }
            catch (error) {
                console.error("Failed to calculate user's birthday:", error);
                this.userCurrentAge = 0; // De
            }

            const birthdayDate = dayjs(this.userCurrentBirthday);
            const currentDate = dayjs();
            const age = currentDate.diff(birthdayDate, 'year');
            this.userCurrentAge = age
        },

        calculateUserBMI(userCurrentWeight, userCurrentHeightFeet, userCurrentHeightInches) {
            console.log(userCurrentWeight, userCurrentHeightFeet, userCurrentHeightInches)
            // Convert height to inches (totalHeightInches) by converting feet to inches and adding the remaining inches
            const totalHeightInches = userCurrentHeightFeet * 12 + userCurrentHeightInches;

            // Convert height from inches to meters (1 inch = 0.0254 meters)
            const heightInMeters = totalHeightInches * 0.0254;

            // Convert weight from pounds to kilograms (1 pound = 0.453592 kilograms)
            const weightInKilograms = userCurrentWeight * 0.453592;

            // Calculate BMI
            const bmi = weightInKilograms / (heightInMeters * heightInMeters);
            console.log(bmi)

            this.userCurrentBMI = bmi.toFixed(2);
        }

    },
    mounted() {
        this.getUserWeights()
        this.getUserTargetWeights()
        this.getUserHeight()
        this.calculateUserAge()

    }
}

</script>