<template>
    <div class="timer ">
        <div class="input-container">
            <p class="output-value"> {{ minutes }}:</p>
            <p class="output-value">{{ seconds }}</p>
        </div>
        <div class="countdown-container">
            <div class="countdown">{{ formattedTime }}</div>
        </div>
        <div v-if="completed === false" class="w-full mt-2">
            <button class="set-button " @click="startTimer" :disabled="timerRunning">Start</button>
            <button class="secondary-set-button" @click="stopTimer" :disabled="!timerRunning">Stop</button>
        </div>

        <div v-else >
            <button v-if="update === false" class="set-button" @click="this.$emit('timer-complete', this.update = true);">Complete Set</button>

        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        minutes: String,
        seconds: String,
    },

    data() {
        return {
            timer: null,
            initialTime: 0,
            timeRemaining: 0,
            timerRunning: false,
            completed: false,
            update: false
        };
    },
    computed: {
        formattedTime() {
            const mins = Math.floor(this.timeRemaining / 60);
            const secs = this.timeRemaining % 60;
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        },
        numericMinutes() {
            return this.convertToNumber(this.minutes);
        },
        numericSeconds() {
            return this.convertToNumber(this.seconds);
        },
    },
    methods: {

        convertToNumber(str) {
            // Remove leading zeros (if any) and parse the string to a number
            return parseInt(str, 10);
        },
        startTimer() {
            if (this.timerRunning) return; // Prevent starting multiple timers
            if (this.timeRemaining === 0) {
                this.timeRemaining = this.numericMinutes * 60 + this.numericSeconds;
                this.initialTime = this.timeRemaining; // Store the initial timer value
            }
            this.timerRunning = true;
            this.timer = setInterval(this.updateTimer, 1000);
            console.log(this.timerRunning)
        },
        stopTimer() {
            clearInterval(this.timer);
            this.timerRunning = false;
            console.log(this.timerRunning)
        },
        updateTimer() {
            if (this.timeRemaining > 0) {
                this.timeRemaining--;
            } else {
                this.stopTimer();
                this.completed = true

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
    width: 100%;
    height: 2.6em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: white;
    background: var(--primary-color);
    border: 1px solid var(--primary-color);
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
}

.secondary-set-button {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 20px;
    margin-top: 1em;
    margin-bottom: 1em;
    gap: 8px;
    width: 100%;
    height: 2.6em;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: var(--primary-color);
    background: white;
    border: 1px solid var(--primary-color);
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
}



.output-value {
    font-size: 40px;
    font-weight: 600;
    color: #1849A9;

    align-self: center;
}
</style>