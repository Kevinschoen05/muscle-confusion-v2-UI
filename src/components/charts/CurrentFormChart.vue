<template>
    <Chart type="line" :data="chartData" :options="chartOptions" />
</template>
<script>
//import API from '../api'
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc"

dayjs.extend(timezone)
dayjs.extend(utc)

export default {
    props: {
        completedWorkoutData: Array
    },

    watch: {
        // Watch for changes in the computed property
        completedWorkoutData: function () {
            // Execute your desired function here whenever the prop value changes
            this.chartData = this.setChartData();
            this.chartOptions = this.setChartOptions();
        }
    },


    data() {
        return {
            chartData: null,
            chartOptions: null,
            datasetLabels: [],
            datasetTitle: 'Total Volume (in lbs)',
            xAxisLabels: [],
            dataset: []
        }
    },

    methods: {
        test() {
            // console.log(this.completedWorkoutData)
        },

        setChartData() {
            const documentStyle = getComputedStyle(document.documentElement);

            const totalVolumes = [];
            const workoutTitle = [];
            const completionDates = [];
            let count = 0;

            this.completedWorkoutData.forEach((object) => {
                if (count < 7) {
                    if ('totalVolume' in object) {
                        totalVolumes.unshift(object.totalVolume);
                    }
                    if ('workoutTitle' in object) {
                        workoutTitle.unshift(object.workoutTitle);
                    }
                    if ('completionDate' in object) {
                        completionDates.unshift(dayjs.utc(object.completionDate).tz('America/New_York').format('MM/DD/YY'));
                    }
                }
                count++
            });
            this.dataset = totalVolumes
            this.datasetLabels = workoutTitle
            this.xAxisLabels = completionDates

            return {
                labels: this.datasetLabels,
                datasets: [
                    {
                        label: this.datasetTitle,
                        data: this.dataset,
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        tension: 0.4,

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
                            color: textColor,
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                        },
                        grid: {
                            color: surfaceBorder
                        },

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
        this.test()
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
    }


}

</script>