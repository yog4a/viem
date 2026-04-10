import { t as __name } from "./chunk-cy2TeOE5.cjs";
import * as _$viem from "viem";
import { Address, Hash, Hex, PublicClient, Quantity, RpcBlock, RpcTransaction, RpcTransactionReceipt } from "viem";

//#region src/extensions/eth/ethBlockNumber.d.ts
declare namespace EthBlockNumber {
  type Params = [];
  type Result = {
    hexBlockNumber: `0x${string}`;
    bigBlockNumber: bigint;
    blockNumber: `${bigint}`;
  };
}
//#endregion
//#region src/extensions/eth/ethGetCode.d.ts
declare namespace EthCode {
  type Params = {
    address: `0x${string}`;
    blockNumber?: `0x${string}`;
    blockTag?: 'latest' | 'earliest' | 'pending';
  };
  type Result = {
    bytecode: `0x${string}`;
  };
}
//#endregion
//#region src/extensions/eth/ethGetLogs.d.ts
type Schema = {
  Method: "eth_getLogs";
  Parameters: [{
    address: `0x${string}`;
    fromBlock: `0x${string}` | 'latest' | 'earliest' | 'pending' | 'finalized' | 'safe';
    toBlock: `0x${string}` | 'latest' | 'earliest' | 'pending' | 'finalized' | 'safe';
    topics?: `0x${string}`[];
  }];
  ReturnType: Array<{
    address: `0x${string}`;
    topics: `0x${string}`[];
    data: `0x${string}`;
    blockNumber: `0x${string}`;
    transactionHash: `0x${string}`;
    transactionIndex: `0x${string}`;
    blockHash: `0x${string}`;
    logIndex: `0x${string}`;
    removed: boolean;
  }>;
};
declare namespace EthGetLogs {
  const method = "eth_getLogs";
  type Params = Schema['Parameters'][0];
  type Result = Schema['ReturnType'];
}
//#endregion
//#region src/extensions/eth/ethGetStorageAt.d.ts
declare namespace EthGetStorageAt {
  type Params = {
    address: `0x${string}`;
    position: `0x${string}`;
    blockNumber: `0x${string}` | 'latest' | 'earliest' | 'pending' | 'finalized' | 'safe';
  };
  type Result = {
    storage: `0x${string}`;
  };
}
//#endregion
//#region src/extensions/eth/ethGetBalance.d.ts
declare namespace EthBalance {
  type Params = {
    address: `0x${string}`;
    blockNumber: `0x${string}`;
  };
  type Result = {
    hexValue: `0x${string}`;
    weiValue: `${bigint}`;
    value: `${number}`;
    currency: {
      name: string;
      symbol: string;
      decimals: number;
    };
  };
}
//#endregion
//#region src/extensions/eth/ethGetBlockByNumber.d.ts
type EthGetBlockByNumber = {
  block: Omit<RpcBlock, 'transactions'>;
  transactions?: Record<`0x${string}`, RpcTransaction<false>>;
};
//#endregion
//#region src/extensions/eth/ethGetBlockReceipts.d.ts
type EthGetBlockReceipts = {
  receipts: Record<`0x${string}`, RpcTransactionReceipt>;
};
//#endregion
//#region src/extensions/eth/ethGetTransactionByHash.d.ts
declare namespace EthTransaction {
  type Params = {
    transactionHash: `0x${string}`;
  };
  type Result = {
    hash: `0x${string}`;
    transaction: RpcTransaction<false>;
  };
}
//#endregion
//#region src/extensions/eth/ethGetTransactionReceipt.d.ts
declare namespace EthTransactionReceipt {
  type Params = {
    transactionHash: `0x${string}`;
  };
  type Result = {
    hash: `0x${string}`;
    transaction: RpcTransactionReceipt;
  };
}
//#endregion
//#region src/extensions/debug/types/call.types.d.ts
type DebugCallType = "CALL" | "CALLCODE" | "STATICCALL" | "DELEGATECALL" | "CREATE" | "CREATE2" | "SELFDESTRUCT" | "SUICIDE";
type DebugCallFrame = {
  /** Call type */type: DebugCallType; /** Caller address */
  from: Address; /** Callee address */
  to?: Address; /** Value sent */
  value?: Quantity; /** Gas provided */
  gas: Quantity; /** Gas used */
  gasUsed: Quantity; /** Calldata */
  input: "0x" | "0x0" | Hex; /** Return data */
  output?: "0x" | "0x0" | Hex; /** Error message if reverted */
  error?: string; /** Revert reason (ABI-encoded) */
  revertReason?: string; /** Nested calls */
  calls?: DebugCallFrame[];
};
//#endregion
//#region src/extensions/debug/types/prestate.types.d.ts
type PrestateAccount = {
  /** Balance */balance?: Hex; /** Nonce */
  nonce?: number; /** Code */
  code?: Hex; /** Storage */
  storage?: Record<Hex, Hex>;
};
type PrestateResult = Record<Address, PrestateAccount>;
//#endregion
//#region src/extensions/debug/types/shared.types.d.ts
/** Block identifier types */
type DebugBlockTag = Hex | "latest" | "earliest" | "pending";
//#endregion
//#region src/extensions/debug/types/structLog.types.d.ts
type StructLog = {
  /** Program counter */pc: bigint; /** Opcode to be executed */
  op: string; /** Remaining gas */
  gas: bigint; /** Cost for executing op */
  gasCost: bigint; /** EVM memory. Enabled via enableMemory */
  memory: Hex | null; /** Size of memory */
  memSize: number; /** EVM stack. Disabled via disableStack */
  stack: Hex[] | null; /** Last call's return data. Enabled via enableReturnData */
  returnData?: Hex | null; /** Storage slots of current contract read/written. Only for SLOAD/SSTORE. Disabled via disableStorage */
  storage?: Record<Hex, Hex> | null; /** Current call depth */
  depth: number; /** Refund counter */
  refund?: bigint; /** Error message if any */
  error?: string | null;
};
type StructLoggerResult = {
  /** Total gas used */gas: number; /** Whether the call failed */
  failed: boolean; /** Return value */
  returnValue: Hex; /** Opcode-level trace */
  structLogs: StructLog[];
};
//#endregion
//#region src/extensions/debug/types/tracer.types.d.ts
/**
 * No named tracer: Geth uses the default opcode logger.
 * Opcode logger-specific flags belong here.
 */
type NoTracerConfig = {
  /** The tracer type */tracer?: undefined; /** The tracer configuration */
  tracerConfig?: undefined; /** Timeout for the trace, e.g. "5s", "300ms" */
  timeout?: string; /** Re-execute missing historical state up to this many blocks */
  reexec?: number; /** Enable memory capture */
  enableMemory?: boolean; /** Disable stack capture */
  disableStack?: boolean; /** Disable storage capture */
  disableStorage?: boolean; /** Enable return data capture */
  enableReturnData?: boolean; /** Print debug logs during capture */
  debug?: boolean; /** Limit number of captured opcode steps */
  limit?: number;
};
/**
 * The configuration for the "callTracer".
 */
type CallTracerConfig = {
  /** The tracer type */tracer: "callTracer"; /** The tracer configuration */
  tracerConfig?: {
    /** Only trace the primary (top-level) call and not any sub-calls */onlyTopCall?: boolean;
  }; /** Timeout for the trace, e.g. "5s", "300ms" */
  timeout?: string; /** Re-execute missing historical state up to this many blocks */
  reexec?: number;
};
/**
 * The configuration for the "prestateTracer".
 */
type PrestateTracerConfig = {
  /** The tracer type */tracer: "prestateTracer"; /** The tracer configuration */
  tracerConfig?: {
    /** Return state diff instead of full prestate */diffMode?: boolean; /** Disable code where supported */
    disableCode?: boolean; /** Disable storage where supported */
    disableStorage?: boolean;
  }; /** Timeout for the trace, e.g. "5s", "300ms" */
  timeout?: string; /** Re-execute missing historical state up to this many blocks */
  reexec?: number;
};
/** Any supported debug trace config */
type DebugTraceConfig = NoTracerConfig | CallTracerConfig | PrestateTracerConfig;
/** Only configs that explicitly use a tracer */
type DebugNamedTracerConfig = CallTracerConfig | PrestateTracerConfig;
type DebugTraceResult<C extends DebugTraceConfig = NoTracerConfig> = C extends CallTracerConfig ? DebugCallFrame : C extends PrestateTracerConfig ? PrestateResult : StructLoggerResult;
//#endregion
//#region src/extensions/debug/debugTraceBlockByHash.types.d.ts
type DebugTraceBlockByHashEntry<C extends DebugTraceConfig = NoTracerConfig> = {
  txHash: Hash;
  result: DebugTraceResult<C>;
};
type DebugTraceBlockByHashParams<C extends DebugTraceConfig = NoTracerConfig> = [blockHash: Hash, config?: C];
type DebugTraceBlockByHashResponse<C extends DebugTraceConfig = NoTracerConfig> = DebugTraceBlockByHashEntry<C>[];
//#endregion
//#region src/extensions/debug/debugTraceBlockByNumber.types.d.ts
type DebugTraceBlockByNumberEntry<C extends DebugTraceConfig = NoTracerConfig> = {
  txHash: Hash;
  result: DebugTraceResult<C>;
};
type DebugTraceBlockByNumberParams<C extends DebugTraceConfig = NoTracerConfig> = [blockNumber: DebugBlockTag, config?: C];
type DebugTraceBlockByNumberResponse<C extends DebugTraceConfig = NoTracerConfig> = DebugTraceBlockByNumberEntry<C>[];
//#endregion
//#region src/extensions/debug/debugTraceTransaction.types.d.ts
type DebugTraceTransactionParams<C extends DebugTraceConfig = NoTracerConfig> = [transactionHash: Hash, config?: C];
type DebugTraceTransactionResponse<C extends DebugTraceConfig = NoTracerConfig> = DebugTraceResult<C>;
//#endregion
//#region src/extensions/trace/types/shared.types.d.ts
/** Default block parameter supported by trace methods */
type TraceBlockTag = Hex | "latest" | "earliest" | "pending";
/** The type of call */
type TraceCallType = 'call' | 'callcode' | 'staticcall' | 'delegatecall';
/** The type of create */
type TraceCreateType = 'create' | 'create2';
/** The type of destruct */
type TraceDestructType = 'suicide' | 'selfdestruct';
/** The type of reward */
type TraceRewardType = 'block' | 'uncle';
//#endregion
//#region src/extensions/trace/types/actions.types.d.ts
type TraceCallAction = {
  /** The type of call */callType: TraceCallType; /** The address of the account that initiated the call */
  from: Address; /** The address of the contract that was called */
  to: Address; /** The amount of gas provided for the call */
  gas: Quantity; /** The input data of the call */
  input: Hex; /** The amount of value sent with the call */
  value: Quantity;
};
type TraceCreateAction = {
  /** The address of the account that initiated the creation */from: Address; /** The amount of gas provided for the creation */
  gas: Quantity; /** The code of the created contract */
  init: Hex; /** The amount of value sent with the creation */
  value: Quantity; /** The address of the created contract */
  creationMethod?: "create" | "create2";
};
type TraceSuicideAction = {
  /** The contract/address being self-destructed */address: Address; /** The contract's remaining balance */
  balance: Quantity; /** The address receiving funds */
  refundAddress: Address;
};
type TraceRewardAction = {
  /** The address of the author of the block */author: Address; /** The type of reward */
  rewardType: TraceRewardType; /** The amount of reward */
  value: Quantity;
};
//#endregion
//#region src/extensions/trace/types/results.types.d.ts
type TraceCallResult = {
  /** The amount of gas used by the call */gasUsed: Quantity; /** The output data of the call */
  output: "0x" | Hex;
};
type TraceCreateResult = {
  /** The address of the created contract */address: Address; /** The code of the created contract */
  code: Hex; /** The amount of gas used by the created contract */
  gasUsed: Quantity;
};
//#endregion
//#region src/extensions/trace/types/entries.types.d.ts
interface TraceEntryBase {
  /** The number of subtraces */
  subtraces: number;
  /** The trace address */
  traceAddress: number[];
}
interface TraceEntryBlockBase extends TraceEntryBase {
  /** The hash of the block */
  blockHash: Hash;
  /** The number of the block */
  blockNumber: number;
}
interface TraceEntryTxBase extends TraceEntryBlockBase {
  /** The hash of the transaction */
  transactionHash: Hash;
  /** The position of the transaction in the block */
  transactionPosition: number;
}
interface TraceCallEntry extends TraceEntryTxBase {
  /** The type of trace */
  type: "call";
  /** The action of the trace */
  action: TraceCallAction;
  /** The result of the trace (null if OOG/exception hard) */
  result: TraceCallResult | null;
  /** The error of the trace (if any) */
  error?: string;
}
interface TraceCreateEntry extends TraceEntryTxBase {
  /** The type of trace */
  type: "create" | "create2";
  /** The action of the trace */
  action: TraceCreateAction;
  /** The result of the trace (null if OOG/exception hard) */
  result: TraceCreateResult | null;
  /** The error of the trace (if any) */
  error?: string;
}
interface TraceSuicideEntry extends TraceEntryTxBase {
  /** The type of trace */
  type: "suicide" | "selfdestruct";
  /** The action of the trace */
  action: TraceSuicideAction;
  /** The result of the trace (null if OOG/exception hard) */
  result: null;
}
interface TraceRewardEntry extends TraceEntryBlockBase {
  /** The type of trace */
  type: "reward";
  /** The action of the trace */
  action: TraceRewardAction;
  /** The result of the trace (null if OOG/exception hard) */
  result: null;
}
//#endregion
//#region src/extensions/trace/traceBlock.types.d.ts
type TraceBlockParameters = [block: TraceBlockTag];
type TraceBlockResponse = (TraceCallEntry | TraceCreateEntry | TraceSuicideEntry | TraceRewardEntry)[];
//#endregion
//#region src/extensions/trace/traceFilter.types.d.ts
interface TraceFilterOptions {
  /** Start block (inclusive) */
  fromBlock?: TraceBlockTag;
  /** End block (inclusive) */
  toBlock?: TraceBlockTag;
  /** Filter by sender addresses */
  fromAddress?: Address[];
  /** Filter by destination addresses */
  toAddress?: Address[];
  /** Pagination offset */
  after?: number;
  /** Maximum number of traces to return */
  count?: number;
}
type TraceFilterParameters = [filter: TraceFilterOptions];
type TraceFilterResponse = (TraceCallEntry | TraceCreateEntry | TraceSuicideEntry | TraceRewardEntry)[];
//#endregion
//#region src/extensions/trace/traceTransaction.types.d.ts
type TraceTransactionParameters = [transactionHash: Hash];
type TraceTransactionResponse = (TraceCallEntry | TraceCreateEntry | TraceSuicideEntry)[];
//#endregion
//#region src/extensions/index.d.ts
declare function setupCustomRpcCalls(client: PublicClient): {
  traceBlock: (block: TraceBlockTag) => Promise<TraceBlockResponse>;
  traceFilter: (filter: TraceFilterOptions) => Promise<TraceFilterResponse>;
  traceTransaction: (transactionHash: `0x${string}`) => Promise<TraceTransactionResponse>;
  debugTraceBlockByHash: <C extends DebugTraceConfig>(blockHash: `0x${string}`, config?: C | undefined) => Promise<DebugTraceBlockByHashResponse<C>>;
  debugTraceBlockByNumber: <C extends DebugTraceConfig>(blockNumber: DebugBlockTag, config?: C | undefined) => Promise<DebugTraceBlockByNumberResponse<C>>;
  debugTraceTransaction: <C extends DebugTraceConfig>(transactionHash: `0x${string}`, config?: C | undefined) => Promise<DebugTraceResult<C>>;
  ethBlockNumber: (params: []) => Promise<EthBlockNumber.Result>;
  ethGetCode: (params: EthCode.Params) => Promise<EthCode.Result>;
  ethGetLogs: (params: {
    address: `0x${string}`;
    fromBlock: `0x${string}` | "latest" | "earliest" | "pending" | "finalized" | "safe";
    toBlock: `0x${string}` | "latest" | "earliest" | "pending" | "finalized" | "safe";
    topics?: `0x${string}`[];
  }) => Promise<{
    address: `0x${string}`;
    topics: `0x${string}`[];
    data: `0x${string}`;
    blockNumber: `0x${string}`;
    transactionHash: `0x${string}`;
    transactionIndex: `0x${string}`;
    blockHash: `0x${string}`;
    logIndex: `0x${string}`;
    removed: boolean;
  }[]>;
  ethGetBalance: (params: EthBalance.Params) => Promise<EthBalance.Result>;
  ethGetStorageAt: (params: EthGetStorageAt.Params) => Promise<EthGetStorageAt.Result>;
  ethGetBlockByNumber: (blockNumber: `0x${string}`, includeTransactions: boolean) => Promise<EthGetBlockByNumber>;
  ethGetBlockReceipts: (blockNumber: `0x${string}` | _$viem.BlockTag) => Promise<EthGetBlockReceipts>;
  ethGetTransactionByHash: (params: EthTransaction.Params) => Promise<EthTransaction.Result>;
  ethGetTransactionReceipt: (params: EthTransactionReceipt.Params) => Promise<EthTransactionReceipt.Result>;
};
//#endregion
export { CallTracerConfig, DebugBlockTag, DebugCallFrame, DebugCallType, DebugNamedTracerConfig, DebugTraceBlockByHashEntry, DebugTraceBlockByHashParams, DebugTraceBlockByHashResponse, DebugTraceBlockByNumberEntry, DebugTraceBlockByNumberParams, DebugTraceBlockByNumberResponse, DebugTraceConfig, DebugTraceResult, DebugTraceTransactionParams, DebugTraceTransactionResponse, type EthBalance, type EthBlockNumber, type EthCode, type EthGetBlockByNumber, type EthGetBlockReceipts, type EthGetLogs, type EthGetStorageAt, type EthTransaction, type EthTransactionReceipt, NoTracerConfig, PrestateAccount, PrestateResult, PrestateTracerConfig, StructLog, StructLoggerResult, TraceBlockParameters, TraceBlockResponse, TraceBlockTag, TraceCallAction, TraceCallEntry, TraceCallResult, TraceCallType, TraceCreateAction, TraceCreateEntry, TraceCreateResult, TraceCreateType, TraceDestructType, TraceEntryBlockBase, TraceEntryTxBase, TraceFilterOptions, TraceFilterParameters, TraceFilterResponse, TraceRewardAction, TraceRewardEntry, TraceRewardType, TraceSuicideAction, TraceSuicideEntry, TraceTransactionParameters, TraceTransactionResponse, setupCustomRpcCalls };
//# sourceMappingURL=extensions.d.cts.map