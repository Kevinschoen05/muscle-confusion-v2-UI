<template>
    <div class="container">
        <div class="exercise-header">
            <p class="exercise-name">Barbell Bench Press</p>
            <muscle-badge title="Chest" primary> </muscle-badge>
            <muscle-badge title="Triceps"></muscle-badge>
        </div>
        <div class="output">
            <p class="output-value">{{sets.length}} Sets</p>
            <p class="output-value">{{reps}} Reps</p>
        </div>
        <table class="set-list">
            <tr class="set" v-for="set in sets" :key="set.index">
                <td class="set-item">{{set.index}}.</td>
                <td class="set-item">{{set.reps}}</td>
                <td class="set-item">{{set.weight}}</td>
            </tr>
        </table>
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
            sets: [{index: 1, reps: 15, weight: 225}, {index: 2, reps: 15, weight: 135}],
            reps: 15,
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
    padding-left: 2em;
    margin-top: 1.09375em;
    width: 37em;
    height: 25em;
    background: #FFFFFF;
    border: 1px solid #EAECF0;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    border-radius: 16px;
}

.exercise-header{ 
    display: flex;
    justify-content: left;
    align-items: center;
}
.exercise-name {
    font-family: 'roboto';
    font-size: 18px;
    font-weight: medium;
    color: #101828
    
}

.output {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;

}

.output-value {
    font-family: 'roboto';
    font-size: 48px;
    font-weight: 600;
    color: #1849A9;
    margin: 1em;
}

.set-list {
    width: 90%;
}
.set{
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: center;
padding: 16px 24px;
gap: 12px;
width: 100%;
border-bottom: 1px solid #EAECF0;
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;

}
</style>

  