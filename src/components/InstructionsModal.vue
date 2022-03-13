<template>
  <Modal @close="$emit('close')" title="Instruções" medium>
    <p>Descubra as palavras certas em 8 tentativas.</p>

    <p>
      Se você acertar a posição de uma letra, ela ficará fixa e verde no
      tabuleiro, e aparecerá verde no resumo da jogada.
    </p>
    <div class="c-false-key c-input--correct">E</div>
    <p>
      Se você encontrar uma letra que existe na palavra, ela ficará amarela no
      teclado e no resumo da jogada.
    </p>
    <div class="c-false-key c-input--present">E</div>
    <p>
      Se você encontrar uma letra que existe no tabuleiro, mas não existe na
      palavra, a letra também ficará amarela no teclado, mas ficará preta no
      resumo da jogada, naquela palavra.
    </p>
    <p
      class="c-past"
      style="padding-left: 0; margin-top: 4px; margin-bottom: 4px"
    >
      <span class="c-published-letter c-input--correct">R</span>
      <span class="c-published-letter c-input--absent">E</span>
      <span class="c-published-letter c-input--correct">S</span>
      <span class="c-published-letter c-input--correct">T</span>
      <span class="c-published-letter c-input--correct">O</span>
    </p>
    <p>
      Se você encontrar uma letra que não existe no tabuleiro, a letra ficará
      preta no teclado.
    </p>
    <div class="c-false-key c-input--absent">E</div>
    <p>
      Se a letra não estiver na posição correta, ela irá desaparecer do
      tabuleiro.
    </p>
    <p><b>Acentuação e cedilha não são considerados!</b></p>
  </Modal>
</template>
<script>
import Modal from "@/components/Modal/Modal.vue";

export default {
  components: {
    Modal,
  },
};
</script>
