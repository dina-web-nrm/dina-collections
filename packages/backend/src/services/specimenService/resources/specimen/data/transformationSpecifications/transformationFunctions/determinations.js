/* eslint-disable no-param-reassign */
const getInterpretedDateRangeFromOneDate = require('common/src/date/getInterpretedDateRangeFromOneDate')

/*
example src data
      "determinations": {
        "determinedByAgent_textI": null,
        "taxonNameI": "Eptesicus nilssonii",
        "date_year": null,
        "date_month": null,
        "date_day": null
      },
*/
module.exports = function migrateDeterminations({ src, target, migrator }) {
  const srcDeterminations = migrator.getValue({
    obj: src,
    path: 'migrationData.determinations',
    strip: true,
  })

  if (!srcDeterminations) {
    return
  }

  const {
    determinedByAgent_textI: srcDeterminedByAgent,
    taxonNameI: srcTaxonNameI,
    date_year: srcDateYear,
    date_month: srcDateMonth,
    date_day: srcDateDay,
  } = srcDeterminations

  const determination = {}

  if (srcDateYear) {
    determination.date = getInterpretedDateRangeFromOneDate({
      dateType: 'single',
      day: srcDateDay,
      month: srcDateMonth,
      year: srcDateYear,
    })
  }

  if (srcDeterminedByAgent) {
    determination.determinedByAgent = {
      textI: srcDeterminedByAgent,
    }
  }

  if (srcTaxonNameI) {
    determination.taxonNameI = srcTaxonNameI
  }

  if (Object.keys(determination).length) {
    migrator.setValue({
      obj: target,
      path: 'attributes.individual.determinations.0',
      value: determination,
    })
  }
}
