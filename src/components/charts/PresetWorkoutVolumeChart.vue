<template><Chart type="line" :data="chartData" :options="chartOptions" /></template>

<script>
//import API from '../api'
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc"

dayjs.extend(timezone)
dayjs.extend(utc)


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
            datasetTitle: 'Total Volume (in lbs)',
            dataset: []
        }
    },
    methods: {
        setChartData() {
            console.log('presetWorkoutData from component: ' + this.presetWorkoutData)
            const documentStyle = getComputedStyle(document.documentElement);

            const totalVolumes = [];
            const completionDates = [];

            this.presetWorkoutData.forEach((object) => {
                if ('totalVolume' in object) {
                    totalVolumes.unshift(object.totalVolume);
                }
                if ('completionDate' in object) {
                    completionDates.unshift(dayjs.utc(object.completionDate).tz('America/New_York').format('MM/DD/YY'));
                }

            });
            this.dataset = totalVolumes
            this.datasetLabels = completionDates


            return {
                labels: this.datasetLabels,
                datasets: [
                    {
                        label: this.datasetTitle,
                        data: this.dataset,
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        tension: 0.4
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
        }

    },
    mounted() {
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
    }
}


</script>