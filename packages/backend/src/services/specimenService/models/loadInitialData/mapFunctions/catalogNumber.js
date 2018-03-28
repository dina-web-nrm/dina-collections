const immutable = require('object-path-immutable')
const objectPath = require('object-path')

module.exports = function mapCatalogNumber({ rawSpecimen, specimen }) {
  const fromPath = 'catalogNumber'
  const toPath = 'individualGroup.identifiers.0.identifier.value'
  const identifierTypePath =
    'individualGroup.identifiers.0.identifier.identifierType'

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
