import type { Hash } from "viem";
import type { TraceCallAction, TraceCreateAction, TraceSuicideAction, TraceRewardAction } from "./actions.types.js";
import type { TraceCallResult, TraceCreateResult } from "./results.types.js";

// ============================================================================
// Trace Entry Base Types
// ============================================================================

interface TraceEntryBase {
  /** The number of subtraces */
  subtraces: number;
  /** The trace address */
  traceAddress: number[];
};

export interface TraceEntryBlockBase extends TraceEntryBase {
  /** The hash of the block */
  blockHash: Hash;
  /** The number of the block */
  blockNumber: number;
};

export interface TraceEntryTxBase extends TraceEntryBlockBase {
  /** The hash of the transaction */
  transactionHash: Hash;
  /** The position of the transaction in the block */
  transactionPosition: number;
};

// ============================================================================
// ENTRIES (discriminated union on `type`)
// ============================================================================

export interface TraceCallEntry extends TraceEntryTxBase {
  /** The type of trace */
  type: "call";
  /** The action of the trace */
  action: TraceCallAction;
  /** The result of the trace (null if OOG/exception hard) */
  result: TraceCallResult | null;
  /** The error of the trace (if any) */
  error?: string;
}

export interface TraceCreateEntry extends TraceEntryTxBase {
  /** The type of trace */
  type: "create" | "create2";
  /** The action of the trace */
  action: TraceCreateAction;
  /** The result of the trace (null if OOG/exception hard) */
  result: TraceCreateResult | null;
  /** The error of the trace (if any) */
  error?: string;
}

export interface TraceSuicideEntry extends TraceEntryTxBase {
  /** The type of trace */
  type: "suicide" | "selfdestruct";
  /** The action of the trace */
  action: TraceSuicideAction;
  /** The result of the trace (null if OOG/exception hard) */
  result: null;
}

export interface TraceRewardEntry extends TraceEntryBlockBase {
  /** The type of trace */
  type: "reward";
  /** The action of the trace */
  action: TraceRewardAction;
  /** The result of the trace (null if OOG/exception hard) */
  result: null;
}
