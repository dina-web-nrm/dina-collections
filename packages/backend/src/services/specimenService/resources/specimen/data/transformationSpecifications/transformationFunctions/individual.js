/* eslint-disable no-param-reassign */

module.exports = function migrateIndividual({ src, target, migrator }) {
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
}
