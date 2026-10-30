import { createContext, type Dispatch } from 'react';
import type { RentalService } from '../api/rental-service';
import type { RentalEvent, RentalSessions } from '../model/rental-session';

// Context отдельно от провайдера и хуков, чтобы Fast Refresh не создавал разные экземпляры.
export const RentalContext = createContext<{ sessions: RentalSessions; dispatch: Dispatch<RentalEvent>; service: RentalService } | null>(null);

