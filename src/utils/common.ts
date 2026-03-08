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
