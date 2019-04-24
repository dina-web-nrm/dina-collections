const extractFeatureText = require('../../utilities/extractFeatureText')

const {
  createNumberRangeFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createNumberMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.searchOnlyFields.searchAge'
const key = 'searchAge'
const rangeFilterName = 'rangeAge'

const FEATURE_TYPE = 'age'
const transformation = ({ migrator, src, target }) => {
  const featureTexts =
    extractFeatureText({
      featureTypeKey: FEATURE_TYPE,
      migrator,
      src,
    }) || []

  const ageNumbers = featureTexts
    .map(featureText => {
      return Number(featureText)
    })
    .filter(number => {
      return number !== undefined
    })

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: ageNumbers,
  })

  return null
}

module.exports = {
  fieldPath,
  filters: {
    [rangeFilterName]: createNumberRangeFilter({
      fieldPath,
    }),
  },
  key,
  mapping: createNumberMapping({
    fieldPath,
  }),
  selectable: true,
  transformation,
}
