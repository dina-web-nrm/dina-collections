export default function createLinkFromRef(ref) {
  if (!ref) {
    return ''
  }
  return ref.split('/').pop()
}
