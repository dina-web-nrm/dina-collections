module.exports = function transformInput(data) {
  if (!data) {
    const error = new Error('No data provided')
    error.status = 400
    throw error
  }
  const individualGroup = data.attributes

  const primaryCatalogedNumber =
    individualGroup &&
    individualGroup.physicalUnits &&
    individualGroup.physicalUnits[0] &&
    individualGroup.physicalUnits[0].catalogedUnit &&
    individualGroup.physicalUnits[0].catalogedUnit.catalogNumber

  if (!primaryCatalogedNumber) {
    const error = new Error('primaryCatalogedNumber is required')
    error.status = 400
    throw error
  }

  return individualGroup
}
