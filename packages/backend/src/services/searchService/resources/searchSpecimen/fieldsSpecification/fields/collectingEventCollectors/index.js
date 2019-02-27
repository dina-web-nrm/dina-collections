const {
  createKeywordMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.collectingEventCollectors'

const transformation = ({ migrator, src, target }) => {
  const collectingInformation =
    migrator.getValue({
      obj: src,
      path: 'individual.collectingInformation',
    }) || []

  const collectors = []

  collectingInformation.forEach(({ collectedByAgent, collectorsText }) => {
    if (collectedByAgent && collectedByAgent.textI) {
      collectors.push(collectedByAgent.textI)
    }

    if (collectorsText) {
      collectors.push(collectorsText)
    }
  })

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: collectors,
  })
}

module.exports = {
  fieldPath,
  key: 'collectingEventCollectors',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
