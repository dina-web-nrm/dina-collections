const createDb = require('../../lib/sequelize/db')
const createVersionedDocumentModel = require('../../lib/sequelize/models/factories/versionedDocumentModel')
const syncModels = require('../../lib/sequelize/models/syncModels')
const config = require('../../apps/core/config')

module.exports = function setupModels() {
  return createDb({ config }).then(sequelize => {
    const versionedDocumentModel = createVersionedDocumentModel({
      name: 'versionedDocumentModel',
      schemaModelName: null,
      schemaVersion: '0',
      sequelize,
    })
    return syncModels({
      config,
      modelArray: [
        {
          model: versionedDocumentModel,
          name: 'versionedDocumentModel',
        },
      ],
    }).then(() => {
      return {
        versionedDocumentModel,
      }
    })
  })
}
