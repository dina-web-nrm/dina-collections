const objectPath = require('object-path')

const modelKeyMap = {
  inverseRelationshipKey: 'x-inverse-relationship-key',
  keyAllowNull: 'x-key-allow-null',
  keyName: 'x-key-name',
  keyStoredInModel: 'x-key-stored-in-model',
  keyType: 'x-key-type',
  keyUnique: 'x-key-unique',
}

const mapModelConfigurationRelationshipProps = modelConfigurationRelationship => {
  const mappedProps = {}
  Object.keys(modelConfigurationRelationship).forEach(key => {
    if (!modelKeyMap[key]) {
      throw new Error(`Unknown key: ${key}`)
    }
    mappedProps[modelKeyMap[key]] = modelConfigurationRelationship[key]
  })
  return mappedProps
}

module.exports = function mergeModelsAndModelConfigurations({
  models,
  modelConfigurationsMap,
}) {
  const mergedModels = JSON.parse(JSON.stringify(models))

  Object.keys(models).forEach(modelKey => {
    const xModelRelationships = objectPath.get(
      mergedModels,
      `${modelKey}.properties.x-relationships`
    )
    if (xModelRelationships) {
      Object.keys(xModelRelationships).forEach(relationshipKey => {
        const str = `${modelKey}.relationships.${relationshipKey}`
        const modelConfigurationRelationship = objectPath.get(
          modelConfigurationsMap,
          str
        )
        if (modelConfigurationRelationship) {
          const mergedRelationships = {
            ...xModelRelationships[relationshipKey],
            ...mapModelConfigurationRelationshipProps(
              modelConfigurationRelationship
            ),
          }

          objectPath.set(
            mergedModels,
            `${modelKey}.properties.x-relationships.${relationshipKey}`,
            mergedRelationships
          )
        } else {
          throw new Error(
            `Relationship configuration not found for model ${modelKey}`
          )
        }
      })
    }
  })

  return mergedModels
}
