const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h2',
      textKey: 'headers.taxon',
    },
  },
  {
    componentName: 'TaxonDropdownPickerSearch',
    componentProps: {
      columnProps: { width: 14 },
    },
    name: 'parent.id',
    required: true,
    wrapInField: true,
  },
]
export default {
  name: 'taxonRoot',
  parts,
}
