import { defaultValidate } from 'coreModules/form/components/fields/Date/SingleDate'

export default function createSingleDate({ initiallyHidden, name } = {}) {
  return [
    {
      componentName: 'SingleDate',
      componentProps: {
        validate: defaultValidate,
      },
      initiallyHidden,
      name,
      wrapInField: true,
    },
  ]
}
