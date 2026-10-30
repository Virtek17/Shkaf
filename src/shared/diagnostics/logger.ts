import type { ErrorCategory } from './app-error';

// Только фиксированные технические поля. Не передавать тело запроса, причину обращения или токены.
export function logDiagnostic(event: 'rental-transition' | 'request-failed' | 'render-failed', details: {
  from?: string; to?: string; operation?: string; category?: ErrorCategory;
}) {
  if (typeof __DEV__ !== 'undefined' && __DEV__) console.info('[terem]', event, details);
}

