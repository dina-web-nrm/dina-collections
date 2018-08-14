/* eslint-disable no-param-reassign */

module.exports = function migrateIndividual({ src, target, migrator }) {
  const collectionItemText = migrator.getValue({
    obj: src,
    path: 'collection.Skin_Skel_Remarks',
    strip: true,
  })

  const typeStatus = migrator.getValue({
    obj: src,
    path: 'objects.Type',
    strip: true,
  })

  if (typeStatus) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.typeStatus',
      value: typeStatus,
    })
  }

  if (collectionItemText) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.collectionItemText',
      value: collectionItemText,
    })
  }
}
