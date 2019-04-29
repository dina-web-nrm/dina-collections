const {
  createKeywordMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.collectingEventInterpretedLocality'
const key = 'collectingEventInterpretedLocality'

const transformation = ({ migrator, target, locals }) => {
  const { normalizedLocalities } = locals
  if (!(normalizedLocalities && normalizedLocalities.length)) {
    return null
  }

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: normalizedLocalities,
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
