const GROUP_PROVINCE = 'province'

const {
  createKeywordMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.collectingEventProvince'
const key = 'collectingEventProvince'

const transformation = ({ migrator, target, locals }) => {
  const { collectingPlaces } = locals
  if (!(collectingPlaces && collectingPlaces.length)) {
    return null
  }

  const place = collectingPlaces.find(({ attributes }) => {
    return attributes.group === GROUP_PROVINCE
  })
  if (!place) {
    return null
  }

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: place.attributes.name,
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
