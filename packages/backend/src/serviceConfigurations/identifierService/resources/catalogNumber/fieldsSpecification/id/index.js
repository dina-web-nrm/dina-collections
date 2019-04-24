/* eslint-disable no-param-reassign */

const fieldPath = 'id'

const transformation = ({ target, globalIndex, migrator }) => {
  if (
    !migrator.getValue({
      obj: target,
      path: 'attributes.identifier',
    })
  ) {
    return null
  }

  const id = globalIndex + 1
  migrator.setValue({
    obj: target,
    path: 'id',
    value: id,
  })

  return null
}

module.exports = {
  fieldPath,
  key: 'id',
  selectable: true,
  sortable: true,
  transformation,
}
