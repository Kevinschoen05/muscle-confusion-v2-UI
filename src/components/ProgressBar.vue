<template>
    <div class="progress-container">
        <div id="progress-bar"></div>
    </div>
</template>
  
<script>


export default {
    name: 'ProgressBar', 
    props: {
        sets: Number,
        completed: Number
    },
    data() {
        return {

        }
    },
    methods: {
        setProgress(sets, completed){
            document.getElementById("progress-bar").style.width = (completed/sets) * 100 + '%';
        }
    },
    mounted() {
        this.setProgress(this.sets, this.completed)
    },
    updated() {
        this.setProgress(this.sets, this.completed)
    }

}

</script>
  
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
  