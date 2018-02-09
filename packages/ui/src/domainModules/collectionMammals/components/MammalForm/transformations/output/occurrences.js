import transformLocalityInformation from './localityInformation'

export default function transformOccurrences(occurrences) {
  if (!occurrences) {
    return []
  }

  return occurrences.map(occurrence => {
    const { dayStart, monthStart, yearStart } = occurrence
    const localityInformation = transformLocalityInformation(
      occurrence.localityInformation
    )
    return {
      ...occurrence,
      dayEnd: dayStart,
      localityInformation,
      monthEnd: monthStart,
      yearEnd: yearStart,
    }
  })
}
