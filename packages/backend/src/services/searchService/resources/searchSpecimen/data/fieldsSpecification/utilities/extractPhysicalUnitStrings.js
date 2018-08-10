module.exports = function extractPhysicalUnitString({
  migrator,
  src,
  includePreparationType,
}) {
  const collectionItems = migrator.getValue({
    obj: src,
    path: 'individual.collectionItems',
  })

  if (!(collectionItems && collectionItems.length)) {
    return null
  }

  const strings = []

  collectionItems.forEach(collectionItem => {
    const preparationType = migrator.getValue({
      obj: collectionItem,
      path: 'preparationType',
    })

    if (preparationType) {
      if (includePreparationType(preparationType)) {
        let str = preparationType.name

        const storageLocationParent = migrator.getValue({
          obj: collectionItem,
          path: 'physicalObject.storageLocation.parent',
        })

        if (storageLocationParent) {
          str = `${str} ${storageLocationParent.name}`
        }

        str = `${str} / `

        const storageLocation = migrator.getValue({
          obj: collectionItem,
          path: 'physicalObject.storageLocation',
        })

        if (storageLocation) {
          str = `${str}${storageLocation.name}`
        }
        strings.push(str)
      }
    }
  })
  return strings
}
