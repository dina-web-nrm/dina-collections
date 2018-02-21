const INITIAL_VALUES = {
  identifiableUnits: [],
}

export default function transformIdentifiableUnits(identifiableUnits) {
  if (!identifiableUnits) {
    return INITIAL_VALUES.identifiableUnits
  }

  return identifiableUnits
}
