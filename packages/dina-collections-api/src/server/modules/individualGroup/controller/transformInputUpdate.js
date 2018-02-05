module.exports = function transformInput(data) {
  const individualGroup = data.attributes

  // TODO - This is not the correct input format
  if (individualGroup && individualGroup.physicalUnits) {
    if (
      individualGroup.physicalUnits[0].catalogedUnit &&
      individualGroup.physicalUnits[0].catalogedUnit.attributes
    ) {
      individualGroup.physicalUnits[0].catalogedUnit =
        individualGroup.physicalUnits[0].catalogedUnit.attributes
    }
  }

  return {
    ...individualGroup,
    catalogedUnit: individualGroup.physicalUnits[0].catalogedUnit,
  }
}
