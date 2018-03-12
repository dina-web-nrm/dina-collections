export default function transformLocalityInformation(localityInformation) {
  if (!localityInformation) {
    return localityInformation
  }

  const curatedLocalities = localityInformation.curatedLocalities.map(
    ({ id }) => {
      return {
        id,
        type: 'curatedLocality',
      }
    }
  )

  return {
    ...localityInformation,
    curatedLocalities,
  }
}
