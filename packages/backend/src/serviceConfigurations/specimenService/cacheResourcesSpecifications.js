module.exports = [
  {
    defaultLimit: 1000000,
    modelRelationships: {
      storageLocation: {
        keyStoredInModel: 'cachePhysicalObject',
        keyType: 'json',
      },
    },
    name: 'cachePhysicalObject',
    srcRelationships: ['storageLocation'],
    srcResource: 'physicalObject',
  },
]
