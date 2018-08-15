/* eslint-disable no-param-reassign */

module.exports = function migrateSpecimen({
  src,
  target,
  globalIndex,
  migrator,
}) {
  const { id: idInput } = src
  const id = idInput || `${globalIndex + 1}`

  migrator.setValue({
    obj: target,
    path: 'id',
    value: id,
  })

  const publishCoord = migrator.getValue({
    obj: src,
    path: 'objects.Publish_Coord',
    strip: true,
  })

  const publishRecord = migrator.getValue({
    obj: src,
    path: 'objects.Publish_Record',
    strip: true,
  })

  migrator.setValue({
    obj: target,
    path: 'attributes.publishRecord',
    value: publishCoord === 'Y' && publishRecord === 'Y',
  })
}
