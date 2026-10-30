import type { Product } from '../model/product';

export interface ProductRepository {
  list(signal?: AbortSignal): Promise<Product[]>;
  find(id: string, signal?: AbortSignal): Promise<Product | undefined>;
}

