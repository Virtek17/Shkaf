const API_URL = process.env.EXPO_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T>(path: `/${string}`, options: RequestInit = {}): Promise<T> {
  if (!API_URL) throw new Error('Укажите EXPO_PUBLIC_API_URL в файле .env');
  const response = await fetch(`${API_URL.replace(/\/$/, '')}${path}`, {
    ...options,
    headers: { Accept: 'application/json', ...options.headers },
  });
  if (!response.ok) throw new ApiError(response.status, `Ошибка запроса: ${response.status}`);
  return (await response.json()) as T;
}
