import type { Address, Hash, Hex } from "viem";

// Types
// ===========================================================

/** 
 * The filter object for trace filtering requests.
 */
export type TraceFilterParams = {
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
export type TraceFilterResult = Array<{
  action: {
    from: Address;
    callType?: TraceCallType;
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
  type: TraceType;
}>;

/**
 * Trace types returned by OpenEthereum / Erigon trace APIs.
 */
export type TraceType =
  | "call"
  | "create"
  | "create2"
  | "suicide"
  | "reward";

export type TraceCallType =
  | "call"
  | "delegatecall"
  | "staticcall"
  | "callcode";
