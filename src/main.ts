import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

import primevue from "./theme";
app.use(primevue);

import router from "./router";
app.use(router);

import { createPinia } from "pinia";
app.use(createPinia());

import i18n from "./i18n";
app.use(i18n).config.globalProperties.$t = i18n.global.t;

import except from "./except";
app.use(except);

app.mount("#app");
