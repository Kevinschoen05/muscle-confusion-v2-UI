<template>
    <div class="container">
        <h1>Today's Workout</h1>
        <h2>{{ workout }}</h2>
        <div class="divider"></div>
        <ul class="exercise-list">
            <li v-for="exercise in exercises" :key="exercise.item">
                <img aria-hidden="true" loading="lazy" decoding="async" src="../assets/check-circle.svg"
                    alt="check mark" width="20" height="20">
                <span>{{ exercise }}</span>
            </li>
        </ul>
        <div class="diagram-container">
            <img id="diagram" aria-hidden="true" loading="lazy" decoding="async" :src="getWorkoutImage(this.workout)"
                alt="">
        </div>
        <button class="primary-button">Start Preset Workout</button>
        <button class="secondary-button"  @click="$router.push('/workoutbuilder')">Create Custom Workout</button>
    </div>
</template>
  
<script>

export default {
    name: 'WorkoutSummary',
    data() {
        return {
            workout: "chest-tris",
            exercises: ['barbell bench press', 'cable fly', 'pushup']
        }
    },
    methods: {
        getWorkoutImage(workout){
             return require('../assets/workout-images/'+ workout  +'.png')
        }
        

    },
    mounted() {
        this.getWorkoutImage(this.workout)
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
    width: 25em;
    height: 37em;
    background: #FFFFFF;
    border: 1px solid #70707B;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    border-radius: 16px;
}

h1 {
    font-family: 'Roboto';
    font-size: 36px;
    font-weight: 600;
    color: #101828;
    margin-bottom: 10px;
}

h2 {
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 600;
    color: #101828;
}

ul {
    padding-left: 0em;
    margin-bottom: 1.25em;
}

ul li {
    list-style: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    padding-bottom: .5em;
}

ul li img {
    margin-right: 0.625em;
}

.divider {
    width: 90%;
    height: 1px;
    background-color: #B2DDFF;
}

.primary-button {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    gap: 8px;
    width: 90%;
    height: 2.6em;
    font-family: 'Roboto';
    color: white;
    background: #1849A9;
    border: 1px solid #1849A9;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.secondary-button {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    margin-top: 1em;
    margin-bottom: 1em;
    gap: 8px;
    width: 90%;
    height: 2.6em;
    font-family: 'Roboto';
    color: #1849A9;
    background: white;
    border: 1px solid #1849A9;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.diagram-container {
    display: flex;
    justify-content:center ;
    font-size: 20px;
    width: 100%;
    height: 100%;
}

#diagram { 
    height: 10em;
    width: 10em;
    padding-right: 2em;
}
</style>
  