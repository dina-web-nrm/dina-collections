export default function transformDeathInformation(deathInformation = []) {
  let causeOfDeathTypes = []
  let mappedDeathInformation = deathInformation

  if (deathInformation && deathInformation.length) {
    mappedDeathInformation = deathInformation.map(deathInformationItem => {
      if (!deathInformationItem.causeOfDeathType) {
        return deathInformationItem
      }

      const causeOfDeathType = {
        id: deathInformationItem.causeOfDeathType.id,
        type: 'causeOfDeathType',
      }

      causeOfDeathTypes = [...causeOfDeathTypes, causeOfDeathType]

      return {
        ...deathInformationItem,
        causeOfDeathType,
      }
    })
  }

  return {
    causeOfDeathTypes,
    deathInformation: mappedDeathInformation,
  }
}
