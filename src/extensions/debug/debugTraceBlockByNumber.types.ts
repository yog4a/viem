import type { Hash } from "viem";
import type { DebugBlockTag } from "./types/shared.types.js";
import type { DebugTraceConfig, NoTracerConfig, DebugTraceResult } from "./types/tracer.types.js";

// ============================================================================
// Parameters and response
// ============================================================================

export type DebugTraceBlockByNumberEntry<
    C extends DebugTraceConfig = NoTracerConfig,
> = {
    /** Transaction hash. */
    txHash: Hash;
    /** Trace results produced by the tracer. */
    result: DebugTraceResult<C>;
};

export type DebugTraceBlockByNumberParams<
    C extends DebugTraceConfig = NoTracerConfig,
> = [
    blockNumber: DebugBlockTag,
    config?: C,
];

export type DebugTraceBlockByNumberResponse<
    C extends DebugTraceConfig = NoTracerConfig,
> = DebugTraceBlockByNumberEntry<C>[];
