const curatedLocalitiesTypes = [
  'continent',
  'country',
  'province',
  'district',
  'locality',
]

export default function transformLocalityInformation(localityInformation) {
  if (!localityInformation) {
    return localityInformation
  }

  const curatedLocalities = curatedLocalitiesTypes
    .map((type, index) => {
      const id =
        localityInformation.curatedLocalities[index] &&
        localityInformation.curatedLocalities[index].id
      if (id !== undefined) {
        return {
          id,
          type,
        }
      }
      return null
    })
    .filter(element => !!element)

  return {
    ...localityInformation,
    curatedLocalities,
  }
}
