import { useEffect, useReducer, useRef, type ReactNode } from 'react';
import { AppState } from 'react-native';
import { logDiagnostic } from '@/shared/diagnostics/logger';
import type { RentalService } from '../api/rental-service';
import { useRentalOperation } from '../hooks/use-rental-operation';
import { rentalSessionsReducer, type RentalEvent, type RentalSession } from './rental-session';

import { RentalContext } from '../hooks/rental-context';

function RentalOperation({ session, dispatch, service }: { session: RentalSession; dispatch: React.Dispatch<RentalEvent>; service: RentalService }) {
  useRentalOperation(session, dispatch, service);
  return null;
}

export function RentalSessionProvider({ children, service }: { children: ReactNode; service: RentalService }) {
  const [sessions, dispatch] = useReducer(rentalSessionsReducer, {});
  const previous = useRef(sessions);
  const hasReservation = Object.values(sessions).some((session) => session.expiresAt !== undefined);
  useEffect(() => {
    for (const session of Object.values(sessions)) {
      const from = previous.current[session.rentalId]?.stage;
      if (from !== session.stage) logDiagnostic('rental-transition', { from, to: session.stage });
    }
    previous.current = sessions;
  }, [sessions]);
  useEffect(() => {
    if (!hasReservation) return;
    const tick = () => dispatch({ type: 'EXPIRE', now: Date.now() });
    tick();
    const timer = setInterval(tick, 1000);
    const subscription = AppState.addEventListener('change', (state) => { if (state === 'active') tick(); });
    return () => { clearInterval(timer); subscription.remove(); };
  }, [hasReservation]);
  return <RentalContext.Provider value={{ sessions, dispatch, service }}>
    {Object.values(sessions).map((session) => <RentalOperation key={session.rentalId} session={session} dispatch={dispatch} service={service} />)}
    {children}
  </RentalContext.Provider>;
}
