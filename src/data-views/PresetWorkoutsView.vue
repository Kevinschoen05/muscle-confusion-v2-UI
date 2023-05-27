<template>
    <h1>Preset Workout Historical Results</h1>
    <Dropdown class="field col-12" v-model="selectedWorkout" :options="presetWorkouts" optionLabel="workoutTitle"
        placeholder="Select Preset Workout" @change="this.getPresetWorkoutData(selectedWorkout._id)" />
    <div v-if='selectedWorkout'>
        <div class="grid">
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-info-circle text-xl text-white"></i>
                    </span>
                    <div class="text-2xl font-medium text-white mb-2">{{ totalCompletedPresetWorkouts }}</div>
                    <span class="text-blue-100 font-medium">Times Completed</span>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-info-circle text-xl text-white"></i>
                    </span>
                    <div class="text-2xl font-medium text-white mb-2">{{ lastCompletionDate }}</div>
                    <span class="text-blue-100 font-medium">Last Completion Date</span>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-info-circle text-xl text-white"></i>
                    </span>
                    <div class="text-2xl font-medium text-white mb-2">{{ averageVolume }} lbs</div>
                    <span class="text-blue-100 font-medium">Average Total Volume</span>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-3 p-3">
                <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                    <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                        style="width:49px; height: 49px">
                        <i class="pi pi-info-circle text-xl text-white"></i>
                    </span>
                    <div class="text-2xl font-medium text-white mb-2">{{ prVolume }} lbs</div>
                    <span class="text-blue-100 font-medium">Personal Best Volume</span>
                </div>
            </div>
        </div>
        <div class='surface-card shadow-2'>
            <PresetWorkoutVolumeChart :presetWorkoutData="presetWorkoutData"></PresetWorkoutVolumeChart>
        </div>
        <div class="grid">
            <div class="col-12 md:col-6 lg:col-6 pt-6">
                <div class='surface-card shadow-2  h-30rem'>
                    <PresetWorkoutMuscleGroupChart :presetWorkoutData="presetWorkoutData"> </PresetWorkoutMuscleGroupChart>
                </div>
            </div>
            <div class="col-12 md:col-6 lg:col-6 pt-6">
                <div class='surface-card shadow-2 h-30rem'>

                </div>
            </div>

        </div>
    </div>
</template>

<script>

import API from '../api'
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"

import PresetWorkoutVolumeChart from '../components/charts/PresetWorkoutVolumeChart.vue'
import PresetWorkoutMuscleGroupChart from '../components/charts/PresetWorkoutMuscleGroupChart.vue'

dayjs.extend(localizedFormat)
export default {
    components: {
        PresetWorkoutVolumeChart,
        PresetWorkoutMuscleGroupChart
    },
    data() {
        return {
            //initial data 
            selectedWorkout: '',
            presetWorkouts: [],
            presetWorkoutData: [],

            //preset workout high level metrics
            totalCompletedPresetWorkouts: 0,
            lastCompletionDate: '',
            averageVolume: 0,
            prVolume: 0,

            //chart data
            chartData: null,
            chartOptions: null,
            datasetLabels: [],
            datasetTitle: 'Total Volume',
            dataset: []
        }
    },
    methods: {
        setChartData() {
            const documentStyle = getComputedStyle(document.documentElement);

            const totalVolumes = [];
            const completionDates = [];

            this.presetWorkoutData.forEach((object) => {
                if ('totalVolume' in object) {
                    totalVolumes.push(object.totalVolume);
                }
                if ('completionDate' in object) {
                    completionDates.push(object.completionDate);
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
        },

        getPresetWorkoutCumulativeMetrics() {
            this.totalCompletedPresetWorkouts = this.presetWorkoutData.length
            this.lastCompletionDate = dayjs(this.presetWorkoutData[0].completionDate).format('LLL')
            this.calcAverageTotalVolume();
            this.calcPrVolume();

        },

        calcAverageTotalVolume() {
            let sum = 0;
            for (let i = 0; i < this.presetWorkoutData.length; i++) {
                sum += this.presetWorkoutData[i].totalVolume;
            }
            const average = sum / this.presetWorkoutData.length;
            this.averageVolume = Number(average.toFixed(2)).toLocaleString()

            console.log(this.averageVolume)
        },


        calcPrVolume() {
            let highestVolume = 0;

            this.presetWorkoutData.forEach((object) => {
                if (object.totalVolume > highestVolume) {
                    highestVolume = object.totalVolume;
                }
            });

            this.prVolume = highestVolume.toLocaleString();
        },

        //API Calls
        async getUserPresetWorkouts() {
            this.presetWorkouts = await API.getWorkoutsByUserID(this.$store.state.user.uid)
        },

        async getPresetWorkoutData(workoutID) {
            console.log(workoutID)
            this.presetWorkoutData = await API.getCompletedWorkoutsByWorkoutID(workoutID)
            console.log(this.presetWorkoutData)
            this.getPresetWorkoutCumulativeMetrics()
        }
    },
    mounted() {
        this.getUserPresetWorkouts()
    }
}
</script>