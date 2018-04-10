export default function transformLocationInformation(locationInformation) {
  if (!locationInformation) {
    return locationInformation
  }

  const curatedLocalities = (locationInformation.curatedLocalities || []).map(
    ({ id }) => {
      return {
        id,
        type: 'curatedLocality',
      }
    }
  )

  return {
    ...locationInformation,
    curatedLocalities,
  }
}
