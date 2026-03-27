import type { PublicClient } from 'viem';
import type { RpcDebugSchema } from './rpc.schema.js';

// ===========================================================
// Types
// ===========================================================

const method = 'debug_traceCall' as const;

type RpcMethod = typeof method;

export type DebugTraceCallParams = RpcDebugSchema[RpcMethod]['Parameters'];

export type DebugTraceCall = RpcDebugSchema[RpcMethod]['ReturnType'];

// ===========================================================
// Function
// ===========================================================

export function call(client: PublicClient) {
    return (...params: DebugTraceCallParams) =>
        client.request({ method, params } as any) as Promise<DebugTraceCall>;
}
