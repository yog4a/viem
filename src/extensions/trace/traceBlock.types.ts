import type { TraceBlockTag } from "./types/shared.types.js";
import type { TraceCallEntry, TraceCreateEntry, TraceSuicideEntry, TraceRewardEntry } from "./types/entries.types.js";

// ============================================================================
// TRACE_BLOCK
// ============================================================================

export type TraceBlockParameters = [
    block: TraceBlockTag,
];

export type TraceBlockResponse = (
    | TraceCallEntry
    | TraceCreateEntry
    | TraceSuicideEntry
    | TraceRewardEntry
)[];
