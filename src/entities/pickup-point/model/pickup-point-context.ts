import { createContext } from "react";
import type { PickupPoint } from "./pickup-point";

export type PickupPointsState = {
  points: PickupPoint[];
  loading: boolean;
  error: string | null;
  reload: () => void;
};
// Отдельный модуль сохраняет идентичность Context при Fast Refresh компонента провайдера.
export const PickupPointContext = createContext<PickupPointsState | null>(null);
