import { Chain, WebSocketTransportConfig, RpcBlock, RpcTransaction, RpcTransactionReceipt, Address, Hex, Hash, PublicClient, HttpTransport, WebSocketTransport, HttpTransportConfig, RpcLog } from 'viem';
import { Chain as Chain$1 } from 'viem/chains';

declare class WebsocketClient extends Client<'websocket'> {
    constructor(params: WebsocketClient.Parameters);
}
declare namespace WebsocketClient {
    interface Provider {
        name: string;
        url: `ws://${string}` | `wss://${string}`;
        type: 'debug' | 'trace';
    }
    interface Parameters {
        chain: number | Chain;
        provider: Provider;
        transportConfig?: WebSocketTransportConfig;
        debug?: boolean;
    }
}

declare namespace EthBlockNumber {
    type Params = [];
    type Result = {
        hexBlockNumber: `0x${string}`;
        bigBlockNumber: bigint;
        blockNumber: `${bigint}`;
    };
}

declare namespace EthCode {
    type Params = {
        address: `0x${string}`;
        blockNumber?: `0x${string}`;
        blockTag?: 'latest' | 'earliest' | 'pending';
    };
    type Result = {
        bytecode: `0x${string}`;
    };
}

type Schema = {
    Method: "eth_getLogs";
    Parameters: [
        {
            address: `0x${string}`;
            fromBlock: `0x${string}` | 'latest' | 'earliest' | 'pending' | 'finalized' | 'safe';
            toBlock: `0x${string}` | 'latest' | 'earliest' | 'pending' | 'finalized' | 'safe';
            topics?: `0x${string}`[];
        }
    ];
    ReturnType: Array<{
        address: `0x${string}`;
        topics: `0x${string}`[];
        data: `0x${string}`;
        blockNumber: `0x${string}`;
        transactionHash: `0x${string}`;
        transactionIndex: `0x${string}`;
        blockHash: `0x${string}`;
        logIndex: `0x${string}`;
        removed: boolean;
    }>;
};
declare namespace EthGetLogs {
    const method = "eth_getLogs";
    type Params = Schema['Parameters'][0];
    type Result = Schema['ReturnType'];
}

declare namespace EthGetStorageAt {
    type Params = {
        address: `0x${string}`;
        position: `0x${string}`;
        blockNumber: `0x${string}` | 'latest' | 'earliest' | 'pending' | 'finalized' | 'safe';
    };
    type Result = {
        storage: `0x${string}`;
    };
}

declare namespace EthBalance {
    type Params = {
        address: `0x${string}`;
        blockNumber: `0x${string}`;
    };
    type Result = {
        hexValue: `0x${string}`;
        weiValue: `${bigint}`;
        value: `${number}`;
        currency: {
            name: string;
            symbol: string;
            decimals: number;
        };
    };
}

declare namespace EthGetBlockByNumber {
    type Params = {
        blockNumber: `0x${string}`;
        includeTransactions?: boolean;
    };
    type Result = {
        block: Omit<RpcBlock, 'transactions'>;
        transactions?: Record<`0x${string}`, RpcTransaction<false>>;
    };
}

declare namespace EthBlockReceipts {
    type Params = {
        blockNumber: `0x${string}`;
    };
    type Result = {
        receipts: Record<`0x${string}`, RpcTransactionReceipt>;
    };
}

declare namespace EthTransaction {
    type Params = {
        transactionHash: `0x${string}`;
    };
    type Result = {
        hash: `0x${string}`;
        transaction: RpcTransaction<false>;
    };
}

declare namespace EthTransactionReceipt {
    type Params = {
        transactionHash: `0x${string}`;
    };
    type Result = {
        hash: `0x${string}`;
        transaction: RpcTransactionReceipt;
    };
}

type TracingOptions = {
    tracer: 'callTracer';
    tracerConfig?: {
        onlyTopCall?: boolean;
    };
} | {
    tracer: 'prestateTracer';
    tracerConfig?: {
        diffMode?: boolean;
    };
};
/**
 * Transaction call object for debug_traceCall RPC.
 * Follows the eth_call object input shape with tracing extension.
 */
type DebugTraceCallOptions = {
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
/** The type of the call. */
declare enum DebugCallType {
    CALL = "CALL",
    CALLCODE = "CALLCODE",
    CREATE = "CREATE",
    CREATE2 = "CREATE2",
    DELEGATECALL = "DELEGATECALL",
    STATICCALL = "STATICCALL",
    SELFDESTRUCT = "SELFDESTRUCT",
    SUICIDE = "SUICIDE"
}
/**
* The response object for `debug_traceBlockByNumber` and `debug_traceBlockByHash`
* with `"tracer": "callTracer"`.
*/
type DebugCall = {
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
type DebugTraceCall = {
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

declare namespace DebugTraceBlockHash {
    type Params = {
        blockHash: `0x${string}`;
        tracerOptions: TracingOptions;
    };
    type Result = {
        type: "debug";
        results: Record<`0x${string}`, DebugCall>;
    };
}

declare namespace DebugTraceBlockNumber {
    type Params = {
        blockNumber: `0x${string}`;
        tracerOptions: TracingOptions;
    };
    type Result = {
        type: "debug";
        results: Record<`0x${string}`, DebugCall>;
    };
}

declare namespace DebugTraceTransaction {
    type Params = {
        transactionHash: `0x${string}`;
        tracerOptions: TracingOptions;
    };
    type Result = {
        type: "debug";
        result: DebugCall;
    };
}

/**
 * The filter object for trace filtering requests.
 */
type TraceFilterParams = {
    /** The block number or tag to start from (inclusive). */
    fromBlock?: Hex | number | string;
    /** The block number or tag to end at (inclusive). */
    toBlock?: Hex | number | string;
    /** Array of sender addresses to filter by. */
    fromAddress?: Address[];
    /** Array of receiver addresses to filter by. */
    toAddress?: Address[];
    /** Offset trace number (for pagination). */
    after?: number;
    /** Number of traces to display in a batch. */
    count?: number;
};
/**
 * The result returned from a trace_filter call.
 *
 * Returns:
 *   array: The block traces, with each object having the following fields:
 *     - action: ParityTraceAction object, with:
 *         - from: Address of the sender
 *         - callType: Type of method such as call, delegatecall
 *         - gas: Gas provided by the sender (hexadecimal)
 *         - input: Data sent along with the transaction
 *         - to: Address of the receiver
 *         - value: Value sent with this transaction (hexadecimal)
 *     - blockHash: Hash of the block this transaction was in
 *     - blockNumber: Block number (hexadecimal)
 *     - result: ParityTraceResult object, with:
 *         - gasUsed: Amount of gas used (hexadecimal)
 *         - output: Value returned by the contract call, empty bytes if RETURN not executed
 *     - subtraces: Number of child traces from this call (number)
 *     - traceAddress: Array of numbers indicating call nesting depth/position
 *     - transactionHash: Hash of the transaction
 *     - transactionPosition: Position of transaction in the block (number)
 *     - type: Method type (call, create, reward, etc.)
 */
type TraceFilterResult = Array<{
    action: {
        from: Address;
        callType?: TraceCallType$1;
        gas: Hex;
        input: Hex;
        init: Hex;
        to: Address;
        value: Hex;
    };
    blockHash: Hash;
    blockNumber: number;
    result: {
        gasUsed: Hex;
        output: Hex;
        code: Hex;
    };
    subtraces: number;
    traceAddress: Address[];
    transactionHash: Hash;
    transactionPosition: number;
    type: TraceType$1;
}>;
/**
 * Trace types returned by OpenEthereum / Erigon trace APIs.
 */
type TraceType$1 = "call" | "create" | "create2" | "suicide" | "reward";
type TraceCallType$1 = "call" | "delegatecall" | "staticcall" | "callcode";

/**
 * Trace types returned by OpenEthereum / Erigon trace APIs.
 */
declare enum TraceType {
    Call = "call",
    Create = "create",
    Create2 = "create2",
    Suicide = "suicide",
    Reward = "reward"
}
/**
 * Trace call types returned by OpenEthereum / Erigon trace APIs.
 */
declare enum TraceCallType {
    Call = "call",
    DelegateCall = "delegatecall",
    StaticCall = "staticcall",
    CallCode = "callcode"
}

type BlockReference = `0x${string}` | "earliest" | "latest" | "pending" | "safe" | "finalized";

declare function setupCustomCalls(client: PublicClient): {
    ethBlockNumber: (params: []) => Promise<EthBlockNumber.Result>;
    ethGetCode: (params: EthCode.Params) => Promise<EthCode.Result>;
    ethGetLogs: (params: {
        address: `0x${string}`;
        fromBlock: `0x${string}` | "latest" | "earliest" | "pending" | "finalized" | "safe";
        toBlock: `0x${string}` | "latest" | "earliest" | "pending" | "finalized" | "safe";
        topics?: `0x${string}`[];
    }) => Promise<{
        address: `0x${string}`;
        topics: `0x${string}`[];
        data: `0x${string}`;
        blockNumber: `0x${string}`;
        transactionHash: `0x${string}`;
        transactionIndex: `0x${string}`;
        blockHash: `0x${string}`;
        logIndex: `0x${string}`;
        removed: boolean;
    }[]>;
    ethGetBalance: (params: EthBalance.Params) => Promise<EthBalance.Result>;
    ethGetStorageAt: (params: EthGetStorageAt.Params) => Promise<EthGetStorageAt.Result>;
    ethGetBlockByNumber: (params: EthGetBlockByNumber.Params) => Promise<EthGetBlockByNumber.Result>;
    ethGetBlockReceipts: (params: EthBlockReceipts.Params) => Promise<EthBlockReceipts.Result>;
    ethGetTransactionByHash: (params: EthTransaction.Params) => Promise<EthTransaction.Result>;
    ethGetTransactionReceipt: (params: EthTransactionReceipt.Params) => Promise<EthTransactionReceipt.Result>;
    debugTraceBlockByNumber: (params: DebugTraceBlockNumber.Params) => Promise<DebugTraceBlockNumber.Result>;
    debugTraceBlockByHash: (params: DebugTraceBlockHash.Params) => Promise<DebugTraceBlockHash.Result>;
    debugTraceTransaction: (params: DebugTraceTransaction.Params) => Promise<DebugTraceTransaction.Result>;
    traceFilter: (params: TraceFilterParams) => Promise<TraceFilterResult>;
};

declare class Client<TransportType extends keyof Client.Transport> {
    /** Chain */
    readonly chain: Chain$1;
    /** Client */
    readonly client: PublicClient;
    /** Provider */
    readonly provider: Client.Provider[TransportType];
    /** Transport */
    readonly transport: Client.Transport[TransportType];
    /** Custom calls */
    readonly calls: ReturnType<typeof setupCustomCalls>;
    constructor(params: Client.Parameters<TransportType>);
    private setupChain;
}
declare namespace Client {
    interface Transport {
        http: HttpTransport;
        websocket: WebSocketTransport;
    }
    interface Provider {
        http: HttpClient.Provider;
        websocket: WebsocketClient.Provider;
    }
    interface Parameters<T extends keyof Transport> {
        chain: number | Chain$1;
        provider: Provider[T];
        transport: Transport[T];
        debug?: boolean;
    }
}

declare class HttpClient extends Client<'http'> {
    constructor(params: HttpClient.Parameters);
}
declare namespace HttpClient {
    interface Provider {
        name: string;
        url: `http://${string}` | `https://${string}`;
        type: 'debug' | 'trace';
    }
    interface Parameters {
        chain: number | Chain;
        provider: Provider;
        transportConfig?: HttpTransportConfig;
        debug?: boolean;
    }
}

type EventData = {
    'newHeads': RpcBlock;
    'logs': RpcLog;
};
declare namespace Subscribe {
    type Event = {
        'newHeads': Result<'newHeads'>;
        'logs': Result<'logs'>;
    };
    type Result<T extends keyof Event> = {
        start: (opts: Options<T>) => void;
        stop: () => void;
    };
    type Options<T extends keyof Event> = {
        onData: (data: EventData[T]) => void;
        onError: (error: Error) => void;
        onEvent?: (type: string, message: string) => void;
    };
}

export { type BlockReference, type DebugCall, DebugCallType, DebugTraceBlockHash, DebugTraceBlockNumber, type DebugTraceCall, type DebugTraceCallOptions, DebugTraceTransaction, EthBalance, EthBlockNumber, EthBlockReceipts, EthCode, EthGetBlockByNumber, EthGetLogs, EthGetStorageAt, EthTransaction, EthTransactionReceipt, HttpClient, Subscribe, TraceCallType, type TraceFilterParams, type TraceFilterResult, TraceType, type TracingOptions, WebsocketClient };
