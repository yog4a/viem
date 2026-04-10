import type { Hash } from "viem";
import type { DebugTraceConfig, NoTracerConfig, DebugTraceResult } from "./types/tracer.types.js";

// ============================================================================
// Parameters and response
// ============================================================================

export type DebugTraceBlockByHashEntry<
    C extends DebugTraceConfig = NoTracerConfig,
> = {
    txHash: Hash;
    result: DebugTraceResult<C>;
};


export type DebugTraceBlockByHashParams<
    C extends DebugTraceConfig = NoTracerConfig,
> = [
    blockHash: Hash,
    config?: C,
];

export type DebugTraceBlockByHashResponse<
    C extends DebugTraceConfig = NoTracerConfig,
> = DebugTraceBlockByHashEntry<C>[];