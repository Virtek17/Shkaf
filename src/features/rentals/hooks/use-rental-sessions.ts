import { useContext } from 'react';
import { RentalContext } from './rental-context';

export function useRentalSessions() {
  const context = useContext(RentalContext);
  if (!context) throw new Error('RentalSessionProvider is required');
  return context;
}

