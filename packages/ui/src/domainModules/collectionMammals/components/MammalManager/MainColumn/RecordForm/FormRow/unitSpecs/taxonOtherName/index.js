const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.taxonOtherNames',
    },
  },
  {
    componentName: 'AddButton',
    componentProps: {
      textKey: 'other.addOtherNames',
    },
    initiallyShown: true,
  },
]

export default {
  name: 'taxonOtherName',
  parts,
}
