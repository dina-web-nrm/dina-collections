export default function transformIdentifications(identifications) {
  if (identifications && identifications.length) {
    return identifications
  }

  return [{}]
}
