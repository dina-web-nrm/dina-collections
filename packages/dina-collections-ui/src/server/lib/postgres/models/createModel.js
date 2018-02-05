const Sequelize = require('sequelize')
const { diff } = require('deep-diff')

const {
  createSystemModelSchemaValidator,
} = require('../../../../utilities/error')

// make model-factory more advanced
// * add where search to get single revision
module.exports = function createModel({
  name,
  sequelize,
  schemaModelName,
  schemaVersion,
}) {
  const validate = createSystemModelSchemaValidator({
    dataPath: 'json',
    model: schemaModelName,
    throwOnError: false,
  })

  const Model = sequelize.define(name, {
    diff: {
      type: Sequelize.JSONB,
    },
    document: {
      type: Sequelize.JSONB,
    },
    id: {
      type: Sequelize.INTEGER,
    },
    schemaCompliant: {
      type: Sequelize.BOOLEAN,
    },
    schemaVersion: {
      type: Sequelize.STRING,
    },
    version: { allowNull: true, type: Sequelize.INTEGER },
    versionId: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
  })

  const getById = ({ id, versionId }) => {
    if (versionId) {
      return Model.findOne({
        where: {
          id,
          versionId,
        },
      })
    }

    return Model.findOne({
      order: [['versionId', 'DESC']],
      where: {
        id,
      },
    })
  }

  const getOneWhere = ({ where }) => {
    return Model.findOne({
      order: [['versionId', 'DESC']],
      where,
    })
  }

  const create = doc => {
    const data = {
      document: doc,
      schemaCompliant: !validate(doc),
      schemaVersion,
    }

    return Model.create(data).then(newModel => {
      newModel.set('id', newModel.get('versionId'))
      return newModel.save()
    })
  }

  const update = ({ id, doc }) => {
    return getById({ id }).then(existingModel => {
      if (!existingModel) {
        const error = new Error(`Not found for id ${id}`)
        error.status = 404
        throw error
      }
      const storedData = existingModel.get()
      const newModel = {
        ...storedData,
        diff: diff(storedData.document, doc),
        document: doc,
        schemaCompliant: !validate(doc),
        schemaVersion,
      }
      delete newModel.versionId
      return Model.create(newModel)
    })
  }

  return {
    create,
    getById,
    getOneWhere,
    Model,
    update,
  }
}
