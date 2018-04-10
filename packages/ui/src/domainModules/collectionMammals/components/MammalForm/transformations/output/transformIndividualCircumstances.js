import transformLocationInformation from './transformLocationInformation'

export default function transformIndividualCircumstances(
  individualCircumstances
) {
  if (!individualCircumstances) {
    return []
  }

  let places = []

  const transformedIndividualCircumstances = individualCircumstances.map(
    individualCircumstance => {
      if (
        individualCircumstance.event &&
        individualCircumstance.event.locationInformation
      ) {
        const locationInformation = transformLocationInformation(
          individualCircumstance.event.locationInformation
        )

        if (locationInformation.places && locationInformation.places.length) {
          places = [...places, ...locationInformation.places]
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
    individualCircumstances: transformedIndividualCircumstances,
    places,
  }
}
