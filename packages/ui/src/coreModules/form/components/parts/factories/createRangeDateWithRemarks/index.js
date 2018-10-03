import { defaultValidate } from 'coreModules/form/components/fields/Date/RangeDate'

export default function createRangeDateWithRemarks(
  {
    baseName,
    emptyStateTextKey,
    initialDateType = 'single',
    initiallyHidden,
    model,
    resultPrefixTextKey,
  } = {}
) {
  return [
    {
      componentName: 'RangeDate',
      componentProps: {
        displayDateTypeRadios: true,
        initialDateType,
        validate: defaultValidate,
      },
      initiallyHidden,
      name: baseName,
      wrapInField: true,
    },
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
