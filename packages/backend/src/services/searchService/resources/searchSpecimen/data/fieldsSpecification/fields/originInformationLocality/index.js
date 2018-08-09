const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.originInformationLocality'

const transformation = ({ migrator, src, target }) => {
  const originInformation = migrator.getValue({
    obj: src,
    path: 'individual.originInformation',
  })

  if (!originInformation) {
    return null
  }

  const originLocalities = originInformation.map(({ originLocality }) => {
    return originLocality
  })

  if (originLocalities.length) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: originLocalities,
    })
  }
  return null
}

module.exports = {
  fieldPath,
  key: 'originInformationLocality',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
