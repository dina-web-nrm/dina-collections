const extractFeatureText = require('../../utilities/extractFeatureText')

const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.featureCompleteBodyWeight'

const FEATURE_TYPE = 'complete-body-weight'

const transformation = ({ migrator, src, target }) => {
  const featureTexts = extractFeatureText({
    featureTypeKey: FEATURE_TYPE,
    includeUnit: true,
    migrator,
    src,
  })
  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: featureTexts,
  })

  return null
}

module.exports = {
  fieldPath,
  key: 'featureCompleteBodyWeight',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
