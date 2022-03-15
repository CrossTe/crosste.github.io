<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="`${size || width}px`"
    :height="`${size || height}px`"
    viewBox="0 0 24 24"
    :aria-labelledby="name"
    role="presentation"
  >
    <g :fill="iconColor">
      <component :is="currentIndexComponent" />
    </g>
  </svg>
</template>
<script>
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      default: "x",
    },
    width: {
      type: [Number, String],
      default: 18,
    },
    height: {
      type: [Number, String],
      default: 18,
    },
    size: {
      type: [Number, String],
      default: 0,
    },
    iconColor: {
      type: String,
      default: "currentColor",
    },
  },
  computed: {
    currentIndexComponent() {
      return `Icon${this.name}`;
    },
  },
};
</script>
