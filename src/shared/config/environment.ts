export const environment = {
  demo: true,
  // Меню сценариев доступно только в разработке; сам прототип остаётся демо.
  demoTools: typeof __DEV__ !== 'undefined' && __DEV__,
};

export function getApiBaseUrl() {
  const value = process.env.EXPO_PUBLIC_API_URL;
  if (!value) throw new Error('Укажите EXPO_PUBLIC_API_URL в .env');
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Некорректный адрес API');
  return value.replace(/\/$/, '');
}

