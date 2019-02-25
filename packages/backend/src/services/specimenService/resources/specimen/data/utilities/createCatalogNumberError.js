const extractIdentifiersFromSpecimen = require('./extractIdentifiersFromSpecimen')

module.exports = function createCatalogNumberError({
  identifierTypeId,
  error,
  specimen,
}) {
  const identifiers = extractIdentifiersFromSpecimen(specimen)
  const catalogNumberIdentifierIndex = identifiers.findIndex(identifier => {
    return identifier.identifierType.id === identifierTypeId
  })
  if (error.parameterErrors) {
    /* eslint-disable no-param-reassign */
    error.parameterErrors = error.parameterErrors.map(
      /* eslint-enable no-param-reassign */
      parameterError => {
        return {
          ...parameterError,
          fullPath: `individual.identifiers.${catalogNumberIdentifierIndex}.value`,
        }
      }
    )
  }
  return error
}
