/* eslint-disable no-param-reassign */

module.exports = function migratePublishRecord({ src, target, migrator }) {
  const readOnlyData = src
  migrator.setValue({
    obj: target,
    path: 'attributes.readOnly',
    value: readOnlyData,
  })
}
