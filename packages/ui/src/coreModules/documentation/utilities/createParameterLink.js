export default function createParameterLink({
  version = 1,
  modelName,
  parameterName,
}) {
  return `/dataModelDocs/${version}/models/${modelName}/${parameterName}`
}
