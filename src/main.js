import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import copyText from "@meforma/vue-copy-to-clipboard";
import { Toaster } from "@meforma/vue-toaster";

const app = createApp(App);

app.use(router);
app.use(Toaster);
app.use(copyText);

app.mount("#app");
