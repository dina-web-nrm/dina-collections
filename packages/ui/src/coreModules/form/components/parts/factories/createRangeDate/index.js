export default function createRangeDate({
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
} = {}) {
  return [
    {
      componentName: 'RangeDate',
      componentProps: {
        displayDateTypeRadios,
        displayEndDateLabel,
        displayLabel,
        displayStartDateLabel,
        displaySubLabels,
        endDateLabel,
        initialDateType,
        stack,
        startDateLabel,
      },
      initiallyHidden,
      name: baseName,
      wrapInField: true,
    },
  ]
}
