import type { Hash } from "viem";
import type { TraceCallAction, TraceCreateAction, TraceSuicideAction, TraceRewardAction } from "./actions.types.js";
import type { TraceCallResult, TraceCreateResult } from "./results.types.js";

// ============================================================================
// BASE
// ============================================================================

interface TraceEntry {
  /** The number of subtraces */
  subtraces: number;
  /** The trace address */
  traceAddress: number[];
  /** The error of the trace (if any) */
  error?: string;
};

interface TraceBlockEntry extends TraceEntry {
  /** The hash of the block */
  blockHash: Hash;
  /** The number of the block */
  blockNumber: number;
};

interface TraceTxEntry extends TraceBlockEntry {
  /** The hash of the transaction */
  transactionHash: Hash;
  /** The position of the transaction in the block */
  transactionPosition: number;
};

// ============================================================================
// ENTRIES
// ============================================================================

export interface TraceCallEntry extends TraceTxEntry {
  /** The type of trace */
  type: "call";
  /** The action of the trace */
  action: TraceCallAction;
  /** The result of the trace (null if OOG/exception hard) */
  result: TraceCallResult | null;
}

export interface TraceCreateEntry extends TraceTxEntry {
  /** The type of trace */
  type: "create";
  /** The action of the trace */
  action: TraceCreateAction;
  /** The result of the trace (null if OOG/exception hard) */
  result: TraceCreateResult | null;
}

export interface TraceSuicideEntry extends TraceTxEntry {
  /** The type of trace */
  type: "suicide";
  /** The action of the trace */
  action: TraceSuicideAction;
  /** The result of the trace */
  result: null;
}

export interface TraceRewardEntry extends TraceBlockEntry {
  /** The type of trace */
  type: "reward";
  /** The action of the trace */
  action: TraceRewardAction;
  /** The result of the trace */
  result: null;
}
