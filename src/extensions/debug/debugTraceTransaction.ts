import type { PublicClient } from 'viem';
import type { RpcDebugSchema } from './rpc.schema.js';

// ===========================================================
// Types
// ===========================================================

const method = 'debug_traceTransaction' as const;

type RpcMethod = typeof method;

type RpcParams = RpcDebugSchema[RpcMethod]['Parameters'];

type RpcResult = RpcDebugSchema[RpcMethod]['ReturnType'];

// ===========================================================
// Function
// ===========================================================

function call(client: PublicClient) {
    return (...params: RpcParams) =>
        client.request({ method, params } as any) as Promise<RpcResult>;
}

// ===========================================================
// Export
// ===========================================================

export {
    call,
    type RpcParams as DebugTraceTransactionParams,
    type RpcResult as DebugTraceTransaction,
};