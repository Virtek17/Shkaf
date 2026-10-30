import type { ProductRepository } from '@/entities/product';
import type { RentalService } from '../api/rental-service';

export function waitForDemo(milliseconds: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    signal.throwIfAborted();
    const abort = () => { clearTimeout(timer); reject(signal.reason); };
    const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve(); }, milliseconds);
    signal.addEventListener('abort', abort, { once: true });
  });
}

/** Никаких списаний и команд реальному шкафу. Контракт реального API пока не определён. */
export function createDemoRentalService(repository: ProductRepository, options: { delay?: number; now?: () => number } = {}): RentalService {
  const delay = options.delay ?? 1400;
  const now = options.now ?? Date.now;
  return {
    async checkAvailability(id, signal) {
      await waitForDemo(delay, signal);
      const product = await repository.find(id, signal);
      signal.throwIfAborted();
      return { available: product?.status === 'available', expiresAt: now() + 600000 };
    },
    async pay(_session, signal) { await waitForDemo(delay, signal); },
    async openLocker(_session, signal) { await waitForDemo(delay, signal); },
  };
}

