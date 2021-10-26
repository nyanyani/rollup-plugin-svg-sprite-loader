import { SpriteOptions } from "../shared"

/**
 * Deep merge sprite options (exclude function and array).
 */
export function mergeOptions<T = SpriteOptions>(target: Partial<T>, source?: Partial<T>): T {
  if (!source || target === source) {
    return (target || {}) as T
  }
  const destination = { ...source }

  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const sourceValue = source[key]
      const targetValue = target[key]

      if (typeof targetValue === "object") {
        destination[key] = mergeOptions<typeof targetValue>(targetValue!, sourceValue)
      } else if (typeof targetValue !== "undefined") {
        destination[key] = targetValue
      }
    }
  }

  return destination as T
}
