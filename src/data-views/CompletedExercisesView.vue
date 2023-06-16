<template>
    <h1>Individual Exercise Results</h1>
    <div class="grid">
        <div class="col-12 md:col-6 lg:col-6 pt-6">
            <Dropdown class="field col-12" v-model="selectedMuscleGroup" :options="muscleGroups"
                placeholder="Select Muscle Group"
                @change="this.muscleGroupSelected = true, this.getExercises(selectedMuscleGroup)" />
        </div>
        <div class="col-12 md:col-6 lg:col-6 pt-6">
            <Dropdown class="field col-12" v-model="selectedExercise" :options="muscleGroupExercises"
                optionLabel="exerciseName" placeholder="Select Exercise"
                @change="this.muscleGroupSelected = true, this.getCompletedExerciseData(this.userCompletedWorkoutsData, this.selectedExercise._id)" />
        </div>
    </div>
    <div v-if="selectedExercise" class="grid">
        <div class="col-12 md:col-6 lg:col-3 p-3">
            <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                    style="width:49px; height: 49px">
                    <i class="pi pi-info-circle text-xl text-white"></i>
                </span>
                <div class="text-2xl font-medium text-white mb-2">{{ totalCompletedExerciseCount }}</div>
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
                <div class="text-2xl font-medium text-white mb-2">{{ averageWeight }} lbs</div>
                <span class="text-blue-100 font-medium">Average Weight</span>
            </div>
        </div>
        <div class="col-12 md:col-6 lg:col-3 p-3">
            <div class="p-3 text-center bg-blue-500" style="border-radius: 12px">
                <span class="inline-flex justify-content-center align-items-center bg-blue-600 border-circle mb-3"
                    style="width:49px; height: 49px">
                    <i class="pi pi-info-circle text-xl text-white"></i>
                </span>
                <div class="text-2xl font-medium text-white mb-2">{{ exercisePR }} lbs</div>
                <span class="text-blue-100 font-medium">PR Weight</span>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../api'
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(localizedFormat)

export default {
    data() {
        return {
            userCompletedWorkoutsData: [],
            completedExerciseData: [],

            lastCompletionDate: '',
            totalCompletedExerciseCount: 0,
            averageWeight: 0,
            exercisePR: 0,

            muscleGroups: [],
            muscleGroupSelected: false,
            selectedMuscleGroup: '',
            selectedExercise: '',

            muscleGroupExercises: [],
        }
    },
    methods: {

        getCompletedExerciseCumulativeMetrics() {
            if (this.completedExerciseData.length > 0) {
                this.totalCompletedExerciseCount = this.completedExerciseData.length
                this.lastCompletionDate = dayjs(this.completedExerciseData[0].completionDate).format('LLL')

            }
            else {
                this.totalCompletedExerciseCount = 0;
                this.lastCompletionDate = 'N/A'
            }
            this.calcAverageWeightUsed();
            this.calcPRWeight()
        },

        calcAverageWeightUsed() {
            let sum = 0;
            let count = 0;

            this.completedExerciseData.forEach((exercise) => {
                exercise.sets.forEach((set) => {
                    sum += set.actual_weight;
                    count++;
                });
            });

            const average = count > 0 ? sum / count : 0;
            this.averageWeight = Number(average.toFixed(2)).toLocaleString()
        },

        calcPRWeight() {
            let pr = 0;

            this.completedExerciseData.forEach((exercise) => {
                exercise.sets.forEach((set) => {
                    if (set.actual_weight > pr) {
                        pr = set.actual_weight;
                    }
                });
            });

            this.exercisePR = pr;
        },

        getCompletedExerciseData(userCompletedWorkoutsData, exerciseID) {
            const completedExerciseData = [];

            userCompletedWorkoutsData.forEach((workout) => {
                workout.exercises.forEach((exercise) => {
                    if (exercise.id === exerciseID) {
                        const {
                            exerciseName,
                            primaryMuscleGroup,
                            secondaryMuscleGroups,
                            sets,
                            id
                        } = exercise;

                        const exerciseData = {
                            completionDate: workout.completionDate,
                            exerciseName,
                            id,
                            primaryMuscleGroup,
                            secondaryMuscleGroups,
                            sets: sets.map((set) => ({
                                index: set.index,
                                target_reps: set.target_reps,
                                actual_reps: set.actual_reps,
                                target_weight: set.target_weight,
                                actual_weight: set.actual_weight,
                                completed: set.completed,
                                success: set.success
                            }))
                        };

                        completedExerciseData.push(exerciseData);
                    }
                });
            });
            completedExerciseData.sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate));
            this.completedExerciseData = completedExerciseData;

            console.log(this.completedExerciseData)
            this.getCompletedExerciseCumulativeMetrics()
        },

        //API CALLS
        async getUserCompletedWorkouts() {
            this.userCompletedWorkoutsData = await API.getCompletedWorkoutsByUserID(this.$store.state.user.uid)
        },

        async getExercises(muscleGroup) {
            this.muscleGroupExercises = await API.getExercisesByMuscleGroup(muscleGroup)
            console.log(this.muscleGroupExercises)
        },


        async getMuscleGroups() {
            this.muscleGroups = await API.getMuscleGroups()
        },

    },
    mounted() {
        this.getMuscleGroups()
        this.getUserCompletedWorkouts()

    }
}


</script>
