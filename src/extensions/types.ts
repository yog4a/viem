// Types (Eth)
export * from './eth/types.js';
export * from './debug/types.js';


export { 
  type TraceFilterResult,
  type TraceFilterParams,
  type TraceAction,
  type SuicideAction,
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
