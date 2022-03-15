<template>
  <BottomMessage>
    <p><b>Política de cookies</b></p>
    <AddSpace top="1">
      <p>
        Utilizamos cookies para rastrear as páginas que você viu, monitorar
        padrões de tráfego e para medir a popularidade dos serviços que
        oferecemos. Utilizamos essas informações para fornecer conteúdo e
        serviços relevantes para você.
      </p>
      <AddSpace top="1">
        <p>
          A lei diz que podemos armazenar cookies no seu dispositivo se forem
          estritamente necessários para o funcionamento deste site. Para outros
          tipos de cookies precisamos da sua permissão.
        </p>
      </AddSpace>
      <AddSpace top="1">
        <label for="ga"> Utilizamos o Google Analytics </label>
      </AddSpace>
      <AddSpace top="1">
        <div>
          <small>
            O Google Analytics é o serviço de rastreamento que utilizamos para
            saber quais as funcionalidade mais utilizadas, a fim de melhorar
            cada vez mais a sua experiência com o CrossTe.
          </small>
        </div>
      </AddSpace>
    </AddSpace>
    <template v-slot:buttons>
      <div class="v--flex v--flex-align-middle" style="gap: 16px">
        <AddSpace top="2">
          <a @click.prevent="updateCookieStatus(false)">Não aceito</a>
        </AddSpace>
        <AddSpace top="2">
          <Button
            style="width: 130px"
            @click="updateCookieStatus(true)"
            :loading="$wait.is('user/settings')"
          >
            Ok, eu aceito
          </Button>
        </AddSpace>
      </div>
    </template>
  </BottomMessage>
</template>
<script>
import BottomMessage from "@/components/BottomMessage/BottomMessage.vue";

export default {
  name: "CookiesBanner",
  components: {
    BottomMessage,
  },
  methods: {
    updateCookieStatus(status) {
      const raw = localStorage.getItem("cross");
      let cross = null;

      if (raw) {
        cross = { ...JSON.parse(raw), cookies: status };
        localStorage.setItem("cross", JSON.stringify(cross));
      }

      this.$emit("close", status);
    },
  },
};
</script>
