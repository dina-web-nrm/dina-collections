const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.connectedTaxa',
    },
  },
  {
    componentName: 'TaxaTable',
    containsReduxFormField: true,
  },
]

export default {
  name: 'connectedTaxa',
  parts,
}
