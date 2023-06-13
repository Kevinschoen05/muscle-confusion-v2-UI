<template>
    <Chart type="radar" :data="chartData" :options="chartOptions" class="h-full" />
</template>


<script>

import API from '../../api'
export default {
    props: {
        presetWorkoutData: Array,
    },

    watch: {
        // Watch for changes in the computed property
        presetWorkoutData: function () {
            this.getPresetWorkout()
            // Execute your desired function here whenever the prop value changes
            this.chartData = this.setChartData();
            this.chartOptions = this.setChartOptions();
        }
    },
    data() {
        return {
            presetWorkout: [],

            //chart data
            chartData: null,
            chartOptions: null,
            datasetLabels: [],
            datasetValues: [],
            datasetTitle: 'Exercises By Primary Muscle Group',
            dataset: [],

        }
    },
    methods: {
        buildMuscleGroupObject() {
            this.dataset = this.datasetLabels.map(function (label) {
                return {
                    primaryMuscleGroup: label,
                    count: 0
                };
            });

            for (let i = 0; i < this.presetWorkout[0].exercises.length; i++) {

                for (let k = 0; k < this.dataset.length; k++) {
                    if (this.presetWorkout[0].exercises[i].primaryMuscleGroup === this.dataset[k].primaryMuscleGroup) {
                        this.dataset[k].count++
                    }
                }

            }
            this.datasetValues = this.dataset.map(item => item.count)
            this.chartData = this.setChartData();
        },

        setChartData() {
            const documentStyle = getComputedStyle(document.documentElement);

            return {
                labels: this.datasetLabels,
                datasets: [
                    {
                        label: this.datasetTitle,
                        data: this.datasetValues,

                        fill: true,
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        tension: .05
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
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder
                        },
                    },

                }
            };
        },


        //API CALLS
        async getMuscleGroups() {
            this.datasetLabels = await API.getMuscleGroups()
        },

        async getPresetWorkout() {
            this.presetWorkout = await API.getWorkoutsByWorkoutID(this.presetWorkoutData[0].workoutID)
            this.buildMuscleGroupObject()
        }

    },
    mounted() {
        this.getMuscleGroups()
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();

    }
}


</script>
