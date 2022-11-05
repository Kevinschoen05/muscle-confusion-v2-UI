<template>
    <div>
        <ul id="timeline">
            <li v-for="day in days" :key="day.name" :class="day.active">{{ day.id }}</li>
        </ul>
    </div>
</template>
  
<script>

export default {
    name: 'WorkoutTimeline', 
    data() {
        return {
            days: [{ name: 'Sunday', id: 'S', active: false }, { name: 'Monday', id: 'M', active: false }, { name: 'Tuesday', id: 'T', active: false }, { name: 'Wednesday', id: 'W', active: false }, { name: 'Thursday', id: 'T', active: false }, { name: 'Friday', id: 'F', active: false }, { name: 'Saturday', id: 'S', active: false }],
            workoutFrequency: ['Monday', 'Thursday', 'Saturday'],

        }
    },
    methods: {
        getActiveDays(workoutDays, days) {
            for (let i = 0; i < workoutDays.length; i++) {
                for (let k = 0; k < days.length; k++) {
                    if (workoutDays[i] === days[k].name) {
                        days[k].active = "active";
                    }
                }
            }
        },

    },
    mounted() {
        this.getActiveDays(this.workoutFrequency, this.days)
    }

}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
    width: 2em;
    height: 2em;
    text-align: center;
    font-family: 'Roboto';
    line-height: 2em;
    border-radius: 1em;
    background: #B2DDFF;
    margin: 0 5vw 0 5vw;
    display: inline-block;
    color: white;
    position: relative;
}

li::before {
    content: '';
    position: absolute;
    top: .9em;
    left: -11vw;
    width: 11vw;
    height: .2em;
    background: #B2DDFF;
    z-index: -1;
    animation: slidein 1s 2s 3 alternate backwards;

}


li:first-child::before {
    display: none;
}

.active {
    background: #1849A9;
}
</style>
  