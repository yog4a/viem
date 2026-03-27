import type { PublicClient, Hash } from 'viem';
import type { TracingOptions } from './rpc.types.js';
import type { DebugCall } from './rpc.types.js';

// ===========================================================
// Schema
// ===========================================================

type Schema = {
    Method: "debug_traceTransaction";
    Parameters: [
        transactionHash: Hash,
        tracingOptions: TracingOptions,
    ];
    ReturnType: DebugCall;
};

// ===========================================================
// Types (external)
// ===========================================================

export type DebugTraceTransaction = {
    txHash: Hash;
    result: DebugCall;
};

// ===========================================================
// Function
// ===========================================================

export default function(client: PublicClient) {
    const method = 'debug_traceTransaction';

    return async function(...params: Schema['Parameters']): Promise<DebugTraceTransaction> {
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
        let result: DebugTraceTransaction['result'] = response;

        // Return the processed data
        return {
            txHash: params[0],
            result: result,
        };
    }
}
