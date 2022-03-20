<template>
  <div class="c-key" :class="classObject" @click="$emit('pressed', value.key)">
    <span v-if="value.key !== 'DELETE'">{{ value.key }}</span>
    <span v-else class="material-icons" style="font-size: 24px">&#8592;</span>
  </div>
</template>
<script>
export default {
  props: {
    value: { type: Object, required: true },
  },
  emits: ["pressed"],
  computed: {
    classObject() {
      return ["ENTER", "DELETE"].includes(this.value.key)
        ? "c-key--wide"
        : `c-key--${this.value.evaluation}`;
    },
  },
};
</script>
<style lang="stylus" scoped src="./style.styl" />
