const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.legacyData',
    },
  },
  {
    componentName: 'CustomData',
    componentProps: {
      type: 'read-only',
    },
    name: 'legacyData',
    wrapInField: true,
  },
]

export default {
  name: 'legacyData',
  parts,
}
