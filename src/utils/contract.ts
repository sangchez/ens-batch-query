// https://www.quicknode.com/docs/welcome

import { ethers } from "ethers";
import { ProviderType } from "../config/enums";
import { DappError } from "../except/error";
import { withChainId } from "./common";
import { Address } from "../config/address";

export default class Web3Contract {
  name: string;
  address: string | null | undefined;
  abi: any;
  providerType: ProviderType;
  rpcUrl: string;
  initialize: () => Promise<any>;
  initializeByAddress: (address: string) => Promise<any>;
  getAddress: () => string | null | undefined;

  constructor(
    providerType: ProviderType = ProviderType.Browser,
    rpcUrl: string | null | undefined,
    name: string,
    abi: any,
  ) {
    this.providerType = providerType;
    this.rpcUrl = rpcUrl || (import.meta.env.VITE_JSON_RPC_URL as string);
    this.name = name;
    this.abi = abi;

    this.initialize = withChainId(this._initialize.bind(this));
    this.initializeByAddress = withChainId(this._initializeByAddr.bind(this));
    this.getAddress = this._getAddressByChainId.bind(this, name);
  }

  private _getAddressByChainId(name: string) {
    const chainId = window.ethereum?.chainId as string;
    return Address[chainId]?.[name];
  }

  private _getProviderByProviderType() {
    if (this.providerType === ProviderType.Browser) {
      const eth = window.ethereum as ethers.Eip1193Provider;
      return new ethers.BrowserProvider(eth);
    }

    if (this.providerType === ProviderType.JsonRPC) {
      const rpcUrl = import.meta.env.VITE_JSON_RPC_URL as string;
      return new ethers.JsonRpcProvider(rpcUrl);
    }

    throw new DappError("provider", "error");
  }

  private _initialize(): any {
    this.address = this._getAddressByChainId(this.name);

    const address = this.address as string;
    const provider = this._getProviderByProviderType();

    return new ethers.Contract(address, this.abi, provider);
  }

  private _initializeByAddr(address: string): any {
    const provider = this._getProviderByProviderType();
    return new ethers.Contract(address, this.abi, provider);
  }
}
