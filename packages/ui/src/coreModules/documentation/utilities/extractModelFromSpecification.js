export default function extractModelFromSpecification({
  modelId,
  specification,
}) {
  return Object.keys(specification.components.schemas)
    .map(key => {
      return { key, ...specification.components.schemas[key] }
    })
    .find(model => {
      return model.key === modelId
    })
}
