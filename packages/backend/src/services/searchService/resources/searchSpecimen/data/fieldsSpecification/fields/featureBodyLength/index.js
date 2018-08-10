const extractFeatureText = require('../../utilities/extractFeatureText')

const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.featureBodyLength'

const FEATURE_TYPE = 'body-length'

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
  key: 'featureBodyLength',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
