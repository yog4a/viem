import type { PublicClient } from 'viem';

import debugTraceBlockByHash from './debugTraceBlockByHash.js';
import debugTraceBlockByNumber from './debugTraceBlockByNumber.js';
import debugTraceTransaction from './debugTraceTransaction.js';

// ===========================================================
// Function
// ===========================================================

export function setupDebugRpcCalls(client: PublicClient) {
    return { 
        debugTraceBlockByHash: debugTraceBlockByHash(client),
        debugTraceBlockByNumber: debugTraceBlockByNumber(client),  
        debugTraceTransaction: debugTraceTransaction(client),
    };
}
