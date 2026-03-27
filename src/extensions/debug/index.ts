import type { PublicClient } from 'viem';

import { call as debugTraceBlock } from './debugTraceBlock.js';
import { call as debugTraceBlockByNumber } from './debugTraceBlockByNumber.js';
import { call as debugTraceBlockByHash } from './debugTraceBlockByHash.js';
import { call as debugTraceTransaction } from './debugTraceTransaction.js';
import { call as debugTraceCall } from './debugTraceCall.js';

// ===========================================================
// Function
// ===========================================================

export function setupDebugRpcCalls(client: PublicClient) {
    return {
        debugTraceBlock: debugTraceBlock(client),
        debugTraceBlockByNumber: debugTraceBlockByNumber(client),   
        debugTraceBlockByHash: debugTraceBlockByHash(client),
        debugTraceTransaction: debugTraceTransaction(client),
        debugTraceCall: debugTraceCall(client),
    };
}
