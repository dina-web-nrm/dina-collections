const items = [
  {
    as: 'h3',
    componentName: 'TranslatedHeader',
    textKey: 'headers.typeInformation',
  },
  {
    componentName: 'AddButton',
    initiallyShown: true,
    textKey: 'other.addTypeStatus',
  },
  {
    columnProps: { width: 7 },
    componentName: 'Input',
    enableHelpNotifications: false,
    fluid: true,
    initiallyHidden: true,
    name: 'individual.typifiedName',
    type: 'text',
    wrapInField: true,
  },
]

export default {
  items,
}
