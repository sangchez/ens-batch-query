import type { App } from "vue";
import { t } from "../i18n";
import { DappError } from "./error";
import ToastEventBus from "primevue/toasteventbus";

export default {
  install(app: App) {
    app.config.errorHandler = (err: any) => {
      let severity = "error";
      let summary = "Error";
      let detail = "Unknown";

      if (err.code && err.info && err.info.error) {
        detail = err.info.error.message || detail;
      } else {
        severity = err instanceof DappError ? err.type : "error";
        summary = t(`message.summary.${severity}`);
        detail = err.message || detail;
      }

      ToastEventBus.emit("add", {
        severity,
        summary,
        detail,
        life: 3000,
      });

      console.log(detail);
    };
  },
};
