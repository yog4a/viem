import type { Address, Hex, Quantity } from "viem";
import type { TraceCallType, TraceRewardType } from "./shared.types.js";

// ============================================================================
// ACTIONS
// ============================================================================

export type TraceCallAction = {
  /** The type of call */
  callType: TraceCallType;
  /** The address of the account that initiated the call */
  from: Address;
  /** The address of the contract that was called */
  to: Address;
  /** The amount of gas provided for the call */
  gas: Quantity;
  /** The input data of the call */
  input: Hex;
  /** The amount of value sent with the call */
  value: Quantity;
}

export type TraceCreateAction = {
  /** The address of the account that initiated the creation */
  from: Address;
  /** The amount of gas provided for the creation */
  gas: Quantity;
  /** The code of the created contract */
  init: Hex;
  /** The amount of value sent with the creation */
  value: Quantity;
  /** The address of the created contract */
  creationMethod?: "create" | "create2";
}

export type TraceSuicideAction = {
  /** The contract/address being self-destructed */
  address: Address;
  /** The contract's remaining balance */
  balance: Quantity;
  /** The address receiving funds */
  refundAddress: Address;
}

export type TraceRewardAction = {
  /** The address of the author of the block */
  author: Address;
  /** The type of reward */
  rewardType: TraceRewardType;
  /** The amount of reward */
  value: Quantity;
}