export default function extractModelFromSpecification({
  modelId,
  specification,
}) {
  return { key: modelId, ...specification[modelId] }
}
