export default function transformDeathInformation(deathInformation = []) {
  return deathInformation.map(death => {
    const { causeOfDeathType } = death

    const mappedDeath = { ...death }

    if (causeOfDeathType) {
      if (causeOfDeathType.id) {
        const mappedCauseOfDeathType = {
          id: causeOfDeathType.id,
        }
        mappedDeath.causeOfDeathType = mappedCauseOfDeathType
      } else {
        delete mappedDeath.causeOfDeathType
      }
    }

    return mappedDeath
  })
}
