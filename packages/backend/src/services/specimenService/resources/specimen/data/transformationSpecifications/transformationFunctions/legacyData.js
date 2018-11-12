/* eslint-disable no-param-reassign */

module.exports = function migrateLegacyData({ src, target, migrator }) {
  const srcLegacyData = migrator.getValue({
    obj: src,
    path: 'legacyData',
    strip: true,
  })

  migrator.setValue({
    obj: target,
    path: 'attributes.legacyData',
    value: srcLegacyData,
  })
}
