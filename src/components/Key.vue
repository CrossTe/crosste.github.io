<script setup>
import { computed } from "vue";
const props = defineProps({ value: Object });
defineEmits(["keyboard"]);
const classObject = computed(() => {
  if (props.value.key === "ENTER" || props.value.key === "DELETE") {
    return "wide";
  } else {
    return props.value.evaluation;
  }
});
</script>

<template>
  <div class="key" :class="classObject" @click="$emit('keyboard', value.key)">
    <span v-if="value.key !== 'DELETE'">{{ value.key }}</span>
    <span v-else class="material-icons" style="font-size: 24px">&#8592;</span>
  </div>
</template>

<style scoped>
div.key {
  cursor: pointer;
  user-select: none;
  color: #fff;
  background-color: #686868;
  width: 40px;
  height: 60px;
  border-radius: 5px;
  display: grid;
  place-items: center;
  font-weight: bold;
}
div.key:hover {
  opacity: 0.75;
}
@media only screen and (max-width: 600px) {
  div.key {
    width: 35px;
  }
}
div.wide {
  width: 80px;
}
@media only screen and (max-width: 600px) {
  div.wide {
    width: 60px;
    font-size: 1rem;
  }
}
div.absent {
  background-color: black;
}
div.present {
  background-color: #d3ad69;
}
div.correct {
  background-color: #3aa394;
}
div.break {
  flex-basis: 100%;
}
</style>
