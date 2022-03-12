<template>
  <div v-if="show" class="c-bottom-message">
    <div class="c-bottom-message__box">
      <div class="c-bottom-message__body">
        <slot />
      </div>
      <div class="c-bottom-message__buttons">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BottomMessage",
  data() {
    return {
      show: true,
    };
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
