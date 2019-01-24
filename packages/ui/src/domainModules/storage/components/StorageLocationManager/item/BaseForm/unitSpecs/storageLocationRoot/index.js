import { LEVEL_INSTITUTION } from '../../../../../../constants'

const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h2',
      textKey: 'headers.storageLocation',
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
    componentName: 'StorageLocationLevelDropdown',
    componentProps: {
      columnProps: { width: 9 },
      disableLevels: [LEVEL_INSTITUTION],
    },
    name: 'group',
    required: true,
    wrapInField: true,
  },
  {
    componentName: 'StorageLocationDropdownPickerSearch',
    componentProps: {
      columnProps: { width: 9 },
      excludeRootNode: false,
    },
    name: 'parent.id',
    required: true,
    wrapInField: true,
  },
]

export default {
  name: 'storageLocationRoot',
  parts,
}
