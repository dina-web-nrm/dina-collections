/* eslint-disable no-param-reassign */
const createLocationInformation = require('./locationInformation')
const buildDateRange = require('common/src/date/buildDateRange')

/*
example src data
 "collectingInformation": {
    "collectedByAgent": null,
    "date_year": "1845",
    "date_month": null,
    "date_day": null,
    "date_dateType": "latest",
    "date_remarks": null,
    "establishmentMeans": "wild and native",
    "expeditionText": null,
    "isDeathDate": "False",
    "locationInformation_continentOcean": "Europe",
    "locationInformation_country": "Sweden",
    "locationInformation_district": null,
    "locationInformation_latitude": "57.7114",
    "locationInformation_localityI": "Odensjö",
    "locationInformation_localityV": "Odensjö, Småland",
    "locationInformation_longitude": "14.1769",
    "locationInformation_maxDepthInMeters": null,
    "locationInformation_maxElevationhInMeters": null,
    "locationInformation_minDepthInMeters": null,
    "locationInformation_minElevationInMeters": null,
    "locationInformation_province": "Småland",
    "locationInformation_remarks": "Obs! Finns ytterligare ett Odensjö utanför Växjö, så djur som har denna lokal kan ha fel koordinat",
    "locationInformation_swedishGrid5km": null,
    "locationInformation_uncertaintyInMeters": null
  },
*/

module.exports = function migrateCollectingInformation({
  src,
  target,
  migrator,
  globals,
  reporter,
}) {
  const srcCollectingInformation = migrator.getValue({
    obj: src,
    path: 'migrationData.collectingInformation',
    strip: true,
  })

  const collectingInformation = {}

  if (srcCollectingInformation.collectedByAgent) {
    collectingInformation.collectedByAgent = {
      textI: srcCollectingInformation.collectedByAgent,
    }
  }

  if (srcCollectingInformation.establishmentMeans) {
    const id = migrator.getFromGlobals({
      globals,
      key: srcCollectingInformation.establishmentMeans,
      mapKey: 'establishmentMeansTypeKeyIdMap',
      reporter,
    })

    if (id) {
      collectingInformation.establishmentMeansType = {
        id,
      }
    }
  }

  if (srcCollectingInformation.remarks) {
    collectingInformation.remarks = {
      textI: srcCollectingInformation.collectedByAgent,
    }
  }

  // event
  const dateYear = srcCollectingInformation.date_year
  const dateMonth = srcCollectingInformation.date_month
  const dateDay = srcCollectingInformation.date_day
  const remarks = srcCollectingInformation.date_remarks
  const dateType = srcCollectingInformation.date_type

  const eventDateRange = buildDateRange({
    dateType: dateType || 'latest',
    remarks,
    startDay: dateDay,
    startMonth: dateMonth,
    startYear: dateYear,
  })

  const { expeditionText } = srcCollectingInformation

  // locationInformation
  const locationInformation = createLocationInformation({
    globals,
    migrator,
    reporter,
    srcCollectingInformation,
  })

  if (eventDateRange || expeditionText || locationInformation) {
    const event = {}
    if (eventDateRange) {
      event.dateRange = eventDateRange
    }
    if (expeditionText) {
      event.expeditionText = expeditionText
    }
    if (locationInformation) {
      event.locationInformation = locationInformation
    }
    collectingInformation.event = event
  }

  const isDeathDate = srcCollectingInformation.isDeathDate === 'True'
  collectingInformation.isDeathDate = isDeathDate

  if (Object.keys(collectingInformation).length) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.collectingInformation.0',
      value: collectingInformation,
    })
  }
}
