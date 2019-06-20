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
    componentName: 'TypeSpecimenTypeDropdownSearch',
    componentProps: {
      columnProps: { clear: true, width: 6 },
    },
    initiallyHidden: true,
    name: 'individual.taxonInformation.typeStatus.id',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 8 },
      fluid: true,
      type: 'text',
    },
    initiallyHidden: true,
    name: 'individual.taxonInformation.typifiedName',
    wrapInField: true,
  },
]

export default {
  name: 'typeStatus',
  parts,
}
