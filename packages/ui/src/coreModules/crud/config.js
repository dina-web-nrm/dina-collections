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
    identifierType: {
      customSelectors: [
        {
          text: {
            parameter: 'name',
            translated: false,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'getIdentifierType',
          type: 'getOne',
        },
        {
          operationId: 'getIdentifierTypes',
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
    typeSpecimenType: {
      customSelectors: [
        {
          text: {
            parameter: 'name',
            translated: false,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'getTypeSpecimenType',
          type: 'getOne',
        },
        {
          operationId: 'getTypeSpecimenTypes',
          type: 'getMany',
        },
      ],
    },
  },
}

export default config
