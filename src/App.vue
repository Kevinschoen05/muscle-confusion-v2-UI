<template>
  <home-page msg="Test Title"/>
</template>

<script>
import HomePage from './pages/Home.vue'

export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

<style>
@font-face {
  font-family: "Roboto";
  src: local("Roboto"),
   url(./fonts/roboto-v29-latin-900.woff2) format("truetype");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
