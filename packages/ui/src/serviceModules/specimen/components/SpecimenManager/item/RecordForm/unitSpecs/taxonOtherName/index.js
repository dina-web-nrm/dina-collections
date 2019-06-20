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
    relativeNames: ['customTaxonNameType.id', 'value'],
  },
]

export default {
  name: 'taxonOtherName',
  parts,
}
