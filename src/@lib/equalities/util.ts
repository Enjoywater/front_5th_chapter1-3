export function isObjectType<T extends Record<string, unknown>>(
  value: unknown,
): value is T {
  return typeof value === "object" && value !== null;
}
