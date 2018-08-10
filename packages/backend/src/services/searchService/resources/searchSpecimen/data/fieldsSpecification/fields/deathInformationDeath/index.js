const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.deathInformationDeath'

const transformation = ({ migrator, src, target }) => {
  const deathInformation = migrator.getValue({
    obj: src,
    path: 'individual.deathInformation',
  })
  if (!deathInformation) {
    return null
  }

  const strings = []
  deathInformation.forEach(({ causeOfDeathType }) => {
    const name =
      causeOfDeathType && causeOfDeathType.name && causeOfDeathType.name.en
    if (name) {
      // TODO add date
      strings.push(name)
    }
  })

  if (strings && strings.length) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: strings,
    })
  }
  return null
}

module.exports = {
  fieldPath,
  key: 'deathInformationDeath',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
