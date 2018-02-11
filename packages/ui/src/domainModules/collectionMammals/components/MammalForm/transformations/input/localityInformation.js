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

  const currentCuratedLocalityMap = (
    localityInformation.curatedLocalities || []
  ).reduce((obj, curatedLocality) => {
    return {
      ...obj,
      [curatedLocality.type]: curatedLocality,
    }
  }, {})

  const curatedLocalities = curatedLocalitiesTypes.map(type => {
    if (currentCuratedLocalityMap[type]) {
      return currentCuratedLocalityMap[type]
    }
    return undefined
  })

  return {
    ...localityInformation,
    curatedLocalities,
  }
}
