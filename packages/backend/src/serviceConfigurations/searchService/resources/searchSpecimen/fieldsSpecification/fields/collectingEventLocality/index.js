const {
  createKeywordMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.collectingEventLocality'
const key = 'collectingEventLocality'

const transformation = ({ migrator, target, locals }) => {
  const { transcribedLocalities } = locals
  if (!(transcribedLocalities && transcribedLocalities.length)) {
    return null
  }

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: transcribedLocalities,
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
