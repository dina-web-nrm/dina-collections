const config = {
  resources: {
    place: {
      operations: [
        {
          operationId: 'getPlace',
          type: 'getOne',
        },
        {
          operationId: 'createPlace',
          type: 'create',
        },
        {
          operationId: 'getPlaces',
          type: 'getMany',
        },
        {
          operationId: 'updatePlace',
          type: 'update',
        },
      ],
    },
  },
}

export default config
