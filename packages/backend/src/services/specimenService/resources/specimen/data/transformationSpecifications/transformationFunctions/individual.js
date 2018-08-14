/* eslint-disable no-param-reassign */

const typeValueMap = {}

const mapType = typeStatus => {
  if (!typeStatus) {
    return typeStatus
  }
  const lowerCaseValue = typeStatus.toLowerCase()
  return typeValueMap[lowerCaseValue] || lowerCaseValue
}

module.exports = function migrateIndividual({
  src,
  target,
  migrator,
  getItemByTypeId,
}) {
  const collectionItemText = migrator.getValue({
    obj: src,
    path: 'collection.Skin_Skel_Remarks',
    strip: true,
  })

  if (collectionItemText) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.collectionItemText',
      value: collectionItemText,
    })
  }

  const remarks = migrator.getValue({
    obj: src,
    path: 'objects.Comments',
    strip: true,
  })

  if (remarks) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.remarks',
      value: remarks,
    })
  }

  const typeStatus = migrator.getValue({
    obj: src,
    path: 'objects.Type',
    strip: true,
  })

  if (typeStatus) {
    return getItemByTypeId({
      id: mapType(typeStatus),
      type: 'lookupTypeSpecimenType',
    }).then(typeSpecimenType => {
      if (!typeSpecimenType) {
        return undefined
      }

      migrator.setValue({
        obj: target,
        path: 'attributes.individual.typeStatus.id',
        value: typeSpecimenType.attributes.srcId,
      })
      return null
    })
  }
  return null
}
