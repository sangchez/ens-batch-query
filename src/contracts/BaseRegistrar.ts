import ContractManager from "../utils/contract";

export default class BaseRegistrar extends ContractManager {
  constructor() {
    super("BaseRegistrar", [
      "function nameExpires(uint256 id) view returns(uint256)",
    ]);
  }
}
