const INITIAL_VALUES = {
  distinguishedUnits: [],
}

export default function transformDistinguishedUnits({
  distinguishedUnits,
  physicalUnits,
}) {
  if (!distinguishedUnits) {
    return INITIAL_VALUES.distinguishedUnits
  }

  return distinguishedUnits.map(distinguishedUnit => {
    if (distinguishedUnit.physicalUnit && distinguishedUnit.physicalUnit.id) {
      const { id } = distinguishedUnit.physicalUnit
      return {
        ...distinguishedUnit,
        physicalUnit: physicalUnits[id] || {},
      }
    }

    return distinguishedUnit
  })
}
