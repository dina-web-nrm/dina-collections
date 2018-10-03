const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.externalEvents',
    },
  },
  {
    componentName: 'RecordHistoryExternalEvents',
    containsReduxFormField: true,
    name: 'individual.recordHistoryEvents',
  },
]

export default {
  name: 'recordHistoryExternalEvents',
  parts,
}
