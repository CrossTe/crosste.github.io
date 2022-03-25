<template>
  <div class="c-game-tries">
    <div class="c-game-tries__item" v-for="t in tries" :key="t" v-html="t" />
  </div>
</template>
<script>
export default {
  name: "GameTries",
  props: {
    tries: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="stylus" src="./style.styl" scoped />
