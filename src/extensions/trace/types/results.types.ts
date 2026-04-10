import type { Address, Hex, Quantity } from "viem";

// ============================================================================
// RESULTS
// ============================================================================

export type TraceCallResult = {
  /** The amount of gas used by the call */
  gasUsed: Quantity;
  /** The output data of the call */
  output: "0x" | Hex;
}

export type TraceCreateResult = {
  /** The address of the created contract */
  address: Address;
  /** The code of the created contract */
  code: Hex;
  /** The amount of gas used by the created contract */
  gasUsed: Quantity;
}