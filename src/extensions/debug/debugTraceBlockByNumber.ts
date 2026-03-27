import type { PublicClient } from 'viem';
import type { RpcDebugSchema } from './rpc.schema.js';

// ===========================================================
// Types
// ===========================================================

const method = 'debug_traceBlockByNumber' as const;

type RpcMethod = typeof method;

export type DebugTraceBlockByNumberParams = RpcDebugSchema[RpcMethod]['Parameters'];

export type DebugTraceBlockByNumber = RpcDebugSchema[RpcMethod]['ReturnType'];

// ===========================================================
// Function
// ===========================================================

export function call(client: PublicClient) {
    return (...params: DebugTraceBlockByNumberParams) =>
        client.request({ method, params } as any) as Promise<DebugTraceBlockByNumber>;
}
