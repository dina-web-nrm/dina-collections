const {
  createStringMatchFilter,
} = require('../../../../../../../lib/data/filters/factories')
const {
  createKeywordMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.physicalObjectStorageLocationGroups'
const key = 'physicalObjectStorageLocationGroups'
const matchFilterName = 'matchPhysicalObjectStorageLocationGroups'

const transformation = ({ migrator, target, locals }) => {
  const { storageLocationLeafGroups } = locals

  if (!(storageLocationLeafGroups && storageLocationLeafGroups.length)) {
    return null
  }

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: storageLocationLeafGroups,
  })
  return null
}

module.exports = {
  fieldPath,
  filters: {
    [matchFilterName]: createStringMatchFilter({ fieldPath, raw: false }),
  },
  key,
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
