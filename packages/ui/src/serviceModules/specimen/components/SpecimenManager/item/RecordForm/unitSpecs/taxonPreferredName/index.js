const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.taxon',
    },
  },
  {
    componentName: 'TogglableTaxonDropdownPickerSearch',
    componentProps: {
      deleteParentIfEmpty: true,
    },
    name: 'individual.taxonInformation.curatorialTaxon.id',
    wrapInField: true,
  },
]

export default {
  name: 'taxonPreferredName',
  parts,
}
