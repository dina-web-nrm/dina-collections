const INITIAL_VALUES = {
  physicalUnits: [
    {
      catalogedUnit: {
        catalogNumber: '',
      },
    },
  ],
}

export default function transformPhysicalUnits(physicalUnits) {
  if (!physicalUnits) {
    return INITIAL_VALUES.physicalUnits
  }
  return physicalUnits
}
