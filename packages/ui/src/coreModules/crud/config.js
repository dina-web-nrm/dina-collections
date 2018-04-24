const config = {
  resources: {
    causeOfDeathType: {
      customSelectors: [
        {
          text: {
            defaultLanguage: 'en',
            parameter: 'name',
            translated: true,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'getCauseOfDeathType',
          type: 'getOne',
        },
        {
          operationId: 'getCauseOfDeathTypes',
          type: 'getMany',
        },
      ],
    },
    establishmentMeansType: {
      customSelectors: [
        {
          text: {
            parameter: 'name',
            translated: true,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'getEstablishmentMeansType',
          type: 'getOne',
        },
        {
          operationId: 'getEstablishmentMeansTypes',
          type: 'getMany',
        },
      ],
    },
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
