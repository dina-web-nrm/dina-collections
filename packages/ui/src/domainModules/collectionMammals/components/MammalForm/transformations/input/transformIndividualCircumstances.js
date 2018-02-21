import transformLocalityInformation from './transformLocalityInformation'

export default function transformIndividualCircumstances(
  individualCircumstances
) {
  if (!individualCircumstances) {
    return []
  }

  return individualCircumstances.map(individualCircumstance => {
    if (
      individualCircumstance.event &&
      individualCircumstance.event.localityInformation
    ) {
      const localityInformation = transformLocalityInformation(
        individualCircumstance.event.localityInformation
      )

      return {
        ...individualCircumstance,
        event: {
          ...individualCircumstance.event,
          localityInformation,
        },
      }
    }

    return individualCircumstance
  })
}
