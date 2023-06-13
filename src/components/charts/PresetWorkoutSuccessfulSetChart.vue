<template>
    <div class="w-full h-3 flex justify-content-center">
        <h2>Successful Set Percentage</h2>
    </div>
    <div class="w-full h-3 flex justify-content-center align-content-center">
        <Knob v-model="successfulSetPercentage" :size=250 :value-color="getValueColor(successfulSetPercentage)" readonly>
        </Knob>
    </div>
</template>


<script>

//import API from '../../api'
export default {
    props: {
        presetWorkoutData: Array,
    },

    watch: {
        // Watch for changes in the computed property
        presetWorkoutData: function () {
            this.calculateSuccessPercentage(this.presetWorkoutData)
        }
    },
    data() {
        return {
            successfulSetPercentage: 0,
            totalSets: 0
        }
    },
    methods: {
        calculateSuccessPercentage(presetWorkoutData) {
            let totalSets = 0;
            let successfulSets = 0;

            for (let i = 0; i < presetWorkoutData.length; i++) {
                const workout = presetWorkoutData[i];

                for (let j = 0; j < workout.exercises.length; j++) {
                    const exercise = workout.exercises[j];

                    for (let k = 0; k < exercise.sets.length; k++) {
                        const set = exercise.sets[k];

                        totalSets++;
                        if (set.success === true) {
                            successfulSets++;
                        }
                    }
                }
            }

            if (totalSets === 0) {
                return 0; // To avoid division by zero error
            }

            const successPercentage = (successfulSets / totalSets) * 100;
            this.successfulSetPercentage = Math.round(successPercentage * 100) / 100;
        },
        getValueColor(value) {
            if (value <= 25) {
                return 'red'; // Change to the desired color for the range 0-25
            } else if (value <= 50) {
                return 'orange'; // Change to the desired color for the range 26-50
            } else if (value <= 75) {
                return 'yellow'; // Change to the desired color for the range 51-75
            } else {
                return 'green'; // Change to the desired color for the range 76 and above
            }
        }

    },
    mounted() {
        this.calculateSuccessPercentage(this.presetWorkoutData)
        console.log(this.presetWorkoutData)
    }
}


</script>
