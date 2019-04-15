const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.features',
    },
  },
  {
    componentName: 'FeatureObservations',
    containsReduxFormField: true,
    name: 'individual.featureObservations',
    relativeNames: [
      'featureType.id',
      'featureObservationText',
      'featureObservationUnit',
      'methodText',
    ],
  },
]

export default {
  name: 'features',
  parts,
}
