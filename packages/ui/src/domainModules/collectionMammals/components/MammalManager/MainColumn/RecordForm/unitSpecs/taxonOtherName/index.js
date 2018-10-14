const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.taxonOtherNames',
    },
  },
  {
    componentName: 'CustomTaxonNamesTable',
    containsReduxFormField: true,
    name: 'individual.taxonInformation.customTaxonNames',
  },
]

export default {
  name: 'taxonOtherName',
  parts,
}
