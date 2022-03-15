<template>
  <div class="c-dropdown" ref="dropdown">
    <!-- v-tooltip="tooltip" -->
    <Button
      class="c-dropdown__button"
      :class="buttonClasses"
      ref="button"
      :disabled="disabled"
      :selected="showing"
      :circle="circle"
      @click="show"
    >
      <slot />
      <template v-if="changeNameOnSelect">
        <AddSpace v-if="$slots.default" :right="1 / 2">:</AddSpace>
        <span>
          {{ label }}
        </span>
      </template>
      <AddSpace v-if="!hideIndicator" left="1">
        <SvgIcon name="ChevronDown" />
      </AddSpace>
    </Button>
    <div v-show="showing" ref="content" class="c-dropdown__content">
      <div v-if="title" class="c-dropdown__title">{{ title }}</div>
      <ul v-if="items.length" class="c-dropdown__list">
        <li
          v-for="item in items"
          :key="item.name"
          class="c-dropdown__list-item"
          @click="click(item)"
        >
          <component
            :is="element(item)"
            :to="item && item.to"
            class="c-dropdown__list-item-container"
          >
            <div class="c-dropdown__list-item-content">
              <SvgIcon v-if="item.icon" :name="item.icon" size="14" />

              <AddSpace :left="item.icon ? 1 : 0">
                <span>
                  {{ item.name }}
                </span>
              </AddSpace>
            </div>
            <div
              v-if="item.description"
              class="c-dropdown__list-item-description"
            >
              <small>{{ item.description }}</small>
            </div>
          </component>
        </li>
      </ul>
      <ul class="c-dropdown__list c-dropdown__list-slot">
        <slot name="content" />
      </ul>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";
export default {
  name: "DropdownGlobal",
  props: {
    buttonClasses: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    initial: {
      type: Object,
      default: () => ({}),
    },
    hideIndicator: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: "bottom-start",
    },
    circle: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    changeNameOnSelect: {
      type: Boolean,
      default: true,
    },
    tooltip: {
      type: String,
      default: "",
    },
  },
  emits: ["change"],
  data() {
    return {
      selected: null,
      showing: true,
      popper: null,
    };
  },
  computed: {
    styles() {
      return {};
    },
    label() {
      return (this.selected && this.selected.name) || this.initial?.name;
    },
  },
  watch: {
    items(novo) {
      this.selected = this.selected
        ? novo.find((i) => i.value === this.selected.value) || null
        : null;
    },
  },
  mounted() {
    this.showing = false;
    const popcorn = this.$refs.button.$el;
    const tooltip = this.$refs.content;

    this.popper = createPopper(popcorn, tooltip, {
      placement: this.placement,
      positionFixed: true,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
  },
  methods: {
    element(item) {
      return item && item.to ? "router-link" : "div";
    },
    show() {
      this.showing = !this.showing;
      this.listenDocument();
      this.popper.update();
    },
    hide() {
      if (this.showing) {
        this.showing = false;
        this.stopListenDocument();
      }
    },
    listenDocument() {
      window.addEventListener("click", this.clickOutside);
    },
    stopListenDocument() {
      window.removeEventListener("click", this.clickOutside);
    },
    clickOutside(e) {
      this.$refs.dropdown &&
        !this.$refs.dropdown.contains(e.target) &&
        this.hide();
    },
    click(item) {
      this.selected = item;
      this.$emit("change", item);
      this.hide();
    },
  },
};
</script>

<style lang="stylus" src="./style.styl"></style>
