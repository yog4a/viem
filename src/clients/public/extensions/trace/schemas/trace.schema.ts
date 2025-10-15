import type { Hash, Hex } from "viem";
import type { TraceFilterParams, TraceFilterResult } from "../types/traceFilter.types.js";

// Schemas
// ===========================================================

/* The RPC schema for the debug API. */
export type TraceSchema = {
    /**
     * @description Returns tracing results by executing all transactions in the block specified by the block hash
     * @param {TraceFilterParams} tracingOptions
     * @returns {TraceFilterResult}
     */
    trace_filter: {
        Method: "trace_filter";
        Parameters: [
            tracingOptions: TraceFilterParams,
        ];
        ReturnType: TraceFilterResult;
    },
};