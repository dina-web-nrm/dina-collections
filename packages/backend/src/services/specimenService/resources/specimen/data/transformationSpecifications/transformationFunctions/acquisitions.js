/* eslint-disable no-param-reassign */
const buildDateRange = require('common/src/date/buildDateRange')

/*
example src data
      "acquisitions": {
        "date_year": "1925",
        "date_month": null,
        "date_day": null,
        "dateType": "single",
        "handedInByAgent": null
      },
*/
module.exports = function migrateAcquisitions({ src, target, migrator }) {
  const srcAcquisitions = migrator.getValue({
    obj: src,
    path: 'migrationData.acquisitions',
    strip: true,
  })

  if (!srcAcquisitions) {
    return
  }

  const {
    date_day: srcDateDay,
    date_month: srcDateMonth,
    date_year: srcDateYear,
    dateType: srcDateType,
    handedInByAgent: srcHandedInByAgent,
  } = srcAcquisitions

  const acquisition = {}

  if (srcDateYear) {
    acquisition.date = buildDateRange({
      dateType: srcDateType || 'single',
      startDay: srcDateDay,
      startMonth: srcDateMonth,
      startYear: srcDateYear,
    })
  }

  if (srcHandedInByAgent) {
    acquisition.handedInByAgent = {
      textI: srcHandedInByAgent,
    }
  }

  if (Object.keys(acquisition).length) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.acquisition',
      value: acquisition,
    })
  }
}
