import Web3Contract from "../utils/contract";

export default class ETHRegistrarController extends Web3Contract {
  constructor() {
    super("ETHRegistrarController", [
      "function available(string name) view returns(bool)",
    ]);
  }
}
