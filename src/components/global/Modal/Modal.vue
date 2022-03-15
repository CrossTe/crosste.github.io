<template>
  <teleport to="body">
    <div class="c-modal" :class="classes" ref="modal">
      <div class="c-modal__overlay" @click="$emit('close')" />
      <div class="c-modal__window">
        <div class="c-modal__window-header">
          <Button
            v-if="closeable"
            circle
            class="c-modal__window-close"
            @click="$emit('close')"
          >
            <IconX />
          </Button>
          <slot name="header">
            <div>
              <h1 v-if="title" class="c-modal__window-title">
                {{ title || "" }}
              </h1>
              <p
                v-if="subtitle"
                class="c-modal__window-subtitle"
                v-html="subtitle || ''"
              />
              <slot name="left-header" />
            </div>
            <div class="v--flex-align-right">
              <slot name="right-header" />
            </div>
          </slot>
        </div>
        <div v-if="$slots.default" class="c-modal__window-body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="c-modal__window-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </teleport>
</template>
<script>
let firstFocusableElement;
let lastFocusableElement;
const firstFocusableElementRule = (e) => {
  if (e.shiftKey && e.key === "Tab") {
    e.preventDefault();
    lastFocusableElement.focus();
  }
};

const lastFocusableElementRule = (e) => {
  if (!e.shiftKey && e.key === "Tab") {
    e.preventDefault();
    firstFocusableElement.focus();
  }
};
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    small: {
      type: Boolean,
      default: false,
    },
    medium: {
      type: Boolean,
      default: false,
    },
    ignoreHeaderPadding: {
      type: Boolean,
      default: false,
    },
    closeable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["close"],
  data() {
    return {
      body: null,
      before: null,
    };
  },
  computed: {
    classes() {
      return {
        "c-modal--small": this.small,
        "c-modal--medium": this.medium,
        "c-modal--ignore-header-padding": this.ignoreHeaderPadding,
      };
    },
  },
  mounted() {
    this.body = document.getElementsByTagName("body")[0];
    this.before = this.body.style.overflow;
    this.body.style.overflow = "hidden";

    document.addEventListener("keydown", this.keyHandler);

    const focusable = [].slice.call(
      this.$refs.modal.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]"
      )
    );
    if (focusable.length) {
      firstFocusableElement =
        focusable.find((i) => i.autofocus) || focusable[0];
      lastFocusableElement = focusable[focusable.length - 1];

      firstFocusableElement.focus();
      firstFocusableElement.addEventListener(
        "keydown",
        firstFocusableElementRule
      );

      lastFocusableElement.addEventListener(
        "keydown",
        lastFocusableElementRule
      );
    }
  },
  unmounted() {
    this.body.style.overflow = this.before;
    document.removeEventListener("keydown", this.keyHandler);

    if (firstFocusableElement) {
      firstFocusableElement.removeEventListener(
        "keydown",
        firstFocusableElementRule
      );
      lastFocusableElement.removeEventListener(
        "keydown",
        lastFocusableElementRule
      );
    }
  },
  methods: {
    keyHandler({ key }) {
      if (key === "Escape" && this.closeable) {
        document.removeEventListener("keydown", this.keyHandler);
        this.$emit("close");
      }
    },
  },
};
</script>
<style src="./style.styl" lang="stylus" scoped />
