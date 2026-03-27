import type { PublicClient } from 'viem';
import type { RpcDebugSchema } from './rpc.schema.js';

// ===========================================================
// Types
// ===========================================================

const method = 'debug_traceBlock' as const;

type RpcMethod = typeof method;

export type DebugTraceBlockParams = RpcDebugSchema[RpcMethod]['Parameters'];

export type DebugTraceBlock = RpcDebugSchema[RpcMethod]['ReturnType'];

// ===========================================================
// Function
// ===========================================================

export function call(client: PublicClient) {
    return (...params: DebugTraceBlockParams) =>
        client.request({ method, params } as any) as Promise<DebugTraceBlock>;
}