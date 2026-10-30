import type { ProductRepository } from '../api/product-repository';
import { catalogProducts } from './products';

export const getInitialProducts = () => catalogProducts;
export const demoProductRepository: ProductRepository = {
  async list(signal) { signal?.throwIfAborted(); return catalogProducts; },
  async find(id, signal) { signal?.throwIfAborted(); return catalogProducts.find((product) => product.id === id); },
};

