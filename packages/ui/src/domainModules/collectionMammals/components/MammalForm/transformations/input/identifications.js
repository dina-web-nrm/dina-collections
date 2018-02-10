const INITIAL_VALUES = {
  identifications: [{}],
}

export default function transformIdentifications(identifications) {
  if (!identifications) {
    return INITIAL_VALUES.identifications
  }
  return identifications
}
