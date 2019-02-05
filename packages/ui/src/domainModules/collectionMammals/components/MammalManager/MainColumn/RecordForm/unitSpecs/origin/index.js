const model = 'originInformation'

const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.origin',
    },
  },
  {
    componentName: 'AddButton',
    componentProps: {
      textKey: 'other.addOrigin',
    },
    initiallyShown: true,
  },
  {
    componentName: 'TextArea',
    componentProps: {
      columnProps: { width: 11 },
      rows: 2,
      type: 'text',
    },
    initiallyHidden: true,
    name: 'individual.originInformation.0.originLocality',
    wrapInField: true,
  },
  {
    componentName: 'EstablishmentMeansTypeRadioGroup',
    initiallyHidden: true,
    label: 'other.appearanceAtOrigin',
    module: 'collectionMammals',
    name: 'individual.originInformation.0.establishmentMeansType.id',
    wrapInField: true,
  },
  {
    componentName: 'SelectiveBreeding',
    initiallyHidden: true,
    label: 'other.selectiveBreeding',
    name: 'individual.originInformation.0.isResultOfSelectiveBreeding',
    wrapInField: true,
  },
  {
    componentName: 'Remarks',
    componentProps: {
      emptyStateTextKey: 'remarks.emptyState.origin',
      model,
      resultPrefixTextKey: 'remarks.resultPrefix.origin',
    },
    initiallyHidden: true,
    name: 'individual.originInformation.0.remarks',
    wrapInField: true,
  },
]

export default {
  compareInitiallyHiddenWithInitialValues: true,
  name: 'origin',
  parts,
}
