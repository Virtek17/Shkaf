import type { Product } from '@/entities/product';
import { getRentalPeriod, type RentalPeriod } from '../constants/rental-options';

export type RentalStage = 'checking' | 'unavailable' | 'payment' | 'paying' | 'payment-error' | 'expired' | 'pickup' | 'opening' | 'locker-error' | 'kit' | 'problem' | 'problem-sent' | 'active';
type Common = {
  rentalId: string;
  productId: string;
  product: Product;
  period: RentalPeriod;
  total: number;
  revision: number;
  checked: number[];
  problemReason: string;
  problemDescription: string;
  operationError?: string;
  problemReturnStage?: 'pickup' | 'kit';
};
type Timing =
  | { stage: 'checking' | 'unavailable' | 'expired' | 'kit'; expiresAt?: undefined; startedAt?: undefined }
  | { stage: 'payment' | 'paying' | 'payment-error' | 'pickup' | 'opening' | 'locker-error'; expiresAt: number; startedAt?: undefined }
  | { stage: 'problem' | 'problem-sent'; expiresAt?: number; startedAt?: undefined; problemReturnStage: 'pickup' | 'kit' }
  | { stage: 'active'; startedAt: number; expiresAt?: undefined };
export type RentalSession = Common & Timing;
export type RentalSessions = Record<string, RentalSession>;

type AsyncResult = { rentalId: string; revision: number; now: number };
type SessionEvent = { rentalId: string; now: number };
/** Команда текущей сессии. Контроллер добавляет rentalId и время. */
export type RentalCommand =
  | { type: 'PAYMENT_REQUESTED' | 'PAYMENT_RETRY' | 'LOCKER_OPEN_REQUESTED' | 'RECHECK' | 'KIT_CONFIRMED' | 'PROBLEM_OPENED' | 'PROBLEM_PREPARED' | 'PROBLEM_EDITED' | 'PROBLEM_CLOSED' }
  | { type: 'KIT_TOGGLED'; index: number }
  | { type: 'PROBLEM_CHANGED'; reason?: string; description?: string };
export type RentalEvent =
  | { type: 'START'; rentalId: string; product: Product; period: RentalPeriod; agreed: boolean }
  | { type: 'EXPIRE'; now: number }
  | (AsyncResult & { type: 'AVAILABILITY_CONFIRMED'; available: boolean; expiresAt: number })
  | (AsyncResult & { type: 'AVAILABILITY_FAILED' | 'PAYMENT_CONFIRMED' | 'PAYMENT_FAILED' | 'LOCKER_OPENED' | 'LOCKER_OPEN_FAILED' })
  | (SessionEvent & RentalCommand);

// Переходы описаны в docs/rental-state.md. Только эта функция решает, истекла ли бронь.
export function reservationExpired(session: RentalSession, now: number) {
  return session.expiresAt !== undefined && now >= session.expiresAt;
}

export function resolveRental(sessions: RentalSessions, productId: string, rentalId?: string) {
  if (rentalId) {
    const session = sessions[rentalId];
    return session?.productId === productId ? session : undefined;
  }
  // Старые ссылки содержат только productId; открываем последнюю сессию этого товара.
  return Object.values(sessions).filter((session) => session.productId === productId).at(-1);
}

export function snapshotProduct(product: Product): Product {
  return { ...product, photo: typeof product.photo === 'number' ? product.photo : { ...product.photo },
    included: [...product.included], pickupPoint: { ...product.pickupPoint }, condition: { ...product.condition },
    notes: product.notes?.map((note) => ({ ...note })) };
}

export function createRental(rentalId: string, product: Product, period: RentalPeriod): Common & { stage: 'checking'; expiresAt?: undefined; startedAt?: undefined } {
  return { rentalId, productId: product.id, product: snapshotProduct(product), period,
    total: product.pricePerHour * getRentalPeriod(period)!.hours, revision: 0, stage: 'checking',
    checked: [], problemReason: 'Не хватает части комплекта', problemDescription: '' };
}

function expire(session: RentalSession): RentalSession {
  return { ...session, stage: 'expired', expiresAt: undefined, startedAt: undefined, revision: session.revision + 1 };
}

export function rentalSessionsReducer(state: RentalSessions, event: RentalEvent): RentalSessions {
  if (event.type === 'START') {
    if (!event.agreed || !getRentalPeriod(event.period) || !event.product.id || state[event.rentalId]) return state;
    const existing = Object.values(state).some((s) => s.productId === event.product.id && !['unavailable', 'expired'].includes(s.stage));
    if (existing) return state;
    return { ...state, [event.rentalId]: createRental(event.rentalId, event.product, event.period) };
  }
  if (event.type === 'EXPIRE') {
    let next = state;
    for (const session of Object.values(state)) {
      if (reservationExpired(session, event.now)) {
        if (next === state) next = { ...state };
        next[session.rentalId] = expire(session);
      }
    }
    return next;
  }
  const session = state[event.rentalId];
  if (!session) return state;
  if (reservationExpired(session, event.now)) return { ...state, [session.rentalId]: expire(session) };
  // Ответ предыдущей операции после повторной попытки игнорируется.
  if ('revision' in event && event.revision !== session.revision) return state;
  let next: RentalSession | undefined;
  const transition = (timing: Timing): RentalSession => ({ ...session, expiresAt: undefined, startedAt: undefined, ...timing, revision: session.revision + 1 });
  switch (event.type) {
    case 'AVAILABILITY_FAILED':
      if (session.stage === 'checking') next = { ...transition({ stage: 'unavailable' }), operationError: 'Не удалось проверить доступность. Попробуйте ещё раз.' };
      break;
    case 'AVAILABILITY_CONFIRMED':
      if (session.stage !== 'checking') break;
      if (!event.available) next = transition({ stage: 'unavailable' });
      else if (event.expiresAt > event.now) next = transition({ stage: 'payment', expiresAt: event.expiresAt });
      break;
    case 'PAYMENT_REQUESTED':
      if (session.stage === 'payment' || session.stage === 'payment-error') next = transition({ stage: 'paying', expiresAt: session.expiresAt });
      break;
    case 'PAYMENT_RETRY':
      if (session.stage === 'payment-error') next = transition({ stage: 'payment', expiresAt: session.expiresAt });
      break;
    case 'PAYMENT_CONFIRMED':
      if (session.stage === 'paying') next = transition({ stage: 'pickup', expiresAt: session.expiresAt });
      break;
    case 'PAYMENT_FAILED':
      if (session.stage === 'paying') next = transition({ stage: 'payment-error', expiresAt: session.expiresAt });
      break;
    case 'LOCKER_OPEN_REQUESTED':
      if (session.stage === 'pickup' || session.stage === 'locker-error') next = transition({ stage: 'opening', expiresAt: session.expiresAt });
      break;
    case 'LOCKER_OPENED':
      if (session.stage === 'opening') next = transition({ stage: 'kit', expiresAt: undefined });
      break;
    case 'LOCKER_OPEN_FAILED':
      if (session.stage === 'opening') next = transition({ stage: 'locker-error', expiresAt: session.expiresAt });
      break;
    case 'RECHECK':
      if (Object.values(state).some((other) => other.rentalId !== session.rentalId && other.productId === session.productId && !['expired', 'unavailable'].includes(other.stage))) break;
      if (session.stage === 'expired' || session.stage === 'unavailable') next = { ...transition({ stage: 'checking' }), checked: [], operationError: undefined };
      break;
    case 'KIT_TOGGLED':
      if (session.stage === 'kit' && Number.isInteger(event.index) && event.index >= 0 && event.index < session.product.included.length)
        next = { ...session, checked: session.checked.includes(event.index) ? session.checked.filter((i) => i !== event.index) : [...session.checked, event.index] };
      break;
    case 'KIT_CONFIRMED':
      if (session.stage === 'kit' && session.product.included.every((_, index) => session.checked.includes(index)))
        next = transition({ stage: 'active', startedAt: event.now });
      break;
    case 'PROBLEM_OPENED':
      if (session.stage === 'pickup' || session.stage === 'opening' || session.stage === 'locker-error' || session.stage === 'kit')
        next = transition({ stage: 'problem', expiresAt: session.expiresAt, problemReturnStage: session.stage === 'kit' ? 'kit' : 'pickup' });
      break;
    case 'PROBLEM_CHANGED':
      if (session.stage === 'problem') next = { ...session, problemReason: event.reason ?? session.problemReason, problemDescription: (event.description ?? session.problemDescription).slice(0, 1000) };
      break;
    case 'PROBLEM_PREPARED':
      if (session.stage === 'problem') next = transition({ stage: 'problem-sent', expiresAt: session.expiresAt, problemReturnStage: session.problemReturnStage });
      break;
    case 'PROBLEM_EDITED':
      if (session.stage === 'problem-sent') next = transition({ stage: 'problem', expiresAt: session.expiresAt, problemReturnStage: session.problemReturnStage });
      break;
    case 'PROBLEM_CLOSED':
      if (session.stage === 'problem') next = session.problemReturnStage === 'kit'
        ? transition({ stage: 'kit', expiresAt: undefined })
        : transition({ stage: 'pickup', expiresAt: session.expiresAt ?? event.now });
      break;
  }
  return next ? { ...state, [session.rentalId]: next } : state;
}

