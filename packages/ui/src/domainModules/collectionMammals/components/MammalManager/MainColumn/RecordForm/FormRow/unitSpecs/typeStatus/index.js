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
    columnProps: { width: 16 },
    componentName: 'TypeSpecimenTypeDropdownSearch',
    enableHelpNotifications: false,
    initiallyHidden: true,
    name: 'individual.typeStatus.id',
    wrapInField: true,
  },
  {
    columnProps: { width: 8 },
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
  name: 'typeStatus',
  parts,
}
