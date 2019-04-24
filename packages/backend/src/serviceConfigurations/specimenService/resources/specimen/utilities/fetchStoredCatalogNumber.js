const extractCatalogNumberFromSpecimen = require('./extractCatalogNumberFromSpecimen')

module.exports = function fetchStoredCatalogNumber({
  identifierTypeId,
  serviceInteractor,
  specimenId,
}) {
  return serviceInteractor
    .getOne({
      request: {
        pathParams: {
          id: specimenId,
        },
      },
      resource: 'specimen',
    })
    .then(({ data: storedSpecimen }) => {
      const storedCatalogNumber = extractCatalogNumberFromSpecimen({
        identifierTypeId,
        specimen: storedSpecimen,
      })
      return storedCatalogNumber
    })
}
