import { PLANET } from '../../../../../../constants'

const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h2',
      textKey: 'headers.geography',
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
    componentName: 'GeographicLevelDropdown',
    componentProps: {
      columnProps: { width: 9 },
      disableLevels: [PLANET],
    },
    name: 'group',
    required: true,
    wrapInField: true,
  },
  {
    componentName: 'LocalityDropdownPickerSearch',
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
  name: 'place',
  parts,
}
