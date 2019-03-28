export default function createModelLink({ version = 1, modelName }) {
  return `/dataModelDocs/${version}/models/${modelName}`
}
