import { t } from "../i18n";
import { DappError } from "../except/error";
import { Address } from "../config/address";

export function withChainId<T extends (...args: any[]) => Promise<any>>(fn: T) {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (typeof window.ethereum === "undefined") {
      throw new DappError("ethereum", "warn");
    }

    const chainId = window.ethereum.chainId as string;
    console.log("chainId", chainId);
    if (!chainId || !Object.keys(Address).includes(chainId)) {
      throw new DappError("network", "warn");
    }

    return fn(...args);
  };
}

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
