import type { Hex } from "viem";

// ============================================================================
// STRUCT LOG — opcode-level trace entry
// ============================================================================

export type StructLog = {
  /** Program counter */
  pc: bigint; // uint64
  /** Opcode to be executed */
  op: string; // byte
  /** Remaining gas */
  gas: bigint; // uint64
  /** Cost for executing op */
  gasCost: bigint; // uint64
  /** EVM memory. Enabled via enableMemory */
  memory: Hex | null; // []byte (as hex blob)
  /** Size of memory */
  memSize: number; // int
  /** EVM stack. Disabled via disableStack */
  stack: Hex[] | null; // []uint256 (hex-encoded 32-byte values)
  /** Last call's return data. Enabled via enableReturnData */
  returnData?: Hex | null; // []byte (as hex blob)
  /** Storage slots of current contract read/written. Only for SLOAD/SSTORE. Disabled via disableStorage */
  storage?: Record<Hex, Hex> | null; // map[hash]hash
  /** Current call depth */
  depth: number; // int
  /** Refund counter */
  refund?: bigint; // uint64
  /** Error message if any */
  error?: string | null;
};

export type StructLoggerResult = {
  /** Total gas used */
  gas: number;
  /** Whether the call failed */
  failed: boolean;
  /** Return value */
  returnValue: Hex;
  /** Opcode-level trace */
  structLogs: StructLog[];
};