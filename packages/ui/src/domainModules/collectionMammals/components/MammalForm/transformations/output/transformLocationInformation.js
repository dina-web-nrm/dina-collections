export default function transformLocationInformation(locationInformation) {
  if (!locationInformation) {
    return locationInformation
  }

  const places = (locationInformation.places || []).map(({ id }) => {
    return {
      id,
      type: 'place',
    }
  })

  return {
    ...locationInformation,
    places,
  }
}
