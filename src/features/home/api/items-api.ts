import { apiRequest } from '@/lib/api/client';
import type { Item } from '../types/item';

export function getItems(signal?: AbortSignal) {
  return apiRequest<Item[]>('/items', { signal });
}
