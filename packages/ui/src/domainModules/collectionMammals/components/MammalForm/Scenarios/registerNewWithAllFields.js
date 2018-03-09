const mutations = [
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
    name: 'taxonInformation.determinations.0.taxonNameStandardized.hidden',
    value: 'Sorex minutus',
  },
  {
    id: 'add-feature-observation',
    ignore: true,
    interaction: 'click',
  },
  {
    name: 'featureObservations.0.featureObservationType.typeName.hidden',
    value: 'age',
  },

  {
    name: 'featureObservations.0.date',
    value: 'date',
  },
  {
    name: 'featureObservations.0.featureObservationAgent',
    value: 'featureObservationAgent',
  },
  {
    name: 'featureObservations.0.featureObservationText',
    value: '21',
  },
  {
    name: 'featureObservations.0.methodText',
    value: 'methodText',
  },
  {
    name: 'distinguishedUnits.0.alternateIdentifiersText',
    value: 'alternateIdentifiersText',
  },
  {
    name: 'distinguishedUnits.0.physicalUnit.normalStorageLocationText',
    value: 'normalStorageLocationText',
  },
  {
    name: 'distinguishedUnits.0.physicalUnit.storedUnderTaxonName',
    value: 'Sorex minutus',
  },
  {
    name: 'distinguishedUnits.0.physicalUnitText',
    value: 'physicalUnitText',
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
      'individualCircumstances.0.event.localityInformation.coordinatesVerbatim',
    value: 'coordinatesVerbatim',
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
      'individualCircumstances.0.event.localityInformation.curatedLocalities.2.id.hidden',
    value: 'Balearic Islands',
  },

  {
    name:
      'individualCircumstances.0.event.localityInformation.curatedLocalities.3.id.hidden',
    value: 'GaspÃ© Peninsula',
  },

  {
    name:
      'individualCircumstances.0.event.localityInformation.curatedLocalities.4.id',
    value: 'Skansen',
  },

  {
    name:
      'individualCircumstances.0.event.localityInformation.georeferenceSourcesText',
    value: 'georeferenceSourcesText',
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.localityVerbatim',
    value: 'localityVerbatim',
  },
  {
    name: 'individualCircumstances.0.event.localityInformation.remarks',
    value: 'remarks',
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.position.geodeticDatum',
    value: 'geodeticDatum text',
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
      'individualCircumstances.0.event.localityInformation.position.uncertaintyInMeters',
    value: 10,
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
  physicalUnits: [
    {
      normalStorageLocationText: 'normalStorageLocationText',
      storedUnderTaxonName: 'Sorex minutus',
    },
  ],
  specimen: {
    individualGroup: {
      distinguishedUnits: [
        {
          alternateIdentifiersText: 'alternateIdentifiersText',
          physicalUnit: {
            normalStorageLocationText: 'normalStorageLocationText',
            storedUnderTaxonName: 'Sorex minutus',
          },
          physicalUnitText: 'physicalUnitText',
        },
      ],
      featureObservations: [
        {
          date: 'date',
          featureObservationAgent: 'featureObservationAgent',
          featureObservationText: '21',
          featureObservationType: {
            id: '3',
            typeName: 'age',
          },
          methodText: 'methodText',
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
              coordinatesVerbatim: 'coordinatesVerbatim',
              curatedLocalities: [
                { id: 'Africa', type: 'continent' },
                { id: 'Algeria', type: 'country' },
                { id: 'Balearic Islands', type: 'province' },
                { id: 'GaspÃ© Peninsula', type: 'district' },
                { id: 'Skansen', type: 'locality' },
              ],
              georeferenceSourcesText: 'georeferenceSourcesText',
              localityVerbatim: 'localityVerbatim',
              position: {
                geodeticDatum: 'geodeticDatum text',
                latitude: 'latitude-string',
                longitude: 'longitude-string',
                uncertaintyInMeters: 10,
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
      taxonInformation: {
        determinations: [
          {
            date: 'date',
            determinationVerbatim: 'determinationVerbatim',
            determinedByAgentText: 'determinedByAgentText',
            isCurrentDetermination: true,
            remarks: 'remarks',
            taxonNameStandardized: 'Sorex minutus',
          },
        ],
      },
    },
  },
}

const postSubmitTest = ({ submitResult }) => {
  const { registeredFields } = submitResult
  expect(
    mutations
      .filter(({ ignore }) => !ignore)
      .map(mutation => (mutation.name || '').replace('.hidden', ''))
      .sort()
  ).toMatchObject(Object.keys(registeredFields).sort())
}

const scenario = {
  description: 'Register new mammal form with all fields',
  expectedOutput,
  input: {},
  mutations,
  postSubmitTest,
}

export default scenario
