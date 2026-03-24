import type { PublicClient } from 'viem';
import type { TraceSchema } from './schemas/trace.schema.js';
import { TraceFilterParams, TraceFilterResult  } from './types/traceFilter.types.js';    

// Types
// ===========================================================

type Params = TraceFilterParams;
type Result = TraceFilterResult;

type Schema = TraceSchema['trace_filter'];

// Function
// ===========================================================

export default function(client: PublicClient): (params: Params) => Promise<Result> {
    const method = 'trace_filter';

    return async function(params: Params): Promise<Result> {
        const response = await client.request<Schema>({
            method: method,
            params: [params],
        });
        if (!response) {
            throw new Error(
                `No response from ${method} for ${JSON.stringify(params)}`
            );
        }
        return response;
    }
}