import type { Hash, Hex } from "viem";
import type { DebugTrace, DebugCall, DebugTraceCall, TracingOptions, DebugTraceCallOptions } from "../types/RpcDebugTrace.js";
import type { BlockReference } from "../../types.js";

// Schemas
// ===========================================================

/* The RPC schema for the debug API. */
export type DebugTraceSchema = {
    /**
     * @description Returns tracing results by executing all transactions in the block specified by the block hash
     * @returns {DebugTrace[]}
     */
    debug_traceBlockByHash: {
        Method: "debug_traceBlockByHash";
        Parameters: [
            blockHash: Hash,
            tracingOptions: TracingOptions,
        ];
        ReturnType: DebugTrace[];
    },
    /**
     * @description Returns tracing results by executing all transactions in the block specified by the block hash
     * @returns {DebugTrace[]}
     */
    debug_traceBlockByNumber: {
        Method: "debug_traceBlockByNumber";
        Parameters: [
            blockNumber: Hex,
            tracingOptions: TracingOptions,
        ];
        ReturnType: DebugTrace[];
    }
    /**
     * @description Returns tracing results by executing transaction specified by the transaction hash
     * @returns {DebugCall}
     */
    debug_traceTransaction: {
        Method: "debug_traceTransaction";
        Parameters: [
            transactionHash: Hash,
            tracingOptions: TracingOptions,
        ];
        ReturnType: DebugCall;
    },
    /**
     * @description Returns the tracing result by executing an eth call within the context of the given block execution
     * @returns {DebugTraceCall}
     */
    debug_traceCall: {
        Method: "debug_traceCall";
        Parameters: [
            call: DebugTraceCallOptions,
            blockReference: BlockReference,
            tracerObject: TracingOptions,
        ];
        ReturnType: DebugTraceCall;
    },
};
