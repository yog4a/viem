import { t as __name } from "./chunk-cy2TeOE5.cjs";
import * as viem from "viem";
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
//#region src/extensions/eth/ethGetBlockByNumber.d.ts
declare namespace EthGetBlockByNumber {
  type Params = {
    blockNumber: `0x${string}`;
    includeTransactions?: boolean;
  };
  type Result = {
    block: Omit<RpcBlock, 'transactions'>;
    transactions?: Record<`0x${string}`, RpcTransaction<false>>;
  };
}
//#endregion
//#region src/extensions/eth/ethGetBlockReceipts.d.ts
declare namespace EthBlockReceipts {
  type Params = {
    blockNumber: `0x${string}`;
  };
  type Result = {
    receipts: Record<`0x${string}`, RpcTransactionReceipt>;
  };
}
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
//#region src/extensions/trace/types/traceFilter.types.d.ts
/**
 * The filter object for trace filtering requests.
 */
type TraceFilterParams = {
  /** The block number or tag to start from (inclusive). */fromBlock?: Hex | number | string; /** The block number or tag to end at (inclusive). */
  toBlock?: Hex | number | string; /** Array of sender addresses to filter by. */
  fromAddress?: Address[]; /** Array of receiver addresses to filter by. */
  toAddress?: Address[]; /** Offset trace number (for pagination). */
  after?: number; /** Number of traces to display in a batch. */
  count?: number;
};
/**
 * The result returned from a trace_filter call.
 *
 * - `action` object varies by `type`:
 *   - For `"call"`, `"create"`, `"create2"`, `"reward"`: Standard fields.
 *   - For `"suicide"`: See `SuicideAction`.
 */
type TraceFilterResult = Array<{
  action: TraceAction;
  blockHash: Hash;
  blockNumber: number;
  result: TraceResult;
  subtraces: number;
  traceAddress: number[];
  transactionHash: Hash;
  transactionPosition: number;
  type: TraceType$1;
}>;
type TraceType$1 = "call" | "create" | "create2" | "suicide" | "reward";
/**
 * For non-suicide types, action includes typical call fields.
 * For `type = "suicide"`, action fields are:
 *  - address: `0x${string}`  (the contract/address being self-destructed)
 *  - balance: Hex-string of the contract's final balance
 *  - refundAddress: Address receiving the refund
 */
type TraceAction = {
  from: Address;
  callType?: TraceCallType$1;
  gas: Hex;
  input: Hex;
  init?: Hex;
  to: Address;
  value: Hex;
} | SuicideAction;
/** For type === "suicide" */
type SuicideAction = {
  address: Address;
  balance: Hex;
  refundAddress: Address;
};
type TraceResult = {
  gasUsed?: Hex;
  output?: Hex;
  code?: Hex;
};
type TraceCallType$1 = "call" | "delegatecall" | "staticcall" | "callcode";
//#endregion
//#region src/extensions/trace/types/enums.d.ts
/**
 * Trace types returned by OpenEthereum / Erigon trace APIs.
 */
declare enum TraceType {
  Call = "call",
  Create = "create",
  Create2 = "create2",
  Suicide = "suicide",
  Reward = "reward"
}
/**
 * Trace call types returned by OpenEthereum / Erigon trace APIs.
 */
declare enum TraceCallType {
  Call = "call",
  DelegateCall = "delegatecall",
  StaticCall = "staticcall",
  CallCode = "callcode"
}
//#endregion
//#region src/extensions/types.d.ts
type BlockReference = `0x${string}` | "earliest" | "latest" | "pending" | "safe" | "finalized";
//#endregion
//#region src/extensions/index.d.ts
declare function setupCustomRpcCalls(client: PublicClient): {
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
  ethGetBlockByNumber: (params: EthGetBlockByNumber.Params) => Promise<EthGetBlockByNumber.Result>;
  ethGetBlockReceipts: (params: EthBlockReceipts.Params) => Promise<EthBlockReceipts.Result>;
  ethGetTransactionByHash: (params: EthTransaction.Params) => Promise<EthTransaction.Result>;
  ethGetTransactionReceipt: (params: EthTransactionReceipt.Params) => Promise<EthTransactionReceipt.Result>;
  traceFilter: (params: TraceFilterParams) => Promise<TraceFilterResult>;
};
//#endregion
//#region src/extensions/debug/rpc.types.d.ts
type TracingOptions = {
  tracer: 'callTracer';
  tracerConfig?: {
    onlyTopCall?: boolean;
  };
} | {
  tracer: 'prestateTracer';
  tracerConfig?: {
    diffMode?: boolean;
  };
} | {
  tracer?: undefined;
  tracerConfig?: undefined;
};
/**
 * Transaction call object for debug_traceCall RPC.
 * Follows the eth_call object input shape with tracing extension.
 */
type DebugTraceCallOptions = {
  /** The address the transaction is sent from */from?: Address; /** [REQUIRED] The address the transaction is directed to */
  to: Address; /** The integer of the gas provided for the transaction execution */
  gas?: Quantity; /** The integer of the gasPrice used for each paid gas */
  gasPrice?: Quantity; /** The integer of the value sent with this transaction */
  value?: Quantity; /** The hash of the method signature and encoded parameters */
  data?: Hex;
};
/** Result type for geth style transaction trace. */
type DebugTrace = {
  /** Transaction hash. */txHash: Hash; /** Trace results produced by the tracer.  */
  result: DebugCall;
};
/** The type of the call. */
declare enum DebugCallType {
  CALL = "CALL",
  CALLCODE = "CALLCODE",
  CREATE = "CREATE",
  CREATE2 = "CREATE2",
  DELEGATECALL = "DELEGATECALL",
  STATICCALL = "STATICCALL",
  SELFDESTRUCT = "SELFDESTRUCT",
  SUICIDE = "SUICIDE"
}
/**
* The response object for `debug_traceBlockByNumber` and `debug_traceBlockByHash`
* with `"tracer": "callTracer"`.
*/
type DebugCall = {
  /** The type of the call. */type: DebugCallType; /** The address of that initiated the call. */
  from: Address; /** The address of the contract that was called. */
  to?: Address; /** How much gas was left before the call. */
  gas: Hex; /** How much gas was used by the call. */
  gasUsed: Hex; /** Calldata input. */
  input: Hex; /** Output of the call, if any. */
  output?: Hex; /** Error message, if any. */
  error?: string; /** Why this call reverted, if it reverted. */
  revertReason?: string; /** Recorded child calls. */
  calls?: DebugCall[]; /** Value transferred. */
  value?: Hex;
};
/**
 * @description Returns the tracing result by executing an eth_call within the context of the given block execution.
 */
type DebugTraceCall = {
  /** Whether the transaction failed (true) or was successful (false) */failed: boolean; /** The total gas consumed in the transaction */
  gas: bigint | number; /** The return value of the executed contract call */
  returnValue: Hex; /** The trace result of each step */
  structLogs: Array<{
    /** The current index in bytecode */pc: number; /** The name of current executing operation */
    op: string; /** The available gas in the execution */
    gas: number; /** The gas cost of the operation */
    gasCost: number; /** The number of levels of calling functions */
    depth: number; /** The error of the execution, if any */
    error?: string; /** Current stack */
    stack?: Array<string>; /** Current memory */
    memory?: Array<string>; /** Storage mapping */
    storage?: Record<string, string>; /** Total of current refund value */
    refund?: number;
  }>;
};
//#endregion
//#region src/extensions/debug/index.d.ts
declare function createDebugRpcCalls(client: PublicClient): {
  debugTraceBlock: (params: [block: `0x${string}`, tracingOptions: TracingOptions]) => Promise<DebugCall[]>;
  debugTraceBlockByNumber: (params: [blockNumber: `0x${string}` | viem.BlockTag, tracingOptions: TracingOptions]) => Promise<(DebugCall | DebugTrace)[]>;
  debugTraceBlockByHash: (params: [blockHash: `0x${string}`, tracingOptions: TracingOptions]) => Promise<(DebugCall | DebugTrace)[]>;
  debugTraceTransaction: (params: [transactionHash: `0x${string}`, tracingOptions: TracingOptions]) => Promise<DebugCall>;
  debugTraceCall: (params: [call: DebugTraceCallOptions, blockReference: `0x${string}` | viem.BlockTag, tracerObject: TracingOptions]) => Promise<DebugTraceCall>;
};
//#endregion
//#region src/extensions/trace/index.d.ts
declare function createTraceRpcCalls(client: PublicClient): {
  traceFilter: (params: TraceFilterParams) => Promise<TraceFilterResult>;
};
//#endregion
export { BlockReference, type EthBalance, type EthBlockNumber, type EthBlockReceipts, type EthCode, type EthGetBlockByNumber, type EthGetLogs, type EthGetStorageAt, type EthTransaction, type EthTransactionReceipt, type SuicideAction, type TraceAction, TraceCallType, type TraceFilterParams, type TraceFilterResult, TraceType, createDebugRpcCalls, createTraceRpcCalls, setupCustomRpcCalls };
//# sourceMappingURL=extensions.d.cts.map