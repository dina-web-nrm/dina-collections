const objectPath = require('object-path')
const { createSelector } = require('reselect')
const {
  getAllModelNames,
  getModelRelationshipsSchemaForModel,
  getModels,
} = require('./modelsSelectors')
const {
  getKeyAllowNull,
  getKeyName,
  getKeyStoredInModel,
  getKeyType,
  getKeyUnique,
  getPath,
  getInverseRelationshipKey,
  getTargetFormat,
  getTargetModel,
  getTargetOneOrMany,
} = require('./relationshipsSchemaSelectors')

const getRelationshipParamsFromRelationshipsSchemaItem = ({
  modelName,
  relationshipKey,
  relationshipsSchemaItem,
}) => {
  const keyStoredInModel = getKeyStoredInModel(relationshipsSchemaItem)
  const keyType = getKeyType(relationshipsSchemaItem)

  return (
    relationshipsSchemaItem && {
      allowNull: getKeyAllowNull(relationshipsSchemaItem),
      format: getTargetFormat(relationshipsSchemaItem),
      inverseTargetAs: getInverseRelationshipKey(relationshipsSchemaItem),
      keyName: getKeyName(relationshipsSchemaItem),
      keyStoredInModel,
      keyType,
      oneOrMany: getTargetOneOrMany(relationshipsSchemaItem),
      path: getPath(relationshipsSchemaItem),
      sourceResource: modelName,
      storeInDocument: keyType === 'json' && keyStoredInModel === modelName,
      storeInExternalDocument:
        keyType === 'json' && keyStoredInModel !== modelName,
      targetAs: relationshipKey,
      targetResource: getTargetModel(relationshipsSchemaItem),
      unique: getKeyUnique(relationshipsSchemaItem),
    }
  )
}

const getRelationshipParamsForModelNames = createSelector(
  getModels,
  (_, modelNames) => modelNames,
  (models, modelNames) => {
    return modelNames.reduce((modelsAssociationParams, modelName) => {
      const schema = getModelRelationshipsSchemaForModel(models, modelName)
      const schemaProperties = (schema && schema.properties) || {}

      if (schema) {
        Object.keys(schemaProperties).forEach(relationshipKey =>
          modelsAssociationParams.push(
            getRelationshipParamsFromRelationshipsSchemaItem({
              modelName,
              relationshipKey,
              relationshipsSchemaItem: schemaProperties[relationshipKey],
            })
          )
        )
      }

      return modelsAssociationParams
    }, [])
  }
)

const getRelationshipParamsForAllModels = createSelector(
  getModels,
  models => {
    const allModelNames = getAllModelNames(models)
    return getRelationshipParamsForModelNames(models, allModelNames)
  }
)

const getResourceRelationshipParamsMap = createSelector(
  getModels,
  models => {
    const allModelNames = getAllModelNames(models)

    return allModelNames.reduce((map, modelName) => {
      const relationshipParams = getRelationshipParamsForModelNames(models, [
        modelName,
      ])

      if (relationshipParams && relationshipParams.length) {
        relationshipParams.forEach(params => {
          objectPath.set(map, `${modelName}.${params.targetAs}`, params)
        })
      }

      return map
    }, {})
  }
)

const getResourceRelationshipKeysToIncludeInBodyMap = createSelector(
  getModels,
  models => {
    const allModelNames = getAllModelNames(models)

    return allModelNames.reduce((map, modelName) => {
      const relationshipParams = getRelationshipParamsForModelNames(models, [
        modelName,
      ])

      if (relationshipParams && relationshipParams.length) {
        const relationshipKeys = relationshipParams
          .filter(({ keyType }) => keyType === 'json')
          .map(({ targetAs }) => targetAs)

        if (relationshipKeys && relationshipKeys.length) {
          objectPath.set(map, modelName, relationshipKeys)
        }
      }

      return map
    }, {})
  }
)

module.exports = {
  getRelationshipParamsForAllModels,
  getRelationshipParamsForModelNames,
  getRelationshipParamsFromRelationshipsSchemaItem,
  getResourceRelationshipKeysToIncludeInBodyMap,
  getResourceRelationshipParamsMap,
}
