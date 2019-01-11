const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h2',
      textKey: 'headers.scientificName',
    },
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 9 },
      fluid: true,
      type: 'text',
    },
    name: 'name',
    required: true,
    wrapInField: true,
  },
  {
    componentName: 'RankDropdown',
    componentProps: {
      columnProps: { clear: true, width: 9 },
    },
    name: 'rank',
    required: true,
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 6 },
      fluid: true,
      type: 'text',
    },
    name: 'rubinNumber',
    wrapInField: true,
  },
]

export default {
  name: 'scientificNameRoot',
  parts,
}
