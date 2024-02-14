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
        weightsData: Array // Assuming this prop will receive the array of weights
    },

    watch: {
        // React to changes in weightsData
        weightsData: function () {
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
            const documentStyle = getComputedStyle(document.documentElement);

            // Map weights data to chart format
            const labels = this.weightsData.map(item =>
                dayjs(item.date.$date).format('MM/DD/YYYY')
            );
            const data = this.weightsData.map(item => item.weight);

            return {
                labels: labels,
                datasets: [
                    {
                        label: 'User Weight',
                        data: data,
                        fill: false,
                        borderColor: documentStyle.getPropertyValue('--blue-500'), // Assuming this is your desired border color
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