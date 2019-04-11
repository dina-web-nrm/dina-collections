const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.vernacularNames',
    },
  },
  {
    componentName: 'VernacularNamesTable',
    containsReduxFormField: true,
    name: 'vernacularNames',
  },
]

export default {
  name: 'vernacularNames',
  parts,
}
