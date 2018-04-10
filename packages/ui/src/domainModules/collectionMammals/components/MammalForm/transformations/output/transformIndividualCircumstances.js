import transformLocationInformation from './transformLocationInformation'

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
        individualCircumstance.event.locationInformation
      ) {
        const locationInformation = transformLocationInformation(
          individualCircumstance.event.locationInformation
        )

        if (
          locationInformation.curatedLocalities &&
          locationInformation.curatedLocalities.length
        ) {
          curatedLocalities = [
            ...curatedLocalities,
            ...locationInformation.curatedLocalities,
          ]
        }

        return {
          ...individualCircumstance,
          event: {
            ...individualCircumstance.event,
            locationInformation,
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
