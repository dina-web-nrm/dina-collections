export default function transformDeterminations(determinations) {
  if (determinations && determinations.length) {
    return determinations
  }

  return [{}]
}
