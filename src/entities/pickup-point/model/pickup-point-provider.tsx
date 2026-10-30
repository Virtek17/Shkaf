import { logDiagnostic } from "@/shared/diagnostics/logger";
import { useEffect, useState, type ReactNode } from "react";
import type { PickupPointRepository } from "../api/pickup-point-repository";
import type { PickupPoint } from "./pickup-point";
import { PickupPointContext } from "./pickup-point-context";

export function PickupPointProvider({
  children,
  repository,
  initialPoints = [],
}: {
  children: ReactNode;
  repository: PickupPointRepository;
  initialPoints?: PickupPoint[];
}) {
  const [points, setPoints] = useState(initialPoints);
  const [loading, setLoading] = useState(initialPoints.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    repository
      .list(controller.signal)
      .then((items) => {
        if (!controller.signal.aborted) {
          setPoints(items);
          setError(null);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          logDiagnostic("request-failed", {
            operation: "points.list",
            category: "operation",
          });
          setError("Не удалось загрузить пункты выдачи. Попробуйте ещё раз.");
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
    <PickupPointContext.Provider value={{ points, loading, error, reload }}>
      {children}
    </PickupPointContext.Provider>
  );
}
