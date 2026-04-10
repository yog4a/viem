import type { PublicClient } from 'viem';
import type { DebugTraceConfig } from "./types/tracer.types.js";
import type { DebugTraceBlockByHashParams, DebugTraceBlockByHashResponse } from './debugTraceBlockByHash.types.js';

// ===========================================================
// Schema
// ===========================================================

type Schema<C extends DebugTraceConfig> = {
    Method: "debug_traceBlockByHash";
    Parameters: DebugTraceBlockByHashParams<C>;
    ReturnType: DebugTraceBlockByHashResponse<C>;
};

// ===========================================================
// Function
// ===========================================================

export default function (client: PublicClient) {
    const method = "debug_traceBlockByHash";

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
