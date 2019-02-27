/* eslint-disable no-param-reassign */
const {
  createIntegerMapping,
} = require('../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.idNumeric'

const transformation = ({ migrator, src, target }) => {
  const id = migrator.getValue({
    obj: src,
    path: 'id',
  })

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: Number(id),
  })
}

module.exports = {
  fieldPath,
  key: 'idNumeric',
  mapping: createIntegerMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}
