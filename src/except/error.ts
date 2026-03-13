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

export const ResolverMessage = {
  rpcUrl: {
    required: [{ message: t("form.searchForm.rpcUrlRequired") }],
    invalid: [{ message: t("form.searchForm.rpcUrlInvalid") }],
  },
  ensNames: {
    required: [{ message: t("form.searchForm.ensNamesRequired") }],
    invalid: [{ message: t("form.searchForm.ensNamesInvalid") }],
  },
};
