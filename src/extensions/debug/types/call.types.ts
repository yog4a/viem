import type { Address, Hex, Quantity } from "viem";

// ============================================================================
// CALL TRACER — alternative tracer returning a call tree
// ============================================================================

export type DebugCallType =
  | "CALL"
  | "CALLCODE"
  | "STATICCALL"
  | "DELEGATECALL"
  | "CREATE"
  | "CREATE2"
  | "SELFDESTRUCT"
  | "SUICIDE";

export type DebugCallFrame = {
  /** Call type */
  type: DebugCallType;
  /** Caller address */
  from: Address;
  /** Callee address */
  to?: Address;
  /** Value sent */
  value?: Quantity;
  /** Gas provided */
  gas: Quantity;
  /** Gas used */
  gasUsed: Quantity;
  /** Calldata */
  input: "0x" | "0x0" | Hex;
  /** Return data */
  output?: "0x" | "0x0" | Hex;
  /** Error message if reverted */
  error?: string;
  /** Revert reason (ABI-encoded) */
  revertReason?: string;
  /** Nested calls */
  calls?: DebugCallFrame[];
};
