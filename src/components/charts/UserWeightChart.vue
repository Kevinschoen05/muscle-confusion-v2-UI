<template>
    <Chart type="line" :data="chartData" :options="chartOptions" />
</template>
<script>
//import API from '../api'
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone)
dayjs.extend(utc)

export default {
    props: {
        weightsData: Array, // Assuming this prop will receive the array of weights
        targetWeightsData: Array
    },

    watch: {
        // React to changes in weightsData
        weightsData: function () {
            this.chartData = this.setChartData();
        },
        targetWeightsData: function () {
            this.chartData = this.setChartData();
        }
    },


    data() {
        return {
            chartData: null,
            chartOptions: null,
        }
    },

    methods: {
        test() {
            // console.log(this.completedWorkoutData)
        },

        setChartData() {
            // Prepare the weights data with x (date) and y (weight) coordinates
            const weightsDataset = this.weightsData.map(item => ({
                x: dayjs(item.date).format('MM/DD/YYYY'),
                y: item.weight
            }));

            // Prepare the target weights data similarly
            const targetWeightsDataset = this.targetWeightsData.map(item => ({
                x: dayjs(item.date).format('MM/DD/YYYY'),
                y: item.weight
            }));

            // Setting up the chart data using these datasets
            return {
                datasets: [
                    {
                        label: 'Weight',
                        data: weightsDataset,
                        borderColor: 'rgb(54, 162, 235)', // Example color for weights
                        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Adjust for your design
                        fill: false,
                        tension: 0.6
                    },
                    {
                        label: 'Target Weight',
                        data: targetWeightsDataset,
                        borderColor: 'rgb(255, 99, 132)', // Example color for target weights
                        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Adjust for your design
                        fill: false,
                        tension: 0
                    }
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