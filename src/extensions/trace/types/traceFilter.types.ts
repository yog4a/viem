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
 * - `action` object varies by `type`:
 *   - For `"call"`, `"create"`, `"create2"`, `"reward"`: Standard fields.
 *   - For `"suicide"`: See `SuicideAction`.
 */
export type TraceFilterResult = Array<{
  action: TraceAction;
  blockHash: Hash;
  blockNumber: number;
  result: TraceResult;
  subtraces: number;
  traceAddress: number[];
  transactionHash: Hash;
  transactionPosition: number;
  type: TraceType;
}>;

export type TraceType =
  | "call"
  | "create"
  | "create2"
  | "suicide"
  | "reward";

/**
 * For non-suicide types, action includes typical call fields.
 * For `type = "suicide"`, action fields are:
 *  - address: `0x${string}`  (the contract/address being self-destructed)
 *  - balance: Hex-string of the contract's final balance
 *  - refundAddress: Address receiving the refund
 */
export type TraceAction =
  | {
      from: Address;
      callType?: TraceCallType;
      gas: Hex;
      input: Hex;
      init?: Hex;
      to: Address;
      value: Hex;
    }
  | SuicideAction;

/** For type === "suicide" */
export type SuicideAction = {
  address: Address;          // The contract/address being self-destructed
  balance: Hex;              // The contract's remaining balance
  refundAddress: Address;    // The address receiving funds
};

export type TraceResult = {
  gasUsed?: Hex;
  output?: Hex;
  code?: Hex;
};

export type TraceCallType =
  | "call"
  | "delegatecall"
  | "staticcall"
  | "callcode";
