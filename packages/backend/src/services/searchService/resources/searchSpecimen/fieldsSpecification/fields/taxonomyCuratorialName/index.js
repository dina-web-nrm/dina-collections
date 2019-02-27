const {
  createKeywordMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.taxonomyCuratorialName'
const key = 'taxonomyCuratorialName'

const transformation = ({ migrator, target, locals }) => {
  const { acceptedTaxonNames } = locals
  if (!(acceptedTaxonNames && acceptedTaxonNames.length)) {
    return null
  }

  const curatorialName = acceptedTaxonNames[acceptedTaxonNames.length - 1]

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: curatorialName.attributes.name,
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
