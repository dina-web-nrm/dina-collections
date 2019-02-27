const extractPhysicalUnitStrings = require('../../utilities/extractPhysicalUnitStrings')
const {
  createKeywordMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.physicalUnitSkin'
const key = 'physicalUnitSkin'

const CATEGORY_SKIN = 'skin'

const transformation = ({ migrator, src, target }) => {
  const physicalUnitStrings = extractPhysicalUnitStrings({
    includePreparationType: preparationType => {
      return preparationType && preparationType.category === CATEGORY_SKIN
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
