/* eslint-disable no-param-reassign */

module.exports = function migrateSourceData({ src, target, migrator }) {
  const sourceData = migrator.getValue({
    obj: src,
    path: 'sourceData',
    strip: true,
  })

  migrator.setValue({
    obj: target,
    path: 'meta.sourceData',
    value: sourceData,
  })
}
