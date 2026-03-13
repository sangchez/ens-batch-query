import { ProviderType } from "../config/enums";
import Web3Contract from "../utils/contract";

export default class BaseRegistrar extends Web3Contract {
  constructor(
    providerType: ProviderType = ProviderType.Browser,
    rpcUrl: string | null | undefined,
  ) {
    super(providerType, rpcUrl, "BaseRegistrar", [
      "function nameExpires(uint256 id) view returns(uint256)",
    ]);
  }
}
