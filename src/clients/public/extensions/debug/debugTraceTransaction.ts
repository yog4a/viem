import type { PublicClient } from 'viem';
import type { DebugTraceSchema } from './schemas/DebugTrace.schema.js';
import { TracingOptions } from './types/RpcDebugTrace.js';
import { DebugCall } from './types/RpcDebugTrace.js';

// Types (external)
// ===========================================================

export namespace DebugTraceTransaction {
    export type Params = {
        transactionHash: `0x${string}`;
        tracerOptions: TracingOptions
    };
    export type Result = {
        type: "debug";
        result: DebugCall;
    };
};

// Types (local)
// ===========================================================

type Params = DebugTraceTransaction.Params;
type Result = DebugTraceTransaction.Result;
type Schema = DebugTraceSchema['debug_traceTransaction'];

// Function
// ===========================================================

export default function(client: PublicClient): (params: Params) => Promise<Result> {
    const method = 'debug_traceTransaction';

    return async function(params: Params): Promise<Result> {
        const { transactionHash, tracerOptions } = params;

        // Fetch the response
        const response = await client.request<Schema>({
            method: method,
            params: [transactionHash, tracerOptions],
        });

        // Check if the response is valid
        if (!response) {
            throw new Error(
                `No response from ${method} for ${JSON.stringify(params)}`
            );
        }

        // Return the processed data
        return {
            type: "debug",
            result: response,
        };
    }
}