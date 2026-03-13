// for json object
export interface JsonObject {
  [key: string]: any;
}

// for pinia state type
export interface WalletState {
  refresh: number;
  isConnected: boolean;
  account: string | null | undefined;
  parseAddr: string | null | undefined;
  isSupport: boolean;
}

export interface GlobalState {
  current: number;
  refresh: number;
}

export interface GlobalActions {
  refreshCurrent: (batchId: number) => void;
  refreshGlobal: () => void;
}
