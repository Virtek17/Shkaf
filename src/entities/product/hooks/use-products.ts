import { useContext } from 'react';
import { ProductContext } from '../model/product-context';

export function useProducts() {
  const value = useContext(ProductContext);
  if (!value) throw new Error('ProductProvider is required');
  return value;
}

export function useProduct(id: unknown) {
  return useProducts().products.find((product) => typeof id === 'string' && product.id === id);
}

