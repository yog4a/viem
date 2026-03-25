import type { PublicClient } from 'viem';
import { setupEthRpcCalls } from './eth/index.js';
import { setupDebugRpcCalls } from './debug/index.js';

// Function
// ===========================================================

export function setupCustomRpcCalls(client: PublicClient) {
    return {
        ...setupEthRpcCalls(client),
        ...setupDebugRpcCalls(client),
    };
}
