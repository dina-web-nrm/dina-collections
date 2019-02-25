import createRangeDate from '../createRangeDate'

export default function createRangeDateWithRemarks({
  baseName,
  displayDateTypeRadios,
  displayEndDateLabel,
  displayLabel,
  displayStartDateLabel,
  displaySubLabels,
  emptyStateTextKey,
  endDateLabel,
  initialDateType,
  initiallyHidden,
  model,
  resultPrefixTextKey,
  stack,
  startDateLabel,
} = {}) {
  return [
    ...createRangeDate({
      baseName,
      displayDateTypeRadios,
      displayEndDateLabel,
      displayLabel,
      displayStartDateLabel,
      displaySubLabels,
      endDateLabel,
      initialDateType,
      initiallyHidden,
      stack,
      startDateLabel,
    }),
    {
      componentName: 'Remarks',
      componentProps: {
        emptyStateTextKey,
        model,
        resultPrefixTextKey,
      },
      initiallyHidden,
      name: `${baseName}.remarks`,
      wrapInField: true,
    },
  ]
}
