module.exports = function getRelationKey({ targetResource, targetAs, type }) {
  switch (type) {
    case 'belongsToOne':
    case 'hasOne': {
      return targetAs || targetResource
    }

    case 'belongsToMany':
    case 'hasMany': {
      return targetAs || `${targetResource}s`
    }

    case 'parent': {
      return targetAs || 'parent'
    }

    case 'children': {
      return targetAs || 'children'
    }

    default: {
      throw new Error(`Unknown association type ${type}`)
    }
  }
}
