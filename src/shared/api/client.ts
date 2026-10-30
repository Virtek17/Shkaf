import { getApiBaseUrl } from '../config/environment';
import { AppError } from '../diagnostics/app-error';
import { logDiagnostic } from '../diagnostics/logger';

export class ApiError extends AppError {
  readonly status: number;
  constructor(status: number) {
    super('Не удалось выполнить запрос. Попробуйте ещё раз.', 'http');
    this.name = 'ApiError';
    this.status = status;
  }
}

/** T описывает транспортный ответ. Проверку DTO и преобразование в модель делает конкретный адаптер API. */
export async function apiRequest<T>(path: `/${string}`, options: RequestInit = {}): Promise<T> {
  let base: string;
  try { base = getApiBaseUrl(); }
  catch (cause) { throw new AppError('Сервис пока не настроен.', 'configuration', { cause }); }
  const headers = new Headers(options.headers);
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');
  try {
    const response = await fetch(`${base}${path}`, { ...options, headers });
    if (!response.ok) throw new ApiError(response.status);
    if (response.status === 204) return undefined as T;
    return await response.json() as T;
  } catch (cause) {
    if (options.signal?.aborted) throw cause;
    const error = cause instanceof AppError ? cause : new AppError('Проверьте соединение и повторите попытку.', 'network', { cause });
    logDiagnostic('request-failed', { category: error.category });
    throw error;
  }
}

