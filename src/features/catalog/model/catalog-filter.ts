import type { Product } from "@/entities/product";

export const catalogCategories = [
  { value: "all", label: "Все" },
  { value: "technology", label: "Техника" },
  { value: "leisure", label: "Отдых" },
] as const;
export type CatalogCategory = (typeof catalogCategories)[number]["value"];

export function filterProducts(
  products: readonly Product[],
  category: CatalogCategory,
  query: string,
  pointId?: string,
) {
  const search = query.trim().toLocaleLowerCase("ru-RU").replace(/ё/g, "е");
  return products.filter(
    (product) =>
      (!pointId || product.pickupPointId === pointId) &&
      (category === "all" || product.category === category) &&
      product.name
        .toLocaleLowerCase("ru-RU")
        .replace(/ё/g, "е")
        .includes(search),
  );
}

export function productRows(products: readonly Product[]): Product[][] {
  const rows: Product[][] = [];
  for (let index = 0; index < products.length; index += 2)
    rows.push(products.slice(index, index + 2));
  return rows;
}
