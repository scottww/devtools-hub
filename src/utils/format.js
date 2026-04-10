export function formatBytes(value) {
  if (!Number.isFinite(value) || value < 0) {
    return '--'
  }

  if (value === 0) {
    return '0 B'
  }

  const units = ['B', 'KB', 'MB', 'GB']
  let size = value
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex += 1
  }

  const digits = size >= 100 || unitIndex === 0 ? 0 : 1
  return `${size.toFixed(digits)} ${units[unitIndex]}`
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}
