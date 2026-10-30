import { logDiagnostic } from "@/shared/diagnostics/logger";
import { useEffect, useState, type ReactNode } from "react";
import type { ProductRepository } from "../api/product-repository";
import type { Product } from "./product";
import { ProductContext } from "./product-context";

export function ProductProvider({
  children,
  repository,
  initialProducts = [],
}: {
  children: ReactNode;
  repository: ProductRepository;
  initialProducts?: Product[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    repository
      .list(controller.signal)
      .then((items) => {
        if (!controller.signal.aborted) {
          setProducts(items);
          setError(null);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          logDiagnostic("request-failed", {
            operation: "products.list",
            category: "operation",
          });
          setError("Не удалось загрузить товары. Попробуйте ещё раз.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [repository, revision]);
  const reload = () => {
    setLoading(true);
    setRevision((value) => value + 1);
  };
  return (
    <ProductContext.Provider value={{ products, loading, error, reload }}>
      {children}
    </ProductContext.Provider>
  );
}
