import type { Address, Hex } from "viem";

// ============================================================================
// PRESTATE TRACER RESPONSE
// ============================================================================

export type PrestateAccount = {
  /** Balance */
  balance?: Hex;
  /** Nonce */
  nonce?: number;
  /** Code */
  code?: Hex;
  /** Storage */
  storage?: Record<Hex, Hex>;
};

export type PrestateResult = Record<Address, PrestateAccount>;
