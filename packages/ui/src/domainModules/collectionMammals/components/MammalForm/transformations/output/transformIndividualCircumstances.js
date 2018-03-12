import transformLocalityInformation from './transformLocalityInformation'

export default function transformIndividualCircumstances(
  individualCircumstances
) {
  if (!individualCircumstances) {
    return []
  }

  let curatedLocalities = []

  const transformedIndividualCircumstances = individualCircumstances.map(
    individualCircumstance => {
      if (
        individualCircumstance.event &&
        individualCircumstance.event.localityInformation
      ) {
        const localityInformation = transformLocalityInformation(
          individualCircumstance.event.localityInformation
        )

        if (
          localityInformation.curatedLocalities &&
          localityInformation.curatedLocalities.length
        ) {
          curatedLocalities = [
            ...curatedLocalities,
            ...localityInformation.curatedLocalities,
          ]
        }

        return {
          ...individualCircumstance,
          event: {
            ...individualCircumstance.event,
            localityInformation,
          },
        }
      }

      return individualCircumstance
    }
  )

  return {
    curatedLocalities,
    individualCircumstances: transformedIndividualCircumstances,
  }
}
