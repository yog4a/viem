import type { PublicClient } from 'viem';
import type { RpcDebugSchema } from './rpc.schema.js';

// ===========================================================
// Types
// ===========================================================

const method = 'debug_traceBlockByHash' as const;

type RpcMethod = typeof method;

export type DebugTraceBlockByHashParams = RpcDebugSchema[RpcMethod]['Parameters'];

export type DebugTraceBlockByHash = RpcDebugSchema[RpcMethod]['ReturnType'];

// ===========================================================
// Function
// ===========================================================

export function call(client: PublicClient) {
    return (...params: DebugTraceBlockByHashParams) =>
        client.request({ method, params } as any) as Promise<DebugTraceBlockByHash>;
}