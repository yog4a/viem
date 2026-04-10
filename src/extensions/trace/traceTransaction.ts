import type { PublicClient } from 'viem';
import type { TraceTransactionParameters, TraceTransactionResponse } from './traceTransaction.types.js';

// ===========================================================
// Schema
// ===========================================================

type Schema = {
    Method: "trace_transaction";
    Parameters: TraceTransactionParameters;
    ReturnType: TraceTransactionResponse;
};

// ===========================================================
// Function
// ===========================================================

export default function(client: PublicClient) {
    const method = 'trace_transaction';

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
