import type { PublicClient } from 'viem';

import debugTraceBlockByNumber from './debugTraceBlockByNumber.js';
import debugTraceBlockByHash from './debugTraceBlockByHash.js';
import debugTraceTransaction from './debugTraceTransaction.js';

// ===========================================================
// Function
// ===========================================================

export function setupDebugRpcCalls(client: PublicClient) {
    return {
        debugTraceBlockByNumber: debugTraceBlockByNumber(client),   
        debugTraceBlockByHash: debugTraceBlockByHash(client),
        debugTraceTransaction: debugTraceTransaction(client),
    };
}
