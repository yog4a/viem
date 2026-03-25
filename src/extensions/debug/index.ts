import type { PublicClient } from 'viem';
import type { RpcDebugSchema } from './rpc.schema.js';

// ===========================================================
// Types
// ===========================================================

type RpcDebugMethod = keyof RpcDebugSchema & string;

type RpcDebugParams<TMethod extends RpcDebugMethod> = RpcDebugSchema[TMethod]['Parameters'];

type RpcDebugResult<TMethod extends RpcDebugMethod> = RpcDebugSchema[TMethod]['ReturnType'];

// ===========================================================
// Factory
// ===========================================================

function bindSchemaMethod<TMethod extends RpcDebugMethod>(
    client: PublicClient,
    method: TMethod,
): (params: RpcDebugParams<TMethod>) => Promise<RpcDebugResult<TMethod>> {
    return (params) => 
        client.request({ method, params } as any) as Promise<RpcDebugResult<TMethod>>;
}

// ===========================================================
// Function
// ===========================================================

export function setupDebugRpcCalls(client: PublicClient) {
    return {
        debugTraceBlock: bindSchemaMethod(client, 'debug_traceBlock'),
        debugTraceBlockByNumber: bindSchemaMethod(client, 'debug_traceBlockByNumber'),
        debugTraceBlockByHash: bindSchemaMethod(client, 'debug_traceBlockByHash'),
        debugTraceTransaction: bindSchemaMethod(client, 'debug_traceTransaction'),
        debugTraceCall: bindSchemaMethod(client, 'debug_traceCall'),
    };
}
