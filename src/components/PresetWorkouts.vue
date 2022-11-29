<template>
    <div class="container">
        <h1>{{WorkoutTitle}}</h1>
    </div>
</template>
  
<script>
export default { 
    props: {WorkoutTitle: String }
}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 12px 24px;
    gap: 12px;
    width: 100%;
    border-bottom: 1px solid #EAECF0;
    border-radius: 10px;
    }
</style>

  