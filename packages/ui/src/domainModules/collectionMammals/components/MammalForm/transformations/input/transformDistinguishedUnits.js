const INITIAL_VALUES = {
  distinguishedUnits: [],
}

export default function transformDistinguishedUnits(distinguishedUnits) {
  if (!distinguishedUnits) {
    return INITIAL_VALUES.distinguishedUnits
  }

  return distinguishedUnits
}
