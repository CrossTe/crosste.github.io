<template>
  <Modal @close="$emit('close')" title="Obrigado por jogar CrossTe!">
    <p style="margin-bottom: 4px">
      CrossTe é baseado no
      <a href="https://www.nytimes.com/games/wordle/index.html">WORDLE</a>, e
      existe desde 12 de março de 2022.
    </p>
    <p style="margin-bottom: 4px">
      Dúvidas e sugestões no Twitter
      <a href="https://twitter.com/crossTeGame">@crossTeGame</a>.
    </p>
    <p style="margin-bottom: 4px">
      CrossTe foi criado por
      <a href="https://github.com/jprodrigues70">@jprodrigues70</a>.
    </p>
  </Modal>
</template>
