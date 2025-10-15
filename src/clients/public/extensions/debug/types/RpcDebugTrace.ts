import type { Address, Hash, Hex } from "viem";

// Types
// ===========================================================


/* The configuration for the tracing options. */
export type TracingOptions =
    | {
        tracer: 'callTracer';
        tracerConfig?: {
            /* When set to true, this will only trace the primary (top-level) call and not any sub-calls. */
            onlyTopCall?: boolean;
        };
    }
    | {
        tracer: 'prestateTracer';
        tracerConfig?: {
            /* When set to true, this will return the difference between the prestate and the poststate. */
            diffMode?: boolean;
        };
    };

/**
 * Transaction call object for debug_traceCall RPC.
 * Follows the eth_call object input shape with tracing extension.
 */
export type DebugTraceCallOptions = {
    /** The address the transaction is sent from */
    from?: Address;
    /** [REQUIRED] The address the transaction is directed to */
    to: Address;
    /** The integer of the gas provided for the transaction execution */
    gas?: Hex | bigint | number;
    /** The integer of the gasPrice used for each paid gas */
    gasPrice?: Hex | bigint | number;
    /** The integer of the value sent with this transaction */
    value?: Hex | bigint | number;
    /** The hash of the method signature and encoded parameters */
    data?: Hex;
};


/** Result type for geth style transaction trace. */
export type DebugTrace = {
  /** Transaction hash. */
  txHash: Hash;
  /** Trace results produced by the tracer.  */
  result: DebugCall;
};

/** The type of the call. */
export enum DebugCallType {
  CALL = 'CALL',
  CALLCODE = 'CALLCODE',
  CREATE = 'CREATE',
  CREATE2 = 'CREATE2',
  DELEGATECALL = 'DELEGATECALL',
  STATICCALL = 'STATICCALL',
  SELFDESTRUCT = 'SELFDESTRUCT',
  SUICIDE = 'SUICIDE'
}

/**
* The response object for `debug_traceBlockByNumber` and `debug_traceBlockByHash`
* with `"tracer": "callTracer"`.
*/
export type DebugCall = {
  /** The type of the call. */
  type: DebugCallType;
  /** The address of that initiated the call. */
  from: Address;
  /** The address of the contract that was called. */
  to?: Address;
  /** How much gas was left before the call. */
  gas: Hex;
  /** How much gas was used by the call. */
  gasUsed: Hex;
  /** Calldata input. */
  input: Hex;
  /** Output of the call, if any. */
  output?: Hex;
  /** Error message, if any. */
  error?: string;
  /** Why this call reverted, if it reverted. */
  revertReason?: string;
  /** Recorded child calls. */
  calls?: DebugCall[];
  /** Value transferred. */
  value?: Hex;
};

/**
 * @description Returns the tracing result by executing an eth_call within the context of the given block execution.
 */
export type DebugTraceCall = {
  /** Whether the transaction failed (true) or was successful (false) */
  failed: boolean;
  /** The total gas consumed in the transaction */
  gas: bigint | number;
  /** The return value of the executed contract call */
  returnValue: Hex;
  /** The trace result of each step */
  structLogs: Array<{
    /** The current index in bytecode */
    pc: number;
    /** The name of current executing operation */
    op: string;
    /** The available gas in the execution */
    gas: number;
    /** The gas cost of the operation */
    gasCost: number;
    /** The number of levels of calling functions */
    depth: number;
    /** The error of the execution, if any */
    error?: string;
    /** Current stack */
    stack?: Array<string>;
    /** Current memory */
    memory?: Array<string>;
    /** Storage mapping */
    storage?: Record<string, string>;
    /** Total of current refund value */
    refund?: number;
  }>;
};
