const items = [
  {
    as: 'h3',
    componentName: 'TranslatedHeader',
    textKey: 'headers.collecintLocality',
  },
  {
    columnProps: { width: 11 },
    componentName: 'TextArea',
    enableHelpNotifications: false,
    name: 'locationInformation.localityV',
    rows: 2,
    type: 'text',
    wrapInField: true,
  },
  {
    columnProps: { float: 'left', width: 5 },
    componentName: 'IconButton',
    icon: 'marker',
    initiallyShown: true,
    style: { float: 'left' },
    textKey: 'other.addPosition',
  },
  {
    columnProps: { width: 13 },
    componentName: 'TextArea',
    enableHelpNotifications: false,
    name: 'locationInformation.localityI',
    rows: 2,
    style: { width: '83.2%' },
    type: 'text',
    wrapInField: true,
  },
  {
    columnProps: { width: 4 },
    componentName: 'Input',
    enableHelpNotifications: false,
    fluid: true,
    name: 'locationInformation.rt90',
    type: 'text',
    wrapInField: true,
  },
]

export default {
  items,
}
