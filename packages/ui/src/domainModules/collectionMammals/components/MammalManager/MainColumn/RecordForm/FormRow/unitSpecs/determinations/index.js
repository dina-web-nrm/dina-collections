const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.determinations',
    },
  },
  {
    componentName: 'AddButton',
    componentProps: {
      textKey: 'other.addDetermination',
    },
    initiallyShown: true,
  },
]

export default {
  name: 'determinations',
  parts,
}
