import type { PublicClient } from 'viem';

import debugTraceBlockByHash from './debugTraceBlockByHash.js';
import debugTraceBlockByNumber from './debugTraceBlockByNumber.js';
import debugTraceTransaction from './debugTraceTransaction.js';

// Function
// ===========================================================

export function createDebugRpcCalls(client: PublicClient) {
    return {
        debugTraceBlockByNumber: debugTraceBlockByNumber(client),
        debugTraceBlockByHash: debugTraceBlockByHash(client),
        debugTraceTransaction: debugTraceTransaction(client),
    };
}
