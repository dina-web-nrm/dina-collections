import transformLocalityInformation from './localityInformation'

export default function transformOccurrences(occurrences) {
  if (!occurrences) {
    return []
  }

  return occurrences.map(occurrence => {
    const localityInformation = transformLocalityInformation(
      occurrence.localityInformation
    )
    return {
      ...occurrence,
      localityInformation,
    }
  })
}
