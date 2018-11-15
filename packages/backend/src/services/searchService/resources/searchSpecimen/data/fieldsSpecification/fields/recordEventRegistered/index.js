const extractRecordEventText = require('../../utilities/extractRecordEventText')

const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.recordEventRegistered'

const MATCHING_DESCRIPTION = 'New specimen record'

const transformation = ({ migrator, src, target }) => {
  const recordEventStrings = extractRecordEventText({
    matchingDescription: MATCHING_DESCRIPTION, // TODO should use enum instead
    migrator,
    src,
  })

  if (recordEventStrings && recordEventStrings.length) {
    migrator.setValue({
      obj: target,
      path: fieldPath,
      value: recordEventStrings,
    })
  }

  return null
}

module.exports = {
  fieldPath,
  key: 'recordEventRegistered',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
