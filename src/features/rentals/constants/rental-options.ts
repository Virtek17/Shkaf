export const rentalPeriods = [
  { value: 'hour', label: '1 час', hours: 1 },
  { value: 'three-hours', label: '3 часа', hours: 3 },
  { value: 'day', label: 'Сутки', hours: 24 },
] as const;

export type RentalPeriod = (typeof rentalPeriods)[number]['value'];

export function getRentalPeriod(value: string) {
  return rentalPeriods.find((period) => period.value === value);
}

export const formatRentalPrice = (price: number) => `${price.toLocaleString('ru-RU')} ₽`;
