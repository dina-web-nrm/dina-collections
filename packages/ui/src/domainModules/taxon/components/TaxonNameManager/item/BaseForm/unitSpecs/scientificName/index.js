const parts = [
  {
    componentName: 'Input',
    componentProps: {
      fluid: true,
      type: 'text',
    },
    name: 'name',
    wrapInField: true,
  },
  {
    componentName: 'RankDropdown',
    name: 'rank',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
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
