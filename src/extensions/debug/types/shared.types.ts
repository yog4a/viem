import type { Hex } from "viem";

// ============================================================================
// SHARED TYPES
// ============================================================================

/** Block identifier types */
export type DebugBlockTag = Hex | "latest" | "earliest" | "pending";
