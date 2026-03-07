// https://primevue.org/

import type { App } from "vue";
import ENSPreset from "../config/ens-preset";

import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";

export function setupTheme(app: App) {
  app.use(PrimeVue, {
    theme: {
      preset: ENSPreset,
      options: {
        darkModeSelector: ".dark",
        cssLayer: false,
      },
    },
    ripple: true,
    inputStyle: "outlined",
  });
}
