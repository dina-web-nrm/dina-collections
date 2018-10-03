const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.typeInformation',
    },
  },
  {
    componentName: 'AddButton',
    componentProps: {
      textKey: 'other.addTypeStatus',
    },
    initiallyShown: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 7 },
      enableHelpNotifications: false,
      fluid: true,
      type: 'text',
    },
    initiallyHidden: true,
    name: 'individual.typifiedName',
    wrapInField: true,
  },
]

export default {
  name: 'typeStatus',
  parts,
}
