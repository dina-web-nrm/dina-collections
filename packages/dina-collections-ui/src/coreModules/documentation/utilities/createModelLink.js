export default function createModelLink({ version = 1, modelName }) {
  return `/docs/${version}/models/${modelName}`
}
