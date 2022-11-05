<template>
  <div>
    <header>
    </header>

    <body>
      <section id="hero">
        <workout-timeline></workout-timeline>
        <div class="hero-content">
          <div class="heroText">
            <h1 id="home-h">Lorem ipsum, dolor sit amet consectetur adipisicing elit </h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab ipsam quisquam in totam nemo minima. Quod
              ipsum quidem temporibus vero odit </p>
          </div>
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
import WorkoutTimeline from '../components/Timeline.vue'
import WorkoutSummary from '../components/WorkoutSummary.vue';
export default {
  name: 'HomePage',
  components: {
    WorkoutTimeline,
    WorkoutSummary
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  padding: 0;
  margin: 0;
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
    justify-content: space-around;
    align-content: center;
    align-items: center;
  }
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
