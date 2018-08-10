const extractPhysicalUnitStrings = require('../../utilities/extractPhysicalUnitStrings')
const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.physicalUnitOtherPreparation'
const key = 'physicalUnitOtherPreparation'

const CATEGORY_SKELETON = 'skeleton'
const CATEGORY_SKIN = 'skin'
const CATEGORY_WET_PREPARATION = 'wet-preparation'

const transformation = ({ migrator, src, target }) => {
  const physicalUnitStrings = extractPhysicalUnitStrings({
    includePreparationType: preparationType => {
      return (
        preparationType &&
        ![CATEGORY_SKELETON, CATEGORY_SKIN, CATEGORY_WET_PREPARATION].includes(
          preparationType.category
        )
      )
    },
    migrator,
    src,
  })

  if (physicalUnitStrings && physicalUnitStrings.length) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: physicalUnitStrings,
    })
  }

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
