module.exports = ({
  keyStoredInModel,
  models,
  sourceResource,
  targetResource,
}) => {
  if (sourceResource === targetResource) {
    return {
      idIsForeignKey: false,
      model: models[sourceResource],
      relationshipModel: models[sourceResource],
    }
  }

  if (keyStoredInModel === sourceResource) {
    return {
      idIsForeignKey: false,
      model: models[sourceResource],
      relationshipModel: models[targetResource],
    }
  }

  if (keyStoredInModel === targetResource) {
    return {
      idIsForeignKey: true,
      model: models[targetResource],
      relationshipModel: undefined,
    }
  }

  throw new Error(
    `Invalid relationship specification sourceResource ${sourceResource} targetResource ${targetResource} keyStoredInModel ${keyStoredInModel} `
  )
}
