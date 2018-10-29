const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.connectedScientificNames',
    },
  },
  {
    componentName: 'ScientificNamesTable',
    containsReduxFormField: true,
  },
]

export default {
  name: 'scientificNames',
  parts,
}
