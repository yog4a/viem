import type { Hash } from "viem";
import type { TraceCallEntry, TraceCreateEntry, TraceSuicideEntry } from "./types/entries.types.js";

// ============================================================================
// TRACE_TRANSACTION
// ============================================================================

export type TraceTransactionParameters = [
    transactionHash: Hash,
];

export type TraceTransactionResponse = (
    | TraceCallEntry
    | TraceCreateEntry
    | TraceSuicideEntry
)[];
