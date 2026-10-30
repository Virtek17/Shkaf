import { createContext } from "react";
import type { Product } from "./product";

export type ProductsState = {
  products: Product[];
  loading: boolean;
  error: string | null;
  reload: () => void;
};
// Отдельный модуль сохраняет идентичность Context при Fast Refresh компонента провайдера.
export const ProductContext = createContext<ProductsState | null>(null);
