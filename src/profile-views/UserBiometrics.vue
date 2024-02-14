<template>
    <Toast />
    <div class="surface-card shadow-2 border-round p-4">
        <div class="grid">
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-info-circle text-xl text-white"></i>
                    </span>
                    <div class="text-2xl font-medium text-white mb-2">{{ }}</div>
                    <span class="text-blue-100 font-medium">Age</span>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-info-circle text-xl text-white"></i>
                    </span>
                    <div class="text-2xl font-medium text-white mb-2">{{ }}</div>
                    <span class="text-blue-100 font-medium">Height</span>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-info-circle text-xl text-white"></i>
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
                    <div class="text-2xl font-medium text-white mb-2">{{ }} </div>
                    <span class="text-blue-100 font-medium">BMI</span>
                </div>
            </div>
        </div>
        <div class="flex flex-column gap-2">
            <label for="updateWeight">Update Current Weight: </label>
            <InputNumber v-model="updateWeight" inputId="updateWeight" :min="0" :minFractionDigits="0"
                :maxFractionDigits="2" showButtons></InputNumber>
            <Button @click="addNewUserWeight()">Update Weight</Button>
        </div>
        <UserWeightChart :weightsData="userWeights"></UserWeightChart>
    </div>
</template>
<script>
import API from '../api'
import UserWeightChart from '../components/charts/UserWeightChart.vue'

export default {
    components: {
        UserWeightChart
    },
    data() {
        return {
            userWeights: [],
            userCurrentWeight: 0,
            updateWeight: 0
        }
    },
    methods: {
        showSuccess() {
            this.$toast.add({ severity: 'success', summary: 'Current Weight Updated', detail: "Your Latest Weight Update has been saved.", life: 5000 });
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
        }
    },
    mounted() {
        this.getUserWeights()
    }
}

</script>