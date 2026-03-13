import type { JsonObject } from "../interfaces";

export const isSupport = (chainId: string) => {
  return Object.keys(Address).includes(chainId);
};

export const Address: JsonObject = {
  "0x7a69": {},
  "0x1": {
    BaseRegistrar: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85",
  },
};
