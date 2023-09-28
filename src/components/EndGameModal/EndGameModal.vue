<template>
  <Modal class="c-end-game-modal" title="Progresso" @close="$emit('close')">
    <div class="c-end-game-modal__header">
      <div class="c-end-game-modal__status">
        <span class="c-end-game-modal__number">{{ stats.games }}</span>
        <span>Jogos</span>
      </div>
      <div class="c-end-game-modal__status">
        <span class="c-end-game-modal__number">{{ winsPercentage }}%</span>
        <span>de vitórias</span>
      </div>
    </div>
    <p style="margin-top: 8px; text-align: center">
      Distribuição de tentativas
    </p>
    <ol>
      <li v-for="i in 8" :key="i">
        <ProgressBar
          :value="stats?.history?.[i] || 0"
          :total="stats.games || 0"
        />
      </li>
    </ol>
    <ul>
      <li>
        <ProgressBar
          :value="stats?.history?.[9] || 0"
          :total="stats.games || 0"
        />
      </li>
    </ul>

    <div v-if="endGame && !won">
      <p>Você perdeu! 😩 As palavras eram:</p>
      <p>{{ words.join(" - ") }}</p>
    </div>
    <div v-if="endGame && won">
      <p v-if="currDay === todayDay">Você ganhou hoje! 🎉</p>
      <p v-if="currDay !== todayDay">
        Você acertou essa, mas não vai contar no progresso, porque já passou! 🎉
      </p>
    </div>
    <div
      style="
        margin-top: 16px;
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: space-between;
      "
    >
      <div style="font-size: 11px; text-align: center">
        Próximo jogo em: <CountDown />
      </div>
      <div v-if="endGame" style="display: grid; grid-gap: 4px">
        <Button @click="$emit('copy')"> Copiar resultado </Button>
        <Button @click="$emit('share')"> Compartilhar </Button>
      </div>
    </div>
  </Modal>
</template>
<script>
import CountDown from "@/components/CountDown/CountDown.vue";
export default {
  name: "EndGameModal",
  emits: ["close", "copy", "share"],
  components: { CountDown },
  props: {
    words: {
      type: Array,
      default: () => [],
    },
    stats: {
      type: Object,
      default: () => ({}),
    },
    endGame: {
      type: Boolean,
      required: true,
    },
    won: {
      type: Boolean,
      required: true,
    },
    todayDay: {
      type: String,
      required: true,
    },
    currDay: {
      type: String,
      required: true,
    },
  },
  computed: {
    winsPercentage() {
      return Math.ceil(
        ((this.stats.wins || 0) * 100) / (this.stats.games || 1)
      );
    },
  },
};
</script>
<style lang="stylus" src="./style.styl" scoped />
