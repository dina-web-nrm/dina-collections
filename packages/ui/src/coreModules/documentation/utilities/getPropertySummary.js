import extractModelFromSpecification from './extractModelFromSpecification'

export default function getPropertySummary({
  property,
  // propertyIsAnyOf,
  propertyIsArray,
  propertyIsModel,
  specification,
}) {
  let summary = property && property['x-summary']
  if (propertyIsModel || propertyIsArray) {
    let refModelId
    if (propertyIsModel) {
      refModelId = property.$ref.replace('#/components/schemas/', '')
    }

    if (propertyIsArray) {
      refModelId =
        property.items &&
        property.items.$ref &&
        property.items.$ref.replace('#/components/schemas/', '')
    }

    const refModel =
      refModelId &&
      extractModelFromSpecification({
        modelId: refModelId,
        specification,
      })

    if (refModel && refModel['x-summary']) {
      summary = refModel['x-summary']
    }
  }

  return property && summary
}
