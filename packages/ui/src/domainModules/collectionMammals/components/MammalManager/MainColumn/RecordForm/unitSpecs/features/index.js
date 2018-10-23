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
  },
]

export default {
  name: 'features',
  parts,
}
