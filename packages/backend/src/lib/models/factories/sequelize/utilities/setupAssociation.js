const createDeleteProperties = require('common/src/createDeleteProperties')

const createLog = require('../../../../../utilities/log')
const getForeignKeyName = require('./getForeignKeyName')

const log = createLog('lib/sequelize', 2)

const deleteUndefinedProperties = createDeleteProperties(undefined)

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

const getForeignKeyOptions = ({ allowNull, foreignKeyName, unique }) => {
  return deleteUndefinedProperties({
    allowNull: allowNull || undefined,
    name: foreignKeyName,
    unique: unique || undefined,
  })
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
  unique,
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
      foreignKey: getForeignKeyOptions({
        allowNull,
        foreignKeyName,
        unique,
      }),
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
    foreignKey: getForeignKeyOptions({
      allowNull,
      foreignKeyName,
      unique,
    }),
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
    unique,
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
    unique,
  })

  log.debug(`${sourceModelName} ${associationType} ${targetAs}`)

  return sourceModel.Model[associationType](
    targetModel.Model,
    associationOptions
  )
}
