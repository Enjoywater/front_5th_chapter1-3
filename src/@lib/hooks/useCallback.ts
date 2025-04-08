/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends () => T>(
  factory: T,
  _deps: DependencyList,
) {
  const memo = useMemo(() => factory, _deps);

  return memo;
}
