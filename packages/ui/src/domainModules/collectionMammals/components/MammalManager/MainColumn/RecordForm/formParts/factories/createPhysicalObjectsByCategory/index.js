import { camelCase } from 'lodash'

export default function createPhysicalObjectsByCategory(category) {
  const camelCaseCategory = camelCase(category)

  return [
    {
      componentName: 'TranslatedHeader',
      componentProps: {
        as: 'h3',
        textKey: `headers.physicalObjects.${camelCaseCategory}`,
      },
    },
    {
      componentName: 'PhysicalObjectsAccordion',
      componentProps: {
        category,
      },
      containsReduxFormField: true,
      name: 'individual.collectionItems',
    },
  ]
}
