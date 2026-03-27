import type { PublicClient, Hex, BlockTag } from 'viem';
import type { TracingOptions } from './rpc.types.js';
import type { DebugTrace } from './rpc.types.js';

// ===========================================================
// Schema
// ===========================================================

type Schema = {
    Method: "debug_traceBlockByNumber";
    Parameters: [
        blockNumber: Hex | BlockTag,
        tracingOptions: TracingOptions,
    ];
    ReturnType: Array<DebugTrace>;
};

// ===========================================================
// Types (external)
// ===========================================================

export type DebugTraceBlockByNumber = {
    result: Record<`0x${string}`, DebugTrace>;
};

// ===========================================================
// Function
// ===========================================================

export default function(client: PublicClient) {
    const method = 'debug_traceBlockByNumber';

    return async function(...params: Schema['Parameters']): Promise<DebugTraceBlockByNumber> {
        // Fetch the response
        const response = await client.request<Schema>({
            method: method,
            params: params,
        });

        // Check if the response is valid
        if (!response) {
            throw new Error(
                `No response from ${method} for ${JSON.stringify(params)}`
            );
        }

        // Result
        let result: DebugTraceBlockByNumber['result'] = {};

        // Map traces by transaction hash
        for (const current of response) {
            const transactionHash = current.txHash.toLowerCase() as `0x${string}`;
            result[transactionHash] = current;
        }

        // Return the processed data
        return {
            result: result,
        };
    }
}
