<template>
  <Modal @close="$emit('close')" title="Instruções">
    <p>
      Descubra as palavras certas em 8 tentativas. Depois de cada tentativa, as
      peças mostram o quão perto você está da solução.
    </p>
    <br />
    <p>
      Quando você acertar uma letra e sua posição, a letra ficará fixa e verde
      no tabuleiro.
    </p>
    <div
      class="c-input c-input--correct"
      style="
        font-weight: bold;
        color: #fff;
        font-size: 15px;
        width: 30px;
        height: 30px;
        margin: 8px 0;
      "
    >
      R
    </div>
    <p>
      Quando você encontrar uma letra que existe no tabuleiro, a letra ficará
      amarela no teclado. <b>Não significa que será naquela palavra</b>.
    </p>
    <div
      class="c-input c-input--present"
      style="
        font-weight: bold;
        color: #fff;
        font-size: 15px;
        width: 30px;
        height: 30px;
        margin: 8px 0;
      "
    >
      R
    </div>
    <p>
      Quando você encontrar uma letra que não existe no tabuleiro, a letra
      ficará preta no teclado.
    </p>
    <div
      class="c-input c-input--absent"
      style="
        font-weight: bold;
        color: #fff;
        font-size: 15px;
        width: 30px;
        height: 30px;
        margin: 8px 0;
      "
    >
      R
    </div>
    <p>
      Se a letra não estiver na posição correta, ela irá desaparecer do
      tabuleiro.
    </p>
    <p><b>Acentuação e cedilha não são considerados!</b></p>
    <p>Um resumo de suas jogadas aparecerá na tela.</p>
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
