import initialState from './initialState'

const segmentIdentifiersMutations = [
  {
    name: 'publishRecord',
    value: true,
  },
  {
    name: 'individual.identifiers.0.value',
    value: '123456',
  },
  {
    id: 'add-identifier',
    ignore: true,
    interaction: 'click',
  },
  {
    name: 'individual.identifiers.1.identifierType.id.hidden',
    value: '2',
  },
  {
    name: 'individual.identifiers.1.remarks',
    value: 'remarks',
  },
  {
    name: 'individual.identifiers.1.value',
    value: 'V0100/98',
  },
  {
    name: 'individual.typeStatus.id.hidden',
    value: '1',
  },
  {
    name: 'individual.acquisition.acquisitionTypeText',
    value: 'acquisitionTypeText',
  },
  {
    name: 'individual.acquisition.date.hidden',
    value: { dateText: 'date' },
  },
  {
    name: 'individual.acquisition.handedInByAgentText',
    value: 'handedInByAgentText',
  },
  {
    name: 'individual.acquisition.handedInByAgent.id.hidden',
    value: '1',
  },
  {
    name: 'individual.collectionItemText',
    value: 'collectionItemText',
  },
]

const segmentTaxonMutations = [
  {
    name: 'individual.taxonInformation.curatorialTaxonNameText',
    value: 'curatorialTaxonNameText',
  },
  {
    name: 'individual.taxonInformation.curatorialTaxonName.id.hidden',
    value: '1',
  },

  { name: 'individual.taxonInformation.taxonRemarks', value: 'taxonRemarks' },
  {
    name: 'individual.determinations.0.date.hidden',
    value: { dateText: 'date' },
  },
]

const segmentDeterminationsMutations = [
  {
    name: 'individual.determinations.0.determinationVerbatim',
    value: 'determinationVerbatim',
  },
  {
    name: 'individual.determinations.0.determinedByAgentText',
    value: 'determinedByAgentText',
  },
  {
    name: 'individual.determinations.0.determinedByAgent.id.hidden',
    value: '1',
  },
  { name: 'individual.determinations.0.remarks', value: 'remarks' },

  {
    name: 'individual.determinations.0.taxonName.id.hidden',
    value: '2367',
  },
]

const segmentCollectingInformationMutations = [
  {
    name: 'individual.collectingInformation.0.collectedByAgent.id.hidden',
    value: '1',
  },
  {
    name: 'individual.collectingInformation.0.collectorsText',
    value: 'collectorsText',
  },
  {
    name: 'individual.collectingInformation.0.establishmentMeansN',
    value: 'establishmentMeansN',
  },
  {
    name: 'individual.collectingInformation.0.establishmentMeansType.id.hidden',
    value: '1',
  },

  {
    name: 'individual.collectingInformation.0.event.dateRange.hidden',
    value: {
      endDate: { dateText: 'endDate' },
      startDate: { dateText: 'startDate' },
    },
  },
  {
    name: 'individual.collectingInformation.0.event.expeditionText',
    value: 'expeditionText',
  },

  {
    name:
      'individual.collectingInformation.0.event.locationInformation.places.0.id.hidden',
    value: 'Africa',
  },

  {
    name:
      'individual.collectingInformation.0.event.locationInformation.places.1.id.hidden',
    value: 'Algeria',
  },
  {
    name:
      'individual.collectingInformation.0.event.locationInformation.localityT',
    value: 'localityT',
  },
  {
    name:
      'individual.collectingInformation.0.event.locationInformation.localityN',
    value: 'localityN',
  },
  {
    name:
      'individual.collectingInformation.0.event.locationInformation.remarks',
    value: 'remarks',
  },
  {
    name:
      'individual.collectingInformation.0.event.locationInformation.position.latitude',
    value: 'latitude-string',
  },
  {
    name:
      'individual.collectingInformation.0.event.locationInformation.position.longitude',
    value: 'longitude-string',
  },
  {
    name:
      'individual.collectingInformation.0.event.locationInformation.position.referenceSystem',
    value: 'referenceSystem',
  },

  {
    name:
      'individual.collectingInformation.0.event.locationInformation.verticalPosition.maximumDepthInMeters',
    value: 100,
  },
  {
    name:
      'individual.collectingInformation.0.event.locationInformation.verticalPosition.maximumElevationInMeters',
    value: 100,
  },
  {
    name:
      'individual.collectingInformation.0.event.locationInformation.verticalPosition.minimumDepthInMeters',
    value: 20,
  },
  {
    name:
      'individual.collectingInformation.0.event.locationInformation.verticalPosition.minimumElevationInMeters',
    value: 20,
  },

  {
    name: 'individual.collectingInformation.0.isDeathDate',
    value: true,
  },
  {
    name: 'individual.deathInformation.0.causeOfDeathType.id.hidden',
    value: '1',
  },
  {
    name: 'individual.deathInformation.0.remarks',
    value: 'Some remarks',
  },
  {
    name: 'individual.originInformation.0.originLocality',
    value: 'Ronneby',
  },
  {
    name: 'individual.originInformation.0.remarks',
    value: 'Some remarks',
  },
  {
    name: 'individual.originInformation.0.isAffectedByManagement',
    value: true,
  },
  {
    name: 'individual.originInformation.0.isResultOfSelectiveBreeding',
    value: true,
  },
]

const segmentFeatureObservationsMutations = [
  {
    name: 'individual.featureObservations.1.date.hidden',
    value: { dateText: 'date' },
  },
  {
    name: 'individual.featureObservations.1.featureObservationAgent.id.hidden',
    value: '1',
  },
  {
    name: 'individual.featureObservations.1.featureObservationText.hidden',
    value: 'juvenile',
  },
  {
    name: 'individual.featureObservations.1.methodText.hidden',
    value: 'known-age',
  },
  {
    name: 'individual.featureObservations.1.remarks',
    value: 'remarks',
  },
]

const segmentCollectionItemsMutations = [
  {
    id: 'new-skeleton',
    ignore: true,
    interaction: 'click',
  },
  {
    name: 'individual.collectionItems.0.preparationType.id.hidden',
    value: '2',
  },
  {
    name: 'individual.collectionItems.0.description',
    value: 'description',
  },
  {
    name:
      'individual.collectionItems.0.physicalObject.storageLocation.id.hidden',
    value: '1',
  },
  {
    name: 'individual.collectionItems.0.physicalObject.storageLocationText',
    value: 'storageLocationText',
  },

  {
    name: 'individual.collectionItems.0.curatorialAssessments.0.agentText',
    value: 'agentText',
  },
  {
    name: 'individual.collectionItems.0.curatorialAssessments.0.agent.id',
    value: '1',
  },
  {
    name: 'individual.collectionItems.0.curatorialAssessments.0.condition',
    value: 'condition',
  },
  {
    name:
      'individual.collectionItems.0.curatorialAssessments.0.conditionRemarks',
    value: 'conditionRemarks',
  },
  {
    name: 'individual.collectionItems.0.curatorialAssessments.0.date.dateText',
    value: 'date',
  },
  {
    name: 'individual.collectionItems.0.curatorialAssessments.0.isInStorage',
    value: true,
  },
  {
    name:
      'individual.collectionItems.0.curatorialAssessments.0.inventoryStatusRemarks',
    value: 'inventoryStatusRemarks',
  },
]

const segmentOtherMutations = [
  {
    name: 'individual.recordHistoryEvents.0.agentText',
    value: 'agentText',
  },
  {
    name: 'individual.recordHistoryEvents.0.agent.id.hidden',
    value: '1',
  },
  {
    name: 'individual.recordHistoryEvents.0.date.hidden',
    value: { dateText: 'date' },
  },
  {
    name: 'individual.recordHistoryEvents.0.description',
    value: 'Creation of catalog card',
  },
  {
    name: 'individual.recordHistoryEvents.0.system',
    value: 'catalogCard',
  },
  {
    name: 'individual.remarks',
    value: 'remarks',
  },
]

const mutations = [
  ...segmentIdentifiersMutations,
  ...segmentTaxonMutations,
  ...segmentDeterminationsMutations,
  ...segmentCollectingInformationMutations,
  ...segmentFeatureObservationsMutations,
  ...segmentCollectionItemsMutations,
  ...segmentOtherMutations,
]

// TODO remove stuff not needed
const expectedOutput = {
  individual: {
    acquisition: {
      acquisitionTypeText: 'acquisitionTypeText',
      date: { dateText: 'date' },
      handedInByAgent: { id: '1' },
      handedInByAgentText: 'handedInByAgentText',
    },
    collectingInformation: [
      {
        collectedByAgent: { id: '1' },
        collectorsText: 'collectorsText',
        establishmentMeansN: 'establishmentMeansN',
        establishmentMeansType: {
          id: '1',
        },
        event: {
          dateRange: {
            endDate: {
              dateText: 'endDate',
            },
            startDate: {
              dateText: 'startDate',
            },
          },
          expeditionText: 'expeditionText',

          locationInformation: {
            localityN: 'localityN',
            localityT: 'localityT',
            places: [{ id: 'Africa' }, { id: 'Algeria' }],
            position: {
              latitude: 'latitude-string',
              longitude: 'longitude-string',
              referenceSystem: 'referenceSystem',
            },
            remarks: 'remarks',
            verticalPosition: {
              maximumDepthInMeters: 100,
              maximumElevationInMeters: 100,
              minimumDepthInMeters: 20,
              minimumElevationInMeters: 20,
            },
          },
        },
        isDeathDate: true,
      },
    ],
    collectionItems: [
      {
        curatorialAssessments: [
          {
            agent: { id: '1' },
            agentText: 'agentText',
            condition: 'condition',
            conditionRemarks: 'conditionRemarks',
            date: { dateText: 'date' },
            inventoryStatusRemarks: 'inventoryStatusRemarks',
            isInStorage: true, // is set as default in form
          },
        ],
        description: 'description',
        physicalObject: {
          storageLocation: {
            id: '1',
          },
          storageLocationText: 'storageLocationText',
        },
        preparationType: {
          id: '2',
        },
      },
    ],
    collectionItemText: 'collectionItemText',

    deathInformation: [
      {
        causeOfDeathType: {
          id: '1',
        },
        remarks: 'Some remarks',
      },
    ],
    determinations: [
      {
        date: { dateText: 'date' },
        determinationVerbatim: 'determinationVerbatim',
        determinedByAgent: { id: '1' },
        determinedByAgentText: 'determinedByAgentText',
        remarks: 'remarks',
        taxonName: {
          id: '2367',
        },
      },
    ],

    featureObservations: [
      {
        date: { dateText: 'date' },
        featureObservationAgent: { id: '1' },
        featureObservationText: 'juvenile',
        featureType: {
          id: '1',
        },
        methodText: 'known-age',
        remarks: 'remarks',
      },
    ],

    identifiers: [
      {
        identifierType: {
          id: '1',
        },
        nameSpace: '',
        remarks: '',
        value: '123456',
      },
      {
        identifierType: {
          id: '2',
        },
        remarks: 'remarks',
        value: 'V0100/98',
      },
    ],
    originInformation: [
      {
        isAffectedByManagement: true,
        isResultOfSelectiveBreeding: true,
        originLocality: 'Ronneby',
        remarks: 'Some remarks',
      },
    ],
    recordHistoryEvents: [
      {
        agent: { id: '1' },
        agentText: 'agentText',
        date: { dateText: 'date' },
        description: 'Creation of catalog card',
        system: 'catalogCard',
      },
    ],
    remarks: 'remarks',
    taxonInformation: {
      curatorialTaxonName: {
        id: '1',
      },
      curatorialTaxonNameText: 'curatorialTaxonNameText',
      taxonRemarks: 'taxonRemarks',
    },
    typeStatus: {
      id: '1',
    },
  },
  publishRecord: true,
}

const postSubmitTest = ({ submitResult }) => {
  const { registeredFields } = submitResult
  expect(
    mutations
      .filter(({ ignore }) => !ignore)
      .map(mutation => (mutation.name || '').replace('.hidden', ''))
      .sort()
  ).toMatchObject(
    Object.keys(registeredFields)
      .filter(key => {
        // filter out unused featureTypes, also done in transform output
        if (key.indexOf('individual.featureObservations.') === 0) {
          return key.indexOf('individual.featureObservations.1.') === 0
        }
        if (key.indexOf('readOnly') > -1) {
          return false
        }

        return true
      })
      .sort()
  )
}

const scenario = {
  description: 'Register new mammal form with all fields',
  expectedOutput,
  initialState,
  input: {},
  mutations,
  postSubmitTest,
}

export default scenario
