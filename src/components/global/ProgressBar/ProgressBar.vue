<template>
  <div class="c-progress-bar">
    <div class="c-progress-bar__bar">
      <div class="c-progress-bar__progress-false" :style="progressStyle" />
      <div class="c-progress-bar__progress" :style="progressStyle" />
    </div>
    <div style="text-align: center">{{ zeroPadded(value) }}</div>
  </div>
</template>
<script>
export default {
  name: "ProgressBar",
  props: {
    value: {
      type: null,
      default: undefined,
    },
    total: {
      type: [Number, String],
      default: 0,
    },
    percentage: {
      type: null,
      default: undefined,
    },
  },
  computed: {
    progress() {
      let width = 0;
      if (this.percentage === undefined) {
        if (this.value !== undefined && this.total !== undefined) {
          width = this.calcPercentage(this.value, this.total);
        }
      } else {
        width = this.percentage;
      }

      return {
        width,
      };
    },
    progressStyle() {
      return { width: `${this.progress.width}%` };
    },
  },
  methods: {
    zeroPadded(num) {
      return num < 10 ? `0${num}` : num;
    },
    calcPercentage(value, max) {
      if (max == 0) return 0;
      let result = (value * 100) / max;

      return result >= 100 ? 100 : result;
    },
  },
};
</script>
<style lang="stylus" src="./style.styl" scoped></style>
