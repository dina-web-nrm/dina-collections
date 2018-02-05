export const getFeatureObservationTypeId = ({ featureObservationTypeName }) => {
  switch (featureObservationTypeName) {
    case 'sex': {
      return 1
    }
    case 'length': {
      return 2
    }
    case 'age': {
      return 3
    }
    case 'weight': {
      return 4
    }
    case 'conditionAtCollecting': {
      return 5
    }
    case 'ageStage': {
      return 6
    }
    default: {
      throw new Error(
        `Unknown featureObservationTypeName: ${featureObservationTypeName}`
      )
    }
  }
}

export default function transformFeatureObservations(featureObservations = []) {
  return featureObservations
    .filter(featureObservation => {
      return featureObservation.featureObservationText
    })
    .map(({ featureObservationType, ...rest }) => {
      return {
        ...rest,
        featureObservationType: {
          ...featureObservationType,
          id: getFeatureObservationTypeId(featureObservationType),
        },
      }
    })
}
