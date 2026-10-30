/** Цена в рублях за час. Public id и displayCode не заменяют серверную авторизацию. */
export type Product = {
  id: string;
  displayCode: string;
  name: string;
  category: "technology" | "leisure";
  pricePerHour: number;
  photo: number | { uri: string };
  status: "available" | "rented";
  description: string;
  included: string[];
  condition: { label: string; details?: string };
  notes?: { label: string; value: string }[];
  pickupPointId: string;
  /** Снимок места выдачи для аренды. */
  pickupPoint: { name: string; address: string };
};
