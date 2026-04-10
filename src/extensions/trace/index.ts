import type { PublicClient } from 'viem';

import traceBlock from './traceBlock.js';
import traceFilter from './traceFilter.js';
import traceTransaction from './traceTransaction.js';

// ===========================================================
// Function
// ===========================================================

export function setupTraceRpcCalls(client: PublicClient) {
    return {
        traceBlock: traceBlock(client),
        traceFilter: traceFilter(client),
        traceTransaction: traceTransaction(client),
    };
}
