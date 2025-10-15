// Types (Eth)
export type { EthBlockNumber } from './eth/ethBlockNumber.js';
export type { EthCode } from './eth/ethGetCode.js';
export type { EthGetLogs } from './eth/ethGetLogs.js';
export type { EthGetStorageAt } from './eth/ethGetStorageAt.js';
export type { EthBalance } from './eth/ethGetBalance.js';
export type { EthGetBlockByNumber } from './eth/ethGetBlockByNumber.js';
export type { EthBlockReceipts } from './eth/ethGetBlockReceipts.js';
export type { EthTransaction } from './eth/ethGetTransactionByHash.js';
export type { EthTransactionReceipt } from './eth/ethGetTransactionReceipt.js';

// Types
export type { DebugTraceBlockHash } from './debug/debugTraceBlockByHash.js';
export type { DebugTraceBlockNumber } from './debug/debugTraceBlockByNumber.js';
export type { DebugTraceTransaction } from './debug/debugTraceTransaction.js';

// Additional
export {  
  DebugCallType, 
  type DebugCall,
  type DebugTraceCall, 
  type DebugTraceCallOptions, 
  type TracingOptions 
} from './debug/types/RpcDebugTrace.js';
export { 
  type TraceFilterResult,
  type TraceFilterParams,
} from './trace/types/traceFilter.types.js';
export { 
  TraceType,
  TraceCallType,
} from './trace/types/enums.js';

// Common
export type BlockReference =
  | `0x${string}`
  | "earliest"
  | "latest"
  | "pending"
  | "safe"
  | "finalized";