const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.identifiers',
    },
  },
  {
    componentName: 'IdentifiersTable',
    containsReduxFormField: true,
    name: 'individual.identifiers',
    relativeNames: ['identifierType.id', 'value'],
  },
]

export default {
  name: 'identifiers',
  parts,
}
