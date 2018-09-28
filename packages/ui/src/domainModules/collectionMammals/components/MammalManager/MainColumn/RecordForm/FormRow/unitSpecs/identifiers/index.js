const items = [
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
  },
]

export default {
  items,
}
