interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    isConnected?: () => boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (eventName: string, handler: (...args: any[]) => void) => void;
    removeListener: (
      eventName: string,
      handler: (...args: any[]) => void,
    ) => void;
    selectedAddress?: string | null | undefined;
    chainId: string | null | undefined;
  };
}

interface ChainConfig {
  chainId: number;
  addresses: Record<string, string>;
}

interface ContractCallParams {
  contractAddress?: string;
  method: string;
  isWrite: boolean;
  args?: any[];
  overrides?: providers.TransactionRequest;
}
