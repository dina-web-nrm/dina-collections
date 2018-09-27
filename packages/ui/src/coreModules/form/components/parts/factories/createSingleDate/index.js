import { defaultValidate } from 'coreModules/form/components/fields/Date/SingleDate'

export default function createSingleDate({ initiallyHidden, name } = {}) {
  return [
    {
      componentName: 'SingleDate',
      initiallyHidden,
      name,
      validate: defaultValidate,
      wrapInField: true,
    },
  ]
}
