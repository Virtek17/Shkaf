export type PickupPoint = {
 id: string; name: string; address: string; hours: string;
 status: 'available' | 'unavailable'; unavailableReason?: string;
};
export function filterPickupPoints(points: readonly PickupPoint[], query: string) {
 const normalize = (value: string) => value.toLocaleLowerCase('ru-RU').replace(/ё/g, 'е');
 return points.filter(point => normalize(`${point.name} ${point.address}`).includes(normalize(query.trim())));
}
