<template>
  <div>
    <header>
      <navigation-bar></navigation-bar>
      <workout-timeline></workout-timeline>
      
    </header>
    <body>
      <section class="hero">
        <h1>{{ msg }}</h1> 
      </section>
    </body>
  </div>
</template>

<script>
import WorkoutTimeline from '../components/Timeline.vue'
import NavigationBar from '../components/Navigation.vue'
export default {
  name: 'HomePage',
  components: {
    WorkoutTimeline,
    NavigationBar
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


</style>
