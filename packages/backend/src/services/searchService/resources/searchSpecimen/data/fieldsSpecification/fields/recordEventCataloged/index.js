const {
  CATALOG_CARD_CREATION_DESCRIPTION,
} = require('common/src/constants/recordHistoryEvents')

const extractRecordEventText = require('../../utilities/extractRecordEventText')
const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.recordEventCataloged'

const transformation = ({ migrator, src, target }) => {
  const recordEventStrings = extractRecordEventText({
    matchingDescription: CATALOG_CARD_CREATION_DESCRIPTION, // TODO should use enum instead
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
  key: 'recordEventCataloged',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
