import type { Hash, Hex, BlockTag } from "viem";
import type { DebugTrace, DebugCall, DebugTraceCall, TracingOptions, DebugTraceCallOptions } from "./rpc.types.js";

// Schemas
// ===========================================================

/* The RPC schema for the debug API. */
export type RpcDebugSchema = {
    /**
     * @description Returns tracing results by executing all transactions in the provided RLP encoded block
     * @returns {DebugCall[]}
     */
    debug_traceBlock: {
        Method: "debug_traceBlock";
        Parameters: [
            block: Hex,
            tracingOptions: TracingOptions,
        ];
        ReturnType: DebugCall[];
    },
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
        ReturnType: Array<DebugTrace | DebugCall>;
    },
    /**
     * @description Returns tracing results by executing all transactions in the block specified by the block hash
     * @returns {DebugTrace[]}
     */
    debug_traceBlockByNumber: {
        Method: "debug_traceBlockByNumber";
        Parameters: [
            blockNumber: Hex | BlockTag,
            tracingOptions: TracingOptions,
        ];
        ReturnType: Array<DebugTrace | DebugCall>;
    },
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
            blockReference: Hex | BlockTag,
            tracerObject: TracingOptions,
        ];
        ReturnType: DebugTraceCall;
    },
};
