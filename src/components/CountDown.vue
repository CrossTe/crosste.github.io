<template>
  <div class="c-countdown">
    <h2 :class="{ 'c-countdown--ending': ending }">
      {{ timeLeft }}
    </h2>
  </div>
</template>

<script>
export default {
  name: "CountDown",
  props: {
    roomStatus: {
      type: [Number, String],
      default: 0,
    },
    uid: {
      type: [Number, String],
      default: 0,
    },
  },
  emits: ["timeout"],
  data() {
    return {
      startsFinishAt: 10,
      secondsLeft: 0,
      intervalTimer: 0,
      timeLeft: "00:00:00",
      ending: false,
    };
  },
  watch: {
    secondsLeft(newValue) {
      if (newValue === 0) {
        this.$emit("timeout");
        this.$nextTick(() => {
          this.start();
        });
      }
    },
    sound(newValue) {
      if (this.$refs[`${this.uid}-audio`]) {
        if (newValue && this.ending) {
          this.$refs[`${this.uid}-audio`].play();
        } else {
          this.$refs[`${this.uid}-audio`].pause();
        }
      }
    },
  },
  mounted() {
    this.start();
  },
  unmounted() {
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
    }
  },
  methods: {
    zeroPadded(num) {
      // 4 --> 04
      return num < 10 ? `0${num}` : num;
    },
    start() {
      clearInterval(this.intervalTimer);
      console.log("counting");
      this.countdown();
    },
    pause() {
      if (this.sound) {
        this.$refs[`${this.uid}-audio`].pause();
      }
      clearInterval(this.intervalTimer);
    },
    play() {
      if (this.secondsLeft < this.startsFinishAt && this.sound) {
        this.$refs[`${this.uid}-audio`].play();
      }
      this.start();
    },
    clockSong() {
      if (this.sound) {
        this.$refs[`${this.uid}-audio`].play();
      }
    },
    countdown() {
      let d = new Date();
      d.setHours(24, 0, 0, 0);

      this.intervalTimer = setInterval(() => {
        this.secondsLeft = Math.round((d - Date.now()) / 1000);

        if (this.secondsLeft < 0) {
          this.$emit("timeout");
          clearInterval(this.intervalTimer);
          return;
        }
        if (this.secondsLeft === this.startsFinishAt) {
          this.ending = true;
        }
        this.displayTimeLeft(this.secondsLeft);
      }, 1000);
    },
    displayTimeLeft(secondsLeft) {
      const hours = Math.floor(secondsLeft / 3600);
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      this.timeLeft = `${this.zeroPadded(hours)}:${this.zeroPadded(
        minutes
      )}:${this.zeroPadded(seconds)}`;
    },
  },
};
</script>

<style lang="stylus" scoped>
.c-countdown
  h2
    font-size 24px
    text-align center
  &--ending
    color #e40e13!important
</style>
