module.exports = function transformInput(data) {
  const catalogedUnit = data.additionalData[0].attributes
  const individualGroup = data.attributes

  if (individualGroup && individualGroup.physicalUnits) {
    if (!individualGroup.physicalUnits[0]) {
      individualGroup.physicalUnits[0] = {}
    }
    individualGroup.physicalUnits[0].catalogedUnit = catalogedUnit
  }

  return {
    ...individualGroup,
    catalogedUnit,
  }
}
