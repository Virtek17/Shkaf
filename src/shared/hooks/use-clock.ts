import { useSyncExternalStore } from 'react';

let snapshot = 0;
let timer: ReturnType<typeof setInterval> | undefined;
const listeners = new Set<() => void>();
const getSnapshot = () => snapshot;
const getServerSnapshot = () => 0;
const inactiveSubscribe = () => () => {};

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer) {
    snapshot = Date.now();
    timer = setInterval(() => {
      snapshot = Date.now();
      for (const notify of listeners) notify();
    }, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) { clearInterval(timer); timer = undefined; }
  };
}

/** Общие часы только для отображения. Не решают, истекла ли бронь. */
export function useClock(enabled: boolean) {
  return useSyncExternalStore(enabled ? subscribe : inactiveSubscribe, getSnapshot, getServerSnapshot);
}
