/* eslint-disable no-param-reassign */

const {
  createStringMatchFilter,
} = require('../../../../../../../lib/data/filters/factories')

const {
  createKeywordMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.searchOnly.ancestorIds'
const matchFilterName = 'ancestorIds'

const transformation = ({ locals, migrator, src, target }) => {
  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: locals.acceptedTaxonNameLineage
      .map(taxonName => {
        return taxonName.relationships.acceptedToTaxon.data.id
      })
      .filter(id => {
        return id !== src.id
      }),
  })
}

module.exports = {
  fieldPath,
  filters: {
    [matchFilterName]: createStringMatchFilter({
      fieldPath,
      raw: false,
    }),
  },
  key: 'ancestorIds',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: false,
  sortable: false,
  transformation,
}
