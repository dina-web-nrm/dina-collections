const GROUP_COUNTRY = 'country'

const {
  createKeywordMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.collectingEventCountry'
const key = 'collectingEventCountry'

const transformation = ({ migrator, target, locals }) => {
  const { collectingPlaces } = locals
  if (!(collectingPlaces && collectingPlaces.length)) {
    return null
  }

  const place = collectingPlaces.find(({ attributes }) => {
    return attributes.group === GROUP_COUNTRY
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
