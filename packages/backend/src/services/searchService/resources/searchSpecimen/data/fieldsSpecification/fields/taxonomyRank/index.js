const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.taxonomyRank'
const key = 'taxonomyRank'

const transformation = ({ migrator, target, locals }) => {
  const { curatorialTaxonRank } = locals

  if (!curatorialTaxonRank) {
    return null
  }

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: curatorialTaxonRank,
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
