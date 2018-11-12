/* eslint-disable camelcase */
const createDeleteProperties = require('common/src/createDeleteProperties')
const getPlaceId = require('./getPlaceId')

const deleteNullProperties = createDeleteProperties(null)

const castToNumber = input => {
  if (!input) {
    return null
  }
  return Number(input)
}

module.exports = function migrateLocationInformation({
  globals,
  migrator,
  reporter,
  srcCollectingInformation,
}) {
  const {
    locationInformation_latitude,
    locationInformation_longitude,
    locationInformation_uncertaintyInMeters,
    locationInformation_maxDepthInMeters,
    locationInformation_maxElevationhInMeters,
    locationInformation_minDepthInMeters,
    locationInformation_minElevationInMeters,
    locationInformation_localityI,
    locationInformation_localityV,
    locationInformation_remarks,
    locationInformation_swedishGrid5km,
  } = srcCollectingInformation
  /* event.locationInformation */

  const locationInformation = deleteNullProperties({
    localityI: locationInformation_localityI,
    localityV: locationInformation_localityV,
    remarks: locationInformation_remarks,
    swedishGrid5km: locationInformation_swedishGrid5km,
  })

  const position = deleteNullProperties({
    latitude: locationInformation_latitude,
    longitude: locationInformation_longitude,
    uncertaintyInMeters: castToNumber(locationInformation_uncertaintyInMeters),
  })
  locationInformation.position = position

  const verticalPosition = deleteNullProperties({
    maximumDepthInMeters: castToNumber(locationInformation_maxDepthInMeters),
    maximumElevationInMeters: castToNumber(
      locationInformation_maxElevationhInMeters
    ),
    minimumDepthInMeters: castToNumber(locationInformation_minDepthInMeters),
    minimumElevationInMeters: castToNumber(
      locationInformation_minElevationInMeters
    ),
  })

  locationInformation.verticalPosition = verticalPosition

  const placeId = getPlaceId({
    globals,
    migrator,
    reporter,
    srcCollectingInformation,
  })

  if (placeId !== undefined && placeId !== null) {
    locationInformation.places = [
      {
        id: placeId,
      },
    ]
  }

  return deleteNullProperties(locationInformation)
}
