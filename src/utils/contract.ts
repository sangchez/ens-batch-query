import { ethers, Contract, JsonRpcProvider, BrowserProvider } from "ethers";
import { DappError } from "../except/error";
import { chainConfigs } from "../config/address";
import { ProviderType } from "../config/enums";

const DEFAULT_RPC_URL = import.meta.env.VITE_JSON_RPC_URL as string;

export default class ContractManager {
  // 明确属性类型
  private readonly chainConfigs: Record<number, ChainConfig>;
  private readonly contractName: string;
  private readonly abiList: readonly string[];
  private cacheJsonRpc?: JsonRpcProvider;
  private cacheBrowser?: BrowserProvider;
  private readonly cacheContract: Record<string, Contract> = {};

  /**
   * 构造函数 - 初始化链配置和合约基础信息
   * @param contractName 合约名称
   * @param abiList 合约ABI列表
   */
  constructor(contractName: string, abiList: readonly string[]) {
    this.contractName = contractName;
    this.abiList = abiList;

    // 简化链配置初始化逻辑
    this.chainConfigs = chainConfigs.reduce(
      (map, config) => {
        map[config.chainId] = config;
        return map;
      },
      {} as Record<number, ChainConfig>,
    );
  }

  /**
   * 获取JSON RPC Provider（带缓存）
   * @param rpcUrl 自定义RPC地址
   * @returns JsonRpcProvider实例
   */
  private getJsonRpcProvider(rpcUrl?: string): JsonRpcProvider {
    if (this.cacheJsonRpc) return this.cacheJsonRpc;

    const finalRpcUrl = rpcUrl || DEFAULT_RPC_URL;
    if (!finalRpcUrl) throw new DappError("rpc", "error");

    this.cacheJsonRpc = new JsonRpcProvider(finalRpcUrl);
    return this.cacheJsonRpc;
  }

  /**
   * 获取浏览器Provider（带缓存）
   * @returns BrowserProvider实例
   */
  private getBrowserProvider(): BrowserProvider {
    if (this.cacheBrowser) return this.cacheBrowser;

    // 检查以太坊钱包是否安装
    if (typeof window === "undefined" || !window.ethereum) {
      throw new DappError("ethereum", "error");
    }

    const eipProvider = window.ethereum as ethers.Eip1193Provider;
    this.cacheBrowser = new BrowserProvider(eipProvider);
    return this.cacheBrowser;
  }

  /**
   * 获取指定链ID的合约地址
   * @param chainId 链ID
   * @returns 合约地址
   */
  public getContractAddress(chainId: number): string {
    const chainConfig = this.chainConfigs[chainId];
    if (!chainConfig) {
      throw new DappError("network", "error");
    }

    const contractAddress = chainConfig.addresses[this.contractName];
    if (!contractAddress) {
      throw new DappError("address", "error");
    }

    return contractAddress;
  }

  /**
   * 初始化合约实例（带缓存）
   * @param provider Provider实例
   * @param chainId 链ID
   * @param contractAddress 合约地址
   * @returns 合约实例
   */
  private initializeContractInstance(
    provider: ethers.Provider,
    chainId: number,
    contractAddress: string,
    providerType: ProviderType,
  ): Contract {
    const cacheKey = `${chainId}_${this.contractName}_${providerType}`;

    // 缓存命中直接返回
    if (this.cacheContract[cacheKey]) {
      return this.cacheContract[cacheKey];
    }

    // 创建新合约实例并缓存
    const contract = new Contract(contractAddress, this.abiList, provider);
    this.cacheContract[cacheKey] = contract;

    return contract;
  }

  /**
   * 获取合约实例
   * @param rpcUrl 自定义RPC地址（传值则用JSON RPC，不传则用钱包Provider）
   * @param contractAddress 自定义合约地址
   * @returns 合约实例
   */
  public async getContract(
    rpcUrl?: string,
    contractAddress?: string,
  ): Promise<Contract> {
    // 选择Provider类型
    const isUsingBrowserProvider = !rpcUrl;
    const provider = isUsingBrowserProvider
      ? this.getBrowserProvider()
      : this.getJsonRpcProvider(rpcUrl);

    // 获取当前网络信息
    const network = await provider.getNetwork();
    const chainId = network.chainId;

    // 确定合约地址
    const finalContractAddress =
      contractAddress || this.getContractAddress(Number(chainId));

    // 确定Provider类型标识
    const providerType = isUsingBrowserProvider
      ? ProviderType.Browser
      : ProviderType.JsonRPC;

    // 初始化/获取合约实例
    return this.initializeContractInstance(
      provider,
      Number(chainId),
      finalContractAddress,
      providerType,
    );
  }

  /**
   * 调用合约方法（统一读写逻辑）
   * @param params 合约调用参数
   * @param rpcUrl 自定义RPC地址
   * @returns 调用结果
   */
  public async send(params: ContractCallParams, rpcUrl?: string): Promise<any> {
    // 获取合约实例
    const contract = await this.getContract(rpcUrl, params.contractAddress);

    // 检查方法是否存在
    const contractMethod = contract[params.method];
    if (typeof contractMethod !== "function") {
      throw new DappError("method", "error");
    }

    // 处理调用参数
    const args = params.args || [];

    // 区分读写操作
    if (!params.isWrite) {
      // 读操作（call）
      return await contractMethod(...args);
    } else {
      // 写操作（send）
      return await contractMethod(...args, params.overrides);
    }
  }

  /**
   * 清理指定链的合约缓存
   * @param chainId 链ID（不传则清理全部）
   */
  public clearContractCache(chainId?: number): void {
    if (chainId) {
      // 清理指定链的缓存
      Object.keys(this.cacheContract).forEach((key) => {
        if (key.startsWith(`${chainId}_`)) {
          delete this.cacheContract[key];
        }
      });
    } else {
      // 清理全部缓存
      Object.keys(this.cacheContract).forEach((key) => {
        delete this.cacheContract[key];
      });
    }
  }

  /**
   * 重置Provider缓存
   */
  public resetProviderCache(): void {
    this.cacheJsonRpc = undefined;
    this.cacheBrowser = undefined;
  }
}
