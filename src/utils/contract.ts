// https://www.quicknode.com/docs/welcome

import { ethers } from "ethers";
import { withChainId } from "./common";
import { Address } from "../config/address";

export default class Web3Contract {
  name: string;
  address: string | null | undefined;
  abi: any;
  initialize: () => Promise<any>;
  initializeByAddress: (address: string) => Promise<any>;
  getAddress: () => string | null | undefined;

  constructor(name: string, abi: any) {
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

  private async _initialize(): Promise<any> {
    this.address = this._getAddressByChainId(this.name);

    const address = this.address as string;
    const eth = window.ethereum as ethers.Eip1193Provider;
    const provider = new ethers.BrowserProvider(eth);
    const signer = await provider.getSigner();

    return new ethers.Contract(address, this.abi, signer);
  }

  private async _initializeByAddr(address: string): Promise<any> {
    const eth = window.ethereum as ethers.Eip1193Provider;
    const provider = new ethers.BrowserProvider(eth);
    const signer = await provider.getSigner();

    return new ethers.Contract(address, this.abi, signer);
  }
}
