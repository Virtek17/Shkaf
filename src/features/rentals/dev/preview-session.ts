import { createRental, type RentalSession, type RentalStage } from '../model/rental-session';

/** Изолированный снимок для предпросмотра. Никогда не записывается в рабочий Context. */
export function createPreviewSession(source: RentalSession, stage: RentalStage, now: number): RentalSession {
  const base = createRental('preview', source.product, source.period);
  switch (stage) {
    case 'active': return { ...base, stage, startedAt: now };
    case 'payment': case 'paying': case 'payment-error': case 'pickup': case 'opening': case 'locker-error':
      return { ...base, stage, expiresAt: now + 600000 };
    case 'problem': case 'problem-sent': return { ...base, stage, problemReturnStage: 'kit' };
    default: return { ...base, stage };
  }
}

