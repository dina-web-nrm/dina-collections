const createLog = require('../../../../../utilities/log')
const getForeignKeyName = require('./getForeignKeyName')

const log = createLog('lib/sequelize', 2)

const getAssociationType = ({
  keyStoredInModelName,
  oneOrMany,
  sourceModelName,
  targetAs,
  targetModelName,
}) => {
  if (targetAs === 'parent') {
    return 'belongsTo'
  }

  if (targetAs === 'children') {
    return 'hasMany'
  }

  if (keyStoredInModelName === sourceModelName) {
    return 'belongsTo'
  }

  if (keyStoredInModelName === targetModelName) {
    if (oneOrMany === 'one') {
      return 'hasOne'
    }

    if (oneOrMany === 'many') {
      return 'hasMany'
    }
  }

  throw new Error(
    `Invalid association configuration for sourceModelName ${
      sourceModelName
    }, targetModelName ${targetModelName}, keyStoredInModelName ${
      keyStoredInModelName
    } and oneOrMany ${oneOrMany}`
  )
}

const getAssociationOptions = ({
  allowNull,
  associationType,
  keyName,
  keyStoredInModelName,
  sourceModelName,
  targetAs,
  targetKey,
  targetModelName,
}) => {
  if (associationType === 'belongsTo') {
    const foreignKeyName = getForeignKeyName({
      keyName,
      keyStoredInModelName,
      sourceModelName,
      targetAs,
      targetModelName,
    })

    return {
      as: targetAs,
      foreignKey: allowNull
        ? {
            allowNull: true,
            name: foreignKeyName,
          }
        : foreignKeyName,
      targetKey: targetKey || 'id',
    }
  }

  const foreignKeyName = getForeignKeyName({
    keyName,
    sourceModelName,
    targetAs,
  })

  return {
    as: targetAs,
    foreignKey: allowNull
      ? {
          allowNull: true,
          name: foreignKeyName,
        }
      : foreignKeyName,
  }
}

module.exports = function setupAssociation(
  {
    allowNull,
    keyName,
    keyStoredInModel: keyStoredInModelName,
    models = {},
    oneOrMany,
    sourceResource: sourceModelName,
    targetAs,
    targetKey,
    targetResource: targetModelName,
  } = {}
) {
  const sourceModel = models[sourceModelName]
  const targetModel = models[targetModelName || sourceModelName]

  if (!sourceModel) {
    throw new Error(`Missing model ${sourceModelName}`)
  }

  if (!targetModel) {
    throw new Error(`Missing model ${targetModelName}`)
  }

  const associationType = getAssociationType({
    keyStoredInModelName,
    oneOrMany,
    sourceModelName,
    targetAs,
    targetModelName,
  })

  const associationOptions = getAssociationOptions({
    allowNull,
    associationType,
    keyName,
    keyStoredInModelName,
    sourceModelName,
    targetAs,
    targetKey,
    targetModelName,
  })

  log.debug(`${sourceModelName} ${associationType} ${targetAs}`)

  return sourceModel.Model[associationType](
    targetModel.Model,
    associationOptions
  )
}
