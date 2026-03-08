import type { JsonObject } from "../interfaces";

export const isSupport = (chainId: string) => {
  return Object.keys(Address).includes(chainId);
};

export const Address: JsonObject = {
  "0x7a69": {},
  "0x1": {
    ETHRegistrarController: "0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5",
  },
};
