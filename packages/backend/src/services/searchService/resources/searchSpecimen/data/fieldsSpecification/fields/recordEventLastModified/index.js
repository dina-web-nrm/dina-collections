const extractRecordEventText = require('../../utilities/extractRecordEventText')

const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.recordEventLastModified'

const MATCHING_DESCRIPTION = 'Last update of specimen record'

const transformation = ({ migrator, src, target }) => {
  const recordEventStrings = extractRecordEventText({
    matchingDescription: MATCHING_DESCRIPTION,
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
  key: 'recordEventLastModified',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
