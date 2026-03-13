// https://primevue.org/

import type { App } from "vue";
import ENSPreset from "../config/ens-preset";

import PrimeVue from "primevue/config";
import { ToastService, ConfirmationService } from "primevue";

import "primeicons/primeicons.css";
import "../assets/tailwind.css";
import "../assets/styles.scss";

export default {
  install(app: App) {
    const config = {} as any;
    config.theme = {};
    config.theme.preset = ENSPreset;
    config.theme.options = {};
    config.theme.options.darkModeSelector = ".app-dark";
    config.theme.options.cssLayer = false;
    config.ripple = true;
    config.inputStyle = "outlined";

    app.use(PrimeVue, config);
    app.use(ToastService);
    app.use(ConfirmationService);
  },
};
