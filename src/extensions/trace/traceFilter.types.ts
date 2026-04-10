import type { Address } from "viem";
import type { TraceBlockTag } from "./types/shared.types.js";
import type { TraceCallEntry, TraceCreateEntry, TraceSuicideEntry, TraceRewardEntry } from "./types/entries.types.js";

// ============================================================================
// TRACE_FILTER
// ============================================================================

export interface TraceFilterOptions {
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

export type TraceFilterParameters = [
    filter: TraceFilterOptions,
];

export type TraceFilterResponse = (
    | TraceCallEntry
    | TraceCreateEntry
    | TraceSuicideEntry
    | TraceRewardEntry
)[];