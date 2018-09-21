const objectPath = require('object-path')
const immutablePath = require('object-path-immutable')
const coreToNestedSync = require('common/src/formatObject/coreToNestedSync')
const nestedToCoreSync = require('common/src/formatObject/nestedToCoreSync')

module.exports = function decorateRequestWithCatalogNumber({
  catalogNumber,
  request,
  identifierTypeId,
}) {
  const coreSpecimen = objectPath.get(request, 'body.data')
  const nestedSpecimen = coreToNestedSync({
    item: coreSpecimen,
    resolveRelationships: false,
    type: 'specimen',
  })

  const currentIdentifiers =
    objectPath.get(nestedSpecimen, 'individual.identifiers') || []

  const newIdentifiers = [
    {
      identifierType: {
        id: identifierTypeId,
        type: 'identifierType',
      },
      value: catalogNumber,
    },
    ...currentIdentifiers,
  ]

  const updatedNestedSpecimen = immutablePath.set(
    nestedSpecimen,
    'individual.identifiers',
    newIdentifiers
  )

  const updatedCoreSpecimen = nestedToCoreSync({
    item: updatedNestedSpecimen,
    resolveRelationships: false,
    type: 'specimen',
  })
  return immutablePath.set(
    request,
    'body.data.attributes',
    updatedCoreSpecimen.attributes
  )
}
