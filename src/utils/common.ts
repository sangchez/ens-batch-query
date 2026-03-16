import { t } from "../i18n";

export function parseEnsTimeout(timestamp: number) {
  if (timestamp === 0) return t("components.ensDataTable.unregister");

  const date = new Date(timestamp * 1000);
  const locale = window.localStorage.getItem("locale");
  const timeZone = locale === "en-US" ? "America/Los_Angeles" : "Asia/Shanghai";

  return date.toLocaleString(locale || "en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: locale === "en-US",
  });
}
