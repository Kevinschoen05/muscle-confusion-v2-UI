<template>
    <Chart type="bar" :data="chartData" :options="chartOptions" />
</template>

<script>
//import API from '../api'

export default {
    props: {
        exerciseData: Array,
    },

    watch: {
        // Watch for changes in the computed property
        exerciseData: function () {
            // Execute your desired function here whenever the prop value changes
            this.chartData = this.setChartData();
            this.chartOptions = this.setChartOptions();
        }
    },
    data() {
        return {

            //chart data
            chartData: null,
            chartOptions: null,
            datasetTitle: 'Average Weight per Rep Count',

            repsValues: Array.from({ length: 20 }, (_, i) => i + 1),
            weightValues: Array(20).fill(null),

            // Initialize an array to store 'actual_weight' values for each rep value
            weightSum: Array(20).fill(0),
            weightCount: Array(20).fill(0),
        }
    },
    methods: {
        setChartData() {
            const documentStyle = getComputedStyle(document.documentElement);


            this.exerciseData.forEach((exercise) => {
                exercise.sets.forEach((set) => {
                    // Check if actual_reps matches the x-axis value (1-20)
                    if (set.actual_reps >= 1 && set.actual_reps <= 20) {
                        const index = set.actual_reps - 1; // Adjust index to match reps value
                        this.repsValues[index] = set.actual_reps; // Add reps value to array
                        this.weightSum[index] += set.actual_weight; // Add actual_weight to sum
                        this.weightCount[index]++; // Increment count for the rep value
                    }
                });
            });

            // Calculate the average 'actual_weight' for each rep value
            for (let i = 0; i < 20; i++) {
                if (this.weightCount[i] > 0) {
                    this.weightValues[i] = this.weightSum[i] / this.weightCount[i];
                    console.log(this.weightValues[i])
                } else {
                    this.weightValues[i] = null; // Set null for rep values with no data
                }
            }

            return {
                labels: this.repsValues,
                datasets: [
                    {
                        label: this.datasetTitle,
                        data: this.weightValues,
                        fill: true,
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        tension: 0.9
                    },
                ]
            };
        },
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            return {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Reps'
                        },
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Average Weight'
                        },
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            };
        }

    },
    mounted() {
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
    }
}


</script>