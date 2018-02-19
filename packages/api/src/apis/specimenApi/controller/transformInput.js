module.exports = function transformInput(data) {
  if (!data) {
    const error = new Error('No data provided')
    error.status = 400
    throw error
  }
  const specimen = data.attributes

  const primaryCatalogedNumber =
    specimen &&
    specimen.physicalUnits &&
    specimen.physicalUnits[0] &&
    specimen.physicalUnits[0].catalogedUnit &&
    specimen.physicalUnits[0].catalogedUnit.catalogNumber

  if (!primaryCatalogedNumber) {
    const error = new Error('primaryCatalogedNumber is required')
    error.status = 400
    throw error
  }

  return specimen
}
