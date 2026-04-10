import type { Hash } from "viem";
import type { DebugTraceConfig, NoTracerConfig, DebugTraceResult } from "./types/tracer.types.js";

// ============================================================================
// Parameters and response
// ============================================================================

export type DebugTraceTransactionParams<
    C extends DebugTraceConfig = NoTracerConfig,
> = [
    transactionHash: Hash,
    config?: C,
];

export type DebugTraceTransactionResponse<
    C extends DebugTraceConfig = NoTracerConfig,
> = DebugTraceResult<C>;
