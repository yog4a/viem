import type { PublicClient } from 'viem';

import traceFilter from './traceFilter.js';

// Function
// ===========================================================

export function createTraceRpcCalls(client: PublicClient) {
    return {
        traceFilter: traceFilter(client),
    };
}
