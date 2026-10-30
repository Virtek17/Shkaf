export type ErrorCategory = 'network' | 'http' | 'configuration' | 'operation' | 'render';
export class AppError extends Error {
  readonly category: ErrorCategory;
  readonly operation?: string;
  readonly originalCause?: unknown;
  constructor(message: string, category: ErrorCategory, options: { operation?: string; cause?: unknown } = {}) {
    super(message);
    this.name = 'AppError';
    this.category = category;
    this.operation = options.operation;
    this.originalCause = options.cause;
  }
}

