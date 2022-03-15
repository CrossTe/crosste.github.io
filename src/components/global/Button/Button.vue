<template>
  <button
    v-if="!to"
    class="c-button"
    :class="styles"
    :disabled="loading || disabled"
  >
    <div class="c-button__selected" :class="selectedClasses" />
    <div class="c-button__hover" :class="hoverClasses" />
    <div class="c-button__content">
      <PulseLine v-if="loading" />
      <span
        class="c-button__content"
        :class="{ 'c-button__content--hide': loading }"
      >
        <slot />
      </span>
    </div>
  </button>
  <router-link
    v-else
    class="c-button"
    :class="styles"
    :disabled="loading || disabled"
    :to="to"
  >
    <div class="c-button__selected" :class="selectedClasses" />
    <div class="c-button__hover" :class="hoverClasses" />
    <div class="c-button__content">
      <PulseLine v-if="loading" />
      <span
        class="c-button__content"
        :class="{ 'c-button__content--hide': loading }"
      >
        <slot />
      </span>
    </div>
  </router-link>
</template>
<script>
export default {
  props: {
    sprawled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    linkStyle: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    fit: {
      type: Boolean,
      default: false,
    },
    softly: {
      type: Boolean,
      default: false,
    },
    underline: {
      type: Boolean,
      default: false,
    },
    withIcon: {
      type: Boolean,
      default: false,
    },
    selectedClasses: {
      type: Array,
      default: () => [],
    },
    hoverClasses: {
      type: Array,
      default: () => [],
    },
    to: {
      type: String,
      default: "",
    },
  },
  computed: {
    styles() {
      return {
        [this.getClass("selected")]: this.selected,
        [this.getClass("sprawled")]: this.sprawled,
        [this.getClass("link-style")]: this.linkStyle,
        [this.getClass("block")]: this.block,
        [this.getClass("circle")]: this.circle,
        [this.getClass("fit")]: this.fit,
        [this.getClass("softly")]: this.softly,
        [this.getClass("underline")]: this.underline,
        [this.getClass("disabled")]: this.disabled || this.loading,
        [this.getClass("with-icon")]: this.withIcon,
      };
    },
  },
  methods: {
    getClass(name) {
      return `c-button--${name}`;
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
