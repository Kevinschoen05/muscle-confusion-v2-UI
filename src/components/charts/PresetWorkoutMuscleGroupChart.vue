<template><Chart type="radar" :data="chartData" :options="chartOptions" class="h-full" /></template>


<script>

import API from '../../api'
export default {
    props: {
        presetWorkoutData: Array,
    },

    watch: {
        // Watch for changes in the computed property
        presetWorkoutData: function () {
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
            datasetLabels: [],
            datasetTitle: 'Exercises By Primary Muscle Group',
            dataset: []
        }
    },
    methods: {
        setChartData() {
            console.log('presetWorkoutData from component: ' + this.presetWorkoutData)
            const documentStyle = getComputedStyle(document.documentElement);

            this.dataset = this.datasetLabels.map(function (label) {
                return {
                    primaryMuscleGroup: label,
                    count: 0
                };
            });

            return {
                labels: this.datasetLabels,
                datasets: [
                    {
                        label: this.datasetTitle,
                        data: this.dataset,
                        fill: true,
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        tension: .001
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
                        }
                    }
                }
            };
        },


        //API CALLS
        async getMuscleGroups() {
            this.datasetLabels = await API.getMuscleGroups()
        }

    },
    mounted() {
        this.getMuscleGroups()
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();

    }
}


</script>
