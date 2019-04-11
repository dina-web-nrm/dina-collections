const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.connectedPreparationTypes',
    },
  },
  {
    componentName: 'PreparationTypesTable',
    containsReduxFormField: true,
  },
]

export default {
  name: 'connectedPreparationTypes',
  parts,
}
