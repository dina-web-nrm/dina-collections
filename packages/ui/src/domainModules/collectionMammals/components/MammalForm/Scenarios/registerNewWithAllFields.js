import initialState from './initialState'

const mutations = [
  { name: 'taxonInformation.curatorialName', value: 'curatorialName' },
  { name: 'taxonInformation.taxonRemarks', value: 'taxonRemarks' },
  { name: 'taxonInformation.determinations.0.date', value: 'date' },
  {
    name: 'taxonInformation.determinations.0.determinationVerbatim',
    value: 'determinationVerbatim',
  },
  {
    name: 'taxonInformation.determinations.0.determinedByAgentText',
    value: 'determinedByAgentText',
  },
  {
    name: 'taxonInformation.determinations.0.isCurrentDetermination',
    value: true,
  },
  { name: 'taxonInformation.determinations.0.remarks', value: 'remarks' },

  {
    name: 'taxonInformation.determinations.0.taxon.id.hidden',
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
    name: 'distinguishedUnits.0.distinguishedUnitType.id.hidden',
    value: '2',
  },
  {
    name: 'distinguishedUnits.0.description',
    value: 'description',
  },
  {
    name: 'distinguishedUnits.0.physicalUnit.storageLocation.id.hidden',
    value: '1',
  },
  {
    name: 'distinguishedUnits.0.physicalUnit.storedUnderTaxonName',
    value: 'storedUnderTaxonName',
  },
  {
    name: 'distinguishedUnits.0.curatorialAssessments.0.agent',
    value: 'agent',
  },
  {
    name: 'distinguishedUnits.0.curatorialAssessments.0.condition',
    value: 'condition',
  },
  {
    name: 'distinguishedUnits.0.curatorialAssessments.0.conditionRemarks',
    value: 'conditionRemarks',
  },
  {
    name: 'distinguishedUnits.0.curatorialAssessments.0.date',
    value: 'date',
  },
  {
    name: 'distinguishedUnits.0.curatorialAssessments.0.isInStorage',
    value: true,
  },
  {
    name: 'distinguishedUnits.0.curatorialAssessments.0.inventoryStatusRemarks',
    value: 'inventoryStatusRemarks',
  },
  {
    name: 'identifiers.0.publishRecord',
    value: true,
  },
  {
    name: 'identifiers.0.identifier.value',
    value: '123456',
  },
  {
    name: 'individualCircumstances.0.collectorsText',
    value: 'collectorsText',
  },
  {
    name: 'individualCircumstances.0.event.endDate',
    value: 'endDate',
  },
  {
    name: 'individualCircumstances.0.event.expeditionText',
    value: 'expeditionText',
  },

  {
    name:
      'individualCircumstances.0.event.localityInformation.curatedLocalities.0.id.hidden',
    value: 'Africa',
  },

  {
    name:
      'individualCircumstances.0.event.localityInformation.curatedLocalities.1.id.hidden',
    value: 'Algeria',
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.localityVerbatim',
    value: 'localityVerbatim',
  },
  {
    name: 'individualCircumstances.0.event.localityInformation.localityName',
    value: 'localityName',
  },
  {
    name: 'individualCircumstances.0.event.localityInformation.remarks',
    value: 'remarks',
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.position.latitude',
    value: 'latitude-string',
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.position.longitude',
    value: 'longitude-string',
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.position.referenceSystem',
    value: 'referenceSystem',
  },

  {
    name:
      'individualCircumstances.0.event.localityInformation.verticalPosition.maximumDepthInMeters',
    value: 100,
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.verticalPosition.maximumElevationInMeters',
    value: 100,
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.verticalPosition.minimumDepthInMeters',
    value: 20,
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.verticalPosition.minimumElevationInMeters',
    value: 20,
  },
  {
    name: 'individualCircumstances.0.event.startDate',
    value: 'startDate',
  },
]

const expectedOutput = {
  curatedLocalities: [
    { id: 'Africa', type: 'curatedLocality' },
    { id: 'Algeria', type: 'curatedLocality' },
  ],
  distinguishedUnitTypes: [
    {
      id: '2',
      type: 'distinguishedUnitType',
    },
  ],
  featureObservationTypes: [
    {
      id: '1',
      type: 'featureObservationType',
    },
  ],
  physicalUnits: [
    {
      storageLocation: {
        id: '1',
        type: 'storageLocation',
      },
      storedUnderTaxonName: 'storedUnderTaxonName',
    },
  ],
  specimen: {
    individualGroup: {
      distinguishedUnits: [
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
          distinguishedUnitType: {
            id: '2',
            type: 'distinguishedUnitType',
          },
          physicalUnit: {
            storageLocation: {
              id: '1',
              type: 'storageLocation',
            },
            storedUnderTaxonName: 'storedUnderTaxonName',
          },
        },
      ],
      featureObservations: [
        {
          date: 'date',
          featureObservationAgent: 'featureObservationAgent',
          featureObservationText: 'juvenile',
          featureObservationType: {
            id: '1',
            type: 'featureObservationType',
          },
          methodText: 'known-age',
          remarks: 'remarks',
        },
      ],

      identifiers: [
        {
          identifier: {
            identifierType: 'catalogNumber',
            nameSpace: '',
            value: '123456',
          },
          publishRecord: true,
          remarks: '',
        },
      ],
      individualCircumstances: [
        {
          collectorsText: 'collectorsText',
          event: {
            endDate: 'endDate',
            expeditionText: 'expeditionText',
            localityInformation: {
              curatedLocalities: [
                { id: 'Africa', type: 'curatedLocality' },
                { id: 'Algeria', type: 'curatedLocality' },
              ],
              localityName: 'localityName',
              localityVerbatim: 'localityVerbatim',
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
      readOnly: undefined,
      taxonInformation: {
        curatorialName: 'curatorialName',
        determinations: [
          {
            date: 'date',
            determinationVerbatim: 'determinationVerbatim',
            determinedByAgentText: 'determinedByAgentText',
            isCurrentDetermination: true,
            remarks: 'remarks',
            taxon: {
              id: '2367',
              type: 'taxon',
            },
          },
        ],
        taxonRemarks: 'taxonRemarks',
      },
    },
    readOnly: undefined,
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
        // filter out unused featureObservationTypes, also done in transform output
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
