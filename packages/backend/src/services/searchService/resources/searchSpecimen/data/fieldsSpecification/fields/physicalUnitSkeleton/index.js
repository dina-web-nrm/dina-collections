const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.physicalUnitSkeleton'
const key = 'physicalUnitSkeleton'

const CATEGORY_SKELETON = 'skeleton'

const transformation = ({ migrator, src, target }) => {
  const collectionItems = migrator.getValue({
    obj: src,
    path: 'individual.collectionItems',
  })

  if (!(collectionItems && collectionItems.length)) {
    return null
  }

  const physicalUnitSkeleton = []

  collectionItems.forEach(collectionItem => {
    const preparationType = migrator.getValue({
      obj: collectionItem,
      path: 'preparationType',
    })

    if (preparationType) {
      if (preparationType.category === CATEGORY_SKELETON) {
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
        physicalUnitSkeleton.push(str)
      }
    }
  })

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: physicalUnitSkeleton,
  })
  return null
}

module.exports = {
  fieldPath,
  key,
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
