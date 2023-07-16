<template>
    <div class="timer">
        <div class="input-container">
            <p class="output-value"> {{ minutes }}:</p>
            <p class="output-value">{{ seconds }}</p>
        </div>
        <div class="countdown-container">
            <div class="countdown">{{ formattedTime }}</div>
        </div>
        <button class="set-button" @click="startTimer">Start</button>
    </div>
</template>
  
<script>
export default {
    props: {
        minutes: Number,
        seconds: Number
    },

    data() {
        return {
            timer: null,
            timeRemaining: 0,
        };
    },
    computed: {
        formattedTime() {
            const mins = Math.floor(this.timeRemaining / 60);
            const secs = this.timeRemaining % 60;
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        },
    },
    methods: {
        startTimer() {
            this.timeRemaining = this.minutes * 60 + this.seconds;
            this.timer = setInterval(this.updateTimer, 1000);
        },
        updateTimer() {
            if (this.timeRemaining > 0) {
                this.timeRemaining--;
            } else {
                clearInterval(this.timer);
            }
        },
    },
};
</script>
  
<style scoped>
.timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.input-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

p {
    margin-right: 10px;
}

.countdown {
    font-weight: 600;
    font-size: 40px;
    color: #1849A9;
    margin: .5rem;
    align-self: center;
}

.set-button {
    box-sizing: border-box;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    gap: 8px;
    width: 50%;
    height: 2.6em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: white;
    background: var(--primary-color);
    border: 1px solid var(--primary-color);
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
}


.output-value {
    font-size: 40px;
    font-weight: 600;
    color: #1849A9;
    margin: .5rem;
    align-self: center;
}
</style>