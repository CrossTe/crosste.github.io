<template>
  <Modal @close="$emit('close')" title="Obrigado por jogar CrossTe!" small>
    <p>
      CrossTe é baseado no
      <a href="https://www.nytimes.com/games/wordle/index.html">WORDLE</a>, e
      existe desde 12 de março de 2022.
    </p>
    <p>
      Dúvidas e sugestões no Twitter
      <a href="https://twitter.com/crossTeGame">@crossTeGame</a>.
    </p>
    <p>
      CrossTe foi criado por
      <a href="https://github.com/jprodrigues70">@jprodrigues70</a>.
    </p>
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
