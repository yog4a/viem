import type { Hex } from "viem";

// ============================================================================
// Shared Types
// ============================================================================

/** Default block parameter supported by trace methods */
export type TraceBlockTag = Hex | "latest" | "earliest" | "pending";

/** The type of call */
export type TraceCallType = 'call' | 'callcode' | 'staticcall' | 'delegatecall';

/** The type of create */
export type TraceCreateType = 'create' | 'create2';

/** The type of destruct */
export type TraceDestructType = 'suicide' | 'selfdestruct';

/** The type of reward */
export type TraceRewardType = 'block' | 'uncle';
