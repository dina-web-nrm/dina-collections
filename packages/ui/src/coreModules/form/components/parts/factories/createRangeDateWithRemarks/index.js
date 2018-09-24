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
      displayDateTypeRadios: true,
      initialDateType,
      initiallyHidden,
      name: baseName,
      validate: defaultValidate,
    },
    {
      componentName: 'RemarksTogglable',
      emptyStateTextKey,
      initiallyHidden,
      model,
      name: `${baseName}.remarks`,
      resultPrefixTextKey,
    },
  ]
}
