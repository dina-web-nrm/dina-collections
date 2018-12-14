const model = 'collectingInformation'

const parts = [
  {
    componentName: 'TranslatedHeader',
    componentProps: {
      as: 'h3',
      textKey: 'headers.collectingLocality',
    },
  },
  {
    componentName: 'CollectingLocality',
    containsReduxFormField: true,
    name: 'individual.collectingInformation.0.event.locationInformation',
  },
  {
    componentName: 'TextArea',
    componentProps: {
      columnProps: { width: 11 },
      rows: 2,
      type: 'text',
    },
    name:
      'individual.collectingInformation.0.event.locationInformation.localityI',
    wrapInField: true,
  },
  {
    componentName: 'LocalityDropdownPickerSearch',
    componentProps: {
      columnProps: { width: 11 },
    },
    name:
      'individual.collectingInformation.0.event.locationInformation.places.0.id',
    wrapInField: true,
  },
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { clear: true, width: 5 },
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
