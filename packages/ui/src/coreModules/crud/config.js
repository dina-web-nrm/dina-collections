const config = {
  resources: {
    causeOfDeathType: {
      customSelectors: [
        {
          text: {
            parameter: 'attributes.name',
            translated: true,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'causeOfDeathTypeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'causeOfDeathTypeGetMany',
          type: 'getMany',
        },
      ],
    },
    customTaxonNameType: {
      customSelectors: [
        {
          text: {
            parameter: 'attributes.name',
            translated: true,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'customTaxonNameTypeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'customTaxonNameTypeGetMany',
          type: 'getMany',
        },
      ],
    },
    establishmentMeansType: {
      customSelectors: [
        {
          text: {
            parameter: 'attributes.name',
            translated: true,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'establishmentMeansTypeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'establishmentMeansTypeGetMany',
          type: 'getMany',
        },
      ],
    },
    exportJob: {
      operations: [
        {
          operationId: 'exportJobGetOne',
          type: 'getOne',
        },
        {
          operationId: 'exportJobGetMany',
          type: 'getMany',
        },
        {
          operationId: 'exportJobCreate',
          type: 'create',
        },
      ],
    },
    featureType: {
      operations: [
        {
          operationId: 'featureTypeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'featureTypeGetMany',
          type: 'getMany',
        },
      ],
    },
    identifierType: {
      customSelectors: [
        {
          text: {
            parameter: 'attributes.name',
            translated: false,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'identifierTypeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'identifierTypeGetMany',
          type: 'getMany',
        },
      ],
    },
    normalizedAgent: {
      operations: [
        {
          operationId: 'normalizedAgentDel',
          type: 'del',
        },
        {
          operationId: 'normalizedAgentGetOne',
          type: 'getOne',
        },
        {
          operationId: 'normalizedAgentCreate',
          options: {
            relationshipsToModify: [],
          },
          type: 'create',
        },
        {
          operationId: 'normalizedAgentGetMany',
          type: 'getMany',
        },
        {
          operationId: 'normalizedAgentUpdate',
          options: {
            relationshipsToModify: [],
          },
          type: 'update',
        },
        {
          operationId: 'normalizedAgentQuery',
          type: 'query',
        },
      ],
    },
    physicalObject: {
      operations: [
        {
          operationId: 'physicalObjectGetOne',
          type: 'getOne',
        },
        {
          operationId: 'physicalObjectCreate',
          options: {
            relationshipsToModify: ['storageLocation'],
          },
          type: 'create',
        },
        {
          operationId: 'physicalObjectGetMany',
          type: 'getMany',
        },
        {
          operationId: 'physicalObjectUpdate',
          options: {
            relationshipsToModify: ['storageLocation'],
          },
          type: 'update',
        },
      ],
    },
    place: {
      operations: [
        {
          operationId: 'placeDel',
          type: 'del',
        },
        {
          operationId: 'placeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'placeCreate',
          options: {
            relationshipsToModify: ['parent'],
          },
          type: 'create',
        },
        {
          operationId: 'placeGetMany',
          type: 'getMany',
        },
        {
          operationId: 'placeUpdate',
          options: {
            relationshipsToModify: ['parent'],
          },
          type: 'update',
        },
        {
          operationId: 'placeQuery',
          type: 'query',
        },
      ],
    },

    preparationType: {
      customSelectors: [
        {
          text: {
            parameter: 'attributes.name',
            translated: true,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'preparationTypeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'preparationTypeGetMany',
          type: 'getMany',
        },
      ],
    },
    resourceActivity: {
      operations: [
        {
          operationId: 'resourceActivityGetOne',
          type: 'getOne',
        },
        {
          operationId: 'resourceActivityGetMany',
          type: 'getMany',
        },
      ],
    },
    searchSpecimen: {
      operations: [
        {
          operationId: 'searchSpecimenGetOne',
          type: 'getOne',
        },
        {
          operationId: 'searchSpecimenGetMany',
          type: 'getMany',
        },
        {
          operationId: 'searchSpecimenQuery',
          type: 'query',
        },
      ],
    },
    specimen: {
      operations: [
        {
          operationId: 'specimenDel',
          type: 'del',
        },
        {
          operationId: 'specimenUpdate',
          options: {
            includesToModify: ['physicalObjects'],
            relationshipsToModify: [
              'causeOfDeathTypes',
              'establishmentMeansTypes',
              'featureTypes',
              'identifierTypes',
              'normalizedAgents',
              'physicalObjects.storageLocation',
              'places',
              'preparationTypes',
              'taxa',
              'taxonNames',
            ],
          },
          type: 'update',
        },
        {
          operationId: 'specimenCreate',
          options: {
            includesToModify: ['physicalObjects'],
            relationshipsToModify: [
              'causeOfDeathTypes',
              'establishmentMeansTypes',
              'featureTypes',
              'identifierTypes',
              'normalizedAgents',
              'physicalObjects.storageLocation',
              'places',
              'preparationTypes',
              'taxa',
              'taxonNames',
            ],
          },
          type: 'create',
        },
        {
          operationId: 'specimenGetOne',
          type: 'getOne',
        },
        {
          operationId: 'specimenGetMany',
          type: 'getMany',
        },
      ],
    },
    storageLocation: {
      operations: [
        {
          operationId: 'storageLocationDel',
          type: 'del',
        },
        {
          operationId: 'storageLocationGetOne',
          type: 'getOne',
        },
        {
          operationId: 'storageLocationCreate',
          options: {
            relationshipsToModify: ['parent'],
          },
          type: 'create',
        },
        {
          operationId: 'storageLocationGetMany',
          type: 'getMany',
        },
        {
          operationId: 'storageLocationUpdate',
          options: {
            relationshipsToModify: ['parent'],
          },
          type: 'update',
        },
        {
          operationId: 'storageLocationQuery',
          type: 'query',
        },
      ],
    },
    taxon: {
      operations: [
        {
          operationId: 'taxonDel',
          type: 'del',
        },
        {
          operationId: 'taxonGetOne',
          type: 'getOne',
        },
        {
          operationId: 'taxonCreate',
          options: {
            includesToModify: ['vernacularNames'],
            relationshipsToModify: [
              'acceptedTaxonName',
              'parent',
              'synonyms',
              'vernacularNames',
            ],
          },
          type: 'create',
        },
        {
          operationId: 'taxonGetMany',
          type: 'getMany',
        },
        {
          operationId: 'taxonUpdate',
          options: {
            includesToModify: ['vernacularNames'],
            relationshipsToModify: [
              'acceptedTaxonName',
              'parent',
              'synonyms',
              'vernacularNames',
            ],
          },
          type: 'update',
        },
        {
          operationId: 'taxonQuery',
          type: 'query',
        },
      ],
    },
    taxonName: {
      operations: [
        {
          operationId: 'taxonNameDel',
          type: 'del',
        },
        {
          operationId: 'taxonNameGetOne',
          type: 'getOne',
        },
        {
          operationId: 'taxonNameCreate',
          options: {
            relationshipsToModify: [],
          },
          type: 'create',
        },
        {
          operationId: 'taxonNameGetMany',
          type: 'getMany',
        },
        {
          operationId: 'taxonNameUpdate',
          options: {
            relationshipsToModify: [],
          },
          type: 'update',
        },
        {
          operationId: 'taxonNameQuery',
          type: 'query',
        },
      ],
    },
    typeSpecimenType: {
      customSelectors: [
        {
          text: {
            parameter: 'attributes.name',
            translated: true,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'typeSpecimenTypeGetOne',
          type: 'getOne',
        },
        {
          operationId: 'typeSpecimenTypeGetMany',
          type: 'getMany',
        },
      ],
    },
    user: {
      customSelectors: [
        {
          text: {
            doNotCapitalize: true,
            parameter: 'attributes.username',
            translated: false,
          },
          type: 'getAllAsOptions',
        },
      ],
      operations: [
        {
          operationId: 'userGetOne',
          type: 'getOne',
        },
        {
          operationId: 'userGetMany',
          type: 'getMany',
        },
      ],
    },
  },
}

export default config
