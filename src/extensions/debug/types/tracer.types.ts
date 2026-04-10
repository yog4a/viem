import type { DebugCallFrame } from "./call.types.js";
import type { PrestateResult } from "./prestate.types.js";
import type { StructLoggerResult } from "./structLog.types.js";

// ============================================================================
// TRACER CONFIG
// ============================================================================

/**
 * No named tracer: Geth uses the default opcode logger.
 * Opcode logger-specific flags belong here.
 */
export type NoTracerConfig = {
  /** The tracer type */
  tracer?: undefined;
  /** The tracer configuration */
  tracerConfig?: undefined;
  /** Timeout for the trace, e.g. "5s", "300ms" */
  timeout?: string;
  /** Re-execute missing historical state up to this many blocks */
  reexec?: number;
  /** Enable memory capture */
  enableMemory?: boolean;
  /** Disable stack capture */
  disableStack?: boolean;
  /** Disable storage capture */
  disableStorage?: boolean;
  /** Enable return data capture */
  enableReturnData?: boolean;
  /** Print debug logs during capture */
  debug?: boolean;
  /** Limit number of captured opcode steps */
  limit?: number;
};

/**
 * The configuration for the "callTracer".
 */
export type CallTracerConfig = {
  /** The tracer type */
  tracer: "callTracer";
  /** The tracer configuration */
  tracerConfig?: {
    /** Only trace the primary (top-level) call and not any sub-calls */
    onlyTopCall?: boolean;
  };
  /** Timeout for the trace, e.g. "5s", "300ms" */
  timeout?: string;
  /** Re-execute missing historical state up to this many blocks */
  reexec?: number;
};

/**
 * The configuration for the "prestateTracer".
 */
export type PrestateTracerConfig = {
  /** The tracer type */
  tracer: "prestateTracer";
  /** The tracer configuration */
  tracerConfig?: {
    /** Return state diff instead of full prestate */
    diffMode?: boolean;
    /** Disable code where supported */
    disableCode?: boolean;
    /** Disable storage where supported */
    disableStorage?: boolean;
  };
  /** Timeout for the trace, e.g. "5s", "300ms" */
  timeout?: string;
  /** Re-execute missing historical state up to this many blocks */
  reexec?: number;
};

// ============================================================================
// UNION
// ============================================================================

/** Any supported debug trace config */
export type DebugTraceConfig =
  | NoTracerConfig
  | CallTracerConfig
  | PrestateTracerConfig;

/** Only configs that explicitly use a tracer */
export type DebugNamedTracerConfig =
  | CallTracerConfig
  | PrestateTracerConfig;


// ============================================================================
// GENERIC TRACE RESULT — discriminated by config
// ============================================================================

export type DebugTraceResult<C extends DebugTraceConfig = NoTracerConfig> =
  C extends CallTracerConfig
    ? DebugCallFrame
    : C extends PrestateTracerConfig
      ? PrestateResult
      : StructLoggerResult;
