export default function getPropertyIsArray(property) {
  const { type, items } = property
  return type === 'array' && (items && items.type !== 'string')
}
