const parts = [
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 9 },
      fluid: true,
      type: 'text',
    },
    name: 'name',
    wrapInField: true,
  },
  {
    componentName: 'RankDropdown',
    componentProps: {
      columnProps: { clear: true, width: 9 },
    },
    name: 'rank',
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
  name: 'scientificName',
  parts,
}
