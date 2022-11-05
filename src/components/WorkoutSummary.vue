<template>
    <div class="container">
        <h1>Today's Workout</h1>
        <h2>{{ workout }}</h2>
        <div class="divider"></div>
        <ul class="exercise-list">
            <li v-for="exercise in exercises" :key="exercise.item">
                <img aria-hidden="true" loading="lazy" decoding="async" src="../assets/check-circle.svg"
                    alt="check mark" width="20" height="20">
                <span>{{exercise}}</span>
            </li>
        </ul>
    </div>
</template>
  
<script>

export default {
    name: 'WorkoutSummary',
    data() {
        return {
            workout: "Chest and Triceps",
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
    height: 600px;
    width: 500px;
    box-sizing: border-box;


    /* Auto layout */

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 2em;
    margin-top: 1.09375em;
    width: 384px;
    height: 570px;

    /* Base/White */

    background: #FFFFFF;
    /* Gray/200 */

    border: 1px solid #EAECF0;
    /* Shadow/lg */

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

.divider{
width: 90%;
height: 1px;
background-color: #B2DDFF;
}
</style>
  