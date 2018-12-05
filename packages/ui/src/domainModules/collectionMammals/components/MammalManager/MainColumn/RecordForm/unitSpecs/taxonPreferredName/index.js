const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.taxonPreferredName',
    },
  },
  {
    componentName: 'TogglableTaxonDropdownPickerSearch',
    componentProps: {
      columnProps: { width: 8 },
    },
    name: 'individual.taxonInformation.curatorialTaxon.id',
    wrapInField: true,
  },
]

export default {
  name: 'taxonPreferredName',
  parts,
}
