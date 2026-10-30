/** Массив и пустой параметр не считаются идентификатором. */
export const routeParam = (value: unknown): string | undefined =>
  typeof value === 'string' && value.length > 0 ? value : undefined;

