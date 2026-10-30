import type { RentalSession } from '../model/rental-session';

export interface RentalService {
  checkAvailability(productId: string, signal: AbortSignal): Promise<{ available: boolean; expiresAt: number }>;
  pay(session: RentalSession, signal: AbortSignal): Promise<void>;
  openLocker(session: RentalSession, signal: AbortSignal): Promise<void>;
}

