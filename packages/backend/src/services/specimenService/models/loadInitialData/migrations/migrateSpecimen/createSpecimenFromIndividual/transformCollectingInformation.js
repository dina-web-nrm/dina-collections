const transformLocationInformation = require('./transformLocationInformation')

module.exports = function transformCollectingInformation(
  collectingInformation
) {
  if (!collectingInformation) {
    return []
  }
  let places = []
  let establishmentMeansTypes = []

  const transformedCollectingInformation = collectingInformation.map(item => {
    let mappedItem = item
    if (item.event && item.event.locationInformation) {
      const locationInformation = transformLocationInformation(
        item.event.locationInformation
      )

      if (locationInformation.places && locationInformation.places.length) {
        places = [...places, ...locationInformation.places]
        mappedItem = {
          ...mappedItem,
          event: {
            ...item.event,
            locationInformation,
          },
        }
      }
    }
    if (item.establishmentMeansType) {
      const establishmentMeansType = {
        id: mappedItem.establishmentMeansType.id,
        type: 'establishmentMeansType',
      }

      establishmentMeansTypes = [
        ...establishmentMeansTypes,
        establishmentMeansType,
      ]
      mappedItem = {
        ...mappedItem,
        establishmentMeansType,
      }
    }

    return mappedItem
  })

  return {
    collectingInformation: transformedCollectingInformation,
    establishmentMeansTypes,
    places,
  }
}
