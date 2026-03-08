import type { App } from "vue";
import { DappError } from "./error";

export default {
  install(app: App) {
    app.config.errorHandler = (err: any) => {
      console.warn(err.message);
      if (err.code && err.info && err.info.error) {
        // Todo
        // ElMessage.error(err.info.error.message);
      } else {
        const t = err instanceof DappError ? err.type : "error";
        // Todo
        // (ElMessage as any)[t](err.message);
      }
    };
  },
};
