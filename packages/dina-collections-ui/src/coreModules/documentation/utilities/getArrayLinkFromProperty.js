export default function getArrayLinkFromProperty(property) {
  const segments =
    property.items && property.items.$ref && property.items.$ref.split('/')

  if (!segments) {
    return ''
  }

  const len = segments.length

  if (!len) {
    return ''
  }

  return segments[len - 1]
}
