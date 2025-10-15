import { Viem } from './_viem.js';

// Service
// ===========================================================

(async () => {
    await Viem.debugTraceCall(Viem.http, {
        to: '0x0130A06F287AF17E8E62891B44B6DD8A07E7C3B6',
    }, 'latest', {
        tracer: 'callTracer',
    });
})();