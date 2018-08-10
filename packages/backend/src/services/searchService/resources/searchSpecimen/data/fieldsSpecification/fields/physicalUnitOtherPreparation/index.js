const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.physicalUnitOtherPreparation'
const key = 'physicalUnitOtherPreparation'

const CATEGORY_SKELETON = 'skeleton'
const CATEGORY_SKIN = 'skin'
const CATEGORY_WET_PREPARATION = 'wet-preparation'

const transformation = ({ migrator, src, target }) => {
  const collectionItems = migrator.getValue({
    obj: src,
    path: 'individual.collectionItems',
  })

  if (!(collectionItems && collectionItems.length)) {
    return null
  }

  const physicalUnitOtherPreparation = []

  collectionItems.forEach(collectionItem => {
    const preparationType = migrator.getValue({
      obj: collectionItem,
      path: 'preparationType',
    })

    if (preparationType) {
      if (
        ![CATEGORY_SKELETON, CATEGORY_SKIN, CATEGORY_WET_PREPARATION].includes(
          preparationType.category
        )
      ) {
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
        physicalUnitOtherPreparation.push(str)
      }
    }
  })

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: physicalUnitOtherPreparation,
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
