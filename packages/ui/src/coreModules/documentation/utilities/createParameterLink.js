export default function createParameterLink({
  version = 1,
  modelName,
  parameterName,
}) {
  return `/docs/${version}/models/${modelName}/${parameterName}`
}
