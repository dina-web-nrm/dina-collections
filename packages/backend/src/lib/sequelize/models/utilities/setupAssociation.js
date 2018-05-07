module.exports = function setupAssociation(
  {
    allowNull,
    asKey,
    foreignKey,
    sourceResource,
    targetKey,
    targetResource,
    type,
    models = {},
  } = {}
) {
  const sourceModel = models[sourceResource]
  const targetModel = models[targetResource || sourceResource]

  if (!sourceModel) {
    throw new Error(`Missing model ${sourceResource}`)
  }

  if (!targetModel) {
    throw new Error(`Missing model ${targetResource}`)
  }

  switch (type) {
    case 'belongsToOne': {
      const foreignKeyName = foreignKey || `${targetResource}VersionId`
      sourceModel.Model.belongsTo(targetModel.Model, {
        as: asKey,
        foreignKey: allowNull
          ? {
              allowNull: true,
              name: foreignKeyName,
            }
          : foreignKeyName,
        targetKey: targetKey || 'versionId',
      })
      break
    }

    case 'hasMany': {
      const foreignKeyName = foreignKey || `${sourceResource}VersionId`
      sourceModel.Model.hasMany(targetModel.Model, {
        as: asKey,
        foreignKey: allowNull
          ? {
              allowNull: true,
              name: foreignKeyName,
            }
          : foreignKeyName,
      })
      break
    }

    case 'hasOne': {
      const foreignKeyName = foreignKey || `${sourceResource}VersionId`
      sourceModel.Model.hasOne(targetModel.Model, {
        as: asKey,
        foreignKey: allowNull
          ? {
              allowNull: true,
              name: foreignKeyName,
            }
          : foreignKeyName,
      })
      break
    }

    case 'parent': {
      const foreignKeyName = foreignKey || 'parentVersionId'
      sourceModel.Model.belongsTo(sourceModel.Model, {
        as: asKey,
        foreignKey: allowNull
          ? {
              allowNull: true,
              name: foreignKeyName,
            }
          : foreignKeyName,
        targetKey: targetKey || 'versionId',
      })
      break
    }

    case 'children': {
      const foreignKeyName = foreignKey || 'parentVersionId'
      sourceModel.Model.hasMany(sourceModel.Model, {
        as: asKey,
        foreignKey: allowNull
          ? {
              allowNull: true,
              name: foreignKeyName,
            }
          : foreignKeyName,
      })
      break
    }

    default: {
      throw new Error(`Unknown association type ${type}`)
    }
  }
}
