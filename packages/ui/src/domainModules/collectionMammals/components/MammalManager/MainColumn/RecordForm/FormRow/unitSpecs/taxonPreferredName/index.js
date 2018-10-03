const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.taxonPreferredName',
    },
  },
  {
    componentName: 'TaxonNameDropdownPickerSearch',
    name: 'individual.taxonInformation.curatorialTaxonName.id',
    wrapInField: true,
  },
]

export default {
  name: 'taxonPreferredName',
  parts,
}
