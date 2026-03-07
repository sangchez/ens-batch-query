import type { App } from "vue";
import { t } from "../i18n";

export class DappError extends Error {
  name: string;
  type: string;

  constructor(code: string, type: string) {
    super(t(`message.error.${code}`));
    this.name = "DappError";
    this.type = type || "error";
  }
}

export default {
  install(app: App) {
    app.config.errorHandler = (err: any) => {
      console.warn(err.message);
      if (err.code && err.info && err.info.error) {
        // ElMessage.error(err.info.error.message);
      } else {
        // const t = err instanceof DappError ? err.type : "error";
        // (ElMessage as any)[t](err.message);
      }
    };
  },
};
