const buildKey = require('../../globalDecorators/decoratePlaceKeyIdMap/buildKey')

module.exports = function getPlaceId({
  srcCollectingInformation,
  globals,
  migrator,
  reporter,
}) {
  const {
    locationInformation_continentOcean: continent,
    locationInformation_country: nation,
    locationInformation_district: district,
    locationInformation_province: province,
  } = srcCollectingInformation

  const key = buildKey({ continent, district, nation, province })

  if (!key) {
    return null
  }

  return migrator.getFromGlobals({
    globals,
    key,
    mapKey: 'placeKeyIdMap',
    reporter,
  })
}
