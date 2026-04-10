import type { PublicClient } from 'viem';
import type { DebugTraceConfig } from "./types/tracer.types.js";
import type { DebugTraceTransactionParams, DebugTraceTransactionResponse } from './debugTraceTransaction.types.js';

// ===========================================================
// Schema
// ===========================================================

type Schema<C extends DebugTraceConfig> = {
    Method: "debug_traceTransaction";
    Parameters: DebugTraceTransactionParams<C>;
    ReturnType: DebugTraceTransactionResponse<C>;
};

// ===========================================================
// Function
// ===========================================================

export default function (client: PublicClient) {
    const method = "debug_traceTransaction";

    return async function <
        C extends DebugTraceConfig
    >(...params: Schema<C>['Parameters']): Promise<Schema<C>['ReturnType']> {
        const response = await client.request<Schema<C>>({
            method: method,
            params: params,
        });

        if (!response) {
            throw new Error(
                `No response from ${method} for ${JSON.stringify(params)}`,
            );
        }

        return response;
    };
}
