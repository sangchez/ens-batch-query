// https://v3.vuex.vuejs.org/guide/#the-simplest-store

import { defineStore } from "pinia";
import type { GlobalState, GlobalActions } from "../interfaces";

export const useGlobalStore = defineStore<
  "global",
  GlobalState,
  {},
  GlobalActions
>("global", {
  state: (): GlobalState => ({
    current: 0,
    refresh: 0,
  }),
  actions: {
    refreshCurrent(batchId: number) {
      this.current = batchId;
      console.log(this.current);
    },
    refreshGlobal() {
      this.refresh = new Date().getTime();
      console.log(this.refresh);
    },
  },
});
