import type { PickupPoint } from '../model/pickup-point';
export interface PickupPointRepository { list(signal?: AbortSignal): Promise<PickupPoint[]>; }
