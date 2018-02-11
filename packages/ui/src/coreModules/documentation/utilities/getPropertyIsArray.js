export default function getPropertyIsArray(property) {
  const { type } = property
  return type === 'array'
}
