export default function getModelLinkFromProperty(property) {
  const segments = property && property.$ref && property.$ref.split('/')

  if (!segments) {
    return ''
  }

  const len = segments.length

  if (!len) {
    return ''
  }

  return segments[len - 1]
}
