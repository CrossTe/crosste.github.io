import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import copyText from "@meforma/vue-copy-to-clipboard";
import { Toaster } from "@meforma/vue-toaster";
import wait from "@meforma/vue-wait-for";
import global from "./components/global";

const app = createApp(App);

// modules[path]().then((mod) => {
//   console.log(path, mod);
// });
Object.keys(global).forEach((file) => {
  const parts = file.split("/");
  const name = parts[parts.length - 1].replace(".vue", "");
  const component = global[file].default;
  if (name) {
    app.component(name, component);
  } else {
    throw "Global components requires name attribute";
  }
});

app.use(router);
app.use(Toaster, {
  // One of the options
  position: "top",
});
app.use(copyText);
app.use(wait);

app.mount("#app");
