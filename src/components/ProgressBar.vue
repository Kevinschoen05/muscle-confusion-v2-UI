<template>
    <div class="progress-container">
        <div id="progress-bar"></div>
    </div>
</template>
  
<script>

export default {
    name: 'ProgressBar', 
    props: {

    },
    data() {
        return {

        }
    },
    methods: {
        setProgress(sets){
            document.getElementById("progress-bar").style.width = (100/sets) + '%';
        }
    },
    mounted() {
        this.setProgress(this.sets)
    }

}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.progress-container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    border: 1px solid #EAECF0;
    height: 1em;
    margin-bottom: 1em;
    border-radius: 4px;
}
#progress-bar {
    width: 0%;
    height: 1em;
    margin-bottom: 1em;
    background-color: #1849A9;
    border-radius: 4px;

}

</style>
  