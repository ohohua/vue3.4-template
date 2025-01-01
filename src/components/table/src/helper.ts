export function setIndex(reserveIndex: boolean, index: number, size: number, current: number) {
  const newIndex = index + 1
  if (reserveIndex) {
    return size * (current - 1) + newIndex
  }
  return newIndex
}
