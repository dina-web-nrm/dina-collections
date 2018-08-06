/* eslint-disable no-param-reassign */

module.exports = ({ migrator, src, target }) => {
  const id = migrator.getValue({
    obj: src,
    path: 'id',
  })

  migrator.setValue({
    obj: target,
    path: 'id',
    value: id,
  })
}
