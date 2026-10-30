import { useEffect, type Dispatch } from 'react';
import { logDiagnostic } from '@/shared/diagnostics/logger';
import type { RentalService } from '../api/rental-service';
import type { RentalEvent, RentalSession } from '../model/rental-session';

export function useRentalOperation(session: RentalSession | undefined, dispatch: Dispatch<RentalEvent>, service: RentalService, paused = false) {
  useEffect(() => {
    if (!session || paused || !['checking', 'paying', 'opening'].includes(session.stage)) return;
    const controller = new AbortController();
    const { rentalId, revision, stage } = session;
    const run = async () => {
      try {
        if (stage === 'checking') {
          const result = await service.checkAvailability(session.productId, controller.signal);
          if (!controller.signal.aborted) dispatch({ type: 'AVAILABILITY_CONFIRMED', rentalId, revision, now: Date.now(), ...result });
        } else {
          if (stage === 'paying') await service.pay(session, controller.signal);
          else await service.openLocker(session, controller.signal);
          if (!controller.signal.aborted) dispatch({ type: stage === 'paying' ? 'PAYMENT_CONFIRMED' : 'LOCKER_OPENED', rentalId, revision, now: Date.now() });
        }
      } catch {
        if (controller.signal.aborted) return;
        logDiagnostic('request-failed', { operation: stage, category: 'operation' });
        dispatch({ type: stage === 'checking' ? 'AVAILABILITY_FAILED' : stage === 'paying' ? 'PAYMENT_FAILED' : 'LOCKER_OPEN_FAILED', rentalId, revision, now: Date.now() });
      }
    };
    void run();
    return () => controller.abort();
  }, [session, dispatch, service, paused]);
}

