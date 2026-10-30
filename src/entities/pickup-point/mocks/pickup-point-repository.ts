import type { PickupPointRepository } from '../api/pickup-point-repository';
import type { PickupPoint } from '../model/pickup-point';
// Демоданные: адреса и расписание нужно сверить перед запуском.
const points: PickupPoint[] = [
 { id: 'university', name: 'Университет', address: 'Главный корпус · 1 этаж', hours: 'Ежедневно · 08:00–22:00', status: 'available' },
 { id: 'library', name: 'Библиотека', address: 'Холл · 1 этаж', hours: 'Ежедневно · 09:00–20:00', status: 'available' },
 { id: 'sports', name: 'Спорткорпус', address: 'Холл · 1 этаж', hours: 'Ежедневно · 08:00–21:00', status: 'unavailable', unavailableReason: 'Техническое обслуживание. Выберите другой пункт.' },
];
export const demoPickupPointRepository: PickupPointRepository = {
 async list(signal) { signal?.throwIfAborted(); return points.map(point => ({ ...point })); },
};
