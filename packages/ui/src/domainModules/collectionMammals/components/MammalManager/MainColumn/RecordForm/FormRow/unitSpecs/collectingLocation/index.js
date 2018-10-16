const model = 'collectingInformation'

const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.collecintLocality',
    },
  },
  {
    componentName: 'TextArea',
    componentProps: {
      columnProps: { width: 10 },
      rows: 2,
      type: 'text',
    },
    name:
      'individual.collectingInformation.0.event.locationInformation.localityI',
    wrapInField: true,
  },
  {
    componentName: 'IconButton',
    componentProps: {
      columnProps: { float: 'left', width: 5 },
      icon: 'marker',
      style: { float: 'left' },
      textKey: 'other.addPosition',
    },
    initiallyShown: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 5 },
      fluid: true,
      type: 'text',
    },
    name:
      'individual.collectingInformation.0.event.locationInformation.swedishGrid5km',
    wrapInField: true,
  },
  {
    componentName: 'EstablishmentMeansTypeRadioGroup',
    label: 'other.appearanceAtCollecting',
    name: 'individual.collectingInformation.0.establishmentMeansType.id',
    wrapInField: true,
  },
  {
    componentName: 'Remarks',
    componentProps: {
      emptyStateTextKey: 'remarks.emptyState.collectingLocationRemarks',
      model,
      resultPrefixTextKey: 'remarks.resultPrefix.collectingLocationRemarks',
    },
    name: 'individual.collectingInformation.0.remarks',
    wrapInField: true,
  },
]

export default {
  name: 'collectingLocation',
  parts,
}
