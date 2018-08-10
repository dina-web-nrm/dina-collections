/* eslint-disable no-param-reassign */
const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'id'

const transformation = ({ migrator, src, target }) => {
  const id = migrator.getValue({
    obj: src,
    path: 'id',
  })

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: id,
  })
}

module.exports = {
  fieldPath,
  key: 'id',
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
