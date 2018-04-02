const INITIAL_VALUES = {
  determinations: [{}],
}

export default function transformDeterminations(determinations) {
  if (!determinations) {
    return INITIAL_VALUES.determinations
  }

  return determinations
}
