/* eslint-disable no-param-reassign */

module.exports = function migrateAcquisition({ src, target, migrator }) {
  const handedInByAgentText = migrator.getValue({
    obj: src,
    path: 'collection.HandedInBy',
    strip: true,
  })

  if (handedInByAgentText) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.acquisition.handedInByAgent.textI',
      value: handedInByAgentText,
    })
  }

  const acquisitionTypeText = migrator.getValue({
    obj: src,
    path: 'collection.Deposition',
    strip: true,
  })

  if (acquisitionTypeText) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.acquisition.acquisitionTypeText',
      value: acquisitionTypeText,
    })
  }
}
