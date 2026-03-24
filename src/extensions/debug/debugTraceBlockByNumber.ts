import type { PublicClient } from 'viem';
import type { DebugTraceSchema } from './schemas/DebugTrace.schema.js';
import { DebugCall, TracingOptions } from './types/RpcDebugTrace.js';

// Types (external)
// ===========================================================

export namespace DebugTraceBlockNumber {
    export type Params = {
        blockNumber: `0x${string}`,
        tracerOptions: TracingOptions
    };
    export type Result = {
        type: "debug";
        results: Record<`0x${string}`, DebugCall>;
    };
};

// Types (local)
// ===========================================================

type Params = DebugTraceBlockNumber.Params;
type Result = DebugTraceBlockNumber.Result;
type Schema = DebugTraceSchema['debug_traceBlockByNumber'];

// Function
// ===========================================================

export default function(client: PublicClient): (params: Params) => Promise<Result> {
    const method = 'debug_traceBlockByNumber';

    return async function(params: Params): Promise<Result> {
        const { blockNumber, tracerOptions } = params;

        // Fetch the response
        const response = await client.request<Schema>({
            method: method,
            params: [blockNumber, tracerOptions],
        });

        // Check if the response is valid
        if (!response) {
            throw new Error(
                `No response from ${method} for ${JSON.stringify(params)}`
            );
        }

        const results: DebugTraceBlockNumber.Result['results'] = {};

        // Map traces by transaction hash
        for (const current of response) {
            const transactionHash = current.txHash.toLowerCase() as `0x${string}`;
            results[transactionHash] = current.result;
        }

        // Return the processed data
        return {
            type: "debug",
            results: results,
        };
    }
}
