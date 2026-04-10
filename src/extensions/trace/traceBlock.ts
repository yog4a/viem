import type { PublicClient } from 'viem';
import type { TraceBlockParameters, TraceBlockResponse } from './traceBlock.types.js';

// ===========================================================
// Schema
// ===========================================================

type Schema = {
    Method: "trace_block";
    Parameters: TraceBlockParameters;
    ReturnType: TraceBlockResponse;
};

// ===========================================================
// Function
// ===========================================================

export default function(client: PublicClient) {
    const method = 'trace_block';

    return async function(...params: Schema['Parameters']): Promise<Schema['ReturnType']> {
        const response = await client.request<Schema>({
            method: method,
            params: params,
        });
        
        if (!response) {
            throw new Error(
                `No response from ${method} for ${JSON.stringify(params)}`
            );
        }

        return response;
    }
}
