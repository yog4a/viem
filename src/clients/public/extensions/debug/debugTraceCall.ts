// import type { PublicClient } from 'viem';
// import type { DebugTraceSchema} from './schemas/DebugTrace.schema.js';
// import type { BlockReference } from '../types.js';
// import type { DebugTraceCall, DebugTraceCallOptions, TracingOptions } from './types/RpcDebugTrace.js';

// // Types (external)
// // ===========================================================

// export namespace DebugTraceCall {
//     export type Params = {
//         call: DebugTraceCallOptions,
//         blockReference: BlockReference,
//         tracerObject: TracingOptions,
//     };
//     export type Result = {
//         type: "debug";
//         result: DebugTraceCall;   
//     };
// };

// // Types (local)
// // ===========================================================

// type Params = DebugTraceCall.Params;
// type Result = DebugTraceCall.Result;
// type Schema = DebugTraceSchema['debug_traceCall'];

// // Function
// // ===========================================================

// export default function(client: PublicClient): (params: Params) => Promise<Result> {
//     const method = 'debug_traceCall';

//     return async function(params: Params): Promise<Result> {
//         const { call, blockReference, tracerObject } = params;

//         // Fetch the response
//         const response = await client.request<Schema>({
//             method: method,
//             params: [call, blockReference, tracerObject],
//         });

//         // Check if the response is valid
//         if (!response) {
//             throw new Error(
//                 `No response from ${method} for ${JSON.stringify(params)}`
//             );
//         }

//         // Return the processed data
//         return {
//             type: "debug",
//             result: response,
//         };
//     }
// }