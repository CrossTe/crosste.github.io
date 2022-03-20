<template>
  <div class="c-keyboard">
    <div v-for="keyset in keySets" :key="keyset" class="c-keyboard__keys">
      <Key
        v-for="value in this[keyset]"
        :key="value"
        :value="value"
        @pressed="handleKey"
      />
    </div>
  </div>
</template>
<script>
import { checkValidKey } from "@/utils/validate";
import Key from "@/components/Key/Key.vue";

export const KEYBOARD = () => {
  const keys = "QWERTYUIOPASDFGHJKL§ZXCVBNM".split("").map((key) => {
    if (key === "§") return { key: "DELETE" };
    return { key, evaluation: null };
  });
  keys.push({ key: "ENTER" });
  return keys;
};

export default {
  emits: ["key-pressed"],
  components: {
    Key,
  },
  data() {
    return {
      keySets: ["keySet1", "keySet2", "keySet3"],
      keyboard: KEYBOARD(),
    };
  },
  computed: {
    keySet1() {
      return this.keyboard?.slice(0, 10) || [];
    },
    keySet2() {
      return this.keyboard?.slice(10, 19) || [];
    },
    keySet3() {
      return this.keyboard?.slice(19, 29) || [];
    },
  },
  beforeMount() {
    window.removeEventListener("keyup", this.handleKeyEvent);
  },
  mounted() {
    window.addEventListener("keyup", this.handleKeyEvent);
  },
  methods: {
    reset() {
      this.keyboard = KEYBOARD();
    },
    handleKey(key) {
      this.$emit("key-pressed", key);
    },
    handleKeyEvent(event) {
      const valid = checkValidKey(event.code);
      if (!valid) return;
      let key = event.key.toUpperCase();
      if (key === "BACKSPACE") key = "DELETE";
      this.handleKey(key);
    },
  },
};
</script>
<style lang="stylus" scoped src="./style.styl" />
