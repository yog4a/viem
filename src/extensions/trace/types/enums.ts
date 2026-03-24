// Types
// ===========================================================

/**
 * Trace types returned by OpenEthereum / Erigon trace APIs.
 */
export enum TraceType {
  Call = "call",
  Create = "create",
  Create2 = "create2",
  Suicide = "suicide",
  Reward = "reward",
}

/**
 * Trace call types returned by OpenEthereum / Erigon trace APIs.
 */
export enum TraceCallType {
  Call = "call",
  DelegateCall = "delegatecall",
  StaticCall = "staticcall",
  CallCode = "callcode",
}
