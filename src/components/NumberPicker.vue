<template>
    <div class="container">
        <div class="number-wheel" @touchstart.prevent="handleTouchStart" @touchmove.prevent="handleTouchMove"
            @touchend="handleTouchEnd" ref="wheel">
            <div class="number" v-for="number in numbers" :key="number" :style="{ transform: `translateY(${offsetY}px)` }">
                {{ number }}
            </div>
            <div class="highlight-window"></div> <!-- Visual indicator for the highlighted number -->
        </div>
        <div class="highlighted-number-display">Selected Number: {{ highlightedNumber }}</div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            numbers: Array.from({ length: 100 }, (_, i) => i), // 0 to 99
            startY: 0,
            offsetY: 0,
            currentY: 0,
            highlightedNumber: 0, // The currently highlighted (selected) number
            touchEndTime: 0,
            momentumInterval: null,
        };
    },
    mounted() {
        this.centerInitialNumber();
    },
    methods: {
        centerInitialNumber() {
            const numberHeight = 40; // Height of each number, should match your CSS
            const wheelHeight = this.$refs.wheel.clientHeight;
            const initialIndex = this.numbers.indexOf(this.highlightedNumber);
            this.initialOffsetY = -(initialIndex * numberHeight - wheelHeight / 2 + numberHeight / 2);
            this.offsetY = this.initialOffsetY;
        },
        handleTouchStart(event) {
            clearInterval(this.momentumInterval); // Clear any existing momentum scrolling
            this.startY = event.touches[0].clientY;
            this.currentY = this.offsetY; // Capture the current scroll position
            this.touchEndTime = Date.now();
        },
        handleTouchMove(event) {
            const touchY = event.touches[0].clientY;
            const deltaY = touchY - this.startY;
            this.offsetY = this.currentY + deltaY;
        },
        handleTouchEnd() {
            const now = Date.now();
            const timeElapsed = now - this.touchEndTime;
            if (timeElapsed < 150) { // Implement momentum if the swipe was fast
                this.applyMomentum();
            } else {
                this.snapToNearestNumber();
            }
        },
        applyMomentum() {
            let speed = 0.5; // This is a value to simulate speed, you may adjust this based on actual swipe speed
            this.momentumInterval = setInterval(() => {
                this.offsetY += speed * 20; // Adjust this value for momentum effect
                speed *= 0.95; // Slow down speed over time
                this.updateHighlightedNumber();
                if (Math.abs(speed) < 0.01) {
                    clearInterval(this.momentumInterval);
                    this.updateHighlightedNumber(true); // Snap to nearest number when momentum ends
                }
            }, 10);
        },
        snapToNearestNumber() {
            const numberHeight = 40; // Should match your .number height in CSS
            const index = Math.round(-(this.offsetY - this.initialOffsetY) / numberHeight);
            this.highlightedNumber = this.numbers[Math.min(Math.max(index, 0), this.numbers.length - 1)];
            this.offsetY = this.initialOffsetY - index * numberHeight; // Adjust to snap the selected number to the center
        },
        updateHighlightedNumber(finalUpdate = false) {
            const numberHeight = 40; // Should match your .number height in CSS
            const index = Math.round(-this.offsetY / numberHeight);
            this.highlightedNumber = this.numbers[Math.min(Math.max(index, 0), this.numbers.length - 1)];

            if (finalUpdate) {
                // Snap to the nearest number
                this.offsetY = -index * numberHeight;
                // Here, you could also emit an event or set a variable to save the highlighted number
                console.log("Selected Number:", this.highlightedNumber);
            }
        },
    },
}
</script>
  
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.number-wheel {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    width: 200px;
    border: 1px solid #ccc;
    position: relative;
    user-select: none;
}

.number {
    height: 40px;
    /* Height of each number, adjust based on your needs */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition: transform 0.3s ease-out;
    /* Smooth out the snapping */
}

.highlight {
    font-weight: bold;
    color: #d00;
    /* Highlight color, adjust based on your needs */
}

.highlighted-number-box {
    margin-top: 20px;
    font-size: 20px;
    color: #555;
    /* Adjust based on your needs */
}
</style>
  