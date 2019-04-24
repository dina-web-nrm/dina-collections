const extractPhysicalUnitStrings = require('../../utilities/extractPhysicalUnitStrings')
const {
  createKeywordMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.physicalUnitWetPreparation'
const key = 'physicalUnitWetPreparation'

const CATEGORY_WET_PREPARATION = 'wet-preparation'

const transformation = ({ migrator, src, target }) => {
  const physicalUnitStrings = extractPhysicalUnitStrings({
    includePreparationType: preparationType => {
      return (
        preparationType && preparationType.category === CATEGORY_WET_PREPARATION
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
