// https://v3.vuex.vuejs.org/guide/#the-simplest-store

import { defineStore } from "pinia";
// import { Address } from "../configs/address";

interface WalletState {
  refresh: number;
  isConnected: boolean;
  account: string | null | undefined;
  parseAddr: string | null | undefined;
  isSuport: boolean;
}

export const useWalletStore = defineStore<"wallet", WalletState>("wallet", {
  state: () => ({
    refresh: 0,
    isConnected: false,
    account: undefined,
    parseAddr: undefined,
    isSuport: true,
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

      // if (this.isConnected) {
      //   const currentNetwork = window.ethereum?.chainId as string;
      //   console.debug("Netwrok: ", currentNetwork);
      //   this.isSuport = Object.keys(Address).includes(currentNetwork);
      // } else {
      //   this.isSuport = true;
      // }

      console.debug("Account: ", window.ethereum?.selectedAddress);
    },
  },
});
