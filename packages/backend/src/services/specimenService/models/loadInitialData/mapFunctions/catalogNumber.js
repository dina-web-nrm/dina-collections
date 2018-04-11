const immutable = require('object-path-immutable')
const objectPath = require('object-path')

module.exports = function mapCatalogNumber({ rawSpecimen, specimen }) {
  const fromPath = 'catalogNumber'
  const toPath = 'individual.identifiers.0.value'
  const identifierTypePath = 'individual.identifiers.0.identifierType'

  let updatedSpecimen = specimen
  let updatedRawSpecimen = rawSpecimen

  const catalogNumber = objectPath.get(rawSpecimen, fromPath)
  if (catalogNumber !== undefined) {
    updatedSpecimen = immutable.set(updatedSpecimen, toPath, `${catalogNumber}`)
    updatedSpecimen = immutable.set(
      updatedSpecimen,
      identifierTypePath,
      'catalogNumber'
    )

    updatedRawSpecimen = immutable.del(rawSpecimen, fromPath)
  }
  return {
    rawSpecimen: updatedRawSpecimen,
    specimen: updatedSpecimen,
  }
}
