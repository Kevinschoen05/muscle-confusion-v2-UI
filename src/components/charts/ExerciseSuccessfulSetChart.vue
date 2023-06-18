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
        exerciseData: Array,
    },

    watch: {
        // Watch for changes in the computed property
        exerciseData: function () {
            this.calculateSuccessPercentage(this.exerciseData)
        }
    },
    data() {
        return {
            successfulSetPercentage: 0,
            totalSets: 0
        }
    },
    methods: {
        calculateSuccessPercentage(exerciseData) {
  let totalSets = 0;
  let successfulSets = 0;

  exerciseData.forEach((exercise) => {
    exercise.sets.forEach((set) => {
      totalSets++;
      if (set.success) {
        successfulSets++;
      }
    });
  });

  const successPercentage = (successfulSets / totalSets) * 100;
  const roundedPercentage = Math.round(successPercentage * 100) / 100; // Rounding to 2 decimal places

  this.successfulSetPercentage = roundedPercentage;
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
        this.calculateSuccessPercentage(this.exerciseData)
        console.log(this.exerciseData)
    }
}


</script>
