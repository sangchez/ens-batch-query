import { t } from "../i18n";

export class DappError extends Error {
  name: string;
  type: string;

  constructor(code: string, type: string) {
    super(t(`message.${type}.${code}`));
    this.name = "DappError";
    this.type = type || "error";
  }
}
