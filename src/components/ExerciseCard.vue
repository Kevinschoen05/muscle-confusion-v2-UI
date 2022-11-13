<template>
    <div class="container">
        <div class="exercise-header">
            <p class="exercise-name">Barbell Bench Press</p>
            <muscle-badge title="Chest" primary></muscle-badge>
            <muscle-badge title="Triceps"></muscle-badge>
        </div>
        <div class="output">
            <p class="output-value">{{ sets.length }} Sets</p>
            <p class="output-value">{{ reps }} Reps</p>
        </div>
        <div class="set-table">
            <table class="set-list" v-for="set in sets" :key="set.index">
                <thead class="header">
                    <th class="header-item">Results</th>
                    <th class="header-item">Reps</th>
                    <th class="header-item">Weight</th>
                </thead>
                <tr class="set">
                    <td class="set-index">Target</td>
                    <td class="set-item">{{ set.target_reps }}</td>
                    <td class="set-item">{{ set.target_weight }}</td>
                </tr>
                <tr class="set">
                    <td class="set-index">Actual</td>
                    <td class="set-item">{{ set.actual_reps }}</td>
                    <td class="set-item">{{ set.actual_weight }}</td>
                </tr>
            </table>
        </div>

    </div>
</template>
  
<script>
import MuscleBadge from './MuscleBadge.vue'
export default {
    name: 'ExcerciseCard',

    components: {
        MuscleBadge
    },
    data() {
        return {
            sets: [{ index: 1, target_reps: 15, actual_reps: 0, target_weight: 225, actual_weight: 175 }, { index: 2, target_reps: 10, actual_reps: 0, target_weight: 135, actual_weight: 210 }],
            reps: 25,
            workout: "chest-tris",
            exercises: ['barbell bench press', 'cable fly', 'pushup']
        }
    },
    methods: {


    },
    mounted() {

    }

}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1.09375em;
    width: 37em;
    height: 45em;
    background: #FFFFFF;
    border: 1px solid #EAECF0;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    border-radius: 16px;
}

.exercise-header {
    display: flex;
    justify-content: left;
    padding-left: 2em;
    align-items: center;
}

.exercise-name {
    font-family: 'roboto';
    font-size: 20px;
    font-weight: bolder;
    color: #101828
}

.output {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;

}

.set-table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

}

.output-value {
    font-family: 'roboto';
    font-size: 48px;
    font-weight: 600;
    color: #1849A9;
    margin: 1em;
}

.set-list {
    width: 80%;
    margin-bottom: 2em;

}

.header {
    background-color: #EAECF0;
}

.header-item {
    font-family: 'roboto';
    font-weight: 600;
    color: #475467;
}

.set,
thead {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 16px 24px;
    gap: 12px;
    width: 100%;
    border-bottom: 1px solid #EAECF0;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    border-radius: 10px;
}

.set-index {
    font-family: 'roboto';
    font-weight: 400;
    color: #475467;
    border: none !important;
}
</style>

  