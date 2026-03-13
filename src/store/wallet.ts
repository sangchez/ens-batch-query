// https://v3.vuex.vuejs.org/guide/#the-simplest-store

import { defineStore } from "pinia";
import type { WalletState } from "../interfaces";
import { isSupport } from "../config/address";

export const useWalletStore = defineStore<"wallet", WalletState>("wallet", {
  state: () => ({
    refresh: 0,
    isConnected: false,
    account: undefined,
    parseAddr: undefined,
    isSupport: true,
  }),
  actions: {
    refreshWalletState() {
      this.refresh = new Date().getTime();
      const addr = window.ethereum?.selectedAddress;

      this.account = addr;
      this.isConnected = typeof this.account === "string";
      if (addr) {
        this.parseAddr = `${addr?.substring(0, 4)}..${addr?.substring(addr.length - 2)}`;
      } else {
        this.parseAddr = undefined;
      }

      if (this.isConnected) {
        const currentNetwork = window.ethereum?.chainId as string;
        console.debug("Netwrok: ", currentNetwork);
        this.isSupport = isSupport(currentNetwork);
      } else {
        this.isSupport = true;
      }

      console.log("refresh wallet state");
    },
  },
});
