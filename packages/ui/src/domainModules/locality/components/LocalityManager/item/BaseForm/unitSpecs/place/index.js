const parts = [
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 8 },
      fluid: true,
      type: 'text',
    },
    name: 'name',
    wrapInField: true,
  },
  {
    componentName: 'GeographicLevelDropdown',
    name: 'group',
    wrapInField: true,
  },
  {
    componentName: 'LocalityDropdownSearch',
    name: 'parent.id',
    wrapInField: true,
  },
]

export default {
  name: 'place',
  parts,
}
