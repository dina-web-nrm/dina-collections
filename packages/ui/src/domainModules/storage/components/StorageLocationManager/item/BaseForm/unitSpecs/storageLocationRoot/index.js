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
    componentName: 'StorageLocationLevelDropdown',
    name: 'group',
    wrapInField: true,
  },
  {
    componentName: 'StorageLocationDropdownSearch',
    name: 'parent.id',
    wrapInField: true,
  },
]

export default {
  name: 'storageLocationRoot',
  parts,
}
