<template>
  <div>
    <body>
      <section id="hero">
        <div class="hero-content">
          <workout-summary></workout-summary>
        </div>
        <picture>
          <img aria-hidden="true" decoding="async" src="../assets/hero-background.jpeg">
        </picture>
      </section>
    </body>
  </div>
</template>

<script>
import WorkoutSummary from '../components/WorkoutSummary.vue';
export default {
  name: 'HomePage',

  data () {
    return { 
      
        }
  },
  components: {
    WorkoutSummary,
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.test {
  display: flex;
  justify-content: center;
}



@media only screen and (min-width: 0em) {
  #hero {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    z-index: 1;
    min-height: 30vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }

  #hero:before {
    content: '';
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    background: #000;
    opacity: .7;
    top: 0;
    left: 0;
    z-index: -1;
  }

  #hero picture {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -2;
  }

  #hero picture img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }

  #hero h1 {
    color: #fff;
    font-size: 2.13333333em;
    text-align: center;
    margin: 0 auto;
    position: relative;
    width: 96%;
    max-width: 7.8125em;
    margin-top: 1.09375em;
    margin-bottom: 0.46875em;
  }

  #hero p {
    color: #fff;
    text-align: center;
    max-width: 22.22222222em;
    margin: auto;
    margin-bottom: 1.66666667em;
    display: block;
    width: 96%;
  }

  .hero-content {
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: space-around;
    align-content: center;
    align-items: center;
  }
}

.primary-button {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    gap: 8px;
    width: 30%;
    height: 2.6em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: white;
    background: #1849A9;
    border: 1px solid #1849A9;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
}

/* Tablet */
@media only screen and (min-width: 48em) {
  #hero {
    font-size: 16px;
  }

  #hero h1 {
    font-size: 4em;
  }
}

/* Small Desktop */
@media only screen and (min-width: 64em) {
  #hero {
    min-height: 18.75em;
    height: auto;
    padding-top: 8.25em;
    -webkit-padding-after: 6.25em;
    padding-block-end: 6.25em;
    background-attachment: fixed;
    font-size: inherit;
  }
}
</style>
