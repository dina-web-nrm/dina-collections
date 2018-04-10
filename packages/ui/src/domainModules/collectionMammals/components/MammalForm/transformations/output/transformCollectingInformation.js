import transformLocationInformation from './transformLocationInformation'

export default function transformCollectingInformation(collectingInformation) {
  if (!collectingInformation) {
    return []
  }

  let places = []

  const transformedCollectingInformation = collectingInformation.map(item => {
    if (item.event && item.event.locationInformation) {
      const locationInformation = transformLocationInformation(
        item.event.locationInformation
      )

      if (locationInformation.places && locationInformation.places.length) {
        places = [...places, ...locationInformation.places]
      }

      return {
        ...item,
        event: {
          ...item.event,
          locationInformation,
        },
      }
    }

    return item
  })

  return {
    collectingInformation: transformedCollectingInformation,
    places,
  }
}
