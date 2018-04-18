import initialState from './initialState'

const mutations = [
  { name: 'taxonInformation.curatorialName', value: 'curatorialName' },
  { name: 'taxonInformation.taxonRemarks', value: 'taxonRemarks' },
  { name: 'determinations.0.date', value: 'date' },
  {
    name: 'determinations.0.determinationVerbatim',
    value: 'determinationVerbatim',
  },
  {
    name: 'determinations.0.determinedByAgentText',
    value: 'determinedByAgentText',
  },
  { name: 'determinations.0.remarks', value: 'remarks' },

  {
    name: 'determinations.0.taxon.id.hidden',
    value: '2367',
  },
  {
    name: 'featureObservations.1.date',
    value: 'date',
  },
  {
    name: 'featureObservations.1.featureObservationAgent',
    value: 'featureObservationAgent',
  },
  {
    name: 'featureObservations.1.featureObservationText.hidden',
    value: 'juvenile',
  },
  {
    name: 'featureObservations.1.methodText.hidden',
    value: 'known-age',
  },
  {
    name: 'featureObservations.1.remarks',
    value: 'remarks',
  },
  {
    id: 'new-skeleton',
    ignore: true,
    interaction: 'click',
  },
  {
    name: 'collectionItems.0.preparationType.id.hidden',
    value: '2',
  },
  {
    name: 'collectionItems.0.description',
    value: 'description',
  },
  {
    name: 'collectionItems.0.physicalObject.storageLocation.id.hidden',
    value: '1',
  },
  {
    name: 'collectionItems.0.physicalObject.storedUnderTaxonName',
    value: 'storedUnderTaxonName',
  },
  {
    name: 'collectionItems.0.curatorialAssessments.0.agent',
    value: 'agent',
  },
  {
    name: 'collectionItems.0.curatorialAssessments.0.condition',
    value: 'condition',
  },
  {
    name: 'collectionItems.0.curatorialAssessments.0.conditionRemarks',
    value: 'conditionRemarks',
  },
  {
    name: 'collectionItems.0.curatorialAssessments.0.date',
    value: 'date',
  },
  {
    name: 'collectionItems.0.curatorialAssessments.0.isInStorage',
    value: true,
  },
  {
    name: 'collectionItems.0.curatorialAssessments.0.inventoryStatusRemarks',
    value: 'inventoryStatusRemarks',
  },
  {
    name: 'identifiers.0.publishRecord',
    value: true,
  },
  {
    name: 'identifiers.0.value',
    value: '123456',
  },
  {
    id: 'add-identifier',
    ignore: true,
    interaction: 'click',
  },
  {
    name: 'identifiers.1.identifierType.hidden',
    value: 'SVA nr',
  },
  {
    name: 'identifiers.1.remarks',
    value: 'remarks',
  },
  {
    name: 'identifiers.1.value',
    value: 'V0100/98',
  },
  {
    name: 'collectingInformation.0.collectorsText',
    value: 'collectorsText',
  },
  {
    name: 'collectingInformation.0.event.endDate',
    value: 'endDate',
  },
  {
    name: 'collectingInformation.0.event.expeditionText',
    value: 'expeditionText',
  },

  {
    name:
      'collectingInformation.0.event.locationInformation.places.0.id.hidden',
    value: 'Africa',
  },

  {
    name:
      'collectingInformation.0.event.locationInformation.places.1.id.hidden',
    value: 'Algeria',
  },
  {
    name: 'collectingInformation.0.event.locationInformation.localityVerbatim',
    value: 'localityVerbatim',
  },
  {
    name: 'collectingInformation.0.event.locationInformation.localityName',
    value: 'localityName',
  },
  {
    name: 'collectingInformation.0.event.locationInformation.remarks',
    value: 'remarks',
  },
  {
    name: 'collectingInformation.0.event.locationInformation.position.latitude',
    value: 'latitude-string',
  },
  {
    name:
      'collectingInformation.0.event.locationInformation.position.longitude',
    value: 'longitude-string',
  },
  {
    name:
      'collectingInformation.0.event.locationInformation.position.referenceSystem',
    value: 'referenceSystem',
  },

  {
    name:
      'collectingInformation.0.event.locationInformation.verticalPosition.maximumDepthInMeters',
    value: 100,
  },
  {
    name:
      'collectingInformation.0.event.locationInformation.verticalPosition.maximumElevationInMeters',
    value: 100,
  },
  {
    name:
      'collectingInformation.0.event.locationInformation.verticalPosition.minimumDepthInMeters',
    value: 20,
  },
  {
    name:
      'collectingInformation.0.event.locationInformation.verticalPosition.minimumElevationInMeters',
    value: 20,
  },
  {
    name: 'collectingInformation.0.event.startDate',
    value: 'startDate',
  },
  {
    name: 'typeStatus.hidden',
    value: 'paratype',
  },
]

const expectedOutput = {
  featureTypes: [
    {
      id: '1',
      type: 'featureType',
    },
  ],

  physicalObjects: [
    {
      storageLocation: {
        id: '1',
        type: 'storageLocation',
      },
      storedUnderTaxonName: 'storedUnderTaxonName',
    },
  ],
  places: [{ id: 'Africa', type: 'place' }, { id: 'Algeria', type: 'place' }],
  preparationTypes: [
    {
      id: '2',
      type: 'preparationType',
    },
  ],
  specimen: {
    individual: {
      collectingInformation: [
        {
          collectorsText: 'collectorsText',
          event: {
            endDate: 'endDate',
            expeditionText: 'expeditionText',
            locationInformation: {
              localityName: 'localityName',
              localityVerbatim: 'localityVerbatim',
              places: [
                { id: 'Africa', type: 'place' },
                { id: 'Algeria', type: 'place' },
              ],
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
            startDate: 'startDate',
          },
        },
      ],
      collectionItems: [
        {
          curatorialAssessments: [
            {
              agent: 'agent',
              condition: 'condition',
              conditionRemarks: 'conditionRemarks',
              date: 'date',
              inventoryStatusRemarks: 'inventoryStatusRemarks',
              isInStorage: true, // is set as default in form
            },
          ],
          description: 'description',
          physicalObject: {
            storageLocation: {
              id: '1',
              type: 'storageLocation',
            },
            storedUnderTaxonName: 'storedUnderTaxonName',
          },
          preparationType: {
            id: '2',
            type: 'preparationType',
          },
        },
      ],
      determinations: [
        {
          date: 'date',
          determinationVerbatim: 'determinationVerbatim',
          determinedByAgentText: 'determinedByAgentText',
          remarks: 'remarks',
          taxon: {
            id: '2367',
            type: 'taxon',
          },
        },
      ],
      featureObservations: [
        {
          date: 'date',
          featureObservationAgent: 'featureObservationAgent',
          featureObservationText: 'juvenile',
          featureType: {
            id: '1',
            type: 'featureType',
          },
          methodText: 'known-age',
          remarks: 'remarks',
        },
      ],

      identifiers: [
        {
          identifierType: 'catalogNumber',
          nameSpace: '',
          publishRecord: true,
          remarks: '',
          value: '123456',
        },
        {
          identifierType: 'SVA nr',
          remarks: 'remarks',
          value: 'V0100/98',
        },
      ],
      taxonInformation: {
        curatorialName: 'curatorialName',
        taxonRemarks: 'taxonRemarks',
      },
      typeStatus: 'paratype',
    },
  },

  storageLocations: [
    {
      id: '1',
      type: 'storageLocation',
    },
  ],
  taxa: [
    {
      id: '2367',
      type: 'taxon',
    },
  ],
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
        if (key.indexOf('featureObservations.') === 0) {
          return key.indexOf('featureObservations.1.') === 0
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
