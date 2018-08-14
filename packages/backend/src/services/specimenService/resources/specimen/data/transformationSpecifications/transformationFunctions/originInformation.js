/* eslint-disable no-param-reassign */

module.exports = function migrateOriginInformation({ src, target, migrator }) {
  const originLocality = migrator.getValue({
    obj: src,
    path: 'objects.OriginLocality',
    strip: true,
  })

  if (originLocality) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.originInformation.0.originLocality',
      value: originLocality,
    })
  }
}
